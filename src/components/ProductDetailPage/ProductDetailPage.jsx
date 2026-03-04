import React, { useState, useEffect } from 'react';
import { Star, Minus, Plus, Heart, ChevronRight, ChevronDown, CheckCircle } from 'lucide-react';
import BestSellers from '../BestSellers/BestSellers';
import ExclusiveDeals from '../ExclusiveDeals/ExclusiveDeals';

// Added new props: cart, onAddToCart, onToggleWishlist, isInWishlist
const ProductDetailPage = ({ 
  product, 
  onBack, 
  products, 
  onProductClick, 
  cart = [], 
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [showAddedAlert, setShowAddedAlert] = useState(false); // State for cart alert
  const [showWishlistAlert, setShowWishlistAlert] = useState(false); // 1. NEW STATE for wishlist alert

  // Auto-scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product?.id]);

  // --- DATA CHECK ---
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1e2a4a] font-bold">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Check if product is already in cart
  const isProductInCart = cart.some(item => item.id === product.id);

  // --- UPDATED ACTION LOGIC ---
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setShowAddedAlert(true);
    // Hide alert after 3 seconds, without navigating away
    setTimeout(() => setShowAddedAlert(false), 3000);
  };

  // 2. NEW LOGIC to handle wishlist alert
  const handleToggleWishlist = () => {
    onToggleWishlist(product);
    setShowWishlistAlert(true);
    // Hide alert after 3 seconds
    setTimeout(() => setShowWishlistAlert(false), 3000);
  };

  const images = [product?.image, product?.image, product?.image, product?.image];
  const nairaPrice = Math.floor((product?.price || 0) * 1500).toLocaleString();
  const originalPrice = Math.floor(((product?.price || 0) * 1500) * 1.5).toLocaleString();

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans antialiased relative">
      
      {/* --- ALERTS TOASTS (Top Center) --- */}
      {showAddedAlert && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between gap-4 bg-[#4ADE80] text-white px-6 py-2 rounded-lg shadow-lg min-w-[300px] animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle size={20} />
          <span>Product successfully added to cart</span>
        </div>
      )}

      {/* 3. NEW Wishlist Alert Toast */}
      {showWishlistAlert && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] flex items-center justify-between gap-4 bg-[#4ADE80] text-white px-6 py-2 rounded-lg shadow-lg min-w-[300px] animate-in fade-in slide-in-from-top-2 duration-300">
          <Heart size={20} fill="white" />
          <span>
            {isInWishlist 
              ? 'Product successfully added to wishlist' 
              : 'Product removed from wishlist'
            }
          </span>
        </div>
      )}

      {/* --- BREADCRUMBS --- */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-5">
        <div className="flex items-center text-[10px] md:text-[11px] font-medium text-gray-500 gap-2 overflow-x-auto whitespace-nowrap">
          <button onClick={onBack} className="hover:text-black">Home</button>
          <ChevronRight size={10} />
          <span className="hover:text-black cursor-pointer">Structure</span>
          <ChevronRight size={10} />
          <span className="text-gray-900 truncate max-w-[150px] md:max-w-none">{product?.title}</span>
        </div>
      </div>

      {/* --- MAIN PRODUCT GRID --- */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT: GALLERY */}
          <div className="lg:col-span-7 flex flex-col lg:flex-row gap-3 md:gap-4">
            <div className="order-1 lg:order-2 flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative aspect-square flex items-center justify-center p-6">
              <img 
                src={images[activeImg]} 
                alt={product?.title} 
                className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105" 
              />
            </div>

            <div className="order-2 lg:order-1 flex flex-row lg:flex-col gap-2 md:gap-3 w-full lg:w-20 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImg === idx ? 'border-blue-500' : 'border-transparent bg-white'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain p-1 opacity-80" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS SECTION */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-50 relative">
                {/* --- HEART ICON TOGGLE --- */}
               <button 
                onClick={handleToggleWishlist} // 4. Updated to use the new handler
                className={`absolute top-5 right-5 ${isInWishlist ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition-colors`}
               >
                <Heart size={22} fill={isInWishlist ? "currentColor" : "none"} />
              </button>
              <h1 className="text-base md:text-lg font-bold text-[#1e2a4a] mb-2 pr-8 leading-tight">{product?.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-sm text-[#1e2a4a]">{product?.rating?.rate || 4.3}</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" className={i < 4 ? "" : "text-gray-200"} />
                  ))}
                </div>
                <span className="text-gray-400 text-xs md:text-sm">({product?.rating?.count || 122})</span>
              </div>
              <ul className="text-[12px] md:text-[13px] text-gray-500 space-y-1 font-medium">
                <li>• SKU: GE779FD4LNSGGNAFAMZ</li>
                <li>• Model: carpet</li>
                <li>• Weight (kg): 0.5</li>
              </ul>
            </div>

            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-50">
              <p className="text-xs md:text-sm font-bold text-[#1e2a4a] mb-1">Subtotal</p>
              <span className="text-2xl md:text-3xl font-black text-[#1e2a4a]">₦ {nairaPrice}</span>
              <div className="flex items-center gap-2 mt-1 mb-6">
                <span className="text-gray-400 line-through text-xs md:text-sm font-semibold">₦ {originalPrice}</span>
                <span className="bg-[#ef4444] text-white text-[9px] px-1.5 py-0.5 font-bold rounded">-50%</span>
              </div>

              {/* --- QUANTITY SELECTOR (Line 1) --- */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-semibold text-gray-500">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg h-10 px-2 bg-white w-32 justify-between">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 text-gray-400"><Minus size={16} /></button>
                  <span className="w-8 text-center font-bold text-sm">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-1 text-gray-400"><Plus size={16} /></button>
                </div>
              </div>

              {/* --- ACTION BUTTONS (Line 2) --- */}
              <div className="flex items-center gap-3 w-full">
                {isProductInCart ? (
                  // If in cart, hide Add to Cart, Buy Now takes full width
                  <button 
                    className="flex-1 bg-[#22C55E] text-white h-12 rounded-full font-bold text-sm hover:bg-green-600 transition-all shadow-md"
                  >
                    Buy Now
                  </button>
                ) : (
                  // If NOT in cart, show both, both take equal space
                  <>
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#5271FF] text-white h-12 rounded-full font-bold text-sm hover:bg-blue-600 transition-all"
                    >
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-[#22C55E] text-white h-12 rounded-full font-bold text-sm hover:bg-green-600 transition-all">
                      Buy Now
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
              <div className="p-5 md:p-6 flex justify-between items-center cursor-pointer">
                <h3 className="font-bold text-sm text-[#1e2a4a]">Product Details</h3>
                <ChevronDown size={18} className="text-gray-400" />
              </div>
              <div className="px-5 md:px-6 pb-6 text-[12px] md:text-[13px] text-gray-600 leading-relaxed">
                {product?.description || "High-quality material designed for long-lasting durability."}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- REUSING COMPONENTS --- */}
      <BestSellers products={products.slice(16, 20)} onProductClick={onProductClick} />
      <ExclusiveDeals products={products.slice(12, 16)} onProductClick={onProductClick} />
    </div>
  );
};

export default ProductDetailPage;