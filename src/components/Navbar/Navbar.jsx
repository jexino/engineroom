import React from 'react';
import { User, ShoppingCart, ChevronDown, HelpCircle, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-0  top-0 z-50">
      
      {/* 1. TOP UTILITY BAR (Full Width Background) */}
      <div className="w-full bg-[#5271FF] text-white text-[11px] py-4">
        {/* Contained Content */}
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-4">
            <span className='text-base'>Get Expert Advice: <span className=" text-base">+2348123456789</span></span>
          </div>
          <div className="flex gap-6 items-center">
            <span className="cursor-pointer hover:text-gray-300 text-base">Become a Vendor</span>
            <span className="cursor-pointer hover:text-gray-300 text-base">Sell on EngineRoom</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION (Full Width Background) */}
      <div className="w-full py-4">
        {/* Contained Content - Matches Hero Width Exactly */}
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
            <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center text-white font-black text-xl">
              ER
            </div>
            <span className="font-black text-2xl tracking-tighter text-[#1e2a4a]">
              engineroom
            </span>
          </div>

          {/* SPLIT SEARCH BAR (The "Button Outside" Fix) */}
          <div className="flex-1 max-w-2xl flex  border border-white rounded-full overflow-hidden">
            <div className="relative flex-1 px-4">
              <input 
                type="text" 
                placeholder="What can we help you find today?" 
                className="w-full border border-gray-300 rounded-full py-2.5 px-5 text-sm outline-none focus:border-[#4f46e5] bg-gray-50 h-[44px] px-4" 
              />
            </div>
            <button className="bg-[#5271FF] text-white px-8 rounded-full h-[44px] text-xs font-bold hover:bg-indigo-700 
            transition-colors uppercase tracking-wider cursor-pointer">
              Search
            </button>
          </div>

          {/* ICONS & ACCOUNT SECTION */}
          <div className="flex items-center gap-7 text-gray-500">
            
            {/* Account Link */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <User size={22} className="text-gray-400 group-hover:text-[#4f46e5] transition-colors" />
              <div className="text-left hidden lg:block text-[10px] leading-tight">
                
                <p className=" text-[#1e2a4a] text-base flex items-center gap-0.5">
                  Sign in/Register <ChevronDown size={10} />
                </p>
              </div>
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
      </div>
    </nav>
  );
};

export default Navbar;