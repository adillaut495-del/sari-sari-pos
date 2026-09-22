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

const INITIAL_DATA = {
  theme: 'light',
  products: [
    {
      id: 'P-101',
      name: 'Piattos Cheese 85g',
      category: 'Snacks',
      costPrice: 32.0,
      retailPrice: 38.0,
      stock: 24,
      reorderLevel: 5,
      unit: 'packs',
      barcode: '480001605201',
      icon: '🥔',
      hasTingi: false
    },
    {
      id: 'P-102',
      name: 'Lucky Me Instant Pancit Canton Extra Hot',
      category: 'Instant Noodles',
      costPrice: 14.5,
      retailPrice: 17.5,
      stock: 48,
      reorderLevel: 10,
      unit: 'packs',
      barcode: '480001660102',
      icon: '🍜',
      hasTingi: false
    },
    {
      id: 'P-103',
      name: 'C2 Green Tea Apple 500ml',
      category: 'Beverages',
      costPrice: 24.0,
      retailPrice: 30.0,
      stock: 18,
      reorderLevel: 6,
      unit: 'bottles',
      barcode: '480001611003',
      icon: '🧃',
      hasTingi: false
    }
  ],
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
  customers: [
    { id: 'C-01', name: 'Aling Nena', phone: '09171234567', address: 'Block 2 Lot 5', balance: 245.0, notes: 'Suki, pays every Friday' },
    { id: 'C-02', name: 'Kuya Cardo', phone: '09289876543', address: 'Near Basketball Court', balance: 120.0, notes: ' Tricycle driver' },
    { id: 'C-03', name: 'Mang Juan', phone: '09085551234', address: 'Street 4 Corner', balance: 0.0, notes: 'Pays in exact cash always' }
  ],
  sales: [
    {
      id: 'TRX-8821',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      customerName: 'Walk-in Customer',
      items: [
        { id: 'P-102', name: 'Lucky Me Instant Pancit Canton Extra Hot', price: 17.5, quantity: 2, isTingi: false },
        { id: 'P-108', name: 'Coca-Cola 1.5L PET', price: 75.0, quantity: 1, isTingi: false }
      ],
      subtotal: 110.0,
      discount: 0,
      totalAmount: 110.0,
      paymentMethod: 'Cash',
      tendered: 200.0,
      change: 90.0,
      status: 'Completed',
      cashier: 'Ate Inday (Owner)'
    }
  ]
};

function ensureDbDir() {
  const dir = path.dirname(databaseFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readData() {
  ensureDbDir();

  if (!fs.existsSync(databaseFile)) {
    fs.writeFileSync(databaseFile, JSON.stringify(INITIAL_DATA, null, 2), 'utf8');
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  try {
    const raw = fs.readFileSync(databaseFile, 'utf8');
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(INITIAL_DATA));
  } catch (error) {
    fs.writeFileSync(databaseFile, JSON.stringify(INITIAL_DATA, null, 2), 'utf8');
    return JSON.parse(JSON.stringify(INITIAL_DATA));
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
    theme: incoming.theme || current.theme || 'light'
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
