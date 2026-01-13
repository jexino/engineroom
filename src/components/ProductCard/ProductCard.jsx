import React from 'react';
import { Heart, Star } from 'lucide-react';

const ProductCard = ({ title, price, image, rating }) => {
  const nairaPrice = Math.floor((price || 0) * 1500).toLocaleString();

  return (
    <div className="flex flex-col h-full bg-white group p-1">
      <div className="relative aspect-square bg-[#F3F4F6] rounded-2xl mb-4 flex items-center justify-center p-6 overflow-hidden">
        <button className="absolute top-4 left-4 text-gray-400 hover:text-red-500 z-10">
          <Heart size={20} />
        </button>
        <img src={image} alt={title} className="max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
      </div>

      <div className="flex-1 flex flex-col px-1">
        <h3 className="text-[14px] font-bold text-[#1e2a4a] line-clamp-2 mb-2 leading-tight min-h-[40px]">{title}</h3>
        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="text-yellow-400 fill-current" />
          <span className="text-[11px] text-gray-500 font-medium">{rating?.rate || 4.5} ({rating?.count || 20})</span>
        </div>
        <div className="flex items-center justify-between mt-auto mb-4">
          <span className="text-lg font-black text-[#1e2a4a]">₦{nairaPrice}</span>
          <span className="bg-[#D32F2F] text-white text-[10px] px-2 py-1 font-black rounded-md">-10%</span>
        </div>
        <button className="w-full bg-[#5271FF] hover:bg-[#3b33c7] text-white py-3 rounded-xl text-xs font-extrabold transition-all shadow-md">
          View details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
