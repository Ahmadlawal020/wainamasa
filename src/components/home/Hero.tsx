
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 md:py-16 lg:py-20">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full afro-pattern" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          <div className="text-left">
           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 md:mb-6 leading-tight tracking-[-0.02em]">
             Enjoy <span className="text-green-600">Fresh Meals</span>, Every Time!
           </h1>
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6 md:mb-8 max-w-2xl">
              Taste the comfort of home in every bite! Hand-prepared meals from our kitchen, delivered with care, quality, and flavor you can trust.
            </p>

          </div>
          
          <div className="relative order-first lg:order-last">
            <div className="aspect-square max-w-md mx-auto lg:max-w-lg xl:max-w-xl overflow-hidden rounded-2xl border-4 border-white shadow-xl">
              <img
                src="/lovable-uploads/0295da10-95ad-463e-89b7-30356b9c7617.png"
                alt="Authentic Northern Nigerian Masa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 md:-bottom-5 md:-right-5 bg-white shadow-lg rounded-lg p-3 md:p-4 max-w-[180px] md:max-w-[200px] transform rotate-2">
              <div className="flex items-center">
                <div className="bg-green-50 p-1.5 rounded-full mr-3 flex-shrink-0">
                  <div className="bg-green-500 text-white h-8 w-8 rounded-full flex items-center justify-center">
                    <span className="font-medium text-sm">8-6</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm">Open Hours</h3>
                  <p className="text-xs text-neutral-500">8am to 6pm everyday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
