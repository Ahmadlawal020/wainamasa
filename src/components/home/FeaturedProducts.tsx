import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/food/ProductCard";

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold font-display mb-2">
              Popular Dishes
            </h2>
            <p className="text-neutral-600 max-w-2xl">
              Our most loved dishes, handcrafted with authentic flavors and
              traditions.
            </p>
          </div>
          <Link
            to="/menu"
            className="flex items-center text-brand-500 font-medium mt-4 md:mt-0 hover:underline"
          >
            View Full Menu
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
