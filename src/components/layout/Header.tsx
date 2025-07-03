// import { ShoppingBag, MapPin, Search } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import CartSidebar from "@/components/cart/CartSidebar";

// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";

// export default function Header() {
//   // Count of unique products in cart
//   const totalItems = useSelector((state: RootState) => state.cart.items.length);

//   return (
//     <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between gap-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center flex-shrink-0">
//             <img
//               src="/lovable-uploads/0e7195fe-d294-485f-8c70-78621c31d5b6.png"
//               alt="Masa Treat"
//               className="h-12 w-auto md:h-14 lg:h-16"
//             />
//           </Link>

//           {/* Desktop search bar */}
//           <div className="hidden md:flex items-center relative max-w-sm w-full lg:max-w-md">
//             <Search className="h-4 w-4 absolute left-3 text-neutral-400" />
//             <Input
//               placeholder="Search menu..."
//               className="pl-10 bg-neutral-50 border-neutral-200 text-sm h-10 focus:ring-2 focus:ring-green-500/20"
//             />
//           </div>

//           {/* Address display (desktop only) */}
//           <div className="hidden lg:flex items-center text-neutral-700 text-sm xl:text-base">
//             <MapPin className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
//             <span className="truncate max-w-xs xl:max-w-none">
//               B14 Close, Citec Estate, Mbora, Abuja
//             </span>
//           </div>

//           {/* Cart button */}
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="relative h-10 px-3 md:px-4"
//               >
//                 <ShoppingBag className="h-4 w-4 mr-2" />
//                 <span className="hidden sm:inline">Cart</span>
//                 <span className="sm:hidden">Cart</span>
//                 {totalItems > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                     {totalItems}
//                   </span>
//                 )}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-full sm:max-w-lg p-0">
//               <CartSidebar />
//             </SheetContent>
//           </Sheet>
//         </div>

//         {/* Mobile search bar */}
//         <div className="md:hidden mt-3">
//           <div className="relative">
//             <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
//             <Input
//               placeholder="Search menu..."
//               className="pl-10 bg-neutral-50 border-neutral-200 text-sm h-9 w-full"
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import { ShoppingBag, MapPin, Search, X } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Input } from "@/components/ui/input";
// import CartSidebar from "@/components/cart/CartSidebar";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// import { setSearchQuery } from "../../services/searchSlice";
// import { useGetProductsQuery } from "../../services/api/productsApiSlice";
// import { Product } from "@/data/types";
// import ProductCard from "../food/ProductCard";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const dispatch = useDispatch();
//   const searchQuery = useSelector((state: RootState) => state.search.query);
//   const totalItems = useSelector((state: RootState) => state.cart.items.length);
//   const [filtered, setFiltered] = useState<Product[]>([]);
//   const [showOverlay, setShowOverlay] = useState(false);

//   const { data: products = [], isLoading } = useGetProductsQuery();

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     dispatch(setSearchQuery(value));
//     setShowOverlay(value.trim().length > 0);
//   };

