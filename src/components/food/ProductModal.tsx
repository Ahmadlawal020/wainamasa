'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronUp, ChevronDown, ShoppingCartIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ProductOption {
  id: string;
  name: string;
  description?: string;
  price: number;
}

interface Product {
  id: string;
  product: string;
  price: number;
  image: string;
  description?: string;
  hasPackageOptions?: boolean;
  packageOptions?: ProductOption[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<ProductOption | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [customQuantity, setCustomQuantity] = useState(10);
  const minOrder = 10;

  useEffect(() => {
    if (product?.packageOptions?.length) {
      setSelectedPackage(product.packageOptions[0]);
    } else {
      setSelectedPackage(undefined);
    }
    setQuantity(1);
    setCustomQuantity(minOrder);
  }, [product]);

  if (!product) return null;

  const isCustomOrder = selectedPackage?.id === 'custom';
  const totalPrice = isCustomOrder
    ? customQuantity * product.price
    : (selectedPackage?.price || product.price) * quantity;

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handleCustomQtyChange = (value: number) => {
    if (value < minOrder) return;
    setCustomQuantity(value);
  };

  const handleAddToCart = () => {
    // your add-to-cart logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md w-full overflow-hidden rounded-xl p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="flex flex-col">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src={product.image}
                alt={product.product}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </AspectRatio>

            <div className="px-4 py-5 sm:p-6 space-y-4 text-sm">
              <DialogHeader className="mb-1">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-base sm:text-xl font-semibold">
                      {product.product}
                    </DialogTitle>
                    <DialogDescription className="text-brand-600 font-medium mt-1 text-xs sm:text-sm">
                      {product.hasPackageOptions
                        ? `From ${formatCurrency(product.price)}`
                        : formatCurrency(product.price)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              {product.description && (
                <p className="text-xs text-neutral-700 leading-snug">
                  {product.description}
                </p>
              )}

              {product.hasPackageOptions && product.packageOptions?.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-medium">Choose Package</label>
                  <RadioGroup
                    value={selectedPackage?.id}
                    onValueChange={(id) =>
                      setSelectedPackage(product.packageOptions?.find((p) => p.id === id))
                    }
                    className="flex flex-col gap-2"
                  >
                    {product.packageOptions.map((pkg) => (
                      <label
                        key={pkg.id}
                        htmlFor={pkg.id}
                        className={`flex items-center justify-between p-2 border rounded-md cursor-pointer ${
                          selectedPackage?.id === pkg.id
                            ? 'border-green-600 bg-green-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <RadioGroupItem value={pkg.id} id={pkg.id} />
                          <div>
                            <p className="text-sm font-medium">{pkg.name}</p>
                            {pkg.description && (
                              <p className="text-[11px] text-neutral-500">
                                {pkg.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-green-600 text-xs font-semibold">
                          {pkg.id === 'custom'
                            ? `From ${formatCurrency(pkg.price)}`
                            : formatCurrency(pkg.price)}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {isCustomOrder && (
                <div className="pt-3 border-t border-dashed space-y-1.5">
                  <label className="text-xs font-medium">
                    Custom Quantity (Min: {minOrder})
                  </label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
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
                      className="w-14 text-center mx-2 h-7"
                      min={minOrder}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleCustomQtyChange(customQuantity + 1)}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <span className="ml-3 text-xs text-neutral-600">
                      {formatCurrency(product.price * customQuantity)}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium">How many</label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
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
                    className="w-14 text-center mx-2 h-7"
                    min={1}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="flex justify-between text-sm font-medium">
                  <span>Total</span>
                  <span className="text-green-600 text-base font-semibold">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 gap-2">
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
