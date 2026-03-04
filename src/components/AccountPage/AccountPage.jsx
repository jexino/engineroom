import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import AddressModal from '../AddressModal/AddressModal';
import CardModal from '../CardModal/CardModal'; // Ensure you create this component
import { User, ShoppingBag, Heart, CreditCard, MapPin, Camera, ChevronDown, Package, Trash2, Home, Plus } from 'lucide-react';

const AccountPage = ({ user, onUpdateUser, onLogout, onProductClick, products = [], wishlist = [], onRemoveFromWishlist, onAddToCart }) => {
  const [fullName, setFullName] = useState(user?.name || "");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false); // New state for card modal
  const [activeSection, setActiveSection] = useState('account');
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  // Initialize savedAddresses state from localStorage (or empty array if nothing exists)
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('userAddresses');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. NEW: Initialize savedCards state from localStorage
  const [savedCards, setSavedCards] = useState(() => {
    const saved = localStorage.getItem('userCards');
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage whenever the savedAddresses state changes
  useEffect(() => {
    localStorage.setItem('userAddresses', JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  // 3. NEW: Update localStorage whenever the savedCards state changes
  useEffect(() => {
    localStorage.setItem('userCards', JSON.stringify(savedCards));
  }, [savedCards]);

  const handleSaveAddress = (newAddress) => {
    setSavedAddresses([...savedAddresses, newAddress]);
    console.log('Saved Address to LocalStorage:', newAddress);
  };

  // 4. NEW: Logic to handle saving a new card, including billing address ID
  const handleSaveCard = (cardData) => {
    setSavedCards(prev => [...prev, cardData]);
    console.log('Saved Card to LocalStorage:', cardData);
  };

  const handleDeleteAddress = (indexToDelete) => {
    setSavedAddresses(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  // 5. NEW: Logic to handle deleting a card
  const handleDeleteCard = (indexToDelete) => {
    setSavedCards(prev => prev.filter((_, index) => index !== indexToDelete));
  };

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

              <div className="space-y-1">
                <button
                  onClick={() => setIsOrdersOpen(!isOrdersOpen)}
                  className="w-full flex items-center justify-between px-4 py-3.5 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3"><ShoppingBag size={18} /> Orders</div>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isOrdersOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOrdersOpen && (
                  <div className="pl-12 pr-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                    {['Processing', 'Delivered', 'Cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleOrderClick(status.toLowerCase())}
                        className={`w-full text-left py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${activeSection === status.toLowerCase() ? 'bg-[#F0F3FF] text-[#5271FF] font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setActiveSection('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeSection === 'wishlist' ? 'bg-[#F0F3FF] text-[#5271FF]' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Heart size={18} /> Wishlist
              </button>

              <div className="pt-4 mt-4 border-t border-gray-50 space-y-1">
                <button
                  onClick={() => setActiveSection('payment')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeSection === 'payment' ? 'bg-[#F0F3FF] text-[#5271FF]' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <CreditCard size={18} /> Payment Method
                </button>

                <button
                  onClick={() => setActiveSection('address')}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${activeSection === 'address' ? 'bg-[#F0F3FF] text-[#5271FF]' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <MapPin size={18} /> Address Book
                </button>
              </div>
            </nav>

            <button
              onClick={onLogout}
              className="w-full mt-10 bg-[#E55F5F] text-white py-4 rounded-full font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-100"
            >
              Log out
            </button>
          </div>
        </div>

        {/* --- MAIN CONTENT SECTION --- */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
          
          {/* Account Details */}
          {activeSection === 'account' && (
            <div className="w-full h-full flex flex-col items-start ">
              <div className="w-full max-w-sm flex flex-col items-start">
                <div className="relative w-24 h-24 mb-10 cursor-pointer group">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <div className="w-full space-y-6">
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-400 mb-2 text-center md:text-left">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#F8F9FF] border border-gray-100 rounded-xl px-6 py-4 text-gray-800 focus:border-[#5271FF] outline-none transition-all text-left"
                    />
                  </div>
                  <button
                    onClick={() => onUpdateUser({ ...user, name: fullName })}
                    className="w-full bg-[#5271FF] text-white py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Wishlist */}
          {activeSection === 'wishlist' && (
            <div className="w-full">
              <h2 className="text-xl font-bold text-[#1e2a4a] mb-6 border-b border-gray-100 pb-4">Wishlist</h2>
              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Heart size={60} className="text-gray-100 mb-4" fill="#f3f4f6" />
                  <h3 className="text-xl font-black text-[#1e2a4a] mb-2">No wishlist</h3>
                  <p className="text-gray-400 text-sm">Items added to your wishlist will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm gap-4">
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        <img src={item.image} alt="" className="w-16 h-16 object-contain flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-[#1e2a4a] text-sm truncate">{item.title}</h4>
                          <p className="font-black text-[#1e2a4a]">₦ {(item.price * 1500).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => onRemoveFromWishlist(item)} className="p-2.5 text-red-400"><Trash2 size={18} /></button>
                        <button onClick={() => onAddToCart(item, 1)} className="bg-[#22C55E] text-white px-4 py-2 rounded-xl font-bold text-xs">Add to cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Address Book - FIXED LOGIC */}
          {activeSection === 'address' && (
            <div className="w-full">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-xl font-bold text-[#1e2a4a]">Address Book</h2>
                {savedAddresses.length > 0 && (
                  <button onClick={() => setIsAddressModalOpen(true)} className="text-[#5271FF] font-bold text-sm flex items-center gap-1">
                    <Plus size={16} /> Add New
                  </button>
                )}
              </div>

              {savedAddresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center max-w-sm mx-auto">
                  <MapPin size={80} className="text-[#5271FF] fill-[#5271FF]/10 mb-6" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-[#1e2a4a] mb-2">No Address</h3>
                  <p className="text-gray-400 text-sm mb-8">Click "Add New" to save your delivery addresses.</p>
                  <button onClick={() => setIsAddressModalOpen(true)} className="w-full bg-[#5271FF] text-white py-3.5 rounded-full font-bold">
                    Add a new address
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedAddresses.map((addr, index) => (
                    <div key={index} className="border border-gray-100 rounded-2xl p-5 relative shadow-sm">
                      {addr.isDefault && <span className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">Default</span>}
                      <div className="flex items-center gap-3 mb-3">
                        <Home className="text-blue-500" size={20} />
                        <h4 className="font-bold text-[#1e2a4a]">{addr.firstName} {addr.lastName}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{addr.address}</p>
                      <p className="text-sm text-gray-600 mb-3">{addr.city}, {addr.state}</p>
                      <button onClick={() => handleDeleteAddress(index)} className="text-red-500 text-sm font-semibold flex items-center gap-1">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payment Method */}
          {activeSection === 'payment' && (
            <div className="w-full">
              {savedCards.length === 0 ? (
                /* --- ONLY SHOW THIS WHEN NO CARDS EXIST --- */
                <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-300 mx-auto max-w-md">
                  <div className="w-24 h-16 bg-[#7B91FF] rounded-xl relative mb-8 flex items-center px-4">
                    <div className="w-3 h-3 bg-white rounded-full opacity-80" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e2a4a] mb-2">Save cards for a faster checkout</h3>
                  <p className="text-gray-400 text-sm mb-8">Securely save your payment details for your next purchase.</p>
                  <button 
                    onClick={() => setIsCardModalOpen(true)} 
                    className="w-full bg-[#5271FF] hover:bg-blue-600 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100 mb-8"
                  >
                    <Plus size={20} /> Add a credit or debit card
                  </button>
                  <div className="flex items-center gap-6 opacity-60">
                    <img src="/visa.svg" alt="Visa" className="h-4" />
                    <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
                    <img src="/verve.svg" alt="Verve" className="h-5" />
                  </div>
                </div>
              ) : (
                /* --- ONLY SHOW THIS (TOP HEADER + LIST) WHEN CARDS ARE ADDED --- */
                <>
                  <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-[#1e2a4a]">Payment Method</h2>
                    <button
                      onClick={() => setIsCardModalOpen(true)}
                      className="bg-[#5271FF] text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 text-sm"
                    >
                      <span className="text-xl font-light">+</span> Add a new card
                    </button>
                  </div>

                  <div className="space-y-4">
                    {savedCards.map((card, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm gap-4 hover:shadow-md transition-all">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <img src="/mastercard.svg" alt="Mastercard" className="h-6 object-contain" />
                          <div>
                            <h4 className="font-bold text-[#1e2a4a]">Master card ending with {card.cardNumber.slice(-4)}</h4>
                            {card.isDefault && <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded">DEFAULT</span>}
                          </div>
                        </div>
                        <div className="flex gap-4 w-full sm:w-auto justify-end">
                          <button className="text-[#5271FF] text-sm font-semibold hover:underline">Edit</button>
                          <button onClick={() => handleDeleteCard(index)} className="text-red-500 text-sm font-semibold hover:underline">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Order Statuses */}
          {['processing', 'delivered', 'cancelled'].includes(activeSection) && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package size={40} className="text-gray-300 mb-6" />
              <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize">No {activeSection} orders</h3>
              <p className="text-gray-400 max-w-xs">Items you order will appear here.</p>
            </div>
          )}

        </div>
      </div>

       {/* Recommended Section */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12">

        <div className="bg-[#FFA000] text-white px-6 py-3 rounded-lg font-bold mb-6">Recommended for you</div>

        <div className="bg-white p-6 overflow-x-auto flex gap-6 no-scrollbar rounded-2xl shadow-sm border border-gray-100">

          {products.slice(0, 6).map(p => (

            <div key={p.id} className="min-w-[250px]"><ProductCard {...p} onViewDetails={() => onProductClick(p)} /></div>

          ))}

        </div>

      </div>

      <AddressModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} onSave={handleSaveAddress} />
      <CardModal isOpen={isCardModalOpen} onClose={() => setIsCardModalOpen(false)} onSave={handleSaveCard} />
    </div>
  );
};

export default AccountPage;