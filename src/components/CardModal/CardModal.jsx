import React, { useState, useEffect } from 'react';
import { X, ChevronDown, CreditCard, Lock, CheckCircle, Plus } from 'lucide-react';

const CardModal = ({ isOpen, onClose, onSave, savedAddresses = [] }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    billingAddressId: '', // 8. Store the ID of the selected address
    isDefault: false
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvv: '',
        billingAddressId: '',
        isDefault: false
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Simple formatter: 0000 0000 0000 0000
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
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={20} />
          </button>
          <h2 className="text-lg font-bold text-[#1e2a4a]">Add a new credit card</h2>
          <div className="w-5" />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Credit Card Number */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500">Credit card *</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <CreditCard size={20} />
              </div>
              <input 
                required
                type="text"
                placeholder="Enter card" 
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

          {/* Expiration and CVV Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">Expiration Date *</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select 
                    required
                    value={formData.expMonth}
                    onChange={(e) => setFormData({...formData, expMonth: e.target.value})}
                    className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-3 py-3.5 appearance-none outline-none text-sm font-medium"
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
                    className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-3 py-3.5 appearance-none outline-none text-sm font-medium"
                  >
                    <option value="">Year</option>
                    {[2024, 2025, 2026, 2027, 2028].map(year => (
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
                  placeholder="3-4 Digit code"
                  value={formData.cvv}
                  onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '')})}
                  className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#5271FF] font-medium"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* 9. UPDATED: BILLING ADDRESS SECTION (Matching image + saved addresses logic) */}
          <div className="space-y-2 relative">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-500">Billing Address *</label>
              <button type="button" className="text-[#5271FF] text-sm font-semibold flex items-center gap-1">
                <Plus size={16} /> Add a new address
              </button>
            </div>
            
            {savedAddresses.length === 0 ? (
              <p className="text-gray-400 text-sm py-2">Billing address is empty</p>
            ) : (
              // 10. NEW: Select Dropdown populated with saved addresses
              <div className="relative">
                <select 
                  required
                  value={formData.billingAddressId}
                  onChange={(e) => setFormData({...formData, billingAddressId: e.target.value})}
                  className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#5271FF] text-sm font-medium"
                >
                  <option value="">Select billing address</option>
                  {savedAddresses.map((addr, index) => (
                    // We can use index as key/id for simplicity in localStorage
                    <option key={index} value={index}>
                      {addr.firstName} {addr.lastName}, {addr.address}, {addr.city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            )}
          </div>

          {/* Default Toggle */}
          <div className="flex items-center gap-3 py-2 cursor-pointer" onClick={() => setFormData({...formData, isDefault: !formData.isDefault})}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.isDefault ? 'border-[#5271FF] bg-[#5271FF]' : 'border-gray-200'}`}>
              {formData.isDefault && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className="text-sm text-gray-500">Set as my default card</span>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-[#5271FF] text-white py-4 rounded-full font-bold shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all mt-4"
          >
            Add your card
          </button>

          {/* Logos from request image */}
          <div className="flex justify-center items-center gap-6 pt-2 opacity-80">
            <img src="/visa.svg" alt="Visa" className="h-4" />
            <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="/verve.svg" alt="Verve" className="h-5" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardModal;