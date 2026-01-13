import React, { useState } from 'react';
import { BrickWall, PaintRoller, Pipette, Zap, HardHat, Home, Settings2 } from 'lucide-react';
import ProductCard from '../ProductCard/ProductCard';



const CategoryDiscovery = ({ products }) => {
  const [tab, setTab] = useState('structure');
  
  const categories = [
    { id: 'structure', label: 'Structure', icon: <BrickWall size={14} /> },
    { id: 'finishing', label: 'Finishing', icon: <PaintRoller size={14} /> },
    { id: 'roofing', label: 'Roofing', icon: <Home size={14} /> },
    { id: 'plumbing', label: 'Plumbing', icon: <Pipette size={14} /> },
    { id: 'electrical', label: 'Electrical', icon: <Zap size={14} /> },
    { id: 'exterior', label: 'Exterior', icon: <HardHat size={14} /> },
    { id: 'auxiliary', label: 'Auxiliary', icon: <Settings2 size={14} /> },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-[#1e2a4a] mb-8">Discover building materials</h2>
      
      <div className="flex justify-around gap-3 mb-10">
        {categories.map((c) => (
          <button 
            key={c.id} // ✅ Changed from 'c' to 'c.id'
            onClick={() => setTab(c.id)} // ✅ Changed from 'c' to 'c.id'
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold border transition-all ${
              tab === c.id // ✅ Changed from 'c' to 'c.id'
                ? 'bg-[#5271FF] text-white border-[#4f46e5]' 
                : 'bg-white text-gray-500 border-gray-200'
            }`}
          >
            {c.icon}  {/* ✅ Added the icon component */}
            {c.label} {/* ✅ Changed from {c} to {c.label} */}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.slice(0, 8).map(p => <ProductCard key={p.id} {...p} />)}
      </div>
    </section>
  );
};


export default CategoryDiscovery;