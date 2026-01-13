import React from 'react'

const Footer = () => {
  return (
    <>
      {/* 1. GUARANTEE BANNER */}
      <section className="w-full py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#4f46e5] text-white rounded-md py-16 px-8 text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-black mb-4">100% Guarantee on Quality Delivery</h2>
            <p className="max-w-2xl mx-auto opacity-90 text-sm md:text-lg">
              Guarantees quality in service, personnel and product delivery with secured 
              payments and performance bond (refund policy).
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE ACTUAL FOOTER */}
      <footer className="w-full border-t border-gray-200 bg-gray-50  py-8">
        {/* Same Container as Hero & Navbar */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold">ER</div>
            <span className="font-black text-black text-xl tracking-tighter">engineroom</span>
          </div>
          <span className="text-black text-sm font-medium">© 2025 Engineroom. All rights reserved</span>
        </div>
      </footer>
    </>
  );
}

export default Footer
