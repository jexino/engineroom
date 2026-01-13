import { useEffect, useState } from 'react';
import {Navbar,
    Hero,
    BestSellers,
    Footer,
    PromoBanner,
    ExclusiveDeals,
   CategoryDiscovery} from  './components'

  

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
  <div className="min-h-screen bg-gray-50 font-sans ">
      <Navbar />
      <Hero />
      <BestSellers products={products.slice(0, 8)} />
      <ExclusiveDeals products={products.slice(8, 12)} />
      <PromoBanner product={products.length > 0 ? products[14] || products[0] : null} />
      <CategoryDiscovery products={products.slice(0, 12)} />
      <Footer />
      
    </div>
)
}

export default App
