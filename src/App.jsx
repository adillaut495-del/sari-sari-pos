import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag,
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
  Maximize2,
  Minimize2,
  Sparkles,
  Tag,
  CheckCircle,
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
  'Tingi / Retail'
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
  { id: 'C-01', name: 'Aling Nena', phone: '09171234567', address: 'Block 2 Lot 5', balance: 245.00, notes: 'Suki, pays every Friday' },
  { id: 'C-02', name: 'Kuya Cardo', phone: '09289876543', address: 'Near Basketball Court', balance: 120.00, notes: ' Tricycle driver' },
  { id: 'C-03', name: 'Mang Juan', phone: '09085551234', address: 'Street 4 Corner', balance: 0.00, notes: 'Pays in exact cash always' }
];

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
  // Theme & Mobile Viewport Mode
  const [theme, setTheme] = useState(() => localStorage.getItem('sari_theme') || 'light');
  const [isMobileFrame, setIsMobileFrame] = useState(true);
  const [isOffline, setIsOffline] = useState(() => !navigator.onLine);

  useEffect(() => {
    const handleConnection = () => setIsOffline(!navigator.onLine);
    window.addEventListener('online', handleConnection);
    window.addEventListener('offline', handleConnection);

    return () => {
      window.removeEventListener('online', handleConnection);
      window.removeEventListener('offline', handleConnection);
    };
  }, []);

  // Core Data State loaded from LocalStorage
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('sari_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('sari_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('sari_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [salesHistory, setSalesHistory] = useState(() => {
    const saved = localStorage.getItem('sari_sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  // UI Navigation Tabs
  const [activeTab, setActiveTab] = useState('register'); // 'register', 'products', 'utang', 'sales', 'analytics'

  // Cart State for Register View
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [discountPercent, setDiscountPercent] = useState(0); // e.g., Senior 20%
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // Sync state changes to LocalStorage for persistence
  useEffect(() => {
    localStorage.setItem('sari_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sari_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sari_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('sari_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('sari_sales', JSON.stringify(salesHistory));
  }, [salesHistory]);

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
      cashier: 'Ate Inday (Owner)'
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
        prev.map((cust) =>
          cust.id === selectedUtangCustomer
            ? { ...cust, balance: cust.balance + totalAmount }
            : cust
        )
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
        prev.map((cust) =>
          cust.id === order.customerId
            ? { ...cust, balance: Math.max(0, cust.balance - order.totalAmount) }
            : cust
        )
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
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...editingProduct, ...productData } : p))
      );
      showToast(`Updated product ${productData.name}`);
    } else {
      const newProd = {
        ...productData,
        id: `P-${Math.floor(100 + Math.random() * 900)}`,
        icon: productData.icon || '📦'
      };
      setProducts((prev) => [newProd, ...prev]);
      showToast(`New item added: ${productData.name}`);
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

    setProducts((prev) =>
      prev.map((p) => (p.id === restockProduct.id ? { ...p, stock: p.stock + qty } : p))
    );

    showToast(`Added +${qty} units to ${restockProduct.name}`);
    setIsRestockModalOpen(false);
    setRestockProduct(null);
    setRestockQty('');
  };

  // Utang Customer CRUD & Payment Handlers
  const handleSaveCustomer = (custData) => {
    const newCust = {
      ...custData,
      id: `C-${Math.floor(10 + Math.random() * 90)}`,
      balance: parseFloat(custData.balance) || 0
    };
    setCustomers((prev) => [newCust, ...prev]);
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
      prev.map((c) =>
        c.id === selectedCustomerForPayment.id
          ? { ...c, balance: Math.max(0, c.balance - amt) }
          : c
      )
    );

    showToast(`Received ₱${amt.toFixed(2)} pabayad from ${selectedCustomerForPayment.name}!`);
    setIsPabayadModalOpen(false);
    setSelectedCustomerForPayment(null);
    setPabayadAmount('');
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-0 sm:p-4 transition-colors duration-300 font-sans ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-amber-50/50 text-slate-900'}`}>
      {isOffline && (
        <div className="w-full max-w-4xl mb-3 rounded-2xl border border-amber-300 bg-amber-100 px-4 py-2 text-center text-xs font-bold text-amber-900 shadow-sm">
          Offline mode active • local POS data stays saved on this device
        </div>
      )}
      
      {/* Viewport Frame Mode Toggle Toolbar */}
      <div className="hidden sm:flex items-center space-x-3 mb-3 text-xs font-semibold">
        <button
          onClick={() => setIsMobileFrame(!isMobileFrame)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700 transition shadow-sm"
        >
          {isMobileFrame ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
          <span>{isMobileFrame ? 'Full Viewport Mode' : 'Android Mobile Frame'}</span>
        </button>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition shadow-sm"
        >
          {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
        </button>
      </div>

      {/* Main Mobile App Container */}
      <div className={`relative w-full ${isMobileFrame ? 'max-w-[420px] h-[90vh] max-h-[880px] rounded-[38px] border-[8px] shadow-2xl' : 'max-w-4xl min-h-screen rounded-none sm:rounded-3xl border-0 sm:border'} overflow-hidden flex flex-col transition-all duration-300 ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800 shadow-amber-950/20' : 'bg-slate-50 border-amber-200/80 shadow-amber-200/50'
      }`}>

        {/* Android Notch Header (Only in Mobile Frame mode) */}
        {isMobileFrame && (
          <div className="w-full bg-slate-950 text-white pt-2 px-6 pb-1 flex justify-between items-center text-[11px] font-medium z-50 select-none">
            <span>09:41 AM</span>
            <div className="w-20 h-4 bg-black rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2"></div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1 rounded">ONLINE</span>
              <Wifi className="w-3 h-3 text-emerald-400" />
            </div>
          </div>
        )}

        {/* Sari-Sari Store App Top Bar */}
        <div className={`px-4 py-3 border-b flex items-center justify-between z-30 transition-colors ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-amber-500 text-white border-amber-600 shadow-md'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white text-amber-600 font-black text-xl flex items-center justify-center shadow-md transform -rotate-3">
              🏪
            </div>
            <div>
              <h1 className="text-base font-black leading-tight tracking-tight">Tindahan ni Ate Inday</h1>
              <p className="text-[10px] opacity-90 flex items-center space-x-1 font-medium">
                <span>Barangay 142 POS</span>
                <span>•</span>
                <span className="text-emerald-200 font-bold">₱ PHP Ready</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl hover:bg-black/10 transition sm:hidden"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="bg-white/20 backdrop-blur-xs px-2 py-1 rounded-xl text-[10px] font-bold flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Tingi Mode</span>
            </div>
          </div>
        </div>

        {/* Dynamic Viewport Container */}
        <div className="flex-1 overflow-y-auto relative flex flex-col bg-slate-100/50 dark:bg-slate-950/40">
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
        </div>

        {/* Floating Quick Cart Toggle Button (Only on Register Tab) */}
        {activeTab === 'register' && cart.length > 0 && !isCartOpen && (
          <div className="absolute bottom-16 left-3 right-3 z-30 animate-bounce-short">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-between transform transition active:scale-[0.98]"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 px-2.5 py-1 rounded-xl text-xs font-black">
                  {cart.reduce((a, b) => a + b.quantity, 0)} items
                </div>
                <span className="text-sm font-bold">View Cart Order</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-black">₱{totalAmount.toFixed(2)}</span>
                <ChevronUp className="w-5 h-5" />
              </div>
            </button>
          </div>
        )}

        {/* Cart Slide-up Bottom Drawer */}
        {isCartOpen && activeTab === 'register' && (
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
        <div className={`px-2 py-2 border-t flex justify-around items-center z-40 transition-colors ${
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

function RegisterView({ theme, products, categories, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery, addToCart, cart, totalAmount, setIsCartOpen }) {
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.barcode && p.barcode.includes(searchQuery));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-20">
      
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
                  <span className="text-2xl">{item.icon}</span>
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
      <div className={`w-full max-h-[85%] rounded-t-[32px] p-4 flex flex-col shadow-2xl transition-colors ${
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
          className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-2xl font-black text-sm shadow-lg flex items-center justify-center space-x-2"
        >
          <span>Pumunta sa Pagbabayad</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
}

function PaymentCheckoutModal({ theme, paymentStep, setPaymentStep, paymentMethod, setPaymentMethod, tenderedCash, setTenderedCash, customers, selectedUtangCustomer, setSelectedUtangCustomer, totalAmount, order, handleFinalizeTransaction, handleStartNewSale, onClose, showToast }) {
  const quickCashOptions = [totalAmount, 20, 50, 100, 200, 500, 1000];
  const calculatedChange = Math.max(0, (parseFloat(tenderedCash) || 0) - totalAmount);

  return (
    <div className="absolute inset-0 bg-black/70 z-50 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
      <div className={`w-full h-[92%] rounded-t-[36px] p-4 flex flex-col shadow-2xl ${
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
                  <p className="text-[10px] text-blue-100 font-mono">Scan via GCash App to Ate Inday (0917-XXX-1420)</p>
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
                <h3 className="font-black text-sm">Tindahan ni Ate Inday</h3>
                <p className="text-[10px] text-slate-500">Brgy. 142, Sari-Sari POS</p>
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
                <span className="text-2xl">{p.icon}</span>
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
    icon: product?.icon || '📦',
    hasTingi: product?.hasTingi || false,
    tingiPrice: product?.tingiPrice || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.retailPrice) return;
    onSave({
      ...formData,
      costPrice: parseFloat(formData.costPrice) || 0,
      retailPrice: parseFloat(formData.retailPrice) || 0,
      stock: parseFloat(formData.stock) || 0,
      reorderLevel: parseFloat(formData.reorderLevel) || 5,
      tingiPrice: parseFloat(formData.tingiPrice) || 0
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
              <label className="font-bold text-slate-500 block">Emoji / Icon</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className={`w-full p-2 rounded-xl border text-center font-bold ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-500 block">Puhunan (₱)</label>
              <input
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                className={`w-full p-2 rounded-xl border font-bold ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
            </div>
            <div>
              <label className="font-bold text-slate-500 block">Presyo ng Benta (₱)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.retailPrice}
                onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
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
              <div className="mt-1.5">
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

function RestockModal({ theme, product, restockQty, setRestockQty, onConfirm, onClose }) {
  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className={`w-full max-w-xs rounded-3xl p-4 space-y-3 ${
        theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
      }`}>
        <h3 className="font-black text-sm">Stock In: {product.name}</h3>
        <p className="text-xs text-slate-400">Magdagdag ng karagdagang stock sa bodega.</p>

        <input
          type="number"
          placeholder="Bilang ng Idadagdag (e.g. 24)"
          value={restockQty}
          onChange={(e) => setRestockQty(e.target.value)}
          className={`w-full p-2.5 rounded-2xl font-bold text-base border outline-none ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}
        />

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
  const totalOutstandingUtang = customers.reduce((a, b) => a + b.balance, 0);

  return (
    <div className="p-3 space-y-3 flex-1 flex flex-col pb-6">
      {/* Overview Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white space-y-1 shadow-md">
        <span className="text-xs font-bold opacity-90">Kabuuan ng Pautang sa Kapitbahay</span>
        <div className="text-2xl font-black">₱{totalOutstandingUtang.toFixed(2)}</div>
        <p className="text-[10px] opacity-80">{customers.filter((c) => c.balance > 0).length} Suki ang may balanseng utang</p>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="font-black text-sm">Listahan ng Suki (Utang Ledger)</h2>
        <button
          onClick={onAddCustomer}
          className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-xl font-bold text-xs flex items-center space-x-1"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Bagong Suki</span>
        </button>
      </div>

      <div className="space-y-2">
        {customers.map((c) => (
          <div
            key={c.id}
            className={`p-3 rounded-2xl border flex items-center justify-between ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div>
              <h4 className="font-bold text-xs">{c.name}</h4>
              <p className="text-[10px] text-slate-400">{c.phone} • {c.notes}</p>
            </div>

            <div className="text-right flex items-center space-x-2">
              <div>
                <span className={`text-xs font-black block ${c.balance > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                  ₱{c.balance.toFixed(2)}
                </span>
                <span className="text-[9px] text-slate-400">Utang</span>
              </div>

              {c.balance > 0 && (
                <button
                  onClick={() => onPabayad(c)}
                  className="bg-emerald-600 text-white px-2.5 py-1 rounded-xl font-bold text-[10px] shadow-xs"
                >
                  Magbayad
                </button>
              )}
            </div>
          </div>
        ))}
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
              <span>{p.icon} {p.name}</span>
            </div>
            <span className="font-bold text-slate-400">₱{p.retailPrice.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}