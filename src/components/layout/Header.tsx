"use client";

import {
  ShoppingBag,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import CartSidebar from "@/components/cart/CartSidebar";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setSearchQuery } from "../../services/searchSlice";
import { useGetProductsQuery } from "../../services/api/productsApiSlice";
import { useEffect, useState } from "react";
import { Product } from "@/data/types";

export default function Header() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const totalItems = useSelector((state: RootState) => state.cart.items.length);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [showOverlay, setShowOverlay] = useState(false);

  const { data: products = [] } = useGetProductsQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    setShowOverlay(!!value.trim());
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
    setShowOverlay(false);
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = products.filter((p) =>
        p.product.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  }, [searchQuery, products]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/lovable-uploads/0e7195fe-d294-485f-8c70-78621c31d5b6.png"
                alt="Masa Treat"
                className="h-12 md:h-14 lg:h-16"
              />
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex relative w-full max-w-md">
              <Search className="absolute left-3 top-2.5 text-neutral-400" size={18} />
              <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-10 h-10 bg-neutral-50 border-neutral-200 text-sm focus:ring-green-500/20"
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

            {/* Address */}
            <div className="hidden lg:flex items-center text-sm text-neutral-700">
              <MapPin className="h-4 w-4 mr-2 text-green-500" />
              <span className="truncate max-w-xs xl:max-w-none">
                B14 Close, Citec Estate, Mbora, Abuja
              </span>
            </div>

            {/* Cart */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative h-10 px-4"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
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

          {/* Mobile Search */}
          <div className="mt-3 md:hidden relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <Input
              placeholder="Search menu..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-10 h-9 bg-neutral-50 border-neutral-200 text-sm w-full"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Optional: Search overlay or suggestions UI */}
      {showOverlay && (
        <div className="fixed inset-0 z-40 bg-white mt-[84px] overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            {/* Render your search suggestions or filtered results here */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((item) => (
                  <div key={item._id}>
                    {/* Replace with actual <ProductCard /> or relevant UI */}
                    <div className="p-4 border rounded shadow-sm">{item.product}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-500">No matching items found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
