import { useState } from "react";
import { useGetProductsQuery } from "../../services/api/productsApiSlice";
import ProductCard from "@/components/food/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Category {
  id: string;
  label: string;
}

export default function CategoryMenu() {
  const categories: Category[] = [
    { id: "all", label: "Featured" },
    { id: "comboDeals", label: "Combo Deals" },
    { id: "masa", label: "Masa" },
    { id: "meat", label: "Meat" },
    { id: "soups", label: "Soups" },
    { id: "drinks", label: "Drinks" },
    { id: "extras", label: "Extras" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products?.filter(
          (product: any) => product.category === selectedCategory
        );

  return (
    <div>
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <div className="mb-8 overflow-x-auto">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-8 py-3 data-[state=active]:border-brand-500 data-[state=active]:border-b-2 data-[state=active]:text-brand-500 data-[state=active]:bg-transparent rounded-none text-base"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={selectedCategory} className="mt-0">
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : isError ? (
            <p className="text-center text-red-500">
              {error?.message || "Failed to load products."}
            </p>
          ) : filteredProducts?.length ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No products in this category.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
