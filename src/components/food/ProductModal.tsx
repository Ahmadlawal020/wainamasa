// import { useState, useEffect } from "react";
// import { ChevronUp, ChevronDown, ShoppingCart } from "lucide-react";
// import { Product, PackageOption } from "@/data/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { formatCurrency } from "@/lib/utils";
// import { useCart } from "@/context/CartContext";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogClose
// } from "@/components/ui/dialog";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface ProductModalProps {
//   product: Product;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
//   const { addToCart } = useCart();
//   const [quantity, setQuantity] = useState(1);
//   const [notes, setNotes] = useState("");
//   const [selectedPackage, setSelectedPackage] = useState<PackageOption | undefined>(
//     product.packageOptions?.[0]
//   );
//   const [customQuantity, setCustomQuantity] = useState(product.minimumOrder || 4);

//   // Reset selections when product changes or modal opens
//   useEffect(() => {
//     if (open) {
//       setQuantity(1);
//       setNotes("");
//       setSelectedPackage(product.packageOptions?.[0]);
//       setCustomQuantity(product.minimumOrder || 4);
//     }
//   }, [open, product]);

//   const handleQuantityChange = (value: number) => {
//     if (value >= 1) {
//       setQuantity(value);
//     }
//   };

//   const handleCustomQuantityChange = (value: number) => {
//     const minOrder = product.minimumOrder || 4;
//     if (value >= minOrder) {
//       setCustomQuantity(value);
//     }
//   };

//   const handleAddToCart = () => {
//     // If it's the "custom" package option, calculate price based on quantity
//     if (selectedPackage?.id === 'custom' && product.price) {
//       const updatedPackage = {
//         ...selectedPackage,
//         quantity: customQuantity,
//         price: customQuantity * product.price
//       };
//       addToCart(product, quantity, notes, updatedPackage);
//     } else {
//       addToCart(product, quantity, notes, selectedPackage);
//     }

//     setQuantity(1);
//     setNotes("");
//     onOpenChange(false);
//   };

//   // Calculate the current price based on package selection or individual price
//   const currentPrice = selectedPackage ? selectedPackage.price : product.price;
//   const totalPrice = currentPrice * quantity;

//   // Check if this is the masa product with custom quantity option
//   const isCustomOrder = selectedPackage?.id === 'custom';
//   const isPlainMasa = product.id === '1';

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg max-h-[90vh]">
//         <ScrollArea className="max-h-[90vh]">
//           <div className="flex flex-col">
//             {/* Image Section */}
//             <AspectRatio ratio={16/9} className="bg-muted">
//               <img
//                 src={product.imageSrc}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </AspectRatio>

//             {/* Content Section */}
//             <div className="p-6 space-y-5">
//               <DialogHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <DialogTitle className="text-xl font-bold menu-item-title">{product.name}</DialogTitle>
//                     <DialogDescription className="text-brand-500 font-medium mt-1 price-text">
//                       {product.hasPackageOptions ? `From ${formatCurrency(product.price)}` : formatCurrency(product.price)}
//                     </DialogDescription>
//                   </div>
//                 </div>
//               </DialogHeader>

//               <p className="text-neutral-600 body-text">{product.description}</p>

