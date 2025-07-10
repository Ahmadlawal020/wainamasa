import { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import { Product, PackageOption } from "@/data/types"; // Keep PackageOption for type definition if Product still references it, otherwise remove.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // This might become unused
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { addToCart } from "../../services/cartSlice";

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  // Removed selectedPackage and customQuantity states as they are no longer needed
  // Removed isCustomOrder and minOrder variables

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setNotes("");
      // Removed package-related state resets
    }
  }, [open, product]);

  const handleQuantityChange = (val: number) => {
    if (val >= 1) setQuantity(val);
  };

  // Removed handleCustomQtyChange as custom quantity is no longer needed

  const handleAddToCart = () => {
    // Simplified addToCart as there are no package options or custom quantities
    dispatch(addToCart({ product, quantity, notes, selectedPackage: null })); // Pass null for selectedPackage
    onOpenChange(false);
  };

  // Simplified price calculation
  const totalPrice = product.price * quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Corrected DialogContent className for balanced spacing */}
      <DialogContent className="w-full max-w-sm sm:max-w-md p-0 overflow-hidden rounded-xl max-h-[90vh]">
        <ScrollArea className="max-h-[90vh]">
          <div className="flex flex-col">
            {/* Product Image */}
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src={product.image}
                alt={product.product}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </AspectRatio>

            <div className="p-4 sm:p-6 space-y-5">
              {/* Header */}
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-lg sm:text-2xl font-semibold">
                      {product.product}
                    </DialogTitle>
                    <DialogDescription className="text-brand-600 font-medium mt-1 text-sm sm:text-base">
                      {/* Display product's base price */}
                      {formatCurrency(product.price)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Removed Package Options section */}
              {/* Removed Custom Quantity Input section */}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">How many</label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center mx-2 h-8"
                    min={1}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total Price</span>
                  <span className="text-lg text-green-600 font-semibold">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 gap-2">
                <DialogClose asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Add to Cart <ShoppingCartIcon className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
