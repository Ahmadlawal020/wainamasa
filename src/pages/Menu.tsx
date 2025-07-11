import { useState } from "react";
import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from "../services/api/productsApiSlice";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/food/ProductCard";
import CategoryHeader from "@/components/food/CategoryHeader";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch products based on category
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = activeCategory === "all"
    ? useGetProductsQuery()
    : useGetProductsByCategoryQuery(activeCategory);

  return (
    <>
      <Header />
      <main className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Our Menu</h1>
            <p className="text-neutral-600">
              Discover authentic Northern Nigerian cuisine made with traditional
              recipes and the freshest ingredients. All dishes are prepared
              fresh upon order.
            </p>
          </div>

          <CategoryHeader onCategoryChange={setActiveCategory} />

          {/* Loading/Error handling */}
          {isLoading ? (
            <p className="text-center text-lg">Loading products...</p>
          ) : isError ? (
            <p className="text-center text-red-500">
              Error loading products: {error?.message || "Unknown error"}
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
