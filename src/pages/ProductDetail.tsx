
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : null;
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  
  if (!product) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">Sorry, we couldn't find the product you were looking for.</p>
            <Button onClick={() => navigate("/menu")}>Back to Menu</Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (value: number) => {
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, notes);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-6 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square overflow-hidden rounded-lg">
            <img
              src={product.imageSrc}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-brand-500 font-medium mb-4">
              {formatCurrency(product.price)}
            </p>
            
            <div className="border-t border-b py-6 my-6">
              <p className="text-neutral-700 mb-6">{product.description}</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center mx-2"
                    min="1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Special Instructions (Optional)
                </label>
                <Textarea
                  placeholder="Any specific preferences? e.g. Extra spicy, less salt"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="resize-none"
                />
              </div>
            </div>
            
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full md:w-auto"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
