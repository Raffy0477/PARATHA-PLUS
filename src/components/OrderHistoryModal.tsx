import React, { useState, useEffect } from 'react';
import { 
  X, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShoppingBag, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { CustomerOrder } from '../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const ordersCol = collection(db, 'orders');
    const path = 'orders';

    // Build query based on role
    const q = isAdmin
      ? query(ordersCol)
      : query(ordersCol, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: CustomerOrder[] = [];
        snapshot.forEach((d) => {
          const data = d.data();
          fetched.push({
            id: d.id,
            userId: data.userId,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            orderType: data.orderType,
            deliveryAddress: data.deliveryAddress,
            items: data.items,
            totalAmount: data.totalAmount,
            status: data.status,
            notes: data.notes,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
          });
        });

        // Sort latest first
        fetched.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });

        setOrders(fetched);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, user, isAdmin]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 text-white shadow-2xl relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white font-serif-title">
                {isAdmin ? 'Admin: All Orders (RYK Branch)' : 'My Orders & History'}
              </h3>
              <p className="text-xs text-stone-400">
                Live status tracking synced with Paratha Plus kitchen
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {loading ? (
            <div className="py-16 text-center text-stone-400 text-xs">
              Loading orders from database...
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-stone-600 mx-auto" />
              <p className="text-stone-300 font-medium text-sm">No orders found yet</p>
              <p className="text-stone-500 text-xs">
                When you place orders on the website, you can track them here!
              </p>
            </div>
          ) : (
            orders.map((ord) => {
              let parsedItems: any[] = [];
              try {
                parsedItems = JSON.parse(ord.items);
              } catch {
                parsedItems = [];
              }

              const statusColor = {
                pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
                confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
                preparing: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
                ready: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
                delivered: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
              }[ord.status] || 'bg-stone-800 text-stone-300';

              return (
                <div
                  key={ord.id}
                  className="bg-stone-900/80 rounded-2xl p-4 border border-stone-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-400">
                        #{ord.id?.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-stone-400 text-xs ml-2">
                        {ord.createdAt ? new Date(ord.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${statusColor}`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-1 py-1">
                    {parsedItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-stone-200">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-stone-400 font-mono">
                          Rs. {item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                    <span className="text-stone-400">
                      Fulfillment: <strong className="text-white capitalize">{ord.orderType}</strong>
                    </span>
                    <span className="text-sm font-black text-amber-400">
                      Total: Rs. {ord.totalAmount}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
