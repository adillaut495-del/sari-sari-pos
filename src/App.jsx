import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  QrCode,
  DollarSign,
  Receipt,
  Clock,
  Package,
  BarChart2,
  Bell,
  Check,
  X,
  ChevronRight,
  Wifi,
  User,
  Percent,
  Printer,
  RefreshCw,
  Moon,
  Sun,
  Filter,
  ChevronUp,
  FileText,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Edit3,
  UserPlus,
  AlertTriangle,
  RotateCcw,
  Smartphone,
  Maximize2,
  Minimize2,
  Sparkles,
  Tag,
  CheckCircle,
  Settings,
  HelpCircle,
  TrendingDown,
  Layers,
  Landmark
} from 'lucide-react';

const INITIAL_CATEGORIES = [
  'All',
  'Instant Noodles',
  'Beverages',
  'Snacks',
  'Canned Goods',
  'Household & Toiletries',
  'Alcohol & Tobacco',
  'Tingi / Retail',
  'Uncategorized'
];

const INITIAL_PRODUCTS = [
  {
    id: 'P-101',
    name: 'Piattos Cheese 85g',
    category: 'Snacks',
    costPrice: 32.00,
    retailPrice: 38.00,
    stock: 24,
    reorderLevel: 5,
    unit: 'packs',
    barcode: '480001605201',
    hasTingi: false
  },
  {
    id: 'P-102',
    name: 'Lucky Me Instant Pancit Canton Extra Hot',
    category: 'Instant Noodles',
    costPrice: 14.50,
    retailPrice: 17.50,
    stock: 48,
    reorderLevel: 10,
    unit: 'packs',
    barcode: '480001660102',
    hasTingi: false
  },
  {
    id: 'P-103',
    name: 'C2 Green Tea Apple 500ml',
    category: 'Beverages',
    costPrice: 24.00,
    retailPrice: 30.00,
    stock: 18,
    reorderLevel: 6,
    unit: 'bottles',
    barcode: '480001611003',
    hasTingi: false
  },
  {
    id: 'P-104',
    name: 'Great Taste White Coffee 3in1 (Twin Pack)',
    category: 'Beverages',
    costPrice: 12.00,
    retailPrice: 15.00,
    stock: 35,
    reorderLevel: 8,
    unit: 'packs',
    barcode: '480001644004',
    hasTingi: true,
    tingiUnit: 'sachet',
    tingiRatio: 2, // 2 sachets per twin pack
    tingiPrice: 8.00
  },
  {
    id: 'P-105',
    name: 'Bear Brand Powdered Milk 33g',
    category: 'Beverages',
    costPrice: 15.00,
    retailPrice: 18.00,
    stock: 40,
    reorderLevel: 10,
    unit: 'sachets',
    barcode: '480001633005',
    hasTingi: false
  },
  {
    id: 'P-106',
    name: 'Safeguard Bar Soap White 130g',
    category: 'Household & Toiletries',
    costPrice: 42.00,
    retailPrice: 50.00,
    stock: 12,
    reorderLevel: 4,
    unit: 'bars',
    barcode: '480001655006',
    hasTingi: false
  },
  {
    id: 'P-107',
    name: 'Alaska Evaporada 370ml',
    category: 'Canned Goods',
    costPrice: 28.50,
    retailPrice: 35.00,
    stock: 15,
    reorderLevel: 5,
    unit: 'cans',
    barcode: '480001677007',
    hasTingi: false
  },
  {
    id: 'P-108',
    name: 'Coca-Cola 1.5L PET',
    category: 'Beverages',
    costPrice: 62.00,
    retailPrice: 75.00,
    stock: 8,
    reorderLevel: 4,
    unit: 'bottles',
    barcode: '480001688008',
    hasTingi: false
  },
  {
    id: 'P-109',
    name: 'Ginebra San Miguel (Gin Bulag) 350ml',
    category: 'Alcohol & Tobacco',
    costPrice: 55.00,
    retailPrice: 65.00,
    stock: 14,
    reorderLevel: 4,
    unit: 'bottles',
    barcode: '480001699009',
    hasTingi: false
  },
  {
    id: 'P-110',
    name: 'Marlboro Red Single Stick',
    category: 'Tingi / Retail',
    costPrice: 8.00,
    retailPrice: 10.00,
    stock: 100,
    reorderLevel: 20,
    unit: 'sticks',
    barcode: '480001600010',
    hasTingi: false
  },
  {
    id: 'P-111',
    name: 'Fresh Egg (Medium)',
    category: 'Tingi / Retail',
    costPrice: 7.00,
    retailPrice: 9.00,
    stock: 60,
    reorderLevel: 15,
    unit: 'pcs',
    barcode: '480001611011',
    hasTingi: false
  },
  {
    id: 'P-112',
    name: 'Bawang / Garlic (Tingi Set)',
    category: 'Tingi / Retail',
    costPrice: 3.00,
    retailPrice: 5.00,
    stock: 50,
    reorderLevel: 10,
    unit: 'pcs',
    barcode: '480001622012',
    hasTingi: false
  }
];

const INITIAL_CUSTOMERS = [
  { id: 'C-01', name: 'Aling Nena', phone: '09171234567', address: 'Block 2 Lot 5', balance: 245.00, notes: 'Suki, pays every Friday', ledger: [
    { id: 'L-01', type: 'sale', amount: 120.00, date: new Date(Date.now() - 86400000 * 4).toISOString(), description: 'Utang for groceries', orderId: 'TRX-8815' },
    { id: 'L-02', type: 'sale', amount: 125.00, date: new Date(Date.now() - 86400000 * 2).toISOString(), description: 'Utang for household needs', orderId: 'TRX-8820' },
    { id: 'L-03', type: 'payment', amount: 0.00, date: new Date(Date.now() - 86400000).toISOString(), description: 'Initial payment', orderId: 'PMT-1' }
  ] },
  { id: 'C-02', name: 'Kuya Cardo', phone: '09289876543', address: 'Near Basketball Court', balance: 120.00, notes: ' Tricycle driver', ledger: [
    { id: 'L-04', type: 'sale', amount: 120.00, date: new Date(Date.now() - 86400000 * 3).toISOString(), description: 'Rice and canned goods', orderId: 'TRX-8810' }
  ] },
  { id: 'C-03', name: 'Mang Juan', phone: '09085551234', address: 'Street 4 Corner', balance: 0.00, notes: 'Pays in exact cash always', ledger: [] }
];

/** Normalises a single Pautang record and keeps its instalment maths self-consistent. */
const normalizePautangRecord = (record = {}) => {
  const totalPrice = Number(record.totalPrice) || 0;
  const paid = Number(record.paid) || 0;
  const instalments = Array.isArray(record.instalments)
    ? record.instalments.map((entry) => ({
      ...entry,
      amount: Number(entry.amount) || 0,
      amountPaid: Number(entry.amountPaid) || 0,
      paid: Boolean(entry.paid)
    }))
    : [];

  const payments = Array.isArray(record.payments)
    ? record.payments.map((entry) => ({ ...entry, amount: Number(entry.amount) || 0 }))
    : [];

  const balance = Math.max(0, Math.round((totalPrice - paid) * 100) / 100);
  const isVoided = record.status === 'Voided';

  return {
    ...record,
    totalPrice,
    downPayment: Number(record.downPayment) || 0,
    paid,
    balance,
    // A record is settled once nothing is left owing; never trust a stored flag.
    // A voided record stays voided regardless of its zeroed balance.
    status: isVoided ? 'Voided' : (balance <= 0 ? 'Redeemed' : 'Active'),
    items: Array.isArray(record.items) ? record.items : [],
    instalments,
    payments
  };
};

/** Sums what is still owed across a set of Pautang records. */
const sumPautangBalance = (records) => {
  const list = Array.isArray(records) ? records : [];
  return Math.round(list
    .filter((record) => record.status === 'Active')
    .reduce((total, record) => total + (Number(record.balance) || 0), 0) * 100) / 100;
};

/**
 * Splits a balance into equal instalments. Rounding drift is absorbed into the
 * final instalment so the parts always sum back to the original amount.
 */
const buildInstalmentSchedule = (balance, count) => {
  const total = Math.max(0, Number(balance) || 0);
  const count_ = Math.max(1, Math.floor(Number(count) || 1));
  const perInstalment = Math.round((total / count_) * 100) / 100;

  const schedule = Array.from({ length: count_ }, () => perInstalment);
  const drift = Math.round((total - perInstalment * count_) * 100) / 100;
  schedule[schedule.length - 1] = Math.round((schedule[schedule.length - 1] + drift) * 100) / 100;

  return schedule;
};

/** Rounds to 2 decimals to keep peso maths free of floating point drift. */
const roundMoney = (value) => Math.round((Number(value) || 0) * 100) / 100;

const normalizeCustomer = (customer = {}) => {
  const pautang = Array.isArray(customer.pautang) ? customer.pautang.map(normalizePautangRecord) : [];

  return {
    ...customer,
    balance: Number(customer.balance) || 0,
    ledger: Array.isArray(customer.ledger) ? customer.ledger.map((entry) => ({
      ...entry,
      amount: Number(entry.amount) || 0
    })) : [],
    // Pautang is kept fully separate from Utang: its own records and its own
    // balance, never folded into `balance` or `ledger`.
    pautang,
    pautangBalance: sumPautangBalance(pautang)
  };
};

const DEFAULT_STORE_PROFILE = {
  storeName: 'Tindahan ni Ate Inday',
  ownerName: 'Ate Inday',
  location: 'Barangay 142',
  address: 'Barangay 142, City Proper',
  phone: '0917-123-4567',
  businessType: 'Sari-sari Store',
  currency: 'PHP'
};

const CART_STORAGE_KEY = 'sari-sari-pos-cart';
let scanAudioContext;

const playScanSuccessSound = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    scanAudioContext ||= new AudioContextClass();
    if (scanAudioContext.state === 'suspended') {
      scanAudioContext.resume();
    }

    const oscillator = scanAudioContext.createOscillator();
    const gain = scanAudioContext.createGain();
    const startTime = scanAudioContext.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, startTime);
    oscillator.frequency.setValueAtTime(1320, startTime + 0.07);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.16);

    oscillator.connect(gain);
    gain.connect(scanAudioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + 0.16);
  } catch (error) {
    console.warn('Scan sound unavailable:', error);
  }
};

/* ---------------------------------------------------------------------------
 * ID generation
 *
 * Every id is minted as  PREFIX-BASE36TIME-BASE36SEQUENCE-RANDOM  and checked
 * against a process-wide registry that is seeded with the ids already stored
 * in the database. Two records created in the same millisecond therefore can
 * never collide, and a re-used id can never overwrite an existing record.
 * ------------------------------------------------------------------------- */

const ID_REGISTRY = new Set();
let idSequence = 0;

