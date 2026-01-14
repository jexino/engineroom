import { useEffect, useState } from 'react';
import {Navbar,
    Hero,
    BestSellers,
    Footer,
    PromoBanner,
    ExclusiveDeals,
    AccountPage,
   CategoryDiscovery
  } from  './components'

  

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- MOCK USER & NAVIGATION STATE ---
  const [user, setUser] = useState({ name: "" });
  const [currentView, setCurrentView] = useState("home"); // 'home' or 'account'

  useEffect(() => {
    // 1. Define the async function
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch building materials');
        }
        
        const data = await response.json();
        
        // 2. Update state with the results
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // 3. Call the function
    fetchProducts();
  }, []); // Empty dependency array means this runs ONCE on page load

  if (isLoading) return <div className="flex justify-center py-20 font-bold">Loading Materials...</div>;
  if (error) return <div className="text-red-500 text-center py-20">Error: {error}</div>;
  return (
  <div className="min-h-screen bg-gray-100 overflow-x-hidden w-full relative font-sans">
    {/* Pass setCurrentView to the Navbar so clicking the Logo returns Home */}
    <Navbar user={user} onNavigate={setCurrentView} />

    <main className="relative">
      {/* --- HOMEPAGE VIEW --- */}
      <div className={`transition-all duration-500 ease-in-out ${
        currentView === 'home' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute w-full pointer-events-none'
      }`}>
        <Hero />
        <BestSellers products={products.slice(0, 8)} />
        <ExclusiveDeals products={products.slice(8, 12)} />
        <PromoBanner product={products.length > 0 ? products[14] || products[0] : null} />
        <CategoryDiscovery products={products.slice(0, 12)} />
      </div>

      {/* --- MY ACCOUNT VIEW --- */}
      <div className={`transition-all duration-500 ease-in-out px-4 md:px-10 ${
        currentView === 'account' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute w-full pointer-events-none'
      }`}>
        {/* --- BACK BUTTON --- */}
        <div className="max-w-7xl mx-auto pt-8">
           <button 
             onClick={() => setCurrentView('home')}
             className="flex items-center gap-2 text-gray-500 hover:text-[#5271FF] font-bold transition-all mb-2"
           >
             <span className="text-xl">←</span> Back to Shopping
           </button>
        </div>

        <AccountPage 
          user={user} 
          products={products.slice(0, 4)} // Pass some products to show in the account page
          onUpdateUser={(updatedUser) => setUser(updatedUser)}
          onLogout={() => { setUser(null); setCurrentView("home"); }}
        />
      </div>
    </main>
    <Footer />
  </div>
)
}

export default App
