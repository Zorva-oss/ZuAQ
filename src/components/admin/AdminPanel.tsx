import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  ShoppingBag,
  Sparkles,
  Database,
  Plus,
  Edit2,
  Trash2,
  Check,
  AlertTriangle,
  Clock,
  Eye,
  Sliders,
  FileCode,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { Product, Order, StockNotification } from '../../types';
import { MYSQL_SCHEMA_DEFINITION, PHP_SAMPLE_CODE } from '../../data/mockData';

interface AdminPanelProps {
  products: Product[];
  onUpdateProduct: (updated: Product) => void;
  onAddProduct: (newProd: Product) => void;
  onDeleteProduct: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  stockAlerts: StockNotification[];
  topAnnouncement: string;
  onUpdateTopAnnouncement: (text: string) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  stockAlerts,
  topAnnouncement,
  onUpdateTopAnnouncement,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'promos' | 'ai' | 'database'
  >('overview');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // New Product Form State
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Electronics');
  const [newProductDept, setNewProductDept] = useState('Audio & Gadgets');
  const [newProductPrice, setNewProductPrice] = useState(99);
  const [newProductOriginalPrice, setNewProductOriginalPrice] = useState(129);
  const [newProductStock, setNewProductStock] = useState(15);
  const [newProductDescription, setNewProductDescription] = useState('');
  const [newProductImage, setNewProductImage] = useState(
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop'
  );

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const soldOutProducts = products.filter((p) => p.stock <= 0);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    onUpdateProduct(editingProduct);
    setEditingProduct(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProductName || 'New ZuAQ Lifestyle Drop',
      tagline: 'Curated ZuAQ exclusive',
      description:
        newProductDescription ||
        'Premium build designed for modern daily utility and sleek aesthetics.',
      price: Number(newProductPrice),
      originalPrice: Number(newProductOriginalPrice),
      discountPercent: Math.round(
        ((newProductOriginalPrice - newProductPrice) / newProductOriginalPrice) * 100
      ),
      rating: 5.0,
      reviewCount: 1,
      category: newProductCategory,
      department: newProductDept,
      tags: [newProductCategory, 'New'],
      badge: 'New Arrival',
      colors: [{ name: 'Matte Onyx', hex: '#1E293B' }],
      stock: Number(newProductStock),
      images: [newProductImage],
      features: ['Precision engineered', '30-Day Hassle-Free returns'],
      specs: { Origin: 'ZuAQ Design Lab' },
    };

    onAddProduct(created);
    setIsAddProductOpen(false);
    // Reset form
    setNewProductName('');
    setNewProductPrice(99);
    setNewProductStock(15);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Admin Header */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
              ZuAQ Store Administrator Console
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Store Management & Diagnostics
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Exit to Storefront
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products & Stock ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('promos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'promos'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Banners & Campaigns</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'ai'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>AI Engine Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'database'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>MySQL & PHP Architecture</span>
        </button>
      </div>

      {/* Tab 1: Overview KPIs */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Total Sales Volume
                </span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tabular-nums">
                ${totalRevenue.toFixed(2)}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24% vs last week
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Active Orders
                </span>
                <ShoppingBag className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 tabular-nums">
                {orders.length}
              </p>
              <span className="text-[11px] text-slate-500 font-medium">
                {orders.filter((o) => o.status === 'Processing').length} pending dispatch
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Sold-Out Products
                </span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <p className="text-2xl font-black text-rose-600 tabular-nums">
                {soldOutProducts.length} SKUs
              </p>
              <span className="text-[11px] text-slate-500 font-medium">
                {stockAlerts.length} restock waitlist requests
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">
                  AI Personalization CTR
                </span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-black text-blue-600 tabular-nums">
                34.8%
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold">
                +18.2% higher conversion
              </span>
            </div>
          </div>

          {/* Restock Waitlist Submissions */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900">
              Customer Restock Waitlist Requests ({stockAlerts.length})
            </h3>
            {stockAlerts.length > 0 ? (
              <div className="space-y-2">
                {stockAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {alert.productName}
                      </span>
                      <span className="text-slate-500 font-mono">
                        {alert.email}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {alert.date}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-2">
                No active restock alerts registered yet. Test by clicking "Notify Me" on any sold-out product!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Product & Stock Manager */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Product Inventory & Sold-Out Controller
              </h2>
              <p className="text-xs text-slate-500">
                Adjust prices, discounts, and real-time stock levels. Click "Make Sold Out" to immediately test zero-stock states.
              </p>
            </div>
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => {
                    const isSoldOut = p.stock <= 0;
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-slate-900 block truncate max-w-[200px]">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {p.category}
                            </span>
                          </div>
                        </td>
                        <td className="p-3.5 font-medium text-slate-600">
                          {p.department}
                        </td>
                        <td className="p-3.5 font-black text-slate-900 tabular-nums">
                          ${p.price}
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-800">
                              {p.stock}
                            </span>
                            {/* Fast Stock Toggle Button */}
                            {isSoldOut ? (
                              <button
                                onClick={() =>
                                  onUpdateProduct({ ...p, stock: 10 })
                                }
                                className="px-2 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-bold cursor-pointer"
                              >
                                Restock (+10)
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  onUpdateProduct({ ...p, stock: 0 })
                                }
                                className="px-2 py-0.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[10px] font-bold cursor-pointer"
                              >
                                Set Sold Out
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5">
                          {isSoldOut ? (
                            <span className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px] uppercase">
                              Sold Out
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-[10px]">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-600 hover:text-blue-600 cursor-pointer"
                              title="Edit product details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(p.id)}
                              className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Orders Manager */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Customer Orders & Fulfillment Tracker
          </h2>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Order #</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Total</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/70">
                      <td className="p-3.5 font-mono font-bold text-blue-600">
                        #{o.orderNumber}
                      </td>
                      <td className="p-3.5 text-slate-500">{o.date}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">
                          {o.customer.fullName}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {o.customer.city} • {o.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600">
                        {o.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                      </td>
                      <td className="p-3.5 font-black text-slate-900 tabular-nums">
                        ${o.total.toFixed(2)}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            onUpdateOrderStatus(
                              o.id,
                              e.target.value as Order['status']
                            )
                          }
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold bg-white outline-none cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Promo Banners */}
      {activeTab === 'promos' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900">
            Promotional Announcements & Flash Deal Controls
          </h2>

          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Top Announcement Bar Text
              </label>
              <textarea
                rows={2}
                value={topAnnouncement}
                onChange={(e) => onUpdateTopAnnouncement(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-blue-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
              <span className="font-bold text-amber-900 block">
                Active Promo Code: ZUAQSUMMER
              </span>
              <p className="text-amber-800">
                Grants 30% instant discount at checkout across audio & wearable categories.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: AI Engine Tuning */}
      {activeTab === 'ai' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                ZuAQ AI Personalization Weights & Settings
              </h2>
              <p className="text-xs text-slate-500">
                Fine-tune algorithm balance for real-time recommendations and Gemini 3.8 Flash stylist behavior.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">
                Session Browsing Affinity
              </span>
              <p className="text-slate-500 text-[11px]">
                Weight given to recently viewed products and active category clicks.
              </p>
              <input
                type="range"
                defaultValue={85}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-[10px] text-blue-600 font-bold">85% (High Affinity)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">
                Global Trending Velocity
              </span>
              <p className="text-slate-500 text-[11px]">
                Weight given to top-selling and high user rating drops this week.
              </p>
              <input
                type="range"
                defaultValue={70}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-[10px] text-blue-600 font-bold">70% (Balanced)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-800 block">
                Exploration Diversity
              </span>
              <p className="text-slate-500 text-[11px]">
                Injects unexpected complementary categories into "Curated For You".
              </p>
              <input
                type="range"
                defaultValue={45}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <span className="text-[10px] text-blue-600 font-bold">45% (Moderate)</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: MySQL & PHP Architecture Export */}
      {activeTab === 'database' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              MySQL & PHP Architecture Export (Shared Hosting / cPanel)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              As requested in your brief, here are the ready-to-run MySQL table definitions and PHP 8+ PDO model classes matching the exact structure of this app.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">
                1. MySQL DDL Schema (`zuaq_schema.sql`):
              </span>
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto max-h-72 border border-slate-800">
                {MYSQL_SCHEMA_DEFINITION}
              </pre>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">
                2. PHP Product Repository Class (`ProductRepository.php`):
              </span>
              <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto max-h-72 border border-slate-800">
                {PHP_SAMPLE_CODE}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">
              Edit Product: {editingProduct.name}
            </h3>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">
              Add New Product to ZuAQ Catalog
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AeroLite Soundbar 360"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <select
                    value={newProductDept}
                    onChange={(e) => setNewProductDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
                  >
                    <option value="Audio & Gadgets">Audio & Gadgets</option>
                    <option value="Smart Wear">Smart Wear</option>
                    <option value="Modern Footwear">Modern Footwear</option>
                    <option value="Home Aesthetics">Home Aesthetics</option>
                    <option value="Everyday Carry">Everyday Carry</option>
                    <option value="Wellness & Fit">Wellness & Fit</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none bg-white"
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Bags">Bags</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Home & Lifestyle">Home & Lifestyle</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={newProductPrice}
                    onChange={(e) => setNewProductPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    value={newProductOriginalPrice}
                    onChange={(e) =>
                      setNewProductOriginalPrice(Number(e.target.value))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    value={newProductStock}
                    onChange={(e) => setNewProductStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newProductImage}
                  onChange={(e) => setNewProductImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 cursor-pointer"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
