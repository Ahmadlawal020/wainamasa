import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 md:py-16 lg:py-20">
      {/* Background Afro Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full afro-pattern" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-8 sm:gap-20">
          
          {/* Text Side */}
          <div className="w-full sm:w-1/2 text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-900 mb-4 leading-tight tracking-[-2px]">
              Deliciously <span className="text-green-600">Homemade</span>.<br />
              Delivered to Your Door.
            </h1>
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-md">
              Experience the comfort of real, home-cooked meals — freshly made, expertly packed, and delivered with heart. No stress, just good food done right.
            </p>
          </div>

          {/* Image Side */}
          <div className="w-full sm:w-1/2 relative flex justify-end">
            <div className="w-[100%] max-w-sm sm:max-w-md md:max-w-lg rounded-2xl border-4 border-white shadow-xl overflow-hidden">
              <img
                src="/lovable-uploads/0295da10-95ad-463e-89b7-30356b9c7617.png"
                alt="Plate of authentic homemade Masa with soup and garnish"
                className="w-full h-full object-cover"
              />
            </div>

          {/* Open Hours Badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-md p-3 w-[180px] rotate-1">
              <div className="flex items-center">
                <div className="bg-green-100 p-1.5 rounded-full mr-3">
                  <div className="bg-green-500 text-white h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold">
                    8–6
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
