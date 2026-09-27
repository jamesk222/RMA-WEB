import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-slate-900 text-white rounded-lg shadow-xl border border-slate-800 transition-all duration-200 transform translate-y-0"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-sm">
            <p className="font-semibold text-white leading-tight">{toast.title}</p>
            {toast.message && (
              <p className="text-xs text-slate-300 mt-1 leading-normal">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
