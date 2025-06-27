
import { ShoppingBag, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import CartSidebar from "@/components/cart/CartSidebar";
import { Input } from "@/components/ui/input";

export default function Header() {
  const { totalItems } = useCart();
  
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Made more prominent */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/lovable-uploads/0e7195fe-d294-485f-8c70-78621c31d5b6.png" 
              alt="Masa Treat" 
              className="h-12 w-auto md:h-14 lg:h-16" 
            />
          </Link>
          
          {/* Search - Hidden on small screens, improved on larger */}
          <div className="hidden md:flex items-center relative max-w-sm w-full lg:max-w-md">
            <Search className="h-4 w-4 absolute left-3 text-neutral-400" />
            <Input
              placeholder="Search menu..."
              className="pl-10 bg-neutral-50 border-neutral-200 text-sm h-10 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
          
          {/* Address - Better responsive handling */}
          <div className="hidden lg:flex items-center text-neutral-700 text-sm xl:text-base">
            <MapPin className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
            <span className="truncate max-w-xs xl:max-w-none">B14 Close, Citec Estate, Mbora, Abuja</span>
          </div>
          
          {/* Cart Button - Improved mobile sizing */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative h-10 px-3 md:px-4">
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
        
        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search menu..."
              className="pl-10 bg-neutral-50 border-neutral-200 text-sm h-9 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