//   const handleClearSearch = () => {
//     dispatch(setSearchQuery(""));
//     setShowOverlay(false);
//   };

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const result = products.filter((p) =>
//         p.product.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFiltered(result);
//     } else {
//       setFiltered([]);
//     }
//   }, [searchQuery, products]);

//   return (
//     <>
//       <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between gap-4">
//             {/* Logo */}
//             <Link to="/" className="flex items-center flex-shrink-0">
//               <img
//                 src="/lovable-uploads/0e7195fe-d294-485f-8c70-78621c31d5b6.png"
//                 alt="Masa Treat"
//                 className="h-12 w-auto md:h-14 lg:h-16"
//               />
//             </Link>

//             {/* Desktop search bar */}
//             <div className="hidden md:flex items-center relative max-w-sm w-full lg:max-w-md">
//               <div className="relative w-full">
//                 <span className="absolute left-3 top-2.5 text-neutral-400">
//                   <Search size={18} />
//                 </span>
//                 <Input
//                   placeholder="Search menu..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//                   className="pl-10 pr-10 bg-neutral-50 border-neutral-200 text-sm h-10 focus:ring-2 focus:ring-green-500/20"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={handleClearSearch}
//                     className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
//                   >
//                     <X size={18} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Address display (desktop only) */}
//             <div className="hidden lg:flex items-center text-neutral-700 text-sm xl:text-base">
//               <MapPin className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
//               <span className="truncate max-w-xs xl:max-w-none">
//                 B14 Close, Citec Estate, Mbora, Abuja
//               </span>
//             </div>

//             {/* Cart button */}
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="relative h-10 px-3 md:px-4"
//                 >
//                   <ShoppingBag className="h-4 w-4 mr-2" />
//                   <span className="hidden sm:inline">Cart</span>
//                   <span className="sm:hidden">Cart</span>
//                   {totalItems > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                       {totalItems}
//                     </span>
//                   )}
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-full sm:max-w-lg p-0">
//                 <CartSidebar />
//               </SheetContent>
//             </Sheet>
//           </div>

//           {/* Mobile search bar */}
//           <div className="md:hidden mt-3">
//             <div className="relative">
//               <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
//               <Input
//                 placeholder="Search menu..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 className="pl-10 pr-10 bg-neutral-50 border-neutral-200 text-sm h-9 w-full"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={handleClearSearch}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
//                 >
//                   <X size={18} />
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Full-screen Search Overlay */}
//       {showOverlay && (
//         <div className="fixed inset-0 z-40 mt-[84px] bg-white">
//           <div className="container mx-auto px-4 py-4 h-[calc(100vh-84px)] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">
//                 Search results for "{searchQuery}"
//               </h2>
//               <button
//                 onClick={handleClearSearch}
//                 className="p-2 text-neutral-500 hover:text-neutral-700"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             {isLoading ? (
//               <div className="flex justify-center items-center h-64">
//                 <p className="text-neutral-400">Loading...</p>
//               </div>
//             ) : filtered.length === 0 ? (
//               <div className="flex flex-col justify-center items-center h-64 text-center">
//                 <Search size={48} className="text-neutral-300 mb-4" />
//                 <p className="text-neutral-500 text-lg">
//                   No products found for "{searchQuery}"
//                 </p>
//                 <p className="text-neutral-400 mt-2">
//                   Try different keywords or check back later
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
//                 {filtered.map((product) => (
//                   <ProductCard key={product._id} product={product} />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { ShoppingBag, MapPin, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import CartSidebar from "@/components/cart/CartSidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setSearchQuery } from "../../services/searchSlice";
import { useGetProductsQuery } from "../../services/api/productsApiSlice";
import { Product } from "@/data/types";
import ProductCard from "../food/ProductCard";
import { useMemo, useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const totalItems = useSelector((state: RootState) => state.cart.items.length);
  const [showOverlay, setShowOverlay] = useState(false);

  const { data: products = [], isLoading } = useGetProductsQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    setShowOverlay(value.trim().length > 0);
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
    setShowOverlay(false);
  };

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products.filter((p: Product) =>
      p.product.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, products]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src="/lovable-uploads/0e7195fe-d294-485f-8c70-78621c31d5b6.png"
                alt="Masa Treat"
                className="h-12 w-auto md:h-14 lg:h-16"
              />
            </Link>

            {/* Desktop search bar */}
            <div className="hidden md:flex items-center relative max-w-sm w-full lg:max-w-md">
              <div className="relative w-full">
                <span className="absolute left-3 top-2.5 text-neutral-400">
                  <Search size={18} />
                </span>
                <Input
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-10 bg-neutral-50 border-neutral-200 text-sm h-10 focus:ring-2 focus:ring-green-500/20"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Address display (desktop only) */}
            <div className="hidden lg:flex items-center text-neutral-700 text-sm xl:text-base">
              <MapPin className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              <span className="truncate max-w-xs xl:max-w-none">
                B14 Close, Citec Estate, Mbora, Abuja
              </span>
            </div>

            {/* Cart button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative h-10 px-3 md:px-4"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Cart</span>
                  <span className="sm:hidden">Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg p-0">
                <CartSidebar />
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile search bar */}
          <div className="md:hidden mt-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-10 bg-neutral-50 border-neutral-200 text-sm h-9 w-full"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Search Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-40 mt-[84px] bg-white">
          <div className="container mx-auto px-4 py-4 h-[calc(100vh-84px)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Search results for "{searchQuery}"
              </h2>
              <button
                onClick={handleClearSearch}
                className="p-2 text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-neutral-400">Loading...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-64 text-center">
                <Search size={48} className="text-neutral-300 mb-4" />
                <p className="text-neutral-500 text-lg">
                  No products found for "{searchQuery}"
                </p>
                <p className="text-neutral-400 mt-2">
                  Try different keywords or check back later
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
                {filtered.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
