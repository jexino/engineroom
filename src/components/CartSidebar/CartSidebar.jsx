import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus, AlertCircle } from 'lucide-react';

const CartSidebar = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity }) => {
  // Track which item is currently in "confirm delete" mode
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const total = cart.reduce((sum, item) => sum + (item.price * 1500 * item.quantity), 0);

  const handleRemoveClick = (id) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const confirmDelete = (id) => {
    onRemove(id);
    setConfirmDeleteId(null);
  };

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} 
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className={`fixed right-0 top-0 h-full z-[70] bg-white shadow-2xl transition-transform duration-500 ease-in-out transform 
        w-full sm:max-w-md 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-[#1e2a4a] text-white">
            <div className="flex items-center gap-3">
              <ShoppingBag size={22} />
              <h2 className="font-bold text-base sm:text-lg">My Cart ({cart.length})</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
              <X size={24} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <ShoppingBag size={48} className="text-gray-200" />
                <p className="text-[#1e2a4a] font-bold">Your cart is empty</p>
                <button onClick={onClose} className="text-[#5271FF] text-sm font-bold underline">Continue Shopping</button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="relative group border-b border-gray-50 pb-4">
                  
                  {/* Item Content */}
                  <div className={`flex gap-4 transition-opacity duration-200 ${confirmDeleteId === item.id ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-50 rounded-xl border p-2">
                      <img src={item.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm text-[#1e2a4a] line-clamp-1">{item.title}</h3>
                        <button 
                          onClick={() => handleRemoveClick(item.id)} 
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-[#5271FF] font-black text-sm">₦ {(item.price * 1500).toLocaleString()}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1 border">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 disabled:opacity-20"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Inline Delete Confirmation Overlay */}
                  {confirmDeleteId === item.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px] animate-in fade-in zoom-in duration-200 rounded-xl">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-[11px] font-bold text-gray-600 flex items-center gap-1 uppercase tracking-tighter">
                          <AlertCircle size={14} className="text-red-500" /> Remove this item?
                        </p>
                        <div className="flex gap-2">
                          <button 
                            onClick={cancelDelete}
                            className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[11px] font-bold transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => confirmDelete(item.id)}
                            className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[11px] font-bold transition-colors shadow-sm shadow-red-200"
                          >
                            Yes, Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t bg-white">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Total</span>
                <span className="font-black text-2xl text-[#1e2a4a]">₦ {total.toLocaleString()}</span>
              </div>
              
              <button className="w-full bg-[#22C55E] text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-50">
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f1f1f1; border-radius: 10px; }
      `}</style>
    </>
  );
};

export default CartSidebar;