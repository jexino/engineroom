import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Tag } from 'lucide-react';

const BestSellers = ({ products }) => {
  return (
    <section className="py-10 max-w-7xl mx-auto px-6 border-md">
      <div className="bg-[#D32F2F] text-white py-3 px-6 flex items-center gap-3 rounded-lg mb-4">
        <Tag size={18} fill="white" />
        <h2 className="font-bold text-sm uppercase tracking-widest">Best Sellers of the Month</h2>
      </div>
      <div className="border-0 bg-white p-6 overflow-x-auto flex gap-6 no-scrollbar">
        {products.map(p => (
          <div key={p.id} className="min-w-[250px]"><ProductCard {...p} /></div>
        ))}
      </div>
    
    </section>
  );
};

export default BestSellers;