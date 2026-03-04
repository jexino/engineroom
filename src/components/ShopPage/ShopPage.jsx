import React, { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ProductDetailPage from '../ProductDetailPage/ProductDetailPage';

const ShopPage = ({ products }) => {
  // State to track which view to show
  const [selectedProduct, setSelectedProduct] = useState(null);

  // If a product is selected, we render the Full Page Detail View
  if (selectedProduct) {
    return (
      <ProductDetailPage 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} // Pass a way to go back
      />
    );
  }

  // Otherwise, we render the main Shop Grid
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-3xl font-black text-[#1e2a4a] mb-8">Marketplace</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              // This triggers the view swap
              onViewDetails={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
