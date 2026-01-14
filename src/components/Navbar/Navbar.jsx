import React, { useState } from 'react';
import { User, ShoppingCart, ChevronDown, HelpCircle, Mail, Lock, X, Search } from 'lucide-react';
import AccountDropdown from '../AccountDropdown/AccountDropdown';
import AuthModal from '../AccountDropdown/AuthModal';

const Navbar = ({onNavigate}) => {
  const [user, setUser] = useState(null); // Tracks logged in user
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Mobile search toggle
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); // New state

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAccountOpen(false);
  };


   
  return (
    <>
      <nav className="w-full bg-white border-0  top-0 z-50">
        
        {/* 1. TOP UTILITY BAR (Full Width Background) */}
        <div className=" hidden sm:block w-full bg-[#5271FF] text-white text-[10px] py-2">
          {/* Contained Content */}
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex gap-4">
              <span className='text-base'>Get Expert Advice: <span className=" text-base">+2348123456789</span></span>
            </div>
            <div className="flex gap-6 items-center">
              <span className="cursor-pointer hover:text-gray-300 text-base">Become a Vendor</span>
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION (Full Width Background) */}
        <div className="w-full py-4">
          {/* Contained Content - Matches Hero Width Exactly */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between gap-4">
            
            {/* Logo Section */}
            <div
            onClick={() => onNavigate('home')}
             className= "flex items-center gap-1.5 flex-shrink-0 cursor-pointer">
              <div className="w-8 h-8 md:w-9 md:h-9 bg-black rounded-lg flex items-center justify-center text-white font-black text-lg md:text-xl">
                ER
              </div>
              <span className="font-black text-xl md:text-2xl tracking-tighter text-[#1e2a4a]">
                engineroom
              </span>
            </div>

            {/* SPLIT SEARCH BAR (The "Button Outside" Fix) */}
            <div className="hidden md:flex flex-1 max-w-2xl flex  border border-white rounded-full overflow-hidden">
              <div className="flex-1 max-w-xl relative">
                <input 
                  type="text" 
                  placeholder="What can we help you find today?" 
                  className="w-full border border-gray-300 rounded-full py-2.5 px-5 text-sm outline-none focus:border-[#4f46e5] bg-gray-50 h-[44px] px-4" 
                />
              </div>
              <button className="bg-[#5271FF] text-white px-8 rounded-full h-[44px] text-xs font-bold hover:bg-indigo-700 
              transition-colors uppercase tracking-wider cursor-pointer ml-2">
                Search
              </button>
            </div>

            {/* ICONS & ACCOUNT SECTION */}
            <div className="flex items-center gap-3 md:gap-6 text-gray-500">
              <button 
                  className="md:hidden text-gray-500"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search size={22} />
                </button>
              
              {/* Account Link */}
              <div className='relative'>
                {/* Change the onClick below to always toggle the dropdown */}
                <div 
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={() => setIsAccountOpen(!isAccountOpen)} 
                >
                  <User size={22} className="text-gray-400 group-hover:text-[#4f46e5] transition-colors" />
                  <div className="text-left hidden lg:block text-[10px] leading-tight">
                    <p className="text-[#1e2a4a] text-base flex items-center gap-0.5">
                      {user ? user.name : "Sign in/Register"} 
                      <ChevronDown size={10} />
                    </p>
                  </div>
                </div>

                {/* This component handles the internal logic based on the 'user' prop */}
                <AccountDropdown 
                  isOpen={isAccountOpen} 
                  user={user} 
                  onLogout={handleLogout} 
                  onNavigate={onNavigate}
                  onClose={() => setIsAccountOpen(false)} 
                  onOpenAuth={() => setIsAuthOpen(true)}
                />
              </div>

              {/* Help/Support */}
              <div className="flex flex-col items-center cursor-pointer group">
                <HelpCircle size={22} className="text-gray-400 group-hover:text-[#4f46e5]" />
                <span className="text-[10px] font-bold text-[#1e2a4a] mt-0.5">Support</span>
              </div>

              {/* Cart with Badge */}
              <div className="relative cursor-pointer group flex flex-col items-center">
                <div className="relative">
                  <ShoppingCart size={22} className="text-gray-400 group-hover:text-[#4f46e5]" />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#D32F2F] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">
                    0
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#1e2a4a] mt-0.5">Cart</span>
              </div>
            </div>
          </div>
          {isSearchOpen && (
            <div className="md:hidden mt-3 animate-in slide-in-from-top-2">
              <div className="relative">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="What are you looking for?" 
                  className="w-full border border-gray-200 rounded-xl py-3 px-4 bg-gray-50 outline-none" 
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4f46e5]">
                  <Search size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
        <AuthModal isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        />
      </nav>
    </> 
  );
};

export default Navbar;