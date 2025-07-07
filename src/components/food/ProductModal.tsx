import { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import { Product, PackageOption } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | undefined>(
    product.packageOptions?.[0]
  );
  const [customQuantity, setCustomQuantity] = useState(product.minimumOrder || 4);

  const isCustomOrder = selectedPackage?.id === "custom";
  const minOrder = product.minimumOrder || 4;

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setNotes("");
      setSelectedPackage(product.packageOptions?.[0]);
      setCustomQuantity(minOrder);
    }
  }, [open, product]);

  const handleQuantityChange = (val: number) => {
    if (val >= 1) setQuantity(val);
  };

  const handleCustomQtyChange = (val: number) => {
    if (val >= minOrder) setCustomQuantity(val);
  };

  const handleAddToCart = () => {
    const finalPackage = isCustomOrder
      ? {
          ...selectedPackage!,
          quantity: customQuantity,
          price: customQuantity * product.price!,
        }
      : selectedPackage;

    dispatch(addToCart({ product, quantity, notes, selectedPackage: finalPackage }));
    onOpenChange(false);
  };

  const unitPrice = selectedPackage?.price || product.price || 0;
  const totalPrice = isCustomOrder
    ? product.price! * customQuantity * quantity
    : unitPrice * quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden rounded-xl max-h-[90vh]">
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

            <div className="p-6 space-y-5">
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl font-semibold">
                      {product.product}
                    </DialogTitle>
                    <DialogDescription className="text-brand-600 font-medium mt-1">
                      {product.hasPackageOptions
                        ? `From ${formatCurrency(product.price)}`
                        : formatCurrency(product.price)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {product.description && (
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Package Options */}
              {product.hasPackageOptions && product.packageOptions?.length > 0 && (
                <div className="space-y-3">
                  <label className="text-sm font-medium">Choose Package</label>
                  <RadioGroup
                    value={selectedPackage?.id}
                    onValueChange={(id) =>
                      setSelectedPackage(
                        product.packageOptions?.find((p) => p.id === id)
                      )
                    }
                    className="flex flex-col gap-2"
                  >
                    {product.packageOptions.map((pkg) => (
                      <label
                        key={pkg.id}
                        htmlFor={pkg.id}
                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedPackage?.id === pkg.id
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={pkg.id} id={pkg.id} />
                          <div className="space-y-0.5">
                            <p className="text-sm font-medium">{pkg.name}</p>
                            {pkg.description && (
                              <p className="text-xs text-neutral-500">
                                {pkg.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">
                          {pkg.id === "custom"
                            ? `From ${formatCurrency(pkg.price)}`
                            : formatCurrency(pkg.price)}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Custom Quantity Input */}
              {isCustomOrder && (
                <div className="pt-4 border-t border-dashed space-y-2">
                  <label className="text-sm font-medium">
                    Custom Quantity (Min: {minOrder})
                  </label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleCustomQtyChange(customQuantity - 1)}
                      disabled={customQuantity <= minOrder}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      value={customQuantity}
                      onChange={(e) =>
                        handleCustomQtyChange(parseInt(e.target.value) || minOrder)
                      }
                      className="w-16 text-center mx-2 h-8"
                      min={minOrder}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleCustomQtyChange(customQuantity + 1)}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <span className="ml-3 text-sm text-neutral-600">
                      {formatCurrency(product.price! * customQuantity)}
                    </span>
                  </div>
                </div>
              )}

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
              <div className="flex justify-between items-center pt-4">
                <DialogClose asChild>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
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
