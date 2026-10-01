import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  action?: ToastAction;
  duration?: number;
  imageUrl?: string;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
  success: (title: string, message?: string, action?: ToastAction, imageUrl?: string) => string;
  info: (title: string, message?: string, action?: ToastAction) => string;
  error: (title: string, message?: string) => string;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => '',
  dismissToast: () => {},
  success: () => '',
  info: () => '',
  error: () => '',
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((toastData: Omit<ToastItem, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastItem = {
      id,
      duration: 4000,
      ...toastData,
    };

    setToasts((prev) => [...prev.slice(-3), newToast]); // Keep maximum 4 concurrent toasts

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, newToast.duration);
    }

    return id;
  }, [dismissToast]);

  const success = useCallback((title: string, message?: string, action?: ToastAction, imageUrl?: string) => {
    return showToast({ title, message, type: 'success', action, imageUrl });
  }, [showToast]);

  const info = useCallback((title: string, message?: string, action?: ToastAction) => {
    return showToast({ title, message, type: 'info', action });
  }, [showToast]);

  const error = useCallback((title: string, message?: string) => {
    return showToast({ title, message, type: 'error' });
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, success, info, error }}>
      {children}
      
      {/* Toast Notification Container */}
      <div 
        aria-live="polite" 
        className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm sm:max-w-md w-full pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const icons = {
              success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
              info: <Info className="w-5 h-5 text-amber-400 shrink-0" />,
              warning: <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0" />,
              error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
            };

            const borderColors = {
              success: 'border-emerald-500/40 bg-stone-950/95 shadow-emerald-950/30',
              info: 'border-amber-500/40 bg-stone-950/95 shadow-amber-950/30',
              warning: 'border-yellow-500/40 bg-stone-950/95 shadow-yellow-950/30',
              error: 'border-red-500/40 bg-stone-950/95 shadow-red-950/30',
            };

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-start gap-3.5 ${borderColors[toast.type]}`}
              >
                {/* Image preview or standard icon */}
                {toast.imageUrl ? (
                  <img
                    src={toast.imageUrl}
                    alt=""
                    className="w-11 h-11 rounded-xl object-cover border border-amber-500/40 shrink-0 shadow-sm"
                  />
                ) : (
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                    {icons[toast.type]}
                  </div>
                )}

                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-xs sm:text-sm text-white truncate">
                      {toast.title}
                    </h5>
                  </div>
                  {toast.message && (
                    <p className="text-xs text-stone-300 mt-0.5 line-clamp-2 leading-relaxed">
                      {toast.message}
                    </p>
                  )}

                  {/* Optional Action Button */}
                  {toast.action && (
                    <button
                      onClick={() => {
                        toast.action?.onClick();
                        dismissToast(toast.id);
                      }}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider group"
                    >
                      <span>{toast.action.label}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  )}
                </div>

                {/* Dismiss Button */}
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-900 transition-colors shrink-0"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