const randomIdToken = () => {
  const cryptoObj = globalThis.crypto;

  if (typeof cryptoObj?.randomUUID === 'function') {
    return cryptoObj.randomUUID().replace(/-/g, '').slice(0, 10);
  }

  if (typeof cryptoObj?.getRandomValues === 'function') {
    const bytes = new Uint8Array(5);
    cryptoObj.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  return Math.random().toString(36).slice(2, 12);
};

const createUniqueId = (prefix) => {
  for (let attempt = 0; attempt < 1000; attempt += 1) {
    idSequence += 1;
    const candidate = [
      prefix,
      Date.now().toString(36).toUpperCase(),
      idSequence.toString(36).toUpperCase(),
      randomIdToken().toUpperCase()
    ].join('-');

    if (!ID_REGISTRY.has(candidate)) {
      ID_REGISTRY.add(candidate);
      return candidate;
    }
  }

  // Practically unreachable, but never hand back a known duplicate.
  const fallback = `${prefix}-${Date.now().toString(36).toUpperCase()}-${randomIdToken().toUpperCase()}${randomIdToken().toUpperCase()}`;
  ID_REGISTRY.add(fallback);
  return fallback;
};

const registerIdsFrom = ({ products = [], customers = [], sales = [] } = {}) => {
  ID_REGISTRY.clear();

  products.forEach((product) => {
    if (product?.id) ID_REGISTRY.add(product.id);
    (Array.isArray(product?.stockLedger) ? product.stockLedger : []).forEach((entry) => {
      if (entry?.id) ID_REGISTRY.add(entry.id);
    });
  });

  customers.forEach((customer) => {
    if (customer?.id) ID_REGISTRY.add(customer.id);

    const pushIds = (entry) => {
      if (entry?.id) ID_REGISTRY.add(entry.id);
      (Array.isArray(entry?.payments) ? entry.payments : []).forEach((payment) => {
        if (payment?.id) ID_REGISTRY.add(payment.id);
      });
      (Array.isArray(entry?.instalments) ? entry.instalments : []).forEach((instalment) => {
        if (instalment?.id) ID_REGISTRY.add(instalment.id);
      });
    };

    (Array.isArray(customer?.ledger) ? customer.ledger : []).forEach(pushIds);
    (Array.isArray(customer?.pautang) ? customer.pautang : []).forEach(pushIds);
  });

  sales.forEach((sale) => {
    if (sale?.id) ID_REGISTRY.add(sale.id);
  });
};

/**
 * Repairs ids that are missing or duplicated inside an already stored
 * database. The first record holding a given id keeps it (so historical
 * references such as sales items and ledger orderIds keep resolving to the
 * original record); every later duplicate receives a freshly minted id.
 */
const ensureUniqueIds = ({ products = [], customers = [], sales = [] } = {}) => {
  const dedupe = (records, prefix) => {
    const seen = new Set();

    return records.map((record) => {
      const currentId = typeof record?.id === 'string' ? record.id.trim() : '';

      if (currentId && !seen.has(currentId)) {
        seen.add(currentId);
        return record;
      }

      return { ...record, id: createUniqueId(prefix) };
    });
  };

  return {
    products: dedupe(products, 'P'),
    customers: dedupe(customers, 'C'),
    sales: dedupe(sales, 'TRX')
  };
};

const normalizeProduct = (product = {}) => {
  const costPrice = Number(product.costPrice) || 0;
  const retailPrice = Number(product.retailPrice) || 0;
  const stock = Number(product.stock) || 0;
  const reorderLevel = Number(product.reorderLevel) || 0;
  const tingiPrice = Number(product.tingiPrice) || 0;
  const pautangPrice = Number(product.pautangPrice) || 0;
  const hasPautang = Boolean(product.hasPautang);
  const stockLedger = Array.isArray(product.stockLedger) ? product.stockLedger : [];

  // `brand`, `packageSize`, `image` and `icon` were removed from the product
  // model, so drop any legacy values still present in a stored database.
  const rest = { ...product };
  delete rest.brand;
  delete rest.packageSize;
  delete rest.image;
  delete rest.icon;

  return {
    ...rest,
    id: product.id || createUniqueId('P'),
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
    // A Pautang price is always its own figure; fall back to retail so a
    // half-configured item never becomes free.
    pautangPrice: hasPautang ? (pautangPrice || retailPrice) : 0,
    barcodeText: product.barcode || '',
    stockLedger
  };
};

const INITIAL_SALES = [
  {
    id: 'TRX-8821',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'Walk-in Customer',
    items: [
      { id: 'P-102', name: 'Lucky Me Instant Pancit Canton Extra Hot', price: 17.50, quantity: 2, isTingi: false },
      { id: 'P-108', name: 'Coca-Cola 1.5L PET', price: 75.00, quantity: 1, isTingi: false }
    ],
    subtotal: 110.00,
    discount: 0,
    totalAmount: 110.00,
    paymentMethod: 'Cash',
    tendered: 200.00,
    change: 90.00,
    status: 'Completed',
    cashier: 'Ate Inday (Owner)'
  },
  {
    id: 'TRX-8820',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    customerName: 'Aling Nena',
    items: [
      { id: 'P-101', name: 'Piattos Cheese 85g', price: 38.00, quantity: 1, isTingi: false },
      { id: 'P-104', name: 'Great Taste White Coffee 3in1 (Twin Pack)', price: 15.00, quantity: 2, isTingi: false }
    ],
    subtotal: 68.00,
    discount: 0,
    totalAmount: 68.00,
    paymentMethod: 'Utang',
    tendered: 0,
    change: 0,
    status: 'Completed',
    cashier: 'Ate Inday (Owner)'
  }
];

export default function App() {
  const [theme, setTheme] = useState('light');
  const [setupComplete, setSetupComplete] = useState(true);
  const [storeProfile, setStoreProfile] = useState(DEFAULT_STORE_PROFILE);
  const [scanIntervalMs, setScanIntervalMs] = useState(2000);
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const handleConnection = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleConnection);
    window.addEventListener('offline', handleConnection);

    return () => {
      window.removeEventListener('online', handleConnection);
      window.removeEventListener('offline', handleConnection);
    };
  }, []);

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS.map(normalizeCustomer));
  const [salesHistory, setSalesHistory] = useState(INITIAL_SALES);

  const loadDatabase = async () => {
    try {
      const response = await fetch('/api/db');
      if (!response.ok) {
        throw new Error('Failed to load database');
      }
      const data = await response.json();
      setTheme(data.theme || 'light');
      setSetupComplete(Boolean(data.setupComplete));
      setStoreProfile(data.storeProfile || DEFAULT_STORE_PROFILE);
      setScanIntervalMs(Number(data.scanIntervalMs) > 0 ? Number(data.scanIntervalMs) : 2000);
      // Repair any duplicate / missing ids already present in the stored database.
      const repaired = ensureUniqueIds({
        products: (data.products || INITIAL_PRODUCTS).map(normalizeProduct),
        customers: data.customers || INITIAL_CUSTOMERS,
        sales: data.sales || INITIAL_SALES
      });
      const loadedProducts = repaired.products;
      const loadedCustomers = repaired.customers.map(normalizeCustomer);
      const loadedSales = repaired.sales;

      registerIdsFrom({ products: loadedProducts, customers: loadedCustomers, sales: loadedSales });

      setProducts(loadedProducts);
      setCategories(data.categories || INITIAL_CATEGORIES);
      setCustomers(loadedCustomers);
      setSalesHistory(loadedSales);
    } catch (error) {
      console.error(error);
      setTheme('light');
      setSetupComplete(false);
      setStoreProfile(DEFAULT_STORE_PROFILE);
      setScanIntervalMs(2000);
      const resetProducts = INITIAL_PRODUCTS.map(normalizeProduct);
      const resetCustomers = INITIAL_CUSTOMERS.map(normalizeCustomer);

      registerIdsFrom({ products: resetProducts, customers: resetCustomers, sales: INITIAL_SALES });

      setProducts(resetProducts);
      setCategories(INITIAL_CATEGORIES);
      setCustomers(resetCustomers);
      setSalesHistory(INITIAL_SALES);
    } finally {
      setIsDataLoaded(true);
    }
  };

  useEffect(() => {
    loadDatabase();
  }, []);

  const persistDatabase = async (nextState) => {
    if (!isDataLoaded) return;

    try {
      await fetch('/api/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextState)
      });
    } catch (error) {
      console.error('Database save failed:', error);
    }
  };

  const handleSetupSubmit = async (event) => {
    if (event?.preventDefault) event.preventDefault();
    if (event?.stopPropagation) event.stopPropagation();

    const formElement = event?.currentTarget || document.getElementById('store-setup-form');
    const formData = formElement ? new FormData(formElement) : null;

    const nextProfile = {
      storeName: (formData?.get('storeName') || '').toString().trim() || DEFAULT_STORE_PROFILE.storeName,
      ownerName: (formData?.get('ownerName') || '').toString().trim() || DEFAULT_STORE_PROFILE.ownerName,
      location: (formData?.get('location') || '').toString().trim() || DEFAULT_STORE_PROFILE.location,
      address: (formData?.get('address') || '').toString().trim() || DEFAULT_STORE_PROFILE.address,
      phone: (formData?.get('phone') || '').toString().trim() || DEFAULT_STORE_PROFILE.phone,
      businessType: (formData?.get('businessType') || '').toString().trim() || DEFAULT_STORE_PROFILE.businessType,
      currency: (formData?.get('currency') || '').toString().trim() || DEFAULT_STORE_PROFILE.currency
    };

    setStoreProfile(nextProfile);
    setSetupComplete(true);

    try {
      await fetch('/api/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme,
          setupComplete: true,
          storeProfile: nextProfile,
          products,
          categories,
          customers,
          sales: salesHistory
        })
      });
      showToast('Store setup saved');
    } catch (error) {
      console.error('Setup save failed:', error);
      showToast('Store setup could not be saved', 'error');
    }
  };

  // UI Navigation Tabs
  const [activeTab, setActiveTab] = useState('register'); // 'register', 'products', 'utang', 'sales', 'analytics', 'settings'

  // Cart State for Register View
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error('Cart restore failed:', error);
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [discountPercent, setDiscountPercent] = useState(0); // e.g., Senior 20%
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Cart save failed:', error);
    }
  }, [cart]);

  const handleAddCategory = (newCategory) => {
    const trimmed = (newCategory || '').trim();
    if (!trimmed) return;
    const normalized = trimmed.replace(/\s+/g, ' ');
    setCategories((prev) => {
      const unique = prev.map((item) => item.trim());
      if (unique.includes(normalized) || normalized.toLowerCase() === 'all') {
        return prev;
      }
      return [...prev, normalized];
    });
  };

  const getItemCount = () => cart.reduce((a, b) => a + b.quantity, 0);

  const handleDeleteCategory = (categoryToDelete) => {
    if (!categoryToDelete || categoryToDelete === 'All' || categoryToDelete === 'Uncategorized') return;

    setCategories((prev) => {
      const nextCategories = prev.filter((category) => category !== categoryToDelete);
      if (!nextCategories.includes('Uncategorized')) {
        nextCategories.push('Uncategorized');
      }
      return nextCategories;
    });

    setProducts((prev) =>
      prev.map((product) =>
        product.category === categoryToDelete
          ? {
              ...product,
              category: 'Uncategorized'
            }
          : product
      )
    );

    setSelectedCategory((prev) => (prev === categoryToDelete ? 'All' : prev));
  };

  // Payment Checkout Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // 'Cash', 'GCash', 'Utang', 'Pautang'
  const [tenderedCash, setTenderedCash] = useState('');
  const [selectedUtangCustomer, setSelectedUtangCustomer] = useState('');
  // Pautang terms: down payment + how many equal instalments to settle the rest.
  const [pautangDownPayment, setPautangDownPayment] = useState('');
  const [pautangInstalmentCount, setPautangInstalmentCount] = useState(1);
  const [paymentStep, setPaymentStep] = useState('method'); // 'method', 'receipt'
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  // Pautang Instalment Payment Modal
  const [isPautangPayOpen, setIsPautangPayOpen] = useState(false);
  const [pautangTargetRecord, setPautangTargetRecord] = useState(null);
  const [pautangPayAmount, setPautangPayAmount] = useState('');
  const [pautangPayMethod, setPautangPayMethod] = useState('Cash');

  // Product CRUD Modals State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = Add, Object = Edit
  const [pendingScannedProduct, setPendingScannedProduct] = useState(null);
  const [scanQuantity, setScanQuantity] = useState(1);

  // Stock In Modal State
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockProduct, setRestockProduct] = useState(null);
  const [restockQty, setRestockQty] = useState('');
  const [restockCostPrice, setRestockCostPrice] = useState('');
  const [restockRetailPrice, setRestockRetailPrice] = useState('');

  // Utang Customer CRUD Modals State
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isPabayadModalOpen, setIsPabayadModalOpen] = useState(false);
  const [selectedCustomerForPayment, setSelectedCustomerForPayment] = useState(null);
  const [pabayadAmount, setPabayadAmount] = useState('');

  // Toast System
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  useEffect(() => {
    if (!isDataLoaded || !setupComplete) return;

    persistDatabase({
      theme,
      setupComplete,
      storeProfile,
      scanIntervalMs,
      products,
      categories,
      customers,
      sales: salesHistory
    });
  }, [theme, setupComplete, storeProfile, scanIntervalMs, products, categories, customers, salesHistory, isDataLoaded]);

  const handleResetDatabase = async () => {
    if (!window.confirm('Reset the local server database to a fresh startup setup? This will clear all products, sales, and customer data.')) {
      return;
    }

    try {
      const response = await fetch('/api/reset-db', { method: 'POST' });
      const data = await response.json();
      setTheme(data.theme || 'light');
      setSetupComplete(Boolean(data.setupComplete));
      setStoreProfile(data.storeProfile || DEFAULT_STORE_PROFILE);
      // Repair any duplicate / missing ids already present in the stored database.
      const repaired = ensureUniqueIds({
        products: (data.products || INITIAL_PRODUCTS).map(normalizeProduct),
        customers: data.customers || INITIAL_CUSTOMERS,
        sales: data.sales || INITIAL_SALES
      });
      const loadedProducts = repaired.products;
      const loadedCustomers = repaired.customers.map(normalizeCustomer);
      const loadedSales = repaired.sales;

      registerIdsFrom({ products: loadedProducts, customers: loadedCustomers, sales: loadedSales });

      setProducts(loadedProducts);
      setCategories(data.categories || INITIAL_CATEGORIES);
      setCustomers(loadedCustomers);
      setSalesHistory(loadedSales);
      showToast('Local database reset to initial setup');
    } catch (error) {
      console.error('Reset failed:', error);
      showToast('Database reset failed', 'error');
    }
  };

  const handleBarcodeScan = (barcodeValue) => {
    if (pendingScannedProduct) return;
    const code = String(barcodeValue || '').trim();
    if (!code) return;

    const foundProduct = products.find((product) => String(product.barcode || '').trim() === code);
    if (!foundProduct) {
      showToast('Barcode not found in inventory', 'error');
      return;
    }

    if (foundProduct.stock <= 0) {
      showToast(`Out of stock: ${foundProduct.name}`, 'error');
      return;
    }

    playScanSuccessSound();
    setPendingScannedProduct(foundProduct);
    setScanQuantity(1);
  };

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.itemPrice * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount);
  }, [subtotal, discountAmount]);

  // Cart Actions
  // `mode` selects which price applies: '' = regular, 'tingi' = sachet,
  // 'pautang' = the item's own (usually higher) Pautang price.
  const addToCart = (product, mode = '', quantity = 1) => {
    const isTingi = mode === 'tingi';
    const isPautang = mode === 'pautang';

    const itemPrice = isTingi
      ? product.tingiPrice
      : isPautang
        ? product.pautangPrice
        : product.retailPrice;

    const itemName = isTingi
      ? `${product.name} (Tingi / Sachet)`
      : isPautang
        ? `${product.name} (Pautang)`
        : product.name;

    const cartItemId = isTingi ? `${product.id}-tingi` : isPautang ? `${product.id}-pautang` : product.id;
    const requestedQuantity = Math.max(1, Number(quantity) || 1);

    if (product.stock <= 0) {
      showToast(`Out of stock: ${product.name}`, 'error');
      return;
    }

    // Pautang units are sold whole, so the stock check uses the raw quantity.
    const stockAvailable = isTingi && product.tingiRatio
      ? Math.floor(product.stock * product.tingiRatio)
      : product.stock;

    if (requestedQuantity > stockAvailable) {
      showToast(`Limit reached for current stock level! (${stockAvailable} available)`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        if (existing.quantity + requestedQuantity > stockAvailable) {
          showToast(`Limit reached for current stock level!`, 'error');
          return prev;
        }
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + requestedQuantity } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: itemName,
          itemPrice,
          quantity: Math.min(requestedQuantity, stockAvailable),
          isTingi,
          isPautang,
          baseProduct: product
        }
      ];
    });

    showToast(`Added ${requestedQuantity}x - ₱${(itemPrice * requestedQuantity).toFixed(2)} - ${itemName}`);
  };

  const handleScanQuantityConfirm = () => {
    if (!pendingScannedProduct) return;
    addToCart(pendingScannedProduct, '', scanQuantity);
    setPendingScannedProduct(null);
    setScanQuantity(1);
  };

  const updateCartQty = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
    setTenderedCash('');
    setSelectedUtangCustomer('');
    setPautangDownPayment('');
    setPautangInstalmentCount(1);
    setPaymentMethod('Cash');
  };

  // Complete Order / Transaction Flow
  const handleFinalizeTransaction = () => {
    if (paymentMethod === 'Cash') {
      const tendered = parseFloat(tenderedCash) || 0;
      if (tendered < totalAmount) {
        showToast(`Incomplete cash payment! Needs ₱${totalAmount.toFixed(2)}`, 'error');
        return;
      }
    }

    if (paymentMethod === 'Utang' && !selectedUtangCustomer) {
      showToast('Please select a customer for Utang credit ledger!', 'error');
      return;
    }

    if (paymentMethod === 'Pautang' && !selectedUtangCustomer) {
      showToast('Please select a customer for the Pautang ledger!', 'error');
      return;
    }

    // A Pautang payout must be priced entirely at Pautang rates, so refuse to
    // mix in regular/tingi items instead of silently mis-pricing the record.
    if (paymentMethod === 'Pautang') {
      const nonPautangItems = cart.filter((item) => !item.isPautang);
      if (nonPautangItems.length > 0) {
        showToast('Pautang checkout only accepts Pautang items. Separate the regular items first.', 'error');
        return;
      }
    }

    const isCreditMethod = paymentMethod === 'Utang' || paymentMethod === 'Pautang';
    const customerObj = customers.find((c) => c.id === selectedUtangCustomer);
    const customerName = isCreditMethod ? (customerObj ? customerObj.name : 'Suki') : 'Walk-in Suki';

    const newOrder = {
      id: createUniqueId('TRX'),
      timestamp: new Date().toISOString(),
      customerName,
      customerId: isCreditMethod ? selectedUtangCustomer : null,
      items: cart.map((c) => ({
        id: c.productId,
        name: c.name,
        price: c.itemPrice,
        quantity: c.quantity,
        isTingi: c.isTingi,
        isPautang: Boolean(c.isPautang)
      })),
      subtotal,
      discount: discountAmount,
      totalAmount,
      paymentMethod,
      tendered: paymentMethod === 'Cash' ? parseFloat(tenderedCash) : totalAmount,
      change: paymentMethod === 'Cash' ? Math.max(0, parseFloat(tenderedCash) - totalAmount) : 0,
      status: 'Completed',
      cashier: `${storeProfile.ownerName} (Owner)`
    };

    // 1. Deduct Stock from Products
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItemsForProd = cart.filter((ci) => ci.productId === prod.id);
        if (cartItemsForProd.length === 0) return prod;

        let totalStockDeduction = 0;
        cartItemsForProd.forEach((ci) => {
          if (ci.isTingi && prod.tingiRatio) {
            // Converts tingi sachet units back to fractional box/pack stock
            totalStockDeduction += ci.quantity / prod.tingiRatio;
          } else {
            totalStockDeduction += ci.quantity;
          }
        });

        const newStock = Math.max(0, Math.round((prod.stock - totalStockDeduction) * 100) / 100);
        return normalizeProduct({
          ...prod,
          stock: newStock,
          stockLedger: [
            {
              id: createUniqueId('STK'),
              type: 'sale',
              quantity: -totalStockDeduction,
              date: new Date().toISOString(),
              reference: newOrder.id,
              description: `Sold through ${newOrder.id}`
            },
            ...(Array.isArray(prod.stockLedger) ? prod.stockLedger : [])
          ]
        });
      })
    );

    // 2. If Utang payment, add to Customer balance ledger
    if (paymentMethod === 'Utang' && selectedUtangCustomer) {
      setCustomers((prev) =>
        prev.map((cust) => {
          if (cust.id !== selectedUtangCustomer) return normalizeCustomer(cust);
          const nextBalance = (Number(cust.balance) || 0) + totalAmount;
          return normalizeCustomer({
            ...cust,
            balance: nextBalance,
            ledger: [
              {
                id: createUniqueId('L'),
                type: 'sale',
                amount: totalAmount,
                date: new Date().toISOString(),
                description: `Utang for ${customerName}`,
                orderId: newOrder.id,
                items: newOrder.items.map((item) => ({
                  id: item.id,
                  name: item.name,
                  quantity: item.quantity,
                  price: Number(item.price) || 0
                }))
              },
              ...(Array.isArray(cust.ledger) ? cust.ledger : [])
            ]
          });
        })
      );
    }

    // 3. If Pautang payment, record it in the customer's Pautang sub-ledger.
    //    Deliberately does NOT touch `balance` / `ledger` - Pautang is tracked
    //    and settled independently from Utang.
    if (paymentMethod === 'Pautang' && selectedUtangCustomer) {
      const downPayment = Math.min(Math.max(0, parseFloat(pautangDownPayment) || 0), totalAmount);
      const financed = roundMoney(totalAmount - downPayment);
      const requestedCount = Math.floor(Number(pautangInstalmentCount) || 1);
      const instalmentCount = financed > 0 ? Math.min(Math.max(1, requestedCount), 100) : 0;
      const schedule = buildInstalmentSchedule(financed, instalmentCount);

      const payoutRecord = {
        id: createUniqueId('PAUT'),
        orderId: newOrder.id,
        date: new Date().toISOString(),
        description: `Pautang para sa ${customerName}`,
        items: newOrder.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: Number(item.price) || 0
        })),
        totalPrice: roundMoney(totalAmount),
        downPayment: roundMoney(downPayment),
        paid: roundMoney(downPayment),
        balance: financed,
        status: financed > 0 ? 'Active' : 'Redeemed',
        instalments: schedule.map((amount, index) => ({
          id: createUniqueId('PAUTI'),
          index: index + 1,
          amount,
          amountPaid: 0,
          paid: false,
          paidAt: null
        })),
        payments: downPayment > 0
          ? [{
            id: createUniqueId('PAUTP'),
            amount: roundMoney(downPayment),
            date: new Date().toISOString(),
            method: 'Down Payment',
            orderId: newOrder.id
          }]
          : []
      };

      setCustomers((prev) =>
        prev.map((cust) => {
          if (cust.id !== selectedUtangCustomer) return normalizeCustomer(cust);
          return normalizeCustomer({
            ...cust,
            pautang: [payoutRecord, ...(Array.isArray(cust.pautang) ? cust.pautang : [])]
          });
        })
      );
    }

    // 4. Save to Sales History
    setSalesHistory((prev) => [newOrder, ...prev]);

    setLastCompletedOrder(newOrder);
    setPaymentStep('receipt');
    showToast(paymentMethod === 'Pautang' ? 'Pautang recorded!' : 'Transaction Successful!');
  };

  const handleStartNewSale = () => {
    clearCart();
    setPaymentStep('method');
    setIsPaymentModalOpen(false);
    setIsCartOpen(false);
  };

  // Void / Refund Order
  const handleVoidOrder = (orderId) => {
    const order = salesHistory.find((s) => s.id === orderId);
    if (!order || order.status === 'Voided') return;

    if (!confirm(`Are you sure you want to void ${order.id}? This will restock inventory.`)) return;

    // Restock Inventory
    setProducts((prev) =>
      prev.map((prod) => {
        const itemInOrder = order.items.find((i) => i.id === prod.id);
        if (!itemInOrder) return prod;

        let stockToAdd = itemInOrder.quantity;
        if (itemInOrder.isTingi && prod.tingiRatio) {
          stockToAdd = itemInOrder.quantity / prod.tingiRatio;
        }

        return normalizeProduct({
          ...prod,
          stock: Math.round((prod.stock + stockToAdd) * 100) / 100,
          stockLedger: [
            {
              id: createUniqueId('STK'),
              type: 'void',
              quantity: stockToAdd,
              date: new Date().toISOString(),
              reference: order.id,
              description: `Restocked from voided sale ${order.id}`
            },
            ...(Array.isArray(prod.stockLedger) ? prod.stockLedger : [])
          ]
        });
      })
    );

    // Deduct Utang if it was an Utang order
    if (order.paymentMethod === 'Utang' && order.customerId) {
      setCustomers((prev) =>
        prev.map((cust) => {
          if (cust.id !== order.customerId) return normalizeCustomer(cust);
          const nextBalance = (Number(cust.balance) || 0) - order.totalAmount;
          return normalizeCustomer({
            ...cust,
            balance: nextBalance,
            ledger: [
              {
                id: createUniqueId('L'),
                type: 'voided_sale',
                amount: order.totalAmount,
                date: new Date().toISOString(),
                description: `Voided utang sale ${order.id}`,
                orderId: order.id
              },
              ...(Array.isArray(cust.ledger) ? cust.ledger : [])
            ]
          });
        })
      );
    }

    // Reverse a Pautang payout if it was a Pautang order
    if (order.paymentMethod === 'Pautang' && order.customerId) {
      setCustomers((prev) =>
        prev.map((cust) => {
          if (cust.id !== order.customerId) return normalizeCustomer(cust);

          const existing = Array.isArray(cust.pautang) ? cust.pautang : [];
          const target = existing.find((record) => record.orderId === order.id);
          if (!target) return normalizeCustomer(cust);

          const nextRecord = {
            ...target,
            // Voiding cancels the payout; money already paid stays recorded.
            totalPrice: 0,
            paid: 0,
            balance: 0,
            status: 'Voided',
            instalments: (Array.isArray(target.instalments) ? target.instalments : [])
              .map((instalment) => ({ ...instalment, amount: 0 })),
            voidedAt: new Date().toISOString()
          };

          return normalizeCustomer({
            ...cust,
            pautang: existing.map((record) => (record.id === target.id ? nextRecord : record))
          });
        })
      );
    }

    // Mark as Voided
    setSalesHistory((prev) =>
      prev.map((s) => (s.id === orderId ? { ...s, status: 'Voided' } : s))
    );

    showToast(`Order ${orderId} has been Voided & restocked`, 'warning');
  };

  // Pautang Instalment Payments
  const handleOpenPautangPay = (customer, record) => {
    setPautangTargetRecord({ customerId: customer.id, recordId: record.id });
    setPautangPayAmount(String(record.balance));
    setPautangPayMethod('Cash');
    setIsPautangPayOpen(true);
  };

  const handlePautangPaySubmit = () => {
    const amount = roundMoney(pautangPayAmount);

    if (!pautangTargetRecord) {
      showToast('Walang piniling pautang record.', 'error');
      return;
    }

    if (amount <= 0) {
      showToast('Maglagay ng wastong halaga.', 'error');
      return;
    }

    // Validate against current state up front: the state updater below runs
    // asynchronously, so its result cannot be relied on for the toast.
    const targetCustomer = customers.find((cust) => cust.id === pautangTargetRecord.customerId);
    const targetRecord = (Array.isArray(targetCustomer?.pautang) ? targetCustomer.pautang : [])
      .find((record) => record.id === pautangTargetRecord.recordId);

    if (!targetRecord || targetRecord.status !== 'Active') {
      showToast('Hindi mabayaran ang payout na ito.', 'error');
      return;
    }

    // Never accept more than what is still owed on this record.
    const appliedAmount = Math.min(amount, Number(targetRecord.balance) || 0);

    if (appliedAmount <= 0) {
      showToast('Wala nang bayarin sa payout na ito.', 'error');
      return;
    }

    setCustomers((prev) =>
      prev.map((cust) => {
        if (cust.id !== pautangTargetRecord.customerId) return normalizeCustomer(cust);

        const records = Array.isArray(cust.pautang) ? cust.pautang : [];
        const target = records.find((record) => record.id === pautangTargetRecord.recordId);
        if (!target || target.status !== 'Active') return normalizeCustomer(cust);

        // Consume the schedule oldest-first; a partial final payment is allowed
        // so a customer can settle in whatever amount they can afford.
        let remaining = Math.min(appliedAmount, Number(target.balance) || 0);
        const instalments = (Array.isArray(target.instalments) ? target.instalments : []).map((instalment) => {
          if (instalment.paid || remaining <= 0) return instalment;

          const owed = roundMoney((Number(instalment.amount) || 0) - (Number(instalment.amountPaid) || 0));
          const take = Math.min(owed, remaining);
          remaining = roundMoney(remaining - take);

          return {
            ...instalment,
            amountPaid: roundMoney((Number(instalment.amountPaid) || 0) + take),
            paid: take >= owed,
            paidAt: new Date().toISOString(),
            paymentMethod: pautangPayMethod
          };
        });

        const nextRecord = {
          ...target,
          paid: roundMoney((Number(target.paid) || 0) + appliedAmount),
          instalments,
          payments: [
            {
              id: createUniqueId('PAUTP'),
              amount: appliedAmount,
              date: new Date().toISOString(),
              method: pautangPayMethod,
              orderId: target.orderId
            },
            ...(Array.isArray(target.payments) ? target.payments : [])
          ]
        };

        return normalizeCustomer({
          ...cust,
          pautang: records.map((record) => (record.id === target.id ? nextRecord : record))
        });
      })
    );

    showToast(`Pautang instalment na ₱${appliedAmount.toFixed(2)}`);
    setIsPautangPayOpen(false);
    setPautangTargetRecord(null);
    setPautangPayAmount('');
  };

  // Product CRUD Handlers
  const handleSaveProduct = (productData) => {
    const normalizedProduct = normalizeProduct({
      ...productData,
      stockLedger: productData.stockLedger || editingProduct?.stockLedger || [],
      costPrice: Number(productData.costPrice) || 0,
      retailPrice: Number(productData.retailPrice) || 0,
      stock: Number(productData.stock) || 0
    });

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? normalizeProduct({ ...p, ...normalizedProduct }) : p))
      );
      showToast(`Updated product ${normalizedProduct.name}`);
    } else {
      const newProd = normalizeProduct({ ...normalizedProduct, id: createUniqueId('P') });
      setProducts((prev) => [newProd, ...prev]);
      showToast(`New item added: ${normalizedProduct.name}`);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    const prod = products.find((p) => p.id === id);
    if (confirm(`Delete "${prod?.name}" from store inventory?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast(`Deleted ${prod?.name}`, 'warning');
    }
  };

  const handleRestockSubmit = () => {
    const qty = parseFloat(restockQty);
    if (isNaN(qty) || qty <= 0 || !restockProduct) {
      showToast('Enter valid quantity', 'error');
      return;
    }

    const nextCost = parseFloat(restockCostPrice);
    const nextRetail = parseFloat(restockRetailPrice);
    const nextTingiPrice = parseFloat(restockProduct.tingiPrice || 0);
    const nextTingiRatio = Number(restockProduct.tingiRatio) || 1;

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== restockProduct.id) return p;

        const updated = {
          ...p,
          stock: (Number(p.stock) || 0) + qty,
          costPrice: Number.isNaN(nextCost) ? Number(p.costPrice) || 0 : nextCost,
          retailPrice: Number.isNaN(nextRetail) ? Number(p.retailPrice) || 0 : nextRetail,
          tingiPrice: Number.isNaN(nextTingiPrice) ? Number(p.tingiPrice) || 0 : nextTingiPrice,
          tingiRatio: nextTingiRatio > 0 ? nextTingiRatio : Number(p.tingiRatio) || 1,
          stockLedger: [
            {
              id: createUniqueId('STK'),
              type: 'restock',
              quantity: qty,
              date: new Date().toISOString(),
              reference: createUniqueId('RESTOCK'),
              description: 'Manual stock in'
            },
            ...(Array.isArray(p.stockLedger) ? p.stockLedger : [])
          ]
        };

        return normalizeProduct(updated);
      })
    );

    showToast(`Added +${qty} units to ${restockProduct.name}`);
    setIsRestockModalOpen(false);
    setRestockProduct(null);
    setRestockQty('');
    setRestockCostPrice('');
    setRestockRetailPrice('');
  };

  // Utang Customer CRUD & Payment Handlers
  const handleSaveCustomer = (custData) => {
    const newCust = normalizeCustomer({
      ...custData,
      id: createUniqueId('C'),
      balance: parseFloat(custData.balance) || 0,
      ledger: []
    });
    setCustomers((prev) => [newCust, ...prev.map(normalizeCustomer)]);
    setIsCustomerModalOpen(false);
    showToast(`Registered Suki: ${custData.name}`);
  };

  const handlePabayadSubmit = () => {
    const amt = parseFloat(pabayadAmount);
    if (isNaN(amt) || amt <= 0 || !selectedCustomerForPayment) {
      showToast('Enter a valid payment amount', 'error');
      return;
    }

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id !== selectedCustomerForPayment.id) return normalizeCustomer(c);
        const nextBalance = (Number(c.balance) || 0) - amt;
        return normalizeCustomer({
          ...c,
          balance: nextBalance,
          ledger: [
            {
              id: createUniqueId('L'),
              type: 'payment',
              amount: amt,
              date: new Date().toISOString(),
              description: `Payment received from ${c.name}`,
              orderId: createUniqueId('PMT'),
              items: []
            },
            ...(Array.isArray(c.ledger) ? c.ledger : [])
          ]
        });
      })
    );

    showToast(`Received ₱${amt.toFixed(2)} pabayad from ${selectedCustomerForPayment.name}!`);
    setIsPabayadModalOpen(false);
    setSelectedCustomerForPayment(null);
    setPabayadAmount('');
  };

  if (!isDataLoaded) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-amber-50 text-slate-900'}`}>
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          <p className="text-sm font-semibold">Loading your store data...</p>
        </div>
      </div>
    );
  }

  if (!setupComplete) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br ${theme === 'dark' ? 'from-slate-950 via-slate-900 to-slate-800 text-slate-100' : 'from-amber-50 via-orange-50 to-yellow-50 text-slate-900'}`}>
        <div className="w-full max-w-2xl rounded-3xl border border-amber-200 bg-white/90 p-6 shadow-2xl backdrop-blur-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-3xl shadow-lg">🏪</div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600">Store Setup</p>
            <h1 className="mt-2 text-3xl font-black">Set up your sari-sari store</h1>
            <p className="mt-2 text-sm text-slate-500">Tell us your store details so receipts, reports, and your POS profile are ready.</p>
          </div>

          <form
            id="store-setup-form"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              handleSetupSubmit(event);
            }}
            className="space-y-4"
            noValidate
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-semibold text-slate-700">
                Store name
                <input
                  name="storeName"
                  defaultValue={storeProfile.storeName}
                  onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition focus:border-amber-400 focus:bg-white"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Owner name
                <input
                  name="ownerName"
                  defaultValue={storeProfile.ownerName}
                  onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition focus:border-amber-400 focus:bg-white"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Location / Barangay
                <input
                  name="location"
                  defaultValue={storeProfile.location}
                  onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition focus:border-amber-400 focus:bg-white"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Business type
                <input
                  name="businessType"
                  defaultValue={storeProfile.businessType}
                  onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition focus:border-amber-400 focus:bg-white"
                  required
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Store address
              <input
                name="address"
                defaultValue={storeProfile.address}
                onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition focus:border-amber-400 focus:bg-white"
                required
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm font-semibold text-slate-700">
                Phone number
                <input
                  name="phone"
                  defaultValue={storeProfile.phone}
                  onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition focus:border-amber-400 focus:bg-white"
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Currency
                <input
                  name="currency"
                  defaultValue={storeProfile.currency}
                  onKeyDown={(event) => event.key === 'Enter' && event.preventDefault()}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none ring-0 transition focus:border-amber-400 focus:bg-white"
                  required
                />
              </label>
            </div>

            <button
              type="button"
              onClick={() => handleSetupSubmit(document.getElementById('store-setup-form'))}
              className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-base font-black text-white shadow-lg transition hover:opacity-95"
            >
              Save store setup
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-[100dvh] w-full flex flex-col overflow-hidden transition-colors duration-300 font-sans ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-amber-50/50 text-slate-900'}`}>
      {isOffline && (
        <div className="w-full border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-xs font-bold text-amber-900 shadow-sm">
          Offline mode active • local POS data stays saved on this device
        </div>
      )}

      <div className={`relative w-full flex-1 flex flex-col overflow-hidden ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
      }`}>

        {/* Sari-Sari Store App Top Bar */}
        <div className={`px-4 py-3 border-b flex items-center justify-between z-30 transition-colors ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-amber-500 text-white border-amber-600 shadow-md'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white text-amber-600 font-black text-xl flex items-center justify-center shadow-md transform -rotate-3">
              🏪
            </div>
            <div>
              <h1 className="text-base font-black leading-tight tracking-tight">{storeProfile.storeName}</h1>
              <p className="text-[10px] opacity-90 flex items-center space-x-1 font-medium">
                <span>{storeProfile.location}</span>
                <span>•</span>
                <span className="text-emerald-200 font-bold">{storeProfile.currency} Ready</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              aria-label="Open settings"
              onClick={() => setActiveTab('settings')}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Viewport Container */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain relative flex flex-col bg-slate-100/50 dark:bg-slate-950/40 pb-20">
          {activeTab === 'register' && (
            <RegisterView
              theme={theme}
              products={products}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              addToCart={addToCart}
              cart={cart}
              totalAmount={totalAmount}
              setIsCartOpen={setIsCartOpen}
              onBarcodeScan={handleBarcodeScan}
              scanIntervalMs={scanIntervalMs}
            />
          )}

          {activeTab === 'products' && (
            <ProductsCRUDView
              theme={theme}
              products={products}
              categories={categories}
              onAddProduct={() => {
                setEditingProduct(null);
                setIsProductModalOpen(true);
              }}
              onEditProduct={(p) => {
                setEditingProduct(p);
                setIsProductModalOpen(true);
              }}
              onDeleteProduct={handleDeleteProduct}
              onRestock={(p) => {
                setRestockProduct(p);
                setIsRestockModalOpen(true);
              }}
            />
          )}

          {activeTab === 'utang' && (
            <UtangLedgerView
              theme={theme}
              customers={customers}
              onAddCustomer={() => setIsCustomerModalOpen(true)}
              onPautangPay={handleOpenPautangPay}
              onPabayad={(c) => {
                setSelectedCustomerForPayment(c);
                setIsPabayadModalOpen(true);
              }}
            />
          )}

          {activeTab === 'sales' && (
            <SalesHistoryView
              theme={theme}
              sales={salesHistory}
              onVoidOrder={handleVoidOrder}
              onViewReceipt={(order) => {
                setLastCompletedOrder(order);
                setPaymentStep('receipt');
                setIsPaymentModalOpen(true);
              }}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboardView
              theme={theme}
              sales={salesHistory}
              products={products}
              customers={customers}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              theme={theme}
              setTheme={setTheme}
              storeProfile={storeProfile}
              scanIntervalMs={scanIntervalMs}
              setScanIntervalMs={setScanIntervalMs}
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              onResetDatabase={handleResetDatabase}
            />
          )}
        </div>

        {/* Floating Quick Cart Toggle Button */}
        {cart.length > 0 && !isCartOpen && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 animate-bounce-short">
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setIsCartOpen(true)}
              className="relative h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-[0_12px_30px_rgba(245,158,11,0.45)] flex items-center justify-center border-4 border-white/80 transition hover:scale-[1.02] active:scale-[0.96]"
            >
              <ShoppingCart className="w-7 h-7 drop-shadow-sm" />
              <span className="absolute -top-1 -right-1 min-w-6 h-6 px-1 rounded-full bg-slate-900 text-[10px] font-black text-white flex items-center justify-center ring-2 ring-white shadow-md">
                {getItemCount()}
              </span>
            </button>
          </div>
        )}

        {/* Cart Slide-up Bottom Drawer */}
        {isCartOpen && (
          <CartDrawer
            theme={theme}
            cart={cart}
            updateCartQty={updateCartQty}
            removeFromCart={removeFromCart}
            discountPercent={discountPercent}
            setDiscountPercent={setDiscountPercent}
            subtotal={subtotal}
            discountAmount={discountAmount}
            totalAmount={totalAmount}
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => {
              setIsCartOpen(false);
              setIsPaymentModalOpen(true);
              setPaymentStep('method');
            }}
          />
        )}

        {/* Payment Modal & Receipt View */}
        {isPaymentModalOpen && (
          <PaymentCheckoutModal
            theme={theme}
            storeProfile={storeProfile}
            paymentStep={paymentStep}
            setPaymentStep={setPaymentStep}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            tenderedCash={tenderedCash}
            setTenderedCash={setTenderedCash}
            customers={customers}
            selectedUtangCustomer={selectedUtangCustomer}
            setSelectedUtangCustomer={setSelectedUtangCustomer}
            pautangDownPayment={pautangDownPayment}
            setPautangDownPayment={setPautangDownPayment}
            pautangInstalmentCount={pautangInstalmentCount}
            setPautangInstalmentCount={setPautangInstalmentCount}
            totalAmount={lastCompletedOrder ? lastCompletedOrder.totalAmount : totalAmount}
            order={lastCompletedOrder}
            handleFinalizeTransaction={handleFinalizeTransaction}
            handleStartNewSale={handleStartNewSale}
            onClose={() => setIsPaymentModalOpen(false)}
            showToast={showToast}
          />
        )}

        {pendingScannedProduct && (
          <ScanQuantityModal
            theme={theme}
            product={pendingScannedProduct}
            quantity={scanQuantity}
            setQuantity={setScanQuantity}
            onConfirm={handleScanQuantityConfirm}
            onClose={() => setPendingScannedProduct(null)}
          />
        )}

        {/* Product Add/Edit Modal */}
        {isProductModalOpen && (
          <ProductFormModal
            theme={theme}
            categories={categories}
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => setIsProductModalOpen(false)}
          />
        )}

        {/* Quick Stock In / Restock Modal */}
        {isRestockModalOpen && restockProduct && (
          <RestockModal
            theme={theme}
            product={restockProduct}
            restockQty={restockQty}
            setRestockQty={setRestockQty}
            restockCostPrice={restockCostPrice}
            setRestockCostPrice={setRestockCostPrice}
            restockRetailPrice={restockRetailPrice}
            setRestockRetailPrice={setRestockRetailPrice}
            onConfirm={handleRestockSubmit}
            onClose={() => setIsRestockModalOpen(false)}
          />
        )}

        {/* Add Customer Suki Modal */}
        {isCustomerModalOpen && (
          <CustomerFormModal
            theme={theme}
            onSave={handleSaveCustomer}
            onClose={() => setIsCustomerModalOpen(false)}
          />
        )}

        {/* Customer Utang Pabayad Payment Modal */}
        {isPabayadModalOpen && selectedCustomerForPayment && (
          <PabayadModal
            theme={theme}
            customer={selectedCustomerForPayment}
            pabayadAmount={pabayadAmount}
            setPabayadAmount={setPabayadAmount}
            onConfirm={handlePabayadSubmit}
            onClose={() => setIsPabayadModalOpen(false)}
          />
        )}

        {/* Pautang Instalment Payment Modal */}
        {isPautangPayOpen && pautangTargetRecord && (() => {
          const customer = customers.find((cust) => cust.id === pautangTargetRecord.customerId);
          const record = (Array.isArray(customer?.pautang) ? customer.pautang : [])
            .find((entry) => entry.id === pautangTargetRecord.recordId);

          if (!customer || !record) return null;

          return (
            <PautangInstalmentModal
              theme={theme}
              customer={customer}
              record={record}
              amount={pautangPayAmount}
              setAmount={setPautangPayAmount}
              method={pautangPayMethod}
              setMethod={setPautangPayMethod}
              onConfirm={handlePautangPaySubmit}
              onClose={() => {
                setIsPautangPayOpen(false);
                setPautangTargetRecord(null);
              }}
            />
          );
        })()}

        {/* Toast Notification Banner */}
        {toast && (
          <div className={`absolute top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full shadow-2xl z-50 text-xs font-bold flex items-center space-x-2 border animate-fade-in backdrop-blur-md ${
            toast.type === 'error'
              ? 'bg-red-900/90 text-red-100 border-red-700'
              : toast.type === 'warning'
              ? 'bg-amber-900/90 text-amber-100 border-amber-700'
              : 'bg-slate-900/90 text-white border-slate-700'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{toast.msg}</span>
          </div>
        )}

        {/* Bottom Android Style Tab Bar Navigation */}
        <div className={`fixed bottom-0 left-0 right-0 px-2 py-2 border-t flex justify-around items-center z-40 transition-colors ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <NavTabButton
            icon={ShoppingBag}
            label="Register"
            isActive={activeTab === 'register'}
            onClick={() => setActiveTab('register')}
            badge={cart.length > 0 ? cart.reduce((a, b) => a + b.quantity, 0) : null}
            theme={theme}
          />
          <NavTabButton
            icon={Package}
            label="Products"
            isActive={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
            theme={theme}
          />
          <NavTabButton
            icon={BookOpen}
            label="Utang"
            isActive={activeTab === 'utang'}
            onClick={() => setActiveTab('utang')}
            badge={customers.filter((c) => c.balance > 0).length || null}
            theme={theme}
          />
          <NavTabButton
            icon={Clock}
            label="Sales"
            isActive={activeTab === 'sales'}
            onClick={() => setActiveTab('sales')}
            theme={theme}
          />
          <NavTabButton
            icon={BarChart2}
            label="Report"
            isActive={activeTab === 'analytics'}
            onClick={() => setActiveTab('analytics')}
            theme={theme}
          />
        </div>

      </div>
    </div>
  );
}

function NavTabButton({ icon: Icon, label, isActive, onClick, badge, theme }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all duration-200 ${
        isActive
          ? 'text-amber-600 dark:text-amber-400 font-bold'
          : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
      }`}
    >
      <div className={`p-1.5 rounded-xl transition-all ${
        isActive ? 'bg-amber-100 dark:bg-amber-950/60 scale-105' : ''
      }`}>
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-[10px] mt-0.5 tracking-tight font-medium">{label}</span>
      {badge && (
        <span className="absolute top-0.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
          {badge}
        </span>
      )}
    </button>
  );
}

