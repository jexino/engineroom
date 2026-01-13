import React from 'react'

const Hero = () => {
  return (
    /* The outer wrapper ensures the background of the PAGE is visible on the sides */
    <section className="w-full py-4 md:py-6"> 
      
      {/* This inner div is what limits the width to match the other components */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* The Actual Hero Box */}
        <div className="relative w-full h-[400px] md:h-[500px] bg-[url('./bg-element-1.jpg')] rounded-md overflow-hidden flex items-center justify-end shadow-lg">
          


          {/* 2. THE OVERLAY (Stays inside the rounded box) */}
          <div  className="absolute inset-0 bg-black/50  bg-cover bg-center"></div>

          {/* 3. THE CONTENT */}
          <div className="absolute z-10 px-8 md:px-16 w-full text-white flex items-center justify-end">
            <div className="max-w-xl text-left"> 
              <h1 className="text-4xl md:text-4xl font-inter font-bold mb-4">
              Easy Construction From <br /> Anywhere.
              </h1>
              <p className="text-white mb-8 leading-relaxed text-base md:text-base max-w-md ml-auto">
                EngineRoom facilitates the provision of optimized construction resources 
                to enable YOU to build your construction project that are  quality, innovative,sustainable and cost friendly  from ANYWHERE...
              </p>   
              <button className=" w-full bg-[#5271FF] py-3.5 px-10 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl active:scale-95 cursor-pointer">
                Get started
              </button>  
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Hero
