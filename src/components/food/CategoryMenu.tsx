// import { useState } from "react";
// import { Product } from "@/data/types";
// import ProductCard from "@/components/food/ProductCard";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { getProductsByCategory, products } from "@/data/products";

// export default function CategoryMenu() {
//   const [activeCategory, setActiveCategory] = useState<string>("all");

//   const categories = [
//     { id: "all", label: "All" },
//     { id: "masa", label: "Masa" },
//     { id: "soups", label: "Soups" },
//     { id: "pepper", label: "Pepper" },
//     { id: "drinks", label: "Drinks" },
//   ];

//   const filteredProducts = activeCategory === "all"
//     ? products
//     : getProductsByCategory(activeCategory);

//   return (
//     <div>
//       <Tabs defaultValue="all" onValueChange={setActiveCategory}>
//         <div className="mb-8 overflow-x-auto">
//           <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
//             {categories.map((category) => (
//               <TabsTrigger
//                 key={category.id}
//                 value={category.id}
//                 className="px-8 py-3 data-[state=active]:border-brand-500 data-[state=active]:border-b-2 data-[state=active]:text-brand-500 data-[state=active]:bg-transparent rounded-none text-base"
//               >
//                 {category.label}
//               </TabsTrigger>
//             ))}
//           </TabsList>
//         </div>

//         {categories.map((category) => (
//           <TabsContent key={category.id} value={category.id} className="mt-0">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   );
// }

import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from "../../services/api/productsApiSlice";
import ProductCard from "@/components/food/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CategoryMenu() {
  const categories = [
    { id: "all", label: "All" },
    { id: "Clothing", label: "Clothing" },
    { id: "soups", label: "Soups" },
    { id: "pepper", label: "Pepper" },
    { id: "drinks", label: "Drinks" },
  ];

  return (
    <div>
      <Tabs defaultValue="all">
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

        {categories.map((category) => {
          const isAll = category.id === "all";
          const {
            data: products,
            isLoading,
            isError,
            error,
          } = isAll
            ? useGetProductsQuery()
            : useGetProductsByCategoryQuery(category.id);

          return (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              {isLoading ? (
                <p className="text-center text-muted-foreground">Loading...</p>
              ) : isError ? (
                <p className="text-center text-red-500">
                  {error?.message || "Failed to load products."}
                </p>
              ) : products?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No products in this category.
                </p>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
