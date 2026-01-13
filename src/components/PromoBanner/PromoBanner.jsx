import React from 'react';
import ProductCard from '../ProductCard/ProductCard';

const PromoBanner = ({ product }) => {

  return (
    <section className="max-w-7xl mx-auto px-6 my-4">
      <div className="relative rounded-md bg-[#0B1222] min-h-[400px] flex items-center p-12 overflow-hidden shadow-2xl">
        
        {/* Updated Background Div */}
        <div 
          className="absolute inset-0 opacity-70 bg-[url('./bg-element-2.jpg')] bg-cover bg-center"
        ></div>

        <div className="relative z-10 w-full grid md:grid-cols-2 items-center">
          <div className="text-white max-w-md">
            <h2 className="text-[40px] font-bold mb-4 leading-tight">Verified Options & Increased Access</h2>
            <p className=" text-lg">A one-stop platform construction marketplace that gives up-to-date information,analytics,trends and optimized options of all factor pf production in the construction industry.</p>
          </div>
          {/* Product Card Side */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-[300px] transform lg:rotate-2">
              {/* If product exists, show it. If not, show a 'loading' box */}
              {product ? (
                <ProductCard {...product} isPromo={true} />
              ) : (
                <div className="w-full h-[400px] bg-white/10 animate-pulse rounded-3xl border border-white/20 flex items-center justify-center">
                   <span className="text-white/20 font-bold italic">Loading Deal...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default PromoBanner;