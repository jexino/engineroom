import React, { useState,} from 'react';
import { X, ChevronDown, CreditCard, Lock, CheckCircle, Plus } from 'lucide-react';


const CardModal = ({ isOpen, onClose, onSave, savedAddresses = [], onAddNewAddress }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    billingAddressId: '',
    isDefault: false
  });

  if (!isOpen) return null;

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setFormData({ ...formData, cardNumber: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/20 backdrop-blur-[2px] p-4 pt-10 sm:pt-20">
      <div className="bg-white w-full max-w-[480px] rounded-xl overflow-hidden shadow-2xl animate-in slide-in-from-top-5 duration-300">
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={20} />
          </button>
          <h2 className="text-lg font-bold text-[#1e2a4a]">Add a new credit card</h2>
          <div className="w-5" />
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500">Credit card *</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <CreditCard size={20} />
              </div>
              <input 
                required
                type="text"
                placeholder="0000 0000 0000 0000" 
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl pl-12 pr-12 py-3.5 outline-none focus:border-[#5271FF] font-medium"
              />
              {formData.cardNumber.length === 19 && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                  <CheckCircle size={20} />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">Expiration Date *</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select 
                    required
                    value={formData.expMonth}
                    onChange={(e) => setFormData({...formData, expMonth: e.target.value})}
                    className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-3 py-3.5 appearance-none outline-none text-sm font-medium cursor-pointer"
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                </div>
                <div className="relative flex-1">
                  <select 
                    required
                    value={formData.expYear}
                    onChange={(e) => setFormData({...formData, expYear: e.target.value})}
                    className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-3 py-3.5 appearance-none outline-none text-sm font-medium cursor-pointer"
                  >
                    <option value="">Year</option>
                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">CVV *</label>
              <div className="relative">
                <input 
                  required
                  type="text"
                  maxLength="4"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
                  className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#5271FF] font-medium"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2 relative">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-500">Billing Address *</label>
              <button 
                type="button" 
                onClick={onAddNewAddress} 
                className="text-[#5271FF] text-sm font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus size={16} /> Add new
              </button>
            </div>
            
            {savedAddresses.length === 0 ? (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-amber-700 text-xs font-medium">Please add an address first to continue.</p>
              </div>
            ) : (
              <div className="relative">
                <select 
                  required
                  value={formData.billingAddressId}
                  onChange={(e) => setFormData({...formData, billingAddressId: e.target.value})}
                  className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#5271FF] text-sm font-medium cursor-pointer"
                >
                  <option value="">Select billing address</option>
                  {savedAddresses.map((addr, index) => (
                    <option key={index} value={index}>
                      {addr.firstName} {addr.lastName}, {addr.address}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 py-2 cursor-pointer select-none" onClick={() => setFormData({...formData, isDefault: !formData.isDefault})}>
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${formData.isDefault ? 'border-[#5271FF] bg-[#5271FF]' : 'border-gray-200'}`}>
              {formData.isDefault && <CheckCircle size={14} className="text-white" />}
            </div>
            <span className="text-sm text-gray-500 font-medium">Set as my default card</span>
          </div>

          <button 
            type="submit"
            disabled={savedAddresses.length === 0}
            className="w-full bg-[#5271FF] text-white py-4 rounded-full font-bold shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add your card
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardModal;