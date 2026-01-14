import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

const AddressModal = ({ isOpen, onClose, onSave }) => {
 const [formData, setFormData] = useState({
    country: 'Nigeria',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    isDefault: false
  });

  // 2. CONDITIONAL RETURNS SECOND
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors">
            <X size={20} />
          </button>
          <h2 className="text-lg font-bold text-[#1e2a4a]">Add a new address</h2>
          <div className="w-5" /> {/* Spacer for centering */}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[85vh] overflow-y-auto">
          
          {/* Country Select */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500">Country</label>
            <div className="relative">
              <select className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#5271FF]">
                <option>Nigeria</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">First Name</label>
              <input 
                placeholder="Enter first name" 
                className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#5271FF]"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">Last Name</label>
              <input 
                placeholder="Enter last name" 
                className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#5271FF]"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500">Phone Number</label>
            <div className="flex gap-2">
              <div className="bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 text-gray-500 whitespace-nowrap">
                NG +234
              </div>
              <input 
                type="tel" 
                className="flex-1 bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#5271FF]" 
              />
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-500">Delivery Address</label>
            <input 
              placeholder="Street number, name and other details" 
              className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 outline-none focus:border-[#5271FF]" 
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          {/* State & City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">State</label>
              <div className="relative">
                <select className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 appearance-none outline-none">
                  <option>Select</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500">City</label>
              <div className="relative">
                <select className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-4 py-3.5 appearance-none outline-none">
                  <option>Select</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          {/* Default Toggle */}
          <div className="flex items-center gap-3 py-2 cursor-pointer" onClick={() => setFormData({...formData, isDefault: !formData.isDefault})}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${formData.isDefault ? 'border-[#5271FF] bg-[#5271FF]' : 'border-gray-200'}`}>
              {formData.isDefault && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className="text-sm text-gray-500">Set as my default address</span>
          </div>

          {/* Save Button */}
          <button 
            type="submit"
            className="w-full bg-[#5271FF] text-white py-4 rounded-full font-bold shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all mt-4"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
