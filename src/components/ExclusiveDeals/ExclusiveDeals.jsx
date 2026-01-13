import React from 'react'
import ProductCard from '../ProductCard/ProductCard';

const ExclusiveDeals = ({products}) => {
  return (
    /* Outer: Full width background */
    <section className="w-full bg-gray-50 py-12">
      {/* Inner: Locked Width (The "Magic" Container) */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#1e2a4a] tracking-tight">
            Exclusive Deals
          </h2>
  
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExclusiveDeals
