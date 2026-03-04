import { useEffect, useState } from 'react';
import {
  Navbar,
  Hero,
  BestSellers,
  Footer,
  PromoBanner,
  ExclusiveDeals,
  AccountPage,
  CategoryDiscovery,
  ProductDetailPage,
  CartSidebar 
} from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- USER & NAVIGATION STATE ---
  const [user, setUser] = useState({ name: "" });
  const [currentView, setCurrentView] = useState("home"); 
  const [selectedProduct, setSelectedProduct] = useState(null);

  // --- CART & WISHLIST STATE ---
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); 

  // --- CART LOGIC ---
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    // Removed auto-open here so the user only sees the success alert on the detail page
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) return; // Safety check
  setCart(prevCart => 
    prevCart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    )
     );
  };

  // --- WISHLIST LOGIC ---
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isAlreadyInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  // --- NAVIGATION ACTION ---
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView("detail");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) return <div className="flex justify-center py-20 font-bold">Loading Materials...</div>;
  if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden w-full relative font-sans">
      
      <Navbar 
        user={user} 
        onNavigate={(view) => setCurrentView(view)} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <main className="relative min-h-screen">
        
        {/* --- VIEW 1: HOMEPAGE --- */}
        <div className={`transition-all duration-500 ease-in-out absolute w-full top-0 ${
          currentView === 'home' 
            ? 'opacity-100 translate-x-0 relative z-10' 
            : 'opacity-0 -translate-x-full pointer-events-none z-0'
        }`}>
          <Hero />
          
          <BestSellers 
            products={products.slice(0, 8)} 
            onProductClick={handleProductClick} 
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
          
          <ExclusiveDeals 
            products={products.slice(8, 12)} 
            onProductClick={handleProductClick} 
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
          
          <PromoBanner product={products.length > 0 ? products[14] || products[0] : null}
          onProductClick={handleProductClick} />
          
          <CategoryDiscovery 
            products={products.slice(0, 12)}
            onProductClick={handleProductClick}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        </div>

        {/* --- VIEW 2: MY ACCOUNT --- */}
        <div className={`transition-all duration-500 ease-in-out absolute w-full top-0 ${
          currentView === 'account' 
            ? 'opacity-100 translate-x-0 relative z-20 bg-gray-100' 
            : 'opacity-0 translate-x-full pointer-events-none z-0'
        }`}>
        <AccountPage 
          user={user} 
          products={products.slice(0, 4)}
          onProductClick={handleProductClick} 
          wishlist={wishlist} // <--- Pass the wishlist array
          onUpdateUser={(updatedUser) => setUser(updatedUser)}
          onLogout={() => { setUser(null); setCurrentView("home"); }}
          onRemoveFromWishlist={toggleWishlist} // <--- Reuses your toggle logic to remove
          onAddToCart={addToCart} // <--- Allow adding to cart from wishlist
        />
        </div>

        {/* --- VIEW 3: PRODUCT DETAIL --- */}
        <div className={`transition-all duration-500 ease-in-out absolute w-full top-0 ${
          currentView === 'detail' 
            ? 'opacity-100 translate-y-0 relative z-30 bg-white' 
            : 'opacity-0 translate-y-10 pointer-events-none z-0'
        }`}>
          {selectedProduct && (
            <ProductDetailPage 
              product={selectedProduct} 
              products={products}
              onProductClick={handleProductClick}
              onBack={() => setCurrentView('home')} 
              
              // Pass Cart/Wishlist actions and states
              cart={cart} 
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isInWishlist={wishlist.some(item => item.id === selectedProduct.id)}
            />
          )}
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default App;