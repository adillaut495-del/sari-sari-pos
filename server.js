import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4174;
const databaseFile = path.join(__dirname, 'data', 'pos.db');

const dbDirectory = path.dirname(databaseFile);
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

const db = new Database(databaseFile, { fileMustExist: false });

db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS app_state (
    id TEXT PRIMARY KEY,
    payload TEXT NOT NULL
  );
`);

const DEFAULT_STORE_PROFILE = {
  storeName: 'Tindahan ni Ate Inday',
  ownerName: 'Ate Inday',
  location: 'Barangay 142',
  address: 'Barangay 142, City Proper',
  phone: '0917-123-4567',
  businessType: 'Sari-sari Store',
  currency: 'PHP'
};

const INITIAL_DATA = {
  theme: 'light',
  setupComplete: false,
  storeProfile: DEFAULT_STORE_PROFILE,
  products: [],
  categories: [
    'All',
    'Instant Noodles',
    'Beverages',
    'Snacks',
    'Canned Goods',
    'Household & Toiletries',
    'Alcohol & Tobacco',
    'Tingi / Retail',
    'Uncategorized'
  ],
  customers: [],
  sales: []
};

function normalizeProduct(product = {}) {
  const costPrice = Number(product.costPrice) || 0;
  const retailPrice = Number(product.retailPrice) || 0;
  const stock = Number(product.stock) || 0;
  const reorderLevel = Number(product.reorderLevel) || 0;
  const tingiPrice = Number(product.tingiPrice) || 0;
  const hasPautang = Boolean(product.hasPautang);
  const pautangPrice = Number(product.pautangPrice) || 0;

  // `brand`, `packageSize`, `image` and `icon` were removed from the product
  // model, so drop any legacy values still present in a stored database.
  const rest = { ...product };
  delete rest.brand;
  delete rest.packageSize;
  delete rest.image;
  delete rest.icon;

  return {
    ...rest,
    id: product.id || `P-${Date.now().toString(36).toUpperCase()}`,
    name: product.name || 'New Product',
    category: product.category || 'Uncategorized',
    costPrice,
    retailPrice,
    stock,
    reorderLevel,
    unit: product.unit || 'pcs',
    barcode: product.barcode || '',
    hasTingi: Boolean(product.hasTingi),
    tingiPrice,
    hasPautang,
    pautangPrice: hasPautang ? (pautangPrice || retailPrice) : 0
  };
}

/**
 * Guards against duplicate ids inside a stored database. The first record
 * holding a given id keeps it so existing references stay valid; later
 * duplicates get a freshly minted id.
 */
function ensureUniqueIds(data) {
  let sequence = 0;

  const nextId = (prefix) => {
    sequence += 1;
    return `${prefix}-${Date.now().toString(36).toUpperCase()}${sequence.toString(36).toUpperCase()}`;
  };

  const dedupe = (records, prefix) => {
    const seen = new Set();

    return records.map((record) => {
      const currentId = typeof record?.id === 'string' ? record.id.trim() : '';

      if (currentId && !seen.has(currentId)) {
        seen.add(currentId);
        return record;
      }

      return { ...record, id: nextId(prefix) };
    });
  };

  return {
    ...data,
    products: dedupe(Array.isArray(data.products) ? data.products : [], 'P'),
    customers: dedupe(Array.isArray(data.customers) ? data.customers : [], 'C'),
    sales: dedupe(Array.isArray(data.sales) ? data.sales : [], 'TRX')
  };
}

function getInitialFreshData() {
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

function normalizeData(data) {
  const base = getInitialFreshData();
  const normalized = ensureUniqueIds({
    ...base,
    ...data,
    theme: data?.theme || 'light',
    setupComplete: data?.setupComplete ?? false,
    storeProfile: {
      ...base.storeProfile,
      ...(data?.storeProfile || {})
    },
    products: Array.isArray(data?.products) ? data.products.map(normalizeProduct) : base.products,
    categories: Array.isArray(data?.categories) ? data.categories : base.categories,
    customers: Array.isArray(data?.customers) ? data.customers : base.customers,
    sales: Array.isArray(data?.sales) ? data.sales : base.sales
  });

  return normalized;
}

function ensureInitialRow() {
  const existing = db.prepare("SELECT payload FROM app_state WHERE id = 'main'").get();
  if (!existing) {
    db.prepare("INSERT INTO app_state (id, payload) VALUES ('main', ?) ").run(JSON.stringify(getInitialFreshData()));
  }
}

function readData() {
  ensureInitialRow();

  const row = db.prepare("SELECT payload FROM app_state WHERE id = 'main'").get();
  if (!row || !row.payload) {
    const fresh = getInitialFreshData();
    writeData(fresh);
    return fresh;
  }

  try {
    const parsed = JSON.parse(row.payload);
    const normalized = normalizeData(parsed);

    if (JSON.stringify(normalized) !== row.payload) {
      writeData(normalized);
    }

    return normalized;
  } catch (error) {
    const fresh = getInitialFreshData();
    writeData(fresh);
    return fresh;
  }
}

function writeData(data) {
  const normalized = normalizeData(data);
  db.prepare(
    "INSERT INTO app_state (id, payload) VALUES ('main', ?) ON CONFLICT(id) DO UPDATE SET payload = excluded.payload"
  ).run(JSON.stringify(normalized));

  return normalized;
}

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/db', (req, res) => {
  res.json(readData());
});

app.put('/api/db', (req, res) => {
  const incoming = req.body || {};
  const current = readData();
  const merged = {
    ...current,
    ...incoming,
    products: Array.isArray(incoming.products) ? incoming.products : current.products,
    categories: Array.isArray(incoming.categories) ? incoming.categories : current.categories,
    customers: Array.isArray(incoming.customers) ? incoming.customers : current.customers,
    sales: Array.isArray(incoming.sales) ? incoming.sales : current.sales,
    theme: incoming.theme || current.theme || 'light',
    setupComplete: incoming.setupComplete ?? current.setupComplete ?? false,
    storeProfile: incoming.storeProfile || current.storeProfile || DEFAULT_STORE_PROFILE
  };

  const next = writeData(merged);
  res.json({ success: true, data: next });
});

app.post('/api/reset-db', (req, res) => {
  const fresh = getInitialFreshData();
  writeData(fresh);
  res.json(fresh);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Local POS database server running at http://0.0.0.0:${port}`);
});

process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  db.close();
  process.exit(0);
});
