// components/ProductCard.tsx

"use client"; // if you're using Next.js App Router

import { useState } from "react";
import { Product } from "@/data/types";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    // <div className="food-card group bg-white rounded-xl shadow-sm transition-all hover:shadow-md border border-neutral-100">
    <div className="food-card group bg-white rounded-xl shadow-sm transition-all hover:shadow-md border border-neutral-100 min-w-[160px]">
      <ProductModal
        product={product}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />

      <div
        className="aspect-square overflow-hidden rounded-t-xl cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <img
          src={product.image}
          alt={product.product}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4 md:p-5">
        <div onClick={() => setIsDialogOpen(true)} className="cursor-pointer">
          <h3 className="text-lg md:text-xl font-bold menu-item-title mb-2 line-clamp-1">
            {product.product}
          </h3>
        </div>

        <p className="text-sm md:text-base text-neutral-600 body-text mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="price-text">
            {product.hasPackageOptions ? (
              <span>
                <span className="text-green-500 font-normal mr-1 text-sm">
                  From
                </span>
                <span className="text-base md:text-lg font-bold">
                  {formatCurrency(product.price)}
                </span>
              </span>
            ) : (
              <span className="text-base md:text-lg font-bold">
                <span className="text-green-500 font-normal mr-1 text-sm">
                  From
                </span>
                {formatCurrency(product.price)}
              </span>
            )}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
            className="text-green-500 hover:text-green-600 hover:bg-green-50 p-2 h-9 w-9 rounded-full"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