function RegisterView({ theme, products, categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, addToCart, cart, totalAmount, setIsCartOpen, onBarcodeScan, scanIntervalMs }) {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(true);
  const videoRef = useRef(null);
  const lastDetectedAtRef = useRef(0);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.barcode && p.barcode.includes(searchQuery));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  useEffect(() => {
    if (!isScannerOpen) return undefined;

    if (!('BarcodeDetector' in window) || !navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera barcode scanner is not supported on this device.');
      setIsScannerOpen(false);
      return undefined;
    }

    let stream;
    let frameHandle;
    let cancelled = false;

    const startScan = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const detector = new window.BarcodeDetector({
          formats: ['code_128', 'code_39', 'ean_13', 'ean_8', 'upc_a', 'upc_e', 'qr_code']
        });

        const detectLoop = async () => {
          if (cancelled) return;

          try {
            if (videoRef.current && videoRef.current.readyState >= 2) {
              const detected = await detector.detect(videoRef.current);
              if (detected && detected.length > 0) {
                const code = detected[0]?.rawValue || '';
                const now = Date.now();
                if (code && now - lastDetectedAtRef.current >= scanIntervalMs) {
                  lastDetectedAtRef.current = now;
                  onBarcodeScan(code);
                  setCameraError('');
                }
              }
            }
          } catch (error) {
            console.warn('Barcode scan failed:', error);
          }

          frameHandle = requestAnimationFrame(detectLoop);
        };

        detectLoop();
      } catch (error) {
        console.error('Camera failed:', error);
        setCameraError('Camera access failed. You can type the barcode manually instead.');
        setIsScannerOpen(false);
      }
    };

    startScan();

    return () => {
      cancelled = true;
      if (frameHandle) cancelAnimationFrame(frameHandle);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [isScannerOpen, onBarcodeScan, scanIntervalMs]);

  const handleBarcodeSubmit = (event) => {
    event.preventDefault();
    if (!barcodeInput.trim()) return;
    onBarcodeScan(barcodeInput);
    setBarcodeInput('');
  };

  return (
    <div className="flex h-full flex-col pb-20">
      <div className={`sticky top-0 z-20 -mx-3 px-3 pb-2 pt-1 backdrop-blur-md ${theme === 'dark' ? 'bg-slate-950/75' : 'bg-slate-50/90'}`}>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-2.5 dark:border-amber-900 dark:bg-amber-950/40">
          <div className="flex items-center gap-2">
            <form onSubmit={handleBarcodeSubmit} className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Scan or type barcode"
                className={`flex-1 rounded-xl border px-3 py-2 text-[11px] font-bold outline-none ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400'
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="submit"
                className="rounded-xl bg-amber-500 px-3 py-2 text-[10px] font-black text-white shadow-sm"
              >
                Add
              </button>
            </form>
            <button
              type="button"
              onClick={() => setIsScannerOpen((prev) => !prev)}
              className={`rounded-xl border px-2.5 py-2 text-[10px] font-black ${
                isScannerOpen
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'border-amber-300 bg-white text-amber-700 dark:border-amber-700 dark:bg-slate-800 dark:text-amber-300'
              }`}
            >
              <div className="flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5" />
                <span>{isScannerOpen ? 'Live' : 'Scan'}</span>
              </div>
            </button>
          </div>

          {cameraError && <p className="mt-2 text-[10px] text-red-500">{cameraError}</p>}
          {isScannerOpen && (
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-300 bg-black">
              <video ref={videoRef} className="h-32 w-full object-cover" muted playsInline autoPlay />
            </div>
          )}
        </div>

        <div className="pt-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Piattos, Lucky Me, Coca-Cola, Barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-9 py-2.5 rounded-2xl text-xs font-semibold border outline-none transition ${
                theme === 'dark'
                  ? 'bg-slate-800/90 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 shadow-xs'
              }`}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="pt-3">
          <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
            {categories.map((cat) => {
              const isSel = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSel
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-[1.02]'
                      : theme === 'dark'
                      ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900 shadow-2xs'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pt-3">
        <div className="grid grid-cols-2 gap-2.5 pt-1">
        {filteredProducts.map((item) => {
          const isOut = item.stock <= 0;
          const isLow = item.stock > 0 && item.stock <= item.reorderLevel;

          const cartPackItem = cart.find((ci) => ci.cartItemId === item.id);
          const cartTingiItem = cart.find((ci) => ci.cartItemId === `${item.id}-tingi`);
          const cartPautangItem = cart.find((ci) => ci.cartItemId === `${item.id}-pautang`);

          return (
            <div
              key={item.id}
              className={`relative p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                isOut ? 'opacity-50 grayscale border-dashed' : 'hover:border-amber-400'
              } ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-white border-slate-200/90 shadow-2xs'
              }`}
            >
              {/* Quantities in cart indicator */}
              {(cartPackItem || cartTingiItem || cartPautangItem) && (
                <div className="absolute -top-2 -right-1 flex space-x-1">
                  {cartPackItem && (
                    <span className="bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md">
                      {cartPackItem.quantity}x
                    </span>
                  )}
                  {cartTingiItem && (
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md">
                      {cartTingiItem.quantity}x (T)
                    </span>
                  )}
                  {cartPautangItem && (
                    <span className="bg-indigo-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md">
                      {cartPautangItem.quantity}x (P)
                    </span>
                  )}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-8 h-8 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center text-xl">
                    📦
                  </div>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                    isOut
                      ? 'bg-red-500/10 text-red-500'
                      : isLow
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 animate-pulse'
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {isOut ? 'Ubos / Sold' : `${item.stock} ${item.unit}`}
                  </span>
                </div>

                <h3 className="font-bold text-xs leading-snug line-clamp-2">{item.name}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">{item.category}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                <button
                  disabled={isOut}
                  onClick={() => addToCart(item, '')}
                  className={`w-full py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-between transition ${
                    isOut
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-500/10 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 hover:bg-amber-500 hover:text-white'
                  }`}
                >
                  <span>₱{item.retailPrice.toFixed(2)}</span>
                  <Plus className="w-3.5 h-3.5" />
                </button>

                {/* Tingi / Sachet Option if item configured */}
                {item.hasTingi && (
                  <button
                    disabled={isOut}
                    onClick={() => addToCart(item, 'tingi')}
                    className="w-full py-1 px-2 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition flex items-center justify-between"
                  >
                    <span>Tingi: ₱{item.tingiPrice.toFixed(2)}</span>
                    <Sparkles className="w-3 h-3" />
                  </button>
                )}

                {/* Pautang Option - priced differently from the regular shelf price */}
                {item.hasPautang && (
                  <button
                    disabled={isOut}
                    onClick={() => addToCart(item, 'pautang')}
                    className="w-full py-1 px-2 rounded-lg text-[10px] font-bold bg-indigo-500/10 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 hover:bg-indigo-600 hover:text-white transition flex items-center justify-between"
                  >
                    <span>Pautang: ₱{item.pautangPrice.toFixed(2)}</span>
                    <Landmark className="w-3 h-3" />
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Package className="w-10 h-10 mx-auto stroke-1" />
            <p className="text-xs font-medium">Walang nahanap na paninda.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Shared modal shell used by every dialog in the app.
 *
 * Fixes the core layout bug: panels are capped to the real viewport height
 * (`dvh`, so mobile browser chrome / on-screen keyboards behave), the content
 * area scrolls, and the header/footer stay pinned. Previously panels were
 * unconstrained and centered, so tall forms were clipped by the app shell's
 * `overflow-hidden` and the Save button could not be reached.
 */
function ModalShell({ theme, onClose, maxWidth = 'max-w-sm', children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-black/70 p-3 animate-fade-in sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`flex max-h-[92dvh] w-full ${maxWidth} flex-col overflow-hidden rounded-3xl shadow-2xl ${
          theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function CartDrawer({ theme, cart, updateCartQty, removeFromCart, discountPercent, setDiscountPercent, subtotal, discountAmount, totalAmount, onClose, onCheckout }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
      <div className={`flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] p-4 pb-4 shadow-2xl transition-colors ${
        theme === 'dark' ? 'bg-slate-900 text-white border-t border-slate-800' : 'bg-white text-slate-900'
      }`}>
        
        {/* Drawer Header */}
        <div className="shrink-0 flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <h2 className="font-extrabold text-sm">Resibo ng Binibili (Cart)</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List Scrollable */}
        <div className="flex-1 overflow-y-auto my-3 space-y-2 pr-1">
          {cart.map((item) => (
            <div key={item.cartItemId} className={`p-2.5 rounded-2xl border flex items-center justify-between ${
              theme === 'dark' ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-xs leading-tight">{item.name}</h4>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  ₱{item.itemPrice.toFixed(2)} x {item.quantity} = <span className="font-bold text-amber-600 dark:text-amber-400">₱{(item.itemPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>

              {/* Stepper Buttons */}
              <div className="flex items-center space-x-1.5">
                <div className="flex items-center border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  <button onClick={() => updateCartQty(item.cartItemId, -1)} className="p-1 text-slate-500">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold px-2">{item.quantity}</span>
                  <button onClick={() => updateCartQty(item.cartItemId, 1)} className="p-1 text-slate-500">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button onClick={() => removeFromCart(item.cartItemId)} className="p-1 text-slate-400 hover:text-red-500">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Calculation Summary */}
        <div className={`p-3 rounded-2xl space-y-1 text-xs ${
          theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-amber-50 text-slate-700'
        }`}>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold">₱{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="font-medium">Discount (Senior/PWD)</span>
            <div className="flex space-x-1">
              {[0, 10, 20].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setDiscountPercent(pct)}
                  className={`px-2 py-0.5 text-[10px] rounded-lg font-bold border ${
                    discountPercent === pct
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-black text-slate-900 dark:text-white">
            <span>Total Bayarin</span>
            <span className="text-base text-amber-600 dark:text-amber-400">₱{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className="mt-3 mb-2 w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center space-x-2"
        >
          <span>Pumunta sa Pagbabayad</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}

function PaymentCheckoutModal({ theme, storeProfile, paymentStep, setPaymentStep, paymentMethod, setPaymentMethod, tenderedCash, setTenderedCash, customers, selectedUtangCustomer, setSelectedUtangCustomer, pautangDownPayment, setPautangDownPayment, pautangInstalmentCount, setPautangInstalmentCount, totalAmount, order, handleFinalizeTransaction, handleStartNewSale, onClose, showToast }) {
  const quickCashOptions = [totalAmount, 20, 50, 100, 200, 500, 1000];
  const calculatedChange = Math.max(0, (parseFloat(tenderedCash) || 0) - totalAmount);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
      <div className={`flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] p-4 pb-4 shadow-2xl ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>

        <div className="shrink-0 flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-extrabold text-sm flex items-center space-x-2">
            {paymentStep === 'receipt' ? (
              <>
                <Receipt className="w-5 h-5 text-emerald-500" />
                <span>Resibo ng Transaksyon</span>
              </>
            ) : (
              <>
                <DollarSign className="w-5 h-5 text-amber-500" />
                <span>Paraan ng Pagbabayad</span>
              </>
            )}
          </h2>
          <button onClick={paymentStep === 'receipt' ? handleStartNewSale : onClose} className="p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentStep === 'method' && (
          <div className="flex-1 flex flex-col justify-between pt-3 overflow-y-auto space-y-3">
            <div>
              {/* Total Banner */}
              <div className="text-center py-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                <span className="text-xs text-amber-600 dark:text-amber-400 font-bold">Kabuuan (Total Amount)</span>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
                  ₱{totalAmount.toFixed(2)}
                </div>
              </div>

              {/* Mode Selector */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  { id: 'Cash', label: 'Cash (Barya)', icon: DollarSign },
                  { id: 'GCash', label: 'GCash QR', icon: Smartphone },
                  { id: 'Utang', label: 'Utang / Credit', icon: BookOpen },
                  { id: 'Pautang', label: 'Pautang', icon: Landmark }
                ].map((m) => {
                  const Icon = m.icon;
                  const isSel = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-2.5 rounded-2xl border flex flex-col items-center space-y-1 transition ${
                        isSel
                          ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                          : theme === 'dark'
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[11px] font-bold">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Cash Input */}
              {paymentMethod === 'Cash' && (
                <div className="mt-3 space-y-2">
                  <label className="text-xs font-bold text-slate-500">Inabot na Pera (Tendered Cash)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₱</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={tenderedCash}
                      onChange={(e) => setTenderedCash(e.target.value)}
                      className={`w-full pl-8 pr-3 py-2.5 rounded-2xl font-black text-lg border outline-none ${
                        theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {quickCashOptions.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setTenderedCash(opt.toFixed(2))}
                        className="px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-amber-500 hover:text-white transition"
                      >
                        ₱{opt.toFixed(0)}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Sukli (Change):</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">₱{calculatedChange.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* GCash Mock */}
              {paymentMethod === 'GCash' && (
                <div className="mt-3 p-4 bg-blue-600 text-white rounded-2xl text-center space-y-2 shadow-lg">
                  <div className="flex items-center justify-center space-x-1 font-black text-sm">
                    <Smartphone className="w-4 h-4" />
                    <span>GCash Instapay QR</span>
                  </div>
                  <div className="w-32 h-32 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                    <QrCode className="w-28 h-28 text-blue-900" />
                  </div>
                  <p className="text-[10px] text-blue-100 font-mono">Scan via GCash App to {storeProfile.ownerName} ({storeProfile.phone || '0917-XXX-1420'})</p>
                </div>
              )}

              {/* Utang Ledger Select */}
              {paymentMethod === 'Utang' && (
                <div className="mt-3 space-y-2">
                  <label className="text-xs font-bold text-slate-500">Pumili ng Suki / Kapitbahay</label>
                  <select
                    value={selectedUtangCustomer}
                    onChange={(e) => setSelectedUtangCustomer(e.target.value)}
                    className={`w-full p-2.5 rounded-2xl font-bold text-xs border outline-none ${
                      theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <option value="">-- Pumili sa Listahan --</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} (Kasalukuyang Utang: ₱{c.balance.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Pautang Ledger Select + Instalment Terms */}
              {paymentMethod === 'Pautang' && (
                <div className="mt-3 space-y-2">
                  <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-2.5 text-[10px] font-bold text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300">
                    Pautang ay hiwalay sa Utang. May sariling balanse at sariling installment.
                  </div>

                  <label className="text-xs font-bold text-slate-500">Pumili ng Suki / Kapitbahay</label>
                  <select
                    value={selectedUtangCustomer}
                    onChange={(e) => setSelectedUtangCustomer(e.target.value)}
                    className={`w-full p-2.5 rounded-2xl font-bold text-xs border outline-none ${
                      theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                    }`}
                  >
                    <option value="">-- Pumili sa Listahan --</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} (Pautang: ₱{(Number(c.pautangBalance) || 0).toFixed(2)})
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="text-xs font-bold text-slate-500">Down Payment (₱)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max={totalAmount}
                        placeholder="0.00"
                        value={pautangDownPayment}
                        onChange={(e) => setPautangDownPayment(e.target.value)}
                        className={`mt-1 w-full p-2.5 rounded-2xl font-bold text-sm border outline-none ${
                          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500">Bilhan ng Tingan</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        step="1"
                        value={pautangInstalmentCount}
                        onChange={(e) => setPautangInstalmentCount(e.target.value)}
                        className={`mt-1 w-full p-2.5 rounded-2xl font-bold text-sm border outline-none ${
                          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  {(() => {
                    const down = Math.min(Math.max(0, parseFloat(pautangDownPayment) || 0), totalAmount);
                    const financed = Math.round((totalAmount - down) * 100) / 100;
                    const count = Math.min(Math.max(1, Math.floor(Number(pautangInstalmentCount) || 1)), 100);
                    const per = financed > 0 ? Math.round((financed / count) * 100) / 100 : 0;

                    return (
                      <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-2.5 text-[10px] space-y-0.5 text-indigo-700 dark:text-indigo-300">
                        <div className="flex justify-between"><span>Kabuuang Presyo</span><span className="font-black">₱{totalAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Down Payment</span><span className="font-black">₱{down.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Matitirang Bayarin</span><span className="font-black">₱{financed.toFixed(2)}</span></div>
                        <div className="flex justify-between border-t border-indigo-500/20 pt-1">
                          <span>{count}x Tingan</span>
                          <span className="font-black">₱{per.toFixed(2)} kada</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

            </div>

            <button
              onClick={handleFinalizeTransaction}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Kumpletuhin ang Transaksyon</span>
              <Check className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* Printable Thermal Receipt Step */}
        {paymentStep === 'receipt' && order && (
          <div className="flex-1 flex flex-col justify-between overflow-y-auto pt-2 space-y-3">
            <div className="bg-white text-slate-900 p-4 rounded-2xl shadow-inner border border-slate-200 text-xs font-mono space-y-2">
              <div className="text-center pb-2 border-b border-dashed border-slate-300">
                <h3 className="font-black text-sm">{storeProfile.storeName}</h3>
                <p className="text-[10px] text-slate-500">{storeProfile.location || storeProfile.address || 'Barangay'} • {storeProfile.businessType || 'Sari-Sari POS'}</p>
                <p className="text-[10px] text-slate-400">{order.id} • {new Date(order.timestamp).toLocaleTimeString()}</p>
              </div>

              <div className="space-y-1">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-bold">₱{(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-dashed border-slate-300 space-y-0.5 font-bold">
                <div className="flex justify-between">
                  <span>BAYAD ({order.paymentMethod}):</span>
                  <span>₱{order.totalAmount.toFixed(2)}</span>
                </div>
                {order.paymentMethod === 'Cash' && (
                  <div className="flex justify-between text-slate-500 font-normal">
                    <span>Sukli:</span>
                    <span>₱{order.change.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="text-center pt-2 text-[9px] text-slate-400">
                Salamat sa pagtangkilik, Suki!
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => showToast('Printing mini thermal receipt...')}
                className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5"
              >
                <Printer className="w-4 h-4 text-amber-500" />
                <span>I-print ang Resibo</span>
              </button>

              <button
                onClick={handleStartNewSale}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-2xl font-bold text-xs shadow-md"
              >
                Bagong Benta (New Sale)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function ScanQuantityModal({ theme, product, quantity, setQuantity, onConfirm, onClose }) {
  const maxQuantity = Math.max(1, Math.floor(Number(product.stock) || 0));

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className={`w-full max-w-xs rounded-3xl p-4 space-y-4 shadow-2xl ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">Barcode captured</p>
            <h3 className="mt-1 font-black text-sm">Ilang {product.unit}?</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400" aria-label="Close quantity dialog">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center">
          <p className="font-bold text-sm">{product.name}</p>
          <p className="mt-1 text-[10px] text-slate-400">{product.category}</p>
          <p className="mt-1 text-xs text-slate-500">Available: {product.stock} {product.unit}</p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 text-slate-600 transition hover:border-amber-400 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="min-w-12 text-center text-3xl font-black text-amber-600 dark:text-amber-400">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= maxQuantity}
            onClick={() => setQuantity((value) => Math.min(maxQuantity, value + 1))}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 text-slate-600 transition hover:border-amber-400 hover:text-amber-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <button onClick={onConfirm} className="w-full rounded-2xl bg-amber-500 py-3 text-sm font-black text-white shadow-md hover:bg-amber-600">
          Add {quantity} to cart
        </button>
      </div>
    </div>
  );
}

function InventoryItemModal({ theme, product, onClose }) {
  const stockLedger = Array.isArray(product.stockLedger) ? product.stockLedger : [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-xs animate-fade-in">
      <div className={`flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] p-4 pb-5 shadow-2xl ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        <div className="shrink-0 flex items-center justify-between border-b border-slate-200 pb-3 dark:border-slate-800">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">Inventory ledger</p>
            <h3 className="truncate font-black text-lg">{product.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400" aria-label="Close inventory ledger">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Current stock</p>
            <p className="mt-1 text-2xl font-black text-amber-600">{product.stock} {product.unit}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Category</p>
            <p className="mt-1 text-sm font-black">{product.category || 'Uncategorized'}</p>
          </div>
        </div>

        <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1">
          {stockLedger.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 p-4 text-center text-xs text-slate-500 dark:border-slate-700">
              No inventory movements recorded yet.
            </div>
          ) : (
            stockLedger.map((entry) => {
              const isIncrease = Number(entry.quantity) > 0;
              return (
                <div key={entry.id} className={`rounded-2xl border p-3 ${theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${isIncrease ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {entry.type || (isIncrease ? 'Stock in' : 'Sale')}
                      </span>
                      <p className="mt-1 text-[10px] text-slate-400">{new Date(entry.date).toLocaleString()}</p>
                    </div>
                    <span className={`text-sm font-black ${isIncrease ? 'text-emerald-500' : 'text-red-500'}`}>
                      {isIncrease ? '+' : ''}{Number(entry.quantity || 0)} {product.unit}
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] font-bold text-slate-500 dark:text-slate-300">{entry.description || 'Inventory movement'}</p>
                  {entry.reference && <p className="text-[9px] text-slate-400">Ref: {entry.reference}</p>}
                </div>
              );
            })
          )}
        </div>

        <button onClick={onClose} className="mt-3 w-full shrink-0 rounded-2xl border border-slate-300 py-3 text-sm font-black dark:border-slate-700">
          Close
        </button>
      </div>
    </div>
  );
}

function ProductsCRUDView({ theme, products, categories, onAddProduct, onEditProduct, onDeleteProduct, onRestock }) {
  const [viewingProduct, setViewingProduct] = useState(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col p-3 pb-6">
      <div className="shrink-0 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-black text-sm">Paninda Inventory (CRUD)</h2>
          <p className="text-[10px] text-slate-400">{products.length} Kabuuang Items</p>
        </div>
        <button
          onClick={onAddProduct}
          className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="whitespace-nowrap">Dagdag Paninda</span>
        </button>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1">
        {products.map((p) => {
          const isLow = p.stock <= p.reorderLevel;
          return (
            <div
              key={p.id}
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xl dark:border-slate-700 dark:bg-slate-800">
                  📦
                </span>
                <div>
                  <h4 className="font-bold text-xs">{p.name}</h4>
                  <p className="text-[10px] text-slate-400">{p.category}</p>
                  <div className="text-[10px] text-slate-400 space-x-2">
                    <span>Puhunan: ₱{p.costPrice.toFixed(2)}</span>
                    <span>•</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">Benta: ₱{p.retailPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <span className={`text-xs font-black block ${isLow ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
                    {p.stock} {p.unit}
                  </span>
                  <button
                    onClick={() => onRestock(p)}
                    className="text-[9px] font-bold text-amber-600 dark:text-amber-400 underline"
                  >
                    + Stock In
                  </button>
                </div>

                <div className="flex items-center space-x-1 pl-1 border-l border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setViewingProduct(p)}
                    className="p-1 text-slate-400 hover:text-amber-500"
                    aria-label={`View inventory for ${p.name}`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onEditProduct(p)} className="p-1 text-slate-400 hover:text-amber-500">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => onDeleteProduct(p.id)} className="p-1 text-slate-400 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {viewingProduct && (
        <InventoryItemModal
          theme={theme}
          product={viewingProduct}
          onClose={() => setViewingProduct(null)}
        />
      )}
    </div>
  );
}

function ProductFormModal({ theme, categories, product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || categories[1] || 'Snacks',
    costPrice: product?.costPrice || '',
    retailPrice: product?.retailPrice || '',
    stock: product?.stock || '',
    reorderLevel: product?.reorderLevel || 5,
    unit: product?.unit || 'pcs',
    barcode: product?.barcode || '',
    hasTingi: product?.hasTingi || false,
    hasPautang: product?.hasPautang || false,
    pautangPrice: product?.pautangPrice || '',
    tingiPrice: product?.tingiPrice || '',
    tingiRatio: product?.tingiRatio || 1
  });
  const [cameraError, setCameraError] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isScannerOpen) return undefined;

    if (!('BarcodeDetector' in window) || !navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera barcode scanning is not available on this device.');
      setIsScannerOpen(false);
      return undefined;
    }

    let stream;
    let cancelled = false;
    let frameHandle;

    const startScan = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const detector = new window.BarcodeDetector({ formats: ['code_128', 'code_39', 'ean_13', 'ean_8', 'upc_a', 'upc_e', 'qr_code'] });

        const detectLoop = async () => {
          if (cancelled) return;
          try {
            if (videoRef.current && videoRef.current.readyState >= 2) {
              const barcode = await detector.detect(videoRef.current);
              if (barcode && barcode.length > 0) {
                const detectedCode = barcode[0]?.rawValue || '';
                if (detectedCode) {
                  setFormData((prev) => ({ ...prev, barcode: detectedCode }));
                  setCameraError('');
                  setIsScannerOpen(false);
                  stream.getTracks().forEach((track) => track.stop());
                  return;
                }
              }
            }
          } catch (error) {
            console.warn('Barcode detection failed:', error);
          }

          frameHandle = requestAnimationFrame(detectLoop);
        };

        detectLoop();
      } catch (error) {
        console.error('Camera open failed:', error);
        setCameraError('Camera access failed. You can still type the barcode manually.');
        setIsScannerOpen(false);
      }
    };

    startScan();

    return () => {
      cancelled = true;
      if (frameHandle) cancelAnimationFrame(frameHandle);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isScannerOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    onSave({
      ...formData,
      costPrice: parseFloat(formData.costPrice) || 0,
      retailPrice: parseFloat(formData.retailPrice) || 0,
      stock: parseFloat(formData.stock) || 0,
      reorderLevel: parseFloat(formData.reorderLevel) || 5,
      tingiPrice: parseFloat(formData.tingiPrice) || 0,
      tingiRatio: Number(formData.tingiRatio) > 0 ? Number(formData.tingiRatio) : 1,
      hasPautang: Boolean(formData.hasPautang),
      pautangPrice: parseFloat(formData.pautangPrice) || 0
    });
  };

  return (
    <ModalShell theme={theme} onClose={onClose} maxWidth="max-w-sm">
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col text-xs">
        {/* Pinned header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h3 className="truncate font-extrabold text-sm">{product ? 'I-edit ang Paninda' : 'Bagong Paninda Form'}</h3>
          <button type="button" onClick={onClose} aria-label="Close product form" className="shrink-0 p-1 text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 py-3">
          <div>
            <label className="font-bold text-slate-500 block">Pangalan ng Paninda</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full p-2 rounded-xl border outline-none font-bold ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-500 block">Kategorya</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full p-2 rounded-xl border font-bold ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                {categories.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-500 block">Barcode</label>
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                className={`w-full p-2 rounded-xl border font-bold ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-500 block">Kasalukuyang Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className={`w-full p-2 rounded-xl border font-bold ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 block">Unit (pcs, packs)</label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className={`w-full p-2 rounded-xl border font-bold ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="flex items-center space-x-2 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={formData.hasTingi}
                onChange={(e) => setFormData({ ...formData, hasTingi: e.target.checked })}
              />
              <span>May Benta na Tingi / Sachet?</span>
            </label>

            {formData.hasTingi && (
              <div className="mt-2 space-y-2">
                <div>
                  <label className="font-bold text-slate-500 block">Presyo ng Tingi (₱)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.tingiPrice}
                    onChange={(e) => setFormData({ ...formData, tingiPrice: e.target.value })}
                    className={`w-full p-2 rounded-xl border font-bold ${
                      theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-500 block">Tingi effect sa stock (1 pack = X sachets)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.tingiRatio}
                    onChange={(e) => setFormData({ ...formData, tingiRatio: e.target.value })}
                    className={`w-full p-2 rounded-xl border font-bold ${
                      theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="flex items-center space-x-2 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.hasPautang)}
                onChange={(e) => setFormData({ ...formData, hasPautang: e.target.checked })}
              />
              <span>May Pautang Price?</span>
            </label>

            {formData.hasPautang && (
              <div className="mt-2 space-y-2">
                <div>
                  <label className="font-bold text-slate-500 block">Presyo ng Pautang (₱)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.pautangPrice}
                    onChange={(e) => setFormData({ ...formData, pautangPrice: e.target.value })}
                    placeholder="Iba sa regular na presyo"
                    className={`w-full p-2 rounded-xl border font-bold ${
                      theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                  <p className="mt-1 text-[10px] text-slate-400">
                    Regular: ₱{parseFloat(formData.retailPrice || 0).toFixed(2) || '0.00'} • Pautang: ₱{parseFloat(formData.pautangPrice || 0).toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Pinned footer - Save button is always reachable */}
        <div className="shrink-0 border-t border-slate-200 px-4 py-3 dark:border-slate-800">
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl font-black shadow-md"
          >
            I-save ang Paninda
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

function RestockModal({ theme, product, restockQty, setRestockQty, restockCostPrice, setRestockCostPrice, restockRetailPrice, setRestockRetailPrice, onConfirm, onClose }) {
  return (
    <ModalShell theme={theme} onClose={onClose} maxWidth="max-w-xs">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h3 className="truncate font-black text-sm">Stock In: {product.name}</h3>
          <p className="mt-0.5 text-xs text-slate-400">Magdagdag ng karagdagang stock sa bodega.</p>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 py-3">
          <input
            type="number"
            placeholder="Bilang ng Idadagdag (e.g. 24)"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            className={`w-full p-2.5 rounded-2xl font-bold text-base border outline-none ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Bagong Puhunan (₱)"
            value={restockCostPrice}
            onChange={(e) => setRestockCostPrice(e.target.value)}
            className={`w-full p-2.5 rounded-2xl font-bold text-base border outline-none ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Bagong Presyo ng Benta (₱)"
            value={restockRetailPrice}
            onChange={(e) => setRestockRetailPrice(e.target.value)}
            className={`w-full p-2.5 rounded-2xl font-bold text-base border outline-none ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          />
          {product.hasTingi && (
            <>
              <input
                type="number"
                step="0.01"
                placeholder="Bagong Presyo ng Tingi (₱)"
                value={product.tingiPrice || ''}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  product.tingiPrice = Number.isNaN(next) ? 0 : next;
                }}
                className={`w-full p-2.5 rounded-2xl font-bold text-base border outline-none ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
              <input
                type="number"
                min="1"
                step="1"
                placeholder="1 pack = x sachets / units"
                value={product.tingiRatio || 1}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  product.tingiRatio = next > 0 ? next : 1;
                }}
                className={`w-full p-2.5 rounded-2xl font-bold text-base border outline-none ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-200 px-4 py-3 dark:border-slate-800">
          <div className="flex space-x-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-xl font-bold text-xs border border-slate-300 dark:border-slate-600">
              Kanselahin
            </button>
            <button onClick={onConfirm} className="flex-1 bg-amber-500 text-white py-2 rounded-xl font-bold text-xs shadow-md">
              I-confirm
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

/** One Pautang payout row inside the sub-ledger, with progress and a pay action. */
function PautangRecordCard({ theme, customer, record, onPay }) {
  const instalments = Array.isArray(record.instalments) ? record.instalments : [];
  const paidCount = instalments.filter((instalment) => instalment.paid).length;
  const totalPrice = Number(record.totalPrice) || 0;
  const paid = Number(record.paid) || 0;
  const progress = Math.min(100, (paid / Math.max(1, totalPrice)) * 100);

  const statusTone = record.status === 'Active'
    ? 'bg-indigo-100 text-indigo-700'
    : record.status === 'Redeemed'
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-slate-200 text-slate-600';

  return (
    <div className={`rounded-2xl border p-3 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${statusTone}`}>
            {record.status}
          </span>
          <p className="mt-1 text-[10px] font-bold text-slate-500 dark:text-slate-300">
            {new Date(record.date).toLocaleDateString()} • {record.id}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="block text-sm font-black text-indigo-600">₱{(Number(record.balance) || 0).toFixed(2)}</span>
          <span className="text-[9px] text-slate-400">ng ₱{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {Array.isArray(record.items) && record.items.length > 0 && (
        <ul className="mt-2 space-y-0.5 text-[10px] text-slate-600 dark:text-slate-300">
          {record.items.map((item, index) => (
            <li key={`${record.id}-item-${index}`} className="flex justify-between gap-2">
              <span className="truncate">{item.name} x{item.quantity}</span>
              <span className="shrink-0 font-bold">₱{(Number(item.price) || 0).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}

      {instalments.length > 0 && (
        <div className="mt-2">
          <div className="flex justify-between text-[9px] text-slate-400">
            <span>Tingan {paidCount}/{instalments.length}</span>
            <span>Nabayaran ₱{paid.toFixed(2)}</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {record.status === 'Active' && (
        <button
          onClick={() => onPay(customer, record)}
          className="mt-2 w-full rounded-xl bg-indigo-600 py-2 text-xs font-black text-white"
        >
          Magbayad ng Tingan
        </button>
      )}
    </div>
  );
}

function UtangLedgerView({ theme, customers, onAddCustomer, onPabayad, onPautangPay }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sheetTab, setSheetTab] = useState('utang');

  const totalOutstandingUtang = customers.reduce((a, b) => a + (Number(b.balance) || 0), 0);
  const totalOutstandingPautang = customers.reduce((a, b) => a + (Number(b.pautangBalance) || 0), 0);

  const allLedgerEntries = customers
    .flatMap((customer) =>
      (Array.isArray(customer.ledger) ? customer.ledger : []).map((entry) => ({
        ...entry,
        customerName: customer.name,
        customerId: customer.id,
        customerBalance: Number(customer.balance) || 0,
        customerPhone: customer.phone || 'No contact'
      }))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const selectedCustomerEntries = selectedCustomer
    ? [...(Array.isArray(selectedCustomer.ledger) ? selectedCustomer.ledger : [])].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  // Pautang lives in its own sub-ledger, kept apart from the Utang entries.
  const selectedPautangRecords = selectedCustomer
    ? [...(Array.isArray(selectedCustomer.pautang) ? selectedCustomer.pautang : [])]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-6">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 p-3 text-white shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Kabuuan ng Utang</span>
          <div className="text-xl font-black">₱{totalOutstandingUtang.toFixed(2)}</div>
          <p className="text-[10px] opacity-80">{customers.filter((c) => (Number(c.balance) || 0) > 0).length} Suki</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-3 text-white shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Kabuuan ng Pautang</span>
          <div className="text-xl font-black">₱{totalOutstandingPautang.toFixed(2)}</div>
          <p className="text-[10px] opacity-80">{customers.filter((c) => (Number(c.pautangBalance) || 0) > 0).length} Suki</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-black text-sm">Listahan ng Suki</h2>
        <button
          onClick={onAddCustomer}
          className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-xl font-bold text-xs flex items-center space-x-1"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Bagong Suki</span>
        </button>
      </div>

      <div className="space-y-2">
        {customers.length === 0 ? (
          <div className={`rounded-2xl border p-4 text-center text-xs ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-500'}`}>
            Walang suki na naitala pa.
          </div>
        ) : (
          customers.map((customer) => {
            const balance = Number(customer.balance) || 0;
            const pautangBalance = Number(customer.pautangBalance) || 0;
            const ledger = Array.isArray(customer.ledger) ? customer.ledger : [];
            const latestEntry = [...ledger].sort((a, b) => new Date(b.date) - new Date(a.date))[0];

            return (
              <button
                key={customer.id}
                type="button"
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full rounded-2xl border p-3 text-left transition ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'} hover:border-amber-400`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black text-sm">{customer.name}</h3>
                      {balance > 0 && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                          May Utang
                        </span>
                      )}
                      {pautangBalance > 0 && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                          May Pautang
                        </span>
                      )}
                      {balance <= 0 && pautangBalance <= 0 && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                          Lutong Buwis
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{customer.phone || 'Walang numero'}</p>
                    {latestEntry && (
                      <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-300">
                        Huling entry: {new Date(latestEntry.date).toLocaleDateString()} • {latestEntry.type === 'payment' ? 'Bayad' : 'Utang'}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`block text-base font-black ${balance > 0 ? 'text-red-500' : balance < 0 ? 'text-amber-600' : 'text-emerald-500'}`}>
                      ₱{balance.toFixed(2)}
                    </span>
                    {pautangBalance > 0 && (
                      <span className="block text-[11px] font-black text-indigo-600">₱{pautangBalance.toFixed(2)}</span>
                    )}
                    <span className="text-[9px] text-slate-400">{ledger.length} record</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className={`flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[32px] p-4 pb-5 shadow-2xl ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold">Suki Ledger</p>
                <h3 className="mt-1 font-black text-lg">{selectedCustomer.name}</h3>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-2.5 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-amber-600">Utang</p>
                <div className="mt-0.5 text-lg font-black text-amber-600">₱{(Number(selectedCustomer.balance) || 0).toFixed(2)}</div>
                <p className="text-[9px] text-slate-500 dark:text-slate-300">{selectedCustomerEntries.length} entry</p>
              </div>
              <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-2.5 text-center">
                <p className="text-[9px] font-bold uppercase tracking-wider text-indigo-600">Pautang</p>
                <div className="mt-0.5 text-lg font-black text-indigo-600">₱{(Number(selectedCustomer.pautangBalance) || 0).toFixed(2)}</div>
                <p className="text-[9px] text-slate-500 dark:text-slate-300">{selectedPautangRecords.length} payout</p>
              </div>
            </div>

            <div className="mt-3 flex shrink-0 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              {[
                { id: 'utang', label: `Utang (${selectedCustomerEntries.length})` },
                { id: 'pautang', label: `Pautang (${selectedPautangRecords.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSheetTab(tab.id)}
                  className={`flex-1 rounded-lg py-1.5 text-[11px] font-black transition ${
                    sheetTab === tab.id
                      ? tab.id === 'pautang'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-amber-500 text-white shadow'
                      : 'text-slate-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {sheetTab === 'pautang' ? (
              <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1">
                {selectedPautangRecords.length === 0 ? (
                  <div className={`rounded-2xl border p-4 text-center text-xs ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-500'}`}>
                    Walang pautang record para sa {selectedCustomer.name}.
                  </div>
                ) : (
                  selectedPautangRecords.map((record) => (
                    <PautangRecordCard
                      key={record.id}
                      theme={theme}
                      customer={selectedCustomer}
                      record={record}
                      onPay={onPautangPay}
                    />
                  ))
                )}
              </div>
            ) : (
            <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain pr-1">
              {selectedCustomerEntries.length === 0 ? (
                <div className={`rounded-2xl border p-4 text-center text-xs ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-500'}`}>
                  Walang utang o bayad na naitala para sa {selectedCustomer.name}.
                </div>
              ) : (
                selectedCustomerEntries.map((entry) => {
                  const isPayment = entry.type === 'payment';

                  return (
                    <div key={entry.id} className={`rounded-2xl border p-3 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'}`}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${isPayment ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {isPayment ? 'Bayad' : 'Utang'}
                          </span>
                          <span className="text-[10px] text-slate-400">{new Date(entry.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`text-sm font-black ${isPayment ? 'text-emerald-500' : 'text-red-500'}`}>
                          {isPayment ? '+ ' : '- '}{`₱${Number(entry.amount || 0).toFixed(2)}`}
                        </span>
                      </div>

                      <p className="mt-2 text-[10px] font-bold text-slate-500 dark:text-slate-300">{entry.description || 'No description'}</p>
                      {entry.orderId && <p className="text-[9px] text-slate-400">Ref: {entry.orderId}</p>}

                      {Array.isArray(entry.items) && entry.items.length > 0 ? (
                        <div className="mt-2 rounded-xl bg-slate-100 dark:bg-slate-800 p-2">
                          <ul className="space-y-1 text-[10px] text-slate-600 dark:text-slate-200">
                            {entry.items.map((item, index) => (
                              <li key={`${entry.id}-item-${index}`} className="flex justify-between gap-3">
                                <span>{item.name} x{item.quantity}</span>
                                <span>₱{Number(item.price || 0).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="mt-2 text-[10px] text-slate-400">Walang item list.</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            )}

            <div className="mt-3 flex gap-2">
              {sheetTab === 'utang' ? (
                <button
                  onClick={() => {
                    onPabayad(selectedCustomer);
                    setSelectedCustomer(null);
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-black text-sm"
                >
                  Magbayad ng Utang
                </button>
              ) : (
                <button
                  onClick={() => {
                    const nextRecord = selectedPautangRecords.find((record) => record.status === 'Active');
                    if (!nextRecord) return;
                    onPautangPay(selectedCustomer, nextRecord);
                  }}
                  disabled={!selectedPautangRecords.some((record) => record.status === 'Active')}
                  className={`flex-1 py-3 rounded-2xl font-black text-sm ${
                    selectedPautangRecords.some((record) => record.status === 'Active')
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Magbayad ng Tingan
                </button>
              )}
              <button
                onClick={() => setSelectedCustomer(null)}
                className="flex-1 border border-slate-300 dark:border-slate-700 py-3 rounded-2xl font-black text-sm"
              >
                Isara
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryManager({ theme, categories, onAddCategory, onDeleteCategory }) {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCategory(newCategory);
    setNewCategory('');
  };

  return (
    <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">Products</p>
          <h2 className="mt-1 text-lg font-black">Categories</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(event) => setNewCategory(event.target.value)}
          placeholder="Add category"
          className={`flex-1 rounded-xl border px-3 py-2 text-xs font-medium outline-none ${theme === 'dark' ? 'border-slate-700 bg-slate-800 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}
        />
        <button
          type="submit"
          className="rounded-xl bg-amber-500 px-3 py-2 text-xs font-black text-white"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {categories.filter((category) => category !== 'All').map((category) => (
          <div
            key={category}
            className={`flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10px] font-bold ${theme === 'dark' ? 'border-slate-700 bg-slate-800 text-slate-100' : 'border-slate-200 bg-slate-100 text-slate-700'}`}
          >
            <span>{category}</span>
            <button
              type="button"
              onClick={() => onDeleteCategory(category)}
              className="text-red-500 hover:text-red-600"
              aria-label={`Delete ${category}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView({ theme, setTheme, storeProfile, scanIntervalMs, setScanIntervalMs, categories, onAddCategory, onDeleteCategory, onResetDatabase }) {
  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-6">
      <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">System</p>
            <h2 className="mt-1 text-lg font-black">Settings</h2>
          </div>
          <div className="rounded-full bg-amber-100 p-2 text-amber-600">
            <Settings className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-3">
          <div className={`rounded-2xl border p-3 ${theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'}`}>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Barcode scan interval</label>
            <select
              value={scanIntervalMs}
              onChange={(e) => setScanIntervalMs(Number(e.target.value))}
              className={`w-full rounded-xl border px-3 py-2 text-sm font-bold outline-none ${
                theme === 'dark'
                  ? 'border-slate-700 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-900'
              }`}
            >
              <option value={1000}>1 second</option>
              <option value={2000}>2 seconds</option>
              <option value={3000}>3 seconds</option>
            </select>
          </div>

          <button
            onClick={onResetDatabase}
            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <span>Reset local database</span>
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CategoryManager
        theme={theme}
        categories={categories}
        onAddCategory={onAddCategory}
        onDeleteCategory={onDeleteCategory}
      />

      <div className={`rounded-2xl border p-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Store profile</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Store</span>
            <span className="font-bold text-right">{storeProfile.storeName}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Owner</span>
            <span className="font-bold text-right">{storeProfile.ownerName}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Location</span>
            <span className="font-bold text-right">{storeProfile.location}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Currency</span>
            <span className="font-bold text-right">{storeProfile.currency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerFormModal({ theme, onSave, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSave({ name, phone, notes, balance: 0 });
  };

  return (
    <ModalShell theme={theme} onClose={onClose} maxWidth="max-w-xs">
      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col text-xs">
        <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h3 className="truncate font-black text-sm">I-rehistro ang Bagong Suki</h3>
        </div>

        <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 py-3">
          <div>
            <label className="font-bold text-slate-500 block">Pangalan</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 rounded-xl border font-bold ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>
          <div>
            <label className="font-bold text-slate-500 block">CP Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full p-2 rounded-xl border font-bold ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>
          <div>
            <label className="font-bold text-slate-500 block">Tirahan / Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full p-2 rounded-xl border font-bold ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 px-4 py-3 dark:border-slate-800">
          <button type="submit" className="w-full bg-amber-500 text-white py-2.5 rounded-xl font-bold shadow-md">
            I-save si Suki
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

/**
 * Records a Pautang instalment (tingan) against one payout. This is separate
 * from PabayadModal, which only ever settles a customer's Utang balance.
 */
function PautangInstalmentModal({ theme, customer, record, amount, setAmount, method, setMethod, onConfirm, onClose }) {
  const balance = Number(record.balance) || 0;
  const parsed = Number(amount) || 0;
  const overpay = parsed > balance;

  // One-tap shortcuts sized to what is genuinely still owed.
  const quickAmounts = Array.from(new Set([
    balance,
    Math.round(balance / 2),
    Math.min(balance, 50),
    Math.min(balance, 100),
    Math.min(balance, 200)
  ].filter((value) => Number.isFinite(value) && value > 0))).sort((a, b) => b - a);

  return (
    <ModalShell theme={theme} onClose={onClose} maxWidth="max-w-sm">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">Pautang Tingan</p>
          <h3 className="mt-1 truncate font-black text-sm">{customer.name}</h3>
          <p className="mt-0.5 text-[10px] text-slate-400">
            Ref: {record.id} • {new Date(record.date).toLocaleDateString()}
          </p>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800">
              <p className="text-[9px] font-bold uppercase text-slate-500">Presyo</p>
              <p className="mt-0.5 text-sm font-black">₱{(Number(record.totalPrice) || 0).toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-2">
              <p className="text-[9px] font-bold uppercase text-emerald-600">Nabayaran</p>
              <p className="mt-0.5 text-sm font-black text-emerald-600">₱{(Number(record.paid) || 0).toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-indigo-500/10 p-2">
              <p className="text-[9px] font-bold uppercase text-indigo-600">Natitira</p>
              <p className="mt-0.5 text-sm font-black text-indigo-600">₱{balance.toFixed(2)}</p>
            </div>
          </div>

          {Array.isArray(record.items) && record.items.length > 0 && (
            <div className="rounded-xl border border-slate-200 p-2 dark:border-slate-700">
              <p className="text-[9px] font-bold uppercase text-slate-400">Mga Paninda</p>
              <ul className="mt-1 space-y-0.5 text-[10px] text-slate-600 dark:text-slate-300">
                {record.items.map((item, index) => (
                  <li key={`${record.id}-item-${index}`} className="flex justify-between gap-2">
                    <span className="truncate">{item.name} x{item.quantity}</span>
                    <span className="shrink-0 font-bold">₱{(Number(item.price) || 0).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(record.instalments) && record.instalments.length > 0 && (
            <div>
              <p className="mb-1 text-[9px] font-bold uppercase text-slate-400">
                Schedule ({record.instalments.filter((i) => i.paid).length}/{record.instalments.length} paid)
              </p>
              <div className="flex flex-wrap gap-1">
                {record.instalments.map((instalment) => {
                  const partial = !instalment.paid && (Number(instalment.amountPaid) || 0) > 0;
                  const tone = instalment.paid
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                    : partial
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400';

                  return (
                    <span key={instalment.id} className={`rounded-lg px-1.5 py-1 text-[9px] font-black ${tone}`}>
                      #{instalment.index} ₱{(Number(instalment.amount) || 0).toFixed(2)}
                      {partial ? ` (${(Number(instalment.amountPaid) || 0).toFixed(2)})` : ''}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-500">Halagang Bayad (₱)</label>
            <div className="relative mt-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">₱</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className={`w-full rounded-2xl py-2.5 pl-8 pr-3 text-lg font-black outline-none ${
                  overpay || parsed <= 0 ? 'border-2 border-red-400' : 'border-2 border-indigo-400'
                } ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}
              />
            </div>
            {overpay && (
              <p className="mt-1 text-[10px] font-bold text-red-500">
                Mas malaki sa natitirang ₱{balance.toFixed(2)} — iaadjust sa bayaran.
              </p>
            )}
          </div>

          {quickAmounts.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value.toFixed(2))}
                  className="rounded-xl border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-[10px] font-black text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300"
                >
                  ₱{value.toFixed(2)}
                </button>
              ))}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-500">Paraan ng Bayad</label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              {['Cash', 'GCash', 'Utang'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMethod(option)}
                  className={`rounded-xl border py-1.5 text-[10px] font-black transition ${
                    method === option
                      ? 'border-indigo-500 bg-indigo-500 text-white'
                      : theme === 'dark'
                        ? 'border-slate-700 bg-slate-800 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-slate-200 px-4 py-3 dark:border-slate-800">
          <div className="flex space-x-2">
            <button onClick={onClose} className="flex-1 rounded-xl border border-slate-300 py-2 text-xs font-bold dark:border-slate-600">
              Kanselahin
            </button>
            <button onClick={onConfirm} className="flex-1 rounded-xl bg-indigo-600 py-2 text-xs font-bold text-white shadow-md">
              Itala ang Tingan
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function PabayadModal({ theme, customer, pabayadAmount, setPabayadAmount, onConfirm, onClose }) {
  const balance = Number(customer.balance) || 0;
  const quickAmounts = Array.from(new Set([
    25,
    50,
    100,
    Math.min(200, Math.max(100, Math.abs(balance) || 100)),
    Math.min(500, Math.max(200, Math.abs(balance) || 200)),
    Math.max(50, Math.abs(balance) || 50)
  ].filter((amount) => Number.isFinite(amount) && amount > 0))).sort((a, b) => a - b);

  return (
    <ModalShell theme={theme} onClose={onClose} maxWidth="max-w-xs">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h3 className="truncate font-black text-sm">Pabayad sa Utang: {customer.name}</h3>
          <p className="mt-0.5 text-xs text-slate-400">
            Kasalukuyang Balans:{' '}
            <span className={`font-bold ${balance < 0 ? 'text-amber-500' : 'text-red-500'}`}>
              ₱{balance.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3">
          <div className="grid grid-cols-3 gap-2">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setPabayadAmount(String(amount))}
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-[10px] font-black text-emerald-700 transition hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
            >
              ₱{amount.toFixed(2)}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Magkano ang ibinabayad (₱)"
          value={pabayadAmount}
          onChange={(e) => setPabayadAmount(e.target.value)}
          className={`w-full p-2.5 rounded-2xl font-bold text-base border outline-none ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}
        />
        </div>

        <div className="shrink-0 border-t border-slate-200 px-4 py-3 dark:border-slate-800">
          <div className="flex space-x-2">
            <button onClick={onClose} className="flex-1 py-2 rounded-xl font-bold text-xs border border-slate-300 dark:border-slate-600">
              Kanselahin
            </button>
            <button onClick={onConfirm} className="flex-1 bg-emerald-600 text-white py-2 rounded-xl font-bold text-xs shadow-md">
              I-record ang Bayad
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function SalesHistoryView({ theme, sales, onVoidOrder, onViewReceipt }) {
  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-6">
      <h2 className="font-black text-sm">Nakalipas na Benta (Sales Logs)</h2>

      <div className="space-y-2">
        {sales.map((s) => {
          const isVoid = s.status === 'Voided';
          return (
            <div
              key={s.id}
              className={`p-3 rounded-2xl border flex items-center justify-between ${
                isVoid ? 'opacity-50 line-through bg-slate-200/50' : theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-black text-xs">{s.id}</span>
                  <span className="text-[9px] bg-amber-500/10 text-amber-600 font-bold px-1.5 py-0.2 rounded">
                    {s.paymentMethod}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  {new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {s.customerName}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <span className="font-black text-xs block text-amber-600 dark:text-amber-400">
                    ₱{s.totalAmount.toFixed(2)}
                  </span>
                  <span className={`text-[9px] font-bold ${isVoid ? 'text-red-500' : 'text-emerald-500'}`}>
                    {s.status}
                  </span>
                </div>

                {!isVoid && (
                  <div className="flex items-center space-x-1">
                    <button onClick={() => onViewReceipt(s)} className="p-1 text-slate-400 hover:text-amber-500">
                      <Receipt className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => onVoidOrder(s.id)} className="p-1 text-slate-400 hover:text-red-500" title="Void Order">
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AnalyticsDashboardView({ theme, sales, products, customers }) {
  const activeSales = sales.filter((s) => s.status === 'Completed');
  const grossSales = activeSales.reduce((a, b) => a + b.totalAmount, 0);

  // Profit calculation = Sales - Cost Price of items sold
  const netProfit = activeSales.reduce((acc, sale) => {
    const saleCost = sale.items.reduce((costAcc, item) => {
      const prod = products.find((p) => p.id === item.id);
      return costAcc + (prod ? prod.costPrice * item.quantity : 0);
    }, 0);
    return acc + (sale.totalAmount - saleCost);
  }, 0);

  const totalUtang = customers.reduce((a, b) => a + b.balance, 0);

  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-6">
      <h2 className="font-black text-sm">Kikitain & Report Analytics</h2>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-2xl bg-amber-500 text-white space-y-0.5 shadow-md">
          <span className="text-[10px] font-bold opacity-90">Kabuuan ng Benta</span>
          <div className="text-xl font-black">₱{grossSales.toFixed(2)}</div>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-600 text-white space-y-0.5 shadow-md">
          <span className="text-[10px] font-bold opacity-90">Net Tubo (Profit)</span>
          <div className="text-xl font-black">₱{netProfit.toFixed(2)}</div>
        </div>
      </div>

      <div className={`p-3 rounded-2xl border space-y-2 text-xs ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
      }`}>
        <h4 className="font-bold text-[10px] text-slate-400 uppercase">Buod ng Transaksyon</h4>
        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
          <span>Bilang ng Benta (Sales Count)</span>
          <span className="font-bold">{activeSales.length} Transactions</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
          <span>Hindi Pa Bayad na Utang</span>
          <span className="font-bold text-red-500">₱{totalUtang.toFixed(2)}</span>
        </div>
      </div>

      {/* Top Items Ranking */}
      <div className={`p-3 rounded-2xl border space-y-2 text-xs ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
      }`}>
        <h4 className="font-bold text-[10px] text-slate-400 uppercase">Mabilis Mabentang Paninda (Top Sellers)</h4>
        {products.slice(0, 3).map((p, idx) => (
          <div key={p.id} className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-2">
              <span className="font-black text-amber-500">#{idx + 1}</span>
              <div className="flex items-center gap-2">
                <span className="text-base">📦</span>
                <span>{p.name}</span>
              </div>
            </div>
            <span className="font-bold text-slate-400">₱{p.retailPrice.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}