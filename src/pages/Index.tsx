// import { useState, useMemo } from "react";
// import Hero from "@/components/home/Hero";
// import ProductCard from "@/components/food/ProductCard";
// import HowItWorks from "@/components/home/HowItWorks";
// // import ValueProposition from "@/components/home/ValueProposition";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import CategoryHeader from "@/components/food/CategoryHeader";

// import {
//   useGetProductsQuery,
//   useGetProductsByCategoryQuery,
// } from "../services/api/productsApiSlice";

// export default function Index() {
//   const [activeCategory, setActiveCategory] = useState("all");

//   // Fetch data based on category
//   const {
//     data: allProducts,
//     isLoading,
//     isError,
//   } = activeCategory === "all"
//     ? useGetProductsQuery()
//     : useGetProductsByCategoryQuery(activeCategory);

//   // Limit to 12 products
//   const filteredProducts = useMemo(() => {
//     return allProducts?.slice(0, 12) || [];
//   }, [allProducts]);

//   return (
//     <>
//       <Header />
//       <main>
//         <Hero />

//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <CategoryHeader onCategoryChange={setActiveCategory} />

//             {/* Loading State */}
//             {isLoading && (
//               <p className="text-center text-muted-foreground py-10">
//                 Loading products...
//               </p>
//             )}

//             {/* Error State */}
//             {isError && (
//               <p className="text-center text-red-500 py-10">
//                 Failed to load products.
//               </p>
//             )}

//             {/* Product Grid */}
//             {!isLoading && !isError && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//                 {filteredProducts.length ? (
//                   filteredProducts.map((product) => (
//                     <ProductCard key={product._id} product={product} />
//                   ))
//                 ) : (
//                   <p className="col-span-full text-center text-muted-foreground">
//                     No products found.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </section>

//         <HowItWorks />
// {/*         <ValueProposition /> */}
//       </main>
//       <Footer />
//     </>
//   );
// }

import { useState, useMemo } from "react";
import Hero from "@/components/home/Hero";
import ProductCard from "@/components/food/ProductCard";
import HowItWorks from "@/components/home/HowItWorks";
// import ValueProposition from "@/components/home/ValueProposition";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryHeader from "@/components/food/CategoryHeader";

import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from "../services/api/productsApiSlice";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch data based on category
  const {
    data: allProducts,
    isLoading,
    isError,
  } = activeCategory === "all"
    ? useGetProductsQuery()
    : useGetProductsByCategoryQuery(activeCategory);

  // Limit to 12 products
  const filteredProducts = useMemo(() => {
    return allProducts?.slice(0, 12) || [];
  }, [allProducts]);

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <CategoryHeader onCategoryChange={setActiveCategory} />

            {/* Loading State */}
            {isLoading && (
              <p className="text-center text-muted-foreground py-10">
                Loading products...
              </p>
            )}

            {/* Error State */}
            {isError && (
              <p className="text-center text-red-500 py-10">
                Failed to load products.
              </p>
            )}

            {/* Product Grid */}
            {!isLoading && !isError && (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.length ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground">
                    No products found.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        <HowItWorks />
        {/* <ValueProposition /> */}
      </main>
      <Footer />
    </>
  );
}
