import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import AddressModal from '../AddressModal/AddressModal';

import { User, ShoppingBag, Heart, CreditCard, MapPin, Camera, ChevronDown, Package } from 'lucide-react';

const AccountPage = ({ user, onUpdateUser, onLogout, products = [] }) => {
  const [fullName, setFullName] = useState(user?.name || "");

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]); // This stores the saved data

  const handleSaveAddress = (newAddress) => {
    setSavedAddresses([...savedAddresses, newAddress]);
    console.log("Address Saved:", newAddress);
    // You could also send this to your backend here
  };

  
  // --- NEW STATES FOR NAVIGATION ---
  const [activeSection, setActiveSection] = useState('account'); // 'account', 'processing', 'delivered', 'cancelled'
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Helper to handle order sub-item clicks
  const handleOrderClick = (status) => {
    setActiveSection(status);
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 flex flex-col md:flex-row gap-6">
        
        {/* --- SIDEBAR --- */}
        <div className="w-full md:w-72 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveSection('account')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeSection === 'account' ? 'bg-[#F0F3FF] text-[#5271FF]' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <User size={18} /> My Account
              </button>

              {/* DROPDOWN ORDERS SECTION */}
              <div className="space-y-1">
                <button 
                  onClick={() => setIsOrdersOpen(!isOrdersOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3"><ShoppingBag size={18} /> Orders</div>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isOrdersOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Nested Items - Matching your Image exactly */}
                {isOrdersOpen && (
                  <div className="pl-12 pr-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {['Processing', 'Delivered', 'Cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleOrderClick(status.toLowerCase())}
                        className={`w-full text-left py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                          activeSection === status.toLowerCase() 
                          ? 'bg-[#F0F3FF] text-[#5271FF] font-bold' 
                          : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => setActiveSection('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                  activeSection === 'wishlist' ? 'bg-[#F0F3FF] text-[#5271FF]' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <Heart size={18} /> Wishlist
              </button>
              
              <div className="pt-4 mt-4 border-t border-gray-50 space-y-1">
                <button 
                  onClick={() => setActiveSection('payment')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                    activeSection === 'payment' ? 'bg-[#F0F3FF] text-[#5271FF]' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard size={18} /> Payment Method
                </button>

                <button 
                  onClick={() => setActiveSection('address')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${
                    activeSection === 'address' ? 'bg-[#F0F3FF] text-[#5271FF]' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={18} /> Address Book
                </button>

              </div>
            </nav>

            <button 
              onClick={onLogout}
              className="w-full mt-10 bg-[#E55F5F] text-white py-4 rounded-2xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
            >
              Log out
            </button>
          </div>
        </div>

        {/* --- MAIN CONTENT SECTION --- */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col items-center justify-center min-h-[500px]">
          {activeSection === 'account' ? (
            /* --- PROFILE VIEW --- */
            <div className="w-full max-w-sm flex flex-col items-center">
              
              {/* 1. Profile Avatar */}
              <div className="relative w-24 h-24 mb-10 cursor-pointer group">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
                  {/* Camera Icon Overlay */}
                  <Camera size={24} className="text-white" />
                </div>
              </div>

              {/* 2. Form Fields */}
              <div className="w-full space-y-6">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-400 mb-2 text-center md:text-left">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#F8F9FF] border border-gray-100 rounded-2xl px-6 py-4 text-gray-800 focus:border-[#5271FF] outline-none transition-all text-center"
                  />
                </div>

                {/* 3. Save Button */}
                <button 
                  onClick={() => onUpdateUser({ ...user, name: fullName })}
                  className="w-full bg-[#5271FF] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 mt-4"
                >
                  Save changes
                </button>
              </div>
            </div>
          ) :  activeSection === 'address' ? (
            /* --- ADDRESS BOOK VIEW (Matches New Image) --- */
            <div className="flex flex-col items-center justify-center text-center max-w-sm w-full animate-in fade-in duration-300">
              
              {/* Large Blue Location Pin Icon */}
              <div className="mb-6">
                <div className="relative flex justify-center">
                  <MapPin size={80} className="text-[#5271FF] fill-[#5271FF]/10" strokeWidth={1.5} />
                  {/* Subtle circle overlay for the "pin head" look from the image */}
                  <div className="absolute top-5 w-6 h-6 bg-white rounded-full shadow-inner" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#1e2a4a] mb-2">No Address</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                mi nullam tincidunt nulla ultrices, faucibus.
              </p>

              {/* Add Address Button */}
              <button 
                onClick={() => setIsAddressModalOpen(true)}
                className="w-full bg-[#5271FF] hover:bg-blue-600 text-white py-3.5 rounded-full font-bold flex items-center justify-center gap-2"
              >
                <span className="text-xl font-light">+</span> Add a new address
              </button>
            </div>

          ) : activeSection === 'wishlist' ? (
            /* --- WISHLIST VIEW (Matches your image) --- */
            <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
              <div className="relative mb-6">
                {/* Custom Icon: Shopping Bag + Heart */}
                <div className="w-20 h-24 bg-[#93A5FF] rounded-lg relative overflow-hidden flex items-center justify-center pb-2">
                  <div className="absolute top-2 w-8 h-8 border-4 border-black/10 rounded-full -translate-y-4" />
                  <Heart size={44} className="text-[#C6D0FF] fill-[#C6D0FF] absolute -right-4 bottom-2" />
                </div>
              </div>
              
              <h3 className="text-xl font-black text-[#1e2a4a] mb-2">No wishlist</h3>
              <p className="text-gray-400 text-sm max-w-[280px] leading-relaxed">
                mi nullam tincidunt nulla ultrices, faucibus.
              </p>
            </div>
          ) :  activeSection === 'payment' ? (
            /* --- PAYMENT METHOD VIEW (Matches Image) --- */
            <div className="flex flex-col items-center justify-center text-center max-w-md w-full animate-in fade-in duration-300">
              {/* Blue Card Icon */}
              <div className="w-24 h-16 bg-[#7B91FF] rounded-xl relative mb-8 flex items-center px-4">
                <div className="w-3 h-3 bg-white rounded-full opacity-80" />
              </div>

              <h3 className="text-xl font-bold text-[#1e2a4a] mb-2">Save cards for a faster checkout</h3>
              <p className="text-gray-400 text-sm mb-8">
                mi nullam tincidunt nulla ultrices, faucibus.
              </p>

              {/* Add Card Button */}
              <button className="w-full bg-[#5271FF] hover:bg-blue-600 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 mb-8">
                <span className="text-xl font-light">+</span> Add a credit or debit card
              </button>

              {/* Card Logos */}
              <div className="flex items-center gap-6 opacity-90 grayscale hover:grayscale-0 transition-all">
                <img src="./visa.svg" alt="Visa" className="w-[54px] h-[24px]" />
                <img src="./mastercard.svg" alt="Mastercard" className="w-[31px] h-[24px]" />
                {/* Placeholder for Verve */}
                <img src="./verve.svg" alt="Verve" className="w-[38px] h-[24px]" />
              </div>
            </div>

          ) : (
            /* --- EMPTY ORDERS VIEW (Triggers for Processing, Delivered, Cancelled) --- */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                <Package size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">No {activeSection} orders</h3>
              <p className="text-gray-400 max-w-xs">
                Items you order will appear here. Start shopping to fill your list!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- RECOMMENDED SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12">
        <div className="bg-[#FFA000] text-white px-6 py-3 rounded-lg font-bold mb-6 max-w-7xl">
          Recommended for you
        </div>
        <div className="border-0 bg-white p-6 overflow-x-auto flex gap-6 no-scrollbar rounded-2xl shadow-sm">
          {products?.length > 0 ? (
            products.map(p => (
              <div key={p.id} className="min-w-[250px]">
                <ProductCard {...p} />
              </div>
            ))
          ) : (
            <div className="text-gray-500 py-10 font-bold">loading products...</div>
          )}
        </div>
      </div>
      <AddressModal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)} 
        onSave={handleSaveAddress}
      />
    </div>  
  );
};

export default AccountPage;
