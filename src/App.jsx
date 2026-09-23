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
  ArrowRight,
  TrendingUp,
  BookOpen,
  Edit3,
  UserPlus,
  AlertTriangle,
  RotateCcw,
  Smartphone,
  Camera,
  ImageUp,
  Maximize2,
  Minimize2,
  Sparkles,
  Tag,
  CheckCircle,
  Settings,
  HelpCircle,
  TrendingDown,
  Layers
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
    icon: '🥔',
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
    icon: '🍜',
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
    icon: '🧃',
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
    icon: '☕',
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
    icon: '🥛',
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
    icon: '🧼',
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
    icon: '🥫',
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
    icon: '🥤',
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
    icon: '🍾',
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
    icon: '🚬',
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
    icon: '🥚',
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
    icon: '🧄',
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

const normalizeCustomer = (customer = {}) => ({
  ...customer,
  balance: Number(customer.balance) || 0,
  ledger: Array.isArray(customer.ledger) ? customer.ledger.map((entry) => ({
    ...entry,
    amount: Number(entry.amount) || 0
  })) : []
});

const DEFAULT_STORE_PROFILE = {
  storeName: 'Tindahan ni Ate Inday',
  ownerName: 'Ate Inday',
  location: 'Barangay 142',
  address: 'Barangay 142, City Proper',
  phone: '0917-123-4567',
  businessType: 'Sari-sari Store',
  currency: 'PHP'
};

const isImageSource = (value) => {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.startsWith('data:image/') || trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/');
};

const getProductImageSource = (product) => {
  if (isImageSource(product?.image)) return product.image;
  if (isImageSource(product?.icon)) return product.icon;
  return '';
};

const getProductDisplayIcon = (product) => {
  const imageSource = getProductImageSource(product);
  if (imageSource) return null;
  if (typeof product?.icon === 'string' && product.icon.trim() && !product.icon.startsWith('data:image/')) {
    return product.icon;
  }
  if (typeof product?.image === 'string' && product.image.trim() && !product.image.startsWith('data:image/')) {
    return product.image;
  }
  return '📦';
};

const normalizeProduct = (product = {}) => {
  const costPrice = Number(product.costPrice) || 0;
  const retailPrice = Number(product.retailPrice) || 0;
  const stock = Number(product.stock) || 0;
  const reorderLevel = Number(product.reorderLevel) || 0;
  const tingiPrice = Number(product.tingiPrice) || 0;

  const imageValue = isImageSource(product.image) ? product.image : isImageSource(product.icon) ? product.icon : '';
  const iconValue = imageValue ? '📦' : (typeof product.icon === 'string' && product.icon.trim() && !product.icon.startsWith('data:image/')) ? product.icon : '📦';

  return {
    ...product,
    id: product.id || `P-${Math.floor(100 + Math.random() * 900)}`,
    name: product.name || 'New Product',
    category: product.category || 'Uncategorized',
    costPrice,
    retailPrice,
    stock,
    reorderLevel,
    unit: product.unit || 'pcs',
    barcode: product.barcode || '',
    image: imageValue,
    icon: iconValue,
    hasTingi: Boolean(product.hasTingi),
    tingiPrice,
    barcodeText: product.barcode || ''
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
      setProducts((data.products || INITIAL_PRODUCTS).map(normalizeProduct));
      setCategories(data.categories || INITIAL_CATEGORIES);
      setCustomers((data.customers || INITIAL_CUSTOMERS).map(normalizeCustomer));
      setSalesHistory(data.sales || INITIAL_SALES);
    } catch (error) {
      console.error(error);
      setTheme('light');
      setSetupComplete(false);
      setStoreProfile(DEFAULT_STORE_PROFILE);
      setProducts(INITIAL_PRODUCTS.map(normalizeProduct));
      setCategories(INITIAL_CATEGORIES);
      setCustomers(INITIAL_CUSTOMERS.map(normalizeCustomer));
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
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [discountPercent, setDiscountPercent] = useState(0); // e.g., Senior 20%
  const [isCartOpen, setIsCartOpen] = useState(false);

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
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // 'Cash', 'GCash', 'Utang'
  const [tenderedCash, setTenderedCash] = useState('');
  const [selectedUtangCustomer, setSelectedUtangCustomer] = useState('');
  const [paymentStep, setPaymentStep] = useState('method'); // 'method', 'receipt'
  const [lastCompletedOrder, setLastCompletedOrder] = useState(null);

  // Product CRUD Modals State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = Add, Object = Edit

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
      products,
      categories,
      customers,
      sales: salesHistory
    });
  }, [theme, setupComplete, storeProfile, products, categories, customers, salesHistory, isDataLoaded]);

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
      setProducts((data.products || INITIAL_PRODUCTS).map(normalizeProduct));
      setCategories(data.categories || INITIAL_CATEGORIES);
      setCustomers((data.customers || INITIAL_CUSTOMERS).map(normalizeCustomer));
      setSalesHistory(data.sales || INITIAL_SALES);
      showToast('Local database reset to initial setup');
    } catch (error) {
      console.error('Reset failed:', error);
      showToast('Database reset failed', 'error');
    }
  };

  const handleBarcodeScan = (barcodeValue) => {
    const code = String(barcodeValue || '').trim();
    if (!code) return;

    const foundProduct = products.find((product) => String(product.barcode || '').trim() === code);
    if (!foundProduct) {
      showToast('Barcode not found in inventory', 'error');
      return;
    }

    addToCart(foundProduct, false);
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
  const addToCart = (product, isTingi = false) => {
    const itemPrice = isTingi ? product.tingiPrice : product.retailPrice;
    const itemName = isTingi ? `${product.name} (Tingi / Sachet)` : product.name;
    const cartItemId = isTingi ? `${product.id}-tingi` : product.id;

    if (product.stock <= 0) {
      showToast(`Out of stock: ${product.name}`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.cartItemId === cartItemId);
      if (existing) {
        if (existing.quantity >= product.stock) {
          showToast(`Limit reached for current stock level!`, 'error');
          return prev;
        }
        return prev.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          productId: product.id,
          name: itemName,
          itemPrice,
          quantity: 1,
          isTingi,
          baseProduct: product
        }
      ];
    });

    showToast(`Added ₱${itemPrice.toFixed(2)} - ${itemName}`);
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

    const customerObj = customers.find((c) => c.id === selectedUtangCustomer);
    const customerName = paymentMethod === 'Utang' ? (customerObj ? customerObj.name : 'Utang Customer') : 'Walk-in Suki';

    const newOrder = {
      id: `TRX-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      customerName,
      customerId: paymentMethod === 'Utang' ? selectedUtangCustomer : null,
      items: cart.map((c) => ({
        id: c.productId,
        name: c.name,
        price: c.itemPrice,
        quantity: c.quantity,
        isTingi: c.isTingi
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
        return { ...prod, stock: newStock };
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
                id: `L-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
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

    // 3. Save to Sales History
    setSalesHistory((prev) => [newOrder, ...prev]);

    setLastCompletedOrder(newOrder);
    setPaymentStep('receipt');
    showToast('Transaction Successful!');
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

        return { ...prod, stock: Math.round((prod.stock + stockToAdd) * 100) / 100 };
      })
    );

    // Deduct Utang if it was an Utang order
    if (order.paymentMethod === 'Utang' && order.customerId) {
      setCustomers((prev) =>
        prev.map((cust) => {
          if (cust.id !== order.customerId) return normalizeCustomer(cust);
          const nextBalance = Math.max(0, (Number(cust.balance) || 0) - order.totalAmount);
          return normalizeCustomer({
            ...cust,
            balance: nextBalance,
            ledger: [
              {
                id: `L-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
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

    // Mark as Voided
    setSalesHistory((prev) =>
      prev.map((s) => (s.id === orderId ? { ...s, status: 'Voided' } : s))
    );

    showToast(`Order ${orderId} has been Voided & restocked`, 'warning');
  };

  // Product CRUD Handlers
  const handleSaveProduct = (productData) => {
    const normalizedProduct = normalizeProduct({
      ...productData,
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
      const newProd = normalizeProduct({ ...normalizedProduct, id: `P-${Math.floor(100 + Math.random() * 900)}` });
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
          tingiRatio: nextTingiRatio > 0 ? nextTingiRatio : Number(p.tingiRatio) || 1
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
      id: `C-${Math.floor(10 + Math.random() * 90)}`,
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
        return normalizeCustomer({
          ...c,
          balance: Math.max(0, (Number(c.balance) || 0) - amt),
          ledger: [
            {
              id: `L-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
              type: 'payment',
              amount: amt,
              date: new Date().toISOString(),
              description: `Payment received from ${c.name}`,
              orderId: `PMT-${Date.now()}`,
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
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-300 font-sans ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-amber-50/50 text-slate-900'}`}>
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
        <div className="flex-1 overflow-y-auto relative flex flex-col bg-slate-100/50 dark:bg-slate-950/40 pb-20">
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
              categories={categories}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
              onResetDatabase={handleResetDatabase}
            />
          )}
        </div>

        {/* Floating Quick Cart Toggle Button */}
        {cart.length > 0 && !isCartOpen && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 animate-bounce-short">
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
            totalAmount={lastCompletedOrder ? lastCompletedOrder.totalAmount : totalAmount}
            order={lastCompletedOrder}
            handleFinalizeTransaction={handleFinalizeTransaction}
            handleStartNewSale={handleStartNewSale}
            onClose={() => setIsPaymentModalOpen(false)}
            showToast={showToast}
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

function RegisterView({ theme, products, categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, addToCart, cart, totalAmount, setIsCartOpen, onBarcodeScan }) {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(true);
  const videoRef = useRef(null);

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
                if (code) {
                  onBarcodeScan(code);
                  setCameraError('');
                  setIsScannerOpen(false);
                  if (stream) stream.getTracks().forEach((track) => track.stop());
                  return;
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
  }, [isScannerOpen, onBarcodeScan]);

  const handleBarcodeSubmit = (event) => {
    event.preventDefault();
    if (!barcodeInput.trim()) return;
    onBarcodeScan(barcodeInput);
    setBarcodeInput('');
  };

  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-20">
      
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

      {/* Search Input Bar */}
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

      {/* Category Pills horizontal scroll */}
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

      {/* Item Grid */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        {filteredProducts.map((item) => {
          const isOut = item.stock <= 0;
          const isLow = item.stock > 0 && item.stock <= item.reorderLevel;

          const cartPackItem = cart.find((ci) => ci.cartItemId === item.id);
          const cartTingiItem = cart.find((ci) => ci.cartItemId === `${item.id}-tingi`);

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
              {(cartPackItem || cartTingiItem) && (
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
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-8 h-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl">{item.icon || '📦'}</span>
                    )}
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
                  onClick={() => addToCart(item, false)}
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
                    onClick={() => addToCart(item, true)}
                    className="w-full py-1 px-2 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 hover:bg-emerald-600 hover:text-white transition flex items-center justify-between"
                  >
                    <span>Tingi: ₱{item.tingiPrice.toFixed(2)}</span>
                    <Sparkles className="w-3 h-3" />
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
  );
}

function CartDrawer({ theme, cart, updateCartQty, removeFromCart, discountPercent, setDiscountPercent, subtotal, discountAmount, totalAmount, onClose, onCheckout }) {
  return (
    <div className="absolute inset-0 bg-black/60 z-50 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
      <div className={`w-full max-h-[78%] rounded-t-[32px] p-4 pb-20 flex flex-col shadow-2xl transition-colors ${
        theme === 'dark' ? 'bg-slate-900 text-white border-t border-slate-800' : 'bg-white text-slate-900'
      }`}>
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
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

function PaymentCheckoutModal({ theme, storeProfile, paymentStep, setPaymentStep, paymentMethod, setPaymentMethod, tenderedCash, setTenderedCash, customers, selectedUtangCustomer, setSelectedUtangCustomer, totalAmount, order, handleFinalizeTransaction, handleStartNewSale, onClose, showToast }) {
  const quickCashOptions = [totalAmount, 20, 50, 100, 200, 500, 1000];
  const calculatedChange = Math.max(0, (parseFloat(tenderedCash) || 0) - totalAmount);

  return (
    <div className="absolute inset-0 bg-black/70 z-50 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
      <div className={`w-full h-[92%] rounded-t-[36px] p-4 pb-20 flex flex-col shadow-2xl ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>

        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
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
                  { id: 'Utang', label: 'Utang / Credit', icon: BookOpen }
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

function ProductsCRUDView({ theme, products, categories, onAddProduct, onEditProduct, onDeleteProduct, onRestock }) {
  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-sm">Paninda Inventory (CRUD)</h2>
          <p className="text-[10px] text-slate-400">{products.length} Kabuuang Items</p>
        </div>
        <button
          onClick={onAddProduct}
          className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Dagdag Paninda</span>
        </button>
      </div>

      <div className="space-y-2">
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
                {getProductImageSource(p) ? (
                  <img src={getProductImageSource(p)} alt={p.name} className="h-10 w-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700" />
                ) : (
                  <span className="text-2xl">{getProductDisplayIcon(p)}</span>
                )}
                <div>
                  <h4 className="font-bold text-xs">{p.name}</h4>
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
    image: product?.image || product?.icon || '',
    icon: product?.icon || product?.image || '📦',
    hasTingi: product?.hasTingi || false,
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

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setFormData((prev) => ({ ...prev, image: String(base64), icon: String(base64) }));
    };
    reader.readAsDataURL(file);
  };

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
      image: formData.image || formData.icon || ''
    });
  };

  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className={`w-full max-w-sm rounded-3xl p-4 space-y-3 ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-extrabold text-sm">{product ? 'I-edit ang Paninda' : 'Bagong Paninda Form'}</h3>
          <button onClick={onClose} className="p-1 text-slate-400"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 text-xs">
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

          <div>
            <label className="font-bold text-slate-500 block">Image sa Paninda</label>
            <div className="flex gap-2">
              <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-2 py-2 text-[10px] font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <ImageUp className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <button
                type="button"
                onClick={() => setIsScannerOpen(true)}
                className="flex items-center justify-center gap-1 rounded-xl border border-amber-300 bg-amber-50 px-2 py-2 text-[10px] font-bold text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
              >
                <Camera className="w-3.5 h-3.5" />
                Scan
              </button>
            </div>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value, icon: e.target.value || '📦' })}
              placeholder="https://..."
              className={`mt-2 w-full p-2 rounded-xl border font-bold ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            />
            {formData.image && (
              <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
                <img src={formData.image} alt="Product preview" className="h-20 w-full object-cover rounded-lg" />
              </div>
            )}
            {cameraError && <p className="mt-2 text-[10px] text-red-500">{cameraError}</p>}
            {isScannerOpen && (
              <div className="mt-2 overflow-hidden rounded-xl border border-slate-300 bg-black">
                <video ref={videoRef} className="h-32 w-full object-cover" muted playsInline autoPlay />
              </div>
            )}
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

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2.5 rounded-xl font-black shadow-md mt-2"
          >
            I-save ang Paninda
          </button>
        </form>
      </div>
    </div>
  );
}

function RestockModal({ theme, product, restockQty, setRestockQty, restockCostPrice, setRestockCostPrice, restockRetailPrice, setRestockRetailPrice, onConfirm, onClose }) {
  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className={`w-full max-w-xs rounded-3xl p-4 space-y-3 ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        <h3 className="font-black text-sm">Stock In: {product.name}</h3>
        <p className="text-xs text-slate-400">Magdagdag ng karagdagang stock sa bodega.</p>

        <div className="space-y-2">
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

        <div className="flex space-x-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl font-bold text-xs border border-slate-300">
            Kanselahin
          </button>
          <button onClick={onConfirm} className="flex-1 bg-amber-500 text-white py-2 rounded-xl font-bold text-xs shadow-md">
            I-confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function UtangLedgerView({ theme, customers, onAddCustomer, onPabayad }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const totalOutstandingUtang = customers.reduce((a, b) => a + (Number(b.balance) || 0), 0);

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

  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-6">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white space-y-1 shadow-md">
        <span className="text-xs font-bold opacity-90">Kabuuan ng Pautang</span>
        <div className="text-2xl font-black">₱{totalOutstandingUtang.toFixed(2)}</div>
        <p className="text-[10px] opacity-80">{customers.filter((c) => (Number(c.balance) || 0) > 0).length} Suki ang may balanseng utang</p>
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
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-sm">{customer.name}</h3>
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${balance > 0 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {balance > 0 ? 'May Utang' : 'Lutong Buwis'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">{customer.phone || 'Walang numero'}</p>
                    {latestEntry && (
                      <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-300">
                        Huling entry: {new Date(latestEntry.date).toLocaleDateString()} • {latestEntry.type === 'payment' ? 'Bayad' : 'Utang'}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    <span className={`block text-base font-black ${balance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      ₱{balance.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-slate-400">{ledger.length} record</span>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      {selectedCustomer && (
        <div className="absolute inset-0 bg-black/70 z-50 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
          <div className={`w-full h-[92%] rounded-t-[32px] p-4 pb-20 flex flex-col shadow-2xl ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold">Suki Ledger</p>
                <h3 className="mt-1 font-black text-lg">{selectedCustomer.name}</h3>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600">Kasalukuyang Balans</p>
              <div className="mt-1 text-2xl font-black text-amber-600">₱{(Number(selectedCustomer.balance) || 0).toFixed(2)}</div>
              <p className="text-[10px] text-slate-500 dark:text-slate-300">{selectedCustomer.phone || 'Walang numero'} • {selectedCustomerEntries.length} entry</p>
            </div>

            <div className="flex-1 overflow-y-auto mt-3 space-y-2 pr-1">
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

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  onPabayad(selectedCustomer);
                  setSelectedCustomer(null);
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-black text-sm"
              >
                Magbayad
              </button>
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

function SettingsView({ theme, setTheme, storeProfile, categories, onAddCategory, onDeleteCategory, onResetDatabase }) {
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
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className={`w-full max-w-xs rounded-3xl p-4 space-y-3 ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        <h3 className="font-black text-sm">I-rehistro ang Bagong Suki</h3>
        <form onSubmit={handleSubmit} className="space-y-2 text-xs">
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

          <button type="submit" className="w-full bg-amber-500 text-white py-2.5 rounded-xl font-bold shadow-md mt-2">
            I-save si Suki
          </button>
        </form>
      </div>
    </div>
  );
}

function PabayadModal({ theme, customer, pabayadAmount, setPabayadAmount, onConfirm, onClose }) {
  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className={`w-full max-w-xs rounded-3xl p-4 space-y-3 ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        <h3 className="font-black text-sm">Pabayad sa Utang: {customer.name}</h3>
        <p className="text-xs text-slate-400">Kasalukuyang Utang: <span className="font-bold text-red-500">₱{customer.balance.toFixed(2)}</span></p>

        <input
          type="number"
          placeholder="Magkano ang ibinabayad (₱)"
          value={pabayadAmount}
          onChange={(e) => setPabayadAmount(e.target.value)}
          className={`w-full p-2.5 rounded-2xl font-bold text-base border outline-none ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}
        />

        <div className="flex space-x-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl font-bold text-xs border border-slate-300">
            Kanselahin
          </button>
          <button onClick={onConfirm} className="flex-1 bg-emerald-600 text-white py-2 rounded-xl font-bold text-xs shadow-md">
            I-record ang Bayad
          </button>
        </div>
      </div>
    </div>
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
                {getProductImageSource(p) ? (
                  <img src={getProductImageSource(p)} alt={p.name} className="h-6 w-6 rounded-md object-cover border border-slate-200 dark:border-slate-700" />
                ) : (
                  <span className="text-base">{getProductDisplayIcon(p)}</span>
                )}
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