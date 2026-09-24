import React from 'react';
import { User, Package, MapPin, Shield, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Order } from '../../types';

interface AccountViewProps {
  orders: Order[];
  onOpenPrivacy: () => void;
  onOpenAdmin: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  orders,
  onOpenPrivacy,
  onOpenAdmin,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
            alt="Customer profile"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50"
          />
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Alex Rivera
            </h2>
            <p className="text-xs text-slate-500">
              alex.rivera@example.com • ZuAQ VIP Member
            </p>
            <span className="inline-block bg-blue-50 text-blue-700 font-bold text-[10px] px-2 py-0.5 rounded-full mt-1">
              Tier 1 • Free Express Shipping
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPrivacy}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            AI Privacy Controls
          </button>
          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
          >
            Store Owner Portal
          </button>
        </div>
      </div>

      {/* Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">
              Order History ({orders.length})
            </h3>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-2">
            <Package className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No orders placed yet</p>
            <p className="text-xs text-slate-400">
              Your confirmed orders with live courier tracking will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs">
                  <div>
                    <span className="font-mono font-bold text-blue-600">
                      Order #{ord.orderNumber}
                    </span>
                    <span className="text-slate-400 ml-2">Placed on {ord.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        ord.status === 'Processing'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : ord.status === 'Shipped'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {ord.status}
                    </span>
                    <span className="font-black text-slate-900 tabular-nums">
                      ${ord.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          {item.color}
                          {item.size ? ` • ${item.size}` : ''} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-slate-800 tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Info */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      Estimated Arrival: <strong className="text-slate-800">{ord.estimatedDelivery}</strong>
                    </span>
                  </div>
                  <span>
                    Delivering to: {ord.customer.address}, {ord.customer.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
