import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4174;
const databaseFile = path.join(__dirname, 'data', 'pos-db.json');

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
    'Tingi / Retail'
  ],
  customers: [],
  sales: []
};

function ensureDbDir() {
  const dir = path.dirname(databaseFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function normalizeData(data) {
  const base = getInitialFreshData();
  const normalized = {
    ...base,
    ...data,
    theme: data?.theme || 'light',
    setupComplete: data?.setupComplete ?? false,
    storeProfile: {
      ...base.storeProfile,
      ...(data?.storeProfile || {})
    },
    products: Array.isArray(data?.products) ? data.products : base.products,
    categories: Array.isArray(data?.categories) ? data.categories : base.categories,
    customers: Array.isArray(data?.customers) ? data.customers : base.customers,
    sales: Array.isArray(data?.sales) ? data.sales : base.sales
  };

  return normalized;
}

function readData() {
  ensureDbDir();

  if (!fs.existsSync(databaseFile)) {
    const fresh = getInitialFreshData();
    fs.writeFileSync(databaseFile, JSON.stringify(fresh, null, 2), 'utf8');
    return JSON.parse(JSON.stringify(fresh));
  }

  try {
    const raw = fs.readFileSync(databaseFile, 'utf8');
    if (!raw) {
      const fresh = getInitialFreshData();
      fs.writeFileSync(databaseFile, JSON.stringify(fresh, null, 2), 'utf8');
      return JSON.parse(JSON.stringify(fresh));
    }

    const parsed = JSON.parse(raw);
    const normalized = normalizeData(parsed);

    if (JSON.stringify(normalized) !== raw) {
      fs.writeFileSync(databaseFile, JSON.stringify(normalized, null, 2), 'utf8');
    }

    return normalized;
  } catch (error) {
    const fresh = getInitialFreshData();
    fs.writeFileSync(databaseFile, JSON.stringify(fresh, null, 2), 'utf8');
    return JSON.parse(JSON.stringify(fresh));
  }
}

function writeData(data) {
  ensureDbDir();
  fs.writeFileSync(databaseFile, JSON.stringify(data, null, 2), 'utf8');
}

function getInitialFreshData() {
  return JSON.parse(JSON.stringify(INITIAL_DATA));
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

  writeData(merged);
  res.json({ success: true, data: merged });
});

app.post('/api/reset-db', (req, res) => {
  const fresh = getInitialFreshData();
  writeData(fresh);
  res.json(fresh);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Local POS database server running at http://0.0.0.0:${port}`);
});
