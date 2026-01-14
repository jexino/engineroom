import React from 'react';
import { Package, Heart, User, ShoppingBag } from 'lucide-react';

const AccountDropdown = ({ isOpen, user, onLogout, onClose, onOpenAuth, onNavigate }) => {
  if (!isOpen) return null;

  const handleAccountClick = () => {
    onNavigate('account');
    onClose();
  };

  const handleSignInClick = () => {
    onClose();      
    onOpenAuth();   
  };

  return (
    /* Main Wrapper - Only one absolute container needed */
    <div className="absolute right-0 top-full mt-4 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-150">
      <div className="p-4">
        {user ? (
          /* --- LOGGED IN VIEW --- */
          <div className="flex flex-col space-y-1">
            <button onClick={handleAccountClick} className="flex items-center gap-4 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
              <User size={20} className="text-gray-500 group-hover:text-black" />
              <span className="font-medium text-[15px]">My Account</span>
            </button>
            <button className="flex items-center gap-4 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
              <ShoppingBag size={20} className="text-gray-500 group-hover:text-black" />
              <span className="font-medium text-[15px]">Orders</span>
            </button>
            <div className="h-[1px] bg-gray-100 my-3 w-full" />
            <button onClick={onLogout} className="w-full bg-[#E55F5F] text-white py-3.5 rounded-full font-bold text-base hover:bg-[#d44e4e] transition-all">
              Log out
            </button>
          </div>
        ) : (
          /* --- LOGGED OUT VIEW (Fixed: Removed the extra absolute div) --- */
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleSignInClick}
              className="w-full bg-[#5271FF] text-white py-3 rounded-full font-bold text-base hover:bg-blue-600 transition-all shadow-md"
            >
              Sign In
            </button>

            <div className="space-y-1">
              <button className="w-full flex items-center gap-4 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
                <Package size={18} className="text-gray-400 group-hover:text-[#5271FF]" />
                <span className="text-sm font-medium">Track Orders</span>
              </button>
              <button className="w-full flex items-center gap-4 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
                <Heart size={18} className="text-gray-400 group-hover:text-[#5271FF]" />
                <span className="text-sm font-medium">Wishlist</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>    
  );
};


export default AccountDropdown;
