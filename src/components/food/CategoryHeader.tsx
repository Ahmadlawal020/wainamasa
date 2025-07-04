import { useState } from "react";
import {
  Utensils,
  Soup,
  Coffee,
  Package,
  ShoppingBag,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
}

export default function CategoryHeader({
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories: Category[] = [
    { id: "all", label: "All Items", icon: Utensils },
    { id: "masa", label: "Masa", icon: Package },
    { id: "meat", label: "Meat", icon: Utensils },
    { id: "soups", label: "Soups", icon: Soup },
    { id: "drinks", label: "Drinks", icon: Coffee },
    { id: "comboDeals", label: "Combo Deals", icon: Box },
    { id: "extras", label: "Extras", icon: ShoppingBag },
  ];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="overflow-x-auto py-4 mb-6">
      <div className="flex space-x-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                "flex items-center px-5 py-3 rounded-full whitespace-nowrap transition-all",
                activeCategory === category.id
                  ? "bg-green-500 text-white"
                  : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700"
              )}
            >
              <Icon className="h-4 w-4 mr-2" />
              <span className="font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