//               {/* Package Options Section */}
//               {product.hasPackageOptions && product.packageOptions && (
//                 <div className="space-y-3">
//                   <label className="text-sm font-medium">Choose Package</label>
//                   <RadioGroup
//                     value={selectedPackage?.id}
//                     onValueChange={(value) => {
//                       const selected = product.packageOptions?.find(pkg => pkg.id === value);
//                       setSelectedPackage(selected);
//                     }}
//                     className="flex flex-col space-y-2"
//                   >
//                     {product.packageOptions.map((pkg) => (
//                       <label
//                         key={pkg.id}
//                         className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${
//                           selectedPackage?.id === pkg.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <RadioGroupItem value={pkg.id} id={pkg.id} />
//                           <div>
//                             <p className="font-medium text-sm">{pkg.name}</p>
//                             <p className="text-xs text-neutral-500">{pkg.description}</p>
//                           </div>
//                         </div>
//                         <span className="font-medium text-green-500 price-text">
//                           {pkg.id === 'custom' ? `From ${formatCurrency(pkg.price)}` : formatCurrency(pkg.price)}
//                         </span>
//                       </label>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               {/* Custom Quantity Section (only for custom Masa orders) */}
//               {isCustomOrder && (
//                 <div className="space-y-2 border-t border-dashed pt-4">
//                   <label className="text-sm font-medium">
//                     Custom Quantity {product.minimumOrder && `(Minimum: ${product.minimumOrder})`}
//                   </label>
//                   <div className="flex items-center">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => handleCustomQuantityChange(customQuantity - 1)}
//                       disabled={customQuantity <= (product.minimumOrder || 4)}
//                     >
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                     <Input
//                       type="number"
//                       value={customQuantity}
//                       onChange={(e) => handleCustomQuantityChange(parseInt(e.target.value) || (product.minimumOrder || 4))}
//                       className="w-16 text-center mx-2 h-8"
//                       min={product.minimumOrder || 4}
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => handleCustomQuantityChange(customQuantity + 1)}
//                     >
//                       <ChevronUp className="h-4 w-4" />
//                     </Button>
//                     <span className="ml-3 text-base text-neutral-500">
//                       {formatCurrency(product.price * customQuantity)}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {/* Package Quantity */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Package Quantity
//                 </label>
//                 <div className="flex items-center">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="icon"
//                     className="h-8 w-8"
//                     onClick={() => handleQuantityChange(quantity - 1)}
//                     disabled={quantity <= 1}
//                   >
//                     <ChevronDown className="h-4 w-4" />
//                   </Button>
//                   <Input
//                     type="number"
//                     value={quantity}
//                     onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
//                     className="w-16 text-center mx-2 h-8"
//                     min={1}
//                   />
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="icon"
//                     className="h-8 w-8"
//                     onClick={() => handleQuantityChange(quantity + 1)}
//                   >
//                     <ChevronUp className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               {/* Total Price */}
//               <div className="pt-2 border-t">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-sm">Total:</span>
//                   <span className="text-lg font-bold text-green-500 price-text">
//                     {isCustomOrder
//                       ? formatCurrency(product.price * customQuantity * quantity)
//                       : formatCurrency(totalPrice)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center pt-2">
//                 <DialogClose asChild>
//                   <Button variant="outline" size="sm" className="button-text">Cancel</Button>
//                 </DialogClose>
//                 <Button
//                   onClick={handleAddToCart}
//                   size="sm"
//                   className="bg-green-500 hover:bg-green-600 button-text"
//                 >
//                   Add to Cart <ShoppingCart className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, ShoppingCart } from "lucide-react";
import { Product, PackageOption } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
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
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<
    PackageOption | undefined
  >(product.packageOptions?.[0]);
  const [customQuantity, setCustomQuantity] = useState(
    product.minimumOrder || 4
  );

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

  const handleQuantityChange = (value: number) => {
    if (value >= 1) setQuantity(value);
  };

  const handleCustomQuantityChange = (value: number) => {
    if (value >= minOrder) setCustomQuantity(value);
  };

  const handleAddToCart = () => {
    if (isCustomOrder && product.price) {
      const updatedPackage: PackageOption = {
        ...selectedPackage!,
        quantity: customQuantity,
        price: customQuantity * product.price,
      };
      addToCart(product, quantity, notes, updatedPackage);
    } else {
      addToCart(product, quantity, notes, selectedPackage);
    }

    setQuantity(1);
    setNotes("");
    onOpenChange(false);
  };

  const currentPrice = selectedPackage?.price || product.price || 0;
  const totalPrice = isCustomOrder
    ? product.price * customQuantity * quantity
    : currentPrice * quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg max-h-[90vh]">
        <ScrollArea className="max-h-[90vh]">
          <div className="flex flex-col">
            {/* Image */}
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src={product.image}
                alt={product.product}
                className="w-full h-full object-cover"
              />
            </AspectRatio>

            {/* Content */}
            <div className="p-6 space-y-5">
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-xl font-bold">
                      {product.product}
                    </DialogTitle>
                    <DialogDescription className="text-brand-500 font-medium mt-1">
                      {product.hasPackageOptions
                        ? `From ${formatCurrency(product.price)}`
                        : formatCurrency(product.price)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <p className="text-neutral-600">{product.description}</p>

              {/* Package Options */}
              {product.hasPackageOptions &&
                product.packageOptions?.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Choose Package
                    </label>
                    <RadioGroup
                      value={selectedPackage?.id}
                      onValueChange={(value) => {
                        const found = product.packageOptions?.find(
                          (p) => p.id === value
                        );
                        setSelectedPackage(found);
                      }}
                      className="flex flex-col space-y-2"
                    >
                      {product.packageOptions.map((pkg) => (
                        <label
                          key={pkg.id}
                          className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${
                            selectedPackage?.id === pkg.id
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={pkg.id} id={pkg.id} />
                            <div>
                              <p className="font-medium text-sm">{pkg.name}</p>
                              <p className="text-xs text-neutral-500">
                                {pkg.description}
                              </p>
                            </div>
                          </div>
                          <span className="font-medium text-green-500">
                            {pkg.id === "custom"
                              ? `From ${formatCurrency(pkg.price)}`
                              : formatCurrency(pkg.price)}
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                )}

              {/* Custom Quantity for Masa */}
              {isCustomOrder && (
                <div className="space-y-2 border-t border-dashed pt-4">
                  <label className="text-sm font-medium">
                    Custom Quantity (Minimum: {minOrder})
                  </label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleCustomQuantityChange(customQuantity - 1)
                      }
                      disabled={customQuantity <= minOrder}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={customQuantity}
                      onChange={(e) =>
                        handleCustomQuantityChange(
                          parseInt(e.target.value) || minOrder
                        )
                      }
                      className="w-16 text-center mx-2 h-8"
                      min={minOrder}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        handleCustomQuantityChange(customQuantity + 1)
                      }
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <span className="ml-3 text-base text-neutral-500">
                      {formatCurrency(product.price * customQuantity)}
                    </span>
                  </div>
                </div>
              )}

              {/* Package Quantity */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Package Quantity</label>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <ChevronDown className="h-4 w-4" />
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
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Price */}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Total:</span>
                  <span className="text-lg font-bold text-green-500">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-2">
                <DialogClose asChild>
                  <Button variant="outline" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  Add to Cart <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
