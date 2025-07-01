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
    const finalPackage =
      isCustomOrder && product.price
        ? {
            ...selectedPackage!,
            quantity: customQuantity,
            price: customQuantity * product.price,
          }
        : selectedPackage;

    dispatch(
      addToCart({
        product,
        quantity,
        notes,
        selectedPackage: finalPackage,
      })
    );

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
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src={product.image}
                alt={product.product}
                className="w-full h-full object-cover"
              />
            </AspectRatio>

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

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Total:</span>
                  <span className="text-lg font-bold text-green-500">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
              </div>

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
                  Add to Cart <ShoppingCartIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   ShoppingCart as ShoppingCartIcon,
// } from "lucide-react";
// import { Product, PackageOption } from "@/data/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { formatCurrency } from "@/lib/utils";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../services/cartSlice";

// interface ProductModalProps {
//   product: Product;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function ProductModal({
//   product,
//   open,
//   onOpenChange,
// }: ProductModalProps) {
//   const dispatch = useDispatch();

//   const [quantity, setQuantity] = useState(1);
//   const [notes, setNotes] = useState("");
//   const [customQuantity, setCustomQuantity] = useState(1);

//   const [packageOptions, setPackageOptions] = useState<PackageOption[]>([]);
//   const [selectedPackage, setSelectedPackage] = useState<
//     PackageOption | undefined
//   >();

//   const minOrder = product.minOrder || 1;
//   const hasPackageOptions = product.packages && product.packages.length > 0;
//   const isCustomOrder = selectedPackage?.id === "custom";

//   // Generate package options (put "custom" first if packages exist)
//   useEffect(() => {
//     if (hasPackageOptions) {
//       const options: PackageOption[] = [
//         {
//           id: "custom",
//           name: "Custom Order",
//           description: `Choose your own quantity (min ${minOrder})`,
//           quantity: 0,
//           price: product.price,
//         },
//         ...product.packages.map((pkg, index) => ({
//           id: `pkg-${index}`,
//           name: pkg.name,
//           description: `${pkg.quantity} units`,
//           quantity: pkg.quantity,
//           price: pkg.quantity * product.price,
//         })),
//       ];

//       setPackageOptions(options);
//     } else {
//       setPackageOptions([
//         {
//           id: "default",
//           name: "Default",
//           description: "",
//           quantity: 1,
//           price: product.price,
//         },
//       ]);
//     }
//   }, [product, minOrder, hasPackageOptions]);

//   // Set default selected package (custom first)
//   useEffect(() => {
//     if (open && packageOptions.length > 0) {
//       setQuantity(1);
//       setNotes("");
//       const customPkg = packageOptions.find((p) => p.id === "custom");
//       setSelectedPackage(customPkg || packageOptions[0]);
//       setCustomQuantity(minOrder);
//     }
//   }, [open, packageOptions, minOrder]);

//   const handleQuantityChange = (val: number) => {
//     if (val >= 1) setQuantity(val);
//   };

//   const handleCustomQuantityChange = (val: number) => {
//     if (val >= minOrder) setCustomQuantity(val);
//   };

//   const handleAddToCart = () => {
//     const finalPackage = isCustomOrder
//       ? {
//           ...selectedPackage!,
//           quantity: customQuantity,
//           price: customQuantity * product.price,
//         }
//       : selectedPackage;

//     dispatch(
//       addToCart({
//         product,
//         quantity,
//         notes,
//         selectedPackage: finalPackage,
//       })
//     );

//     setQuantity(1);
//     setNotes("");
//     onOpenChange(false);
//   };

//   const currentPrice = isCustomOrder
//     ? product.price * customQuantity
//     : selectedPackage?.price || product.price;

//   const totalPrice = currentPrice * quantity;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg max-h-[90vh]">
//         <ScrollArea className="max-h-[90vh]">
//           <div className="flex flex-col">
//             <AspectRatio ratio={16 / 9} className="bg-muted">
//               <img
//                 src={product.image}
//                 alt={product.product}
//                 className="w-full h-full object-cover"
//               />
//             </AspectRatio>

//             <div className="p-6 space-y-5">
//               <DialogHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <DialogTitle className="text-xl font-bold">
//                       {product.product}
//                     </DialogTitle>
//                     <DialogDescription className="text-brand-500 font-medium mt-1">
//                       {hasPackageOptions
//                         ? `From ${formatCurrency(product.price)}`
//                         : formatCurrency(product.price)}
//                     </DialogDescription>
//                   </div>
//                 </div>
//               </DialogHeader>

//               <p className="text-neutral-600">{product.description}</p>

//               {hasPackageOptions && (
//                 <div className="space-y-3">
//                   <label className="text-sm font-medium">Choose Package</label>
//                   <RadioGroup
//                     value={selectedPackage?.id}
//                     onValueChange={(value) => {
//                       const found = packageOptions.find((p) => p.id === value);
//                       setSelectedPackage(found);
//                     }}
//                     className="flex flex-col space-y-2"
//                   >
//                     {packageOptions.map((pkg) => (
//                       <label
//                         key={pkg.id}
//                         className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${
//                           selectedPackage?.id === pkg.id
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-200"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <RadioGroupItem value={pkg.id} id={pkg.id} />
//                           <div>
//                             <p className="font-medium text-sm">{pkg.name}</p>
//                             <p className="text-xs text-neutral-500">
//                               {pkg.description}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="font-medium text-green-500">
//                           {pkg.id === "custom"
//                             ? `From ${formatCurrency(pkg.price)}`
//                             : formatCurrency(pkg.price)}
//                         </span>
//                       </label>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               {isCustomOrder && (
//                 <div className="space-y-2 border-t border-dashed pt-4">
//                   <label className="text-sm font-medium">
//                     Custom Quantity (Minimum: {minOrder})
//                   </label>
//                   <div className="flex items-center">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() =>
//                         handleCustomQuantityChange(customQuantity - 1)
//                       }
//                       disabled={customQuantity <= minOrder}
//                     >
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                     <Input
//                       type="number"
//                       value={customQuantity}
//                       onChange={(e) =>
//                         handleCustomQuantityChange(
//                           parseInt(e.target.value) || minOrder
//                         )
//                       }
//                       className="w-16 text-center mx-2 h-8"
//                       min={minOrder}
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() =>
//                         handleCustomQuantityChange(customQuantity + 1)
//                       }
//                     >
//                       <ChevronUp className="h-4 w-4" />
//                     </Button>
//                     <span className="ml-3 text-base text-neutral-500">
//                       {formatCurrency(product.price * customQuantity)}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {!hasPackageOptions && (
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">
//                     Package Quantity
//                   </label>
//                   <div className="flex items-center">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => handleQuantityChange(quantity - 1)}
//                       disabled={quantity <= 1}
//                     >
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                     <Input
//                       type="number"
//                       value={quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(parseInt(e.target.value) || 1)
//                       }
//                       className="w-16 text-center mx-2 h-8"
//                       min={1}
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => handleQuantityChange(quantity + 1)}
//                     >
//                       <ChevronUp className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               <div className="pt-2 border-t">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-sm">Total:</span>
//                   <span className="text-lg font-bold text-green-500">
//                     {formatCurrency(totalPrice)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center pt-2">
//                 <DialogClose asChild>
//                   <Button variant="outline" size="sm">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//                 <Button
//                   onClick={handleAddToCart}
//                   size="sm"
//                   className="bg-green-500 hover:bg-green-600 text-white"
//                 >
//                   Add to Cart <ShoppingCartIcon className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   ShoppingCart as ShoppingCartIcon,
// } from "lucide-react";
// import { Product, PackageOption } from "@/data/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { formatCurrency } from "@/lib/utils";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../services/cartSlice";

// interface ProductModalProps {
//   product: Product;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function ProductModal({
//   product,
//   open,
//   onOpenChange,
// }: ProductModalProps) {
//   const dispatch = useDispatch();

//   const [quantity, setQuantity] = useState(1);
//   const [notes, setNotes] = useState("");
//   const [customQuantity, setCustomQuantity] = useState(1);
//   const [packageOptions, setPackageOptions] = useState<PackageOption[]>([]);
//   const [selectedPackage, setSelectedPackage] = useState<
//     PackageOption | undefined
//   >();

//   const minOrder = product.minOrder || 1;
//   const hasPackageOptions = product.packages && product.packages.length > 0;
//   const isCustomOrder = selectedPackage?.id === "custom";

//   // Initialize package options
//   useEffect(() => {
//     if (hasPackageOptions) {
//       const options: PackageOption[] = [
//         {
//           id: "custom",
//           name: "Custom Order",
//           description: `Choose your own quantity (min ${minOrder})`,
//           quantity: 0,
//           price: product.price,
//         },
//         ...product.packages.map((pkg, index) => ({
//           id: `pkg-${index}`,
//           name: pkg.name,
//           description: `${pkg.quantity} units`,
//           quantity: pkg.quantity,
//           price: pkg.quantity * product.price,
//         })),
//       ];

//       setPackageOptions(options);
//     } else {
//       setPackageOptions([
//         {
//           id: "default",
//           name: "Default",
//           description: "",
//           quantity: 1,
//           price: product.price,
//         },
//       ]);
//     }
//   }, [product, minOrder, hasPackageOptions]);

//   // Reset modal state on open
//   useEffect(() => {
//     if (open && packageOptions.length > 0) {
//       setQuantity(1);
//       setNotes("");
//       const defaultPkg = packageOptions.find((p) => p.id === "custom");
//       setSelectedPackage(defaultPkg || packageOptions[0]);
//       setCustomQuantity(minOrder);
//     }
//   }, [open, packageOptions, minOrder]);

//   const handleQuantityChange = (val: number) => {
//     if (val >= 1) setQuantity(val);
//   };

//   const handleCustomQuantityChange = (val: number) => {
//     if (val >= minOrder) setCustomQuantity(val);
//   };

//   const handleAddToCart = () => {
//     const finalPackage = isCustomOrder
//       ? {
//           id: "custom",
//           name: "Custom Order",
//           quantity: customQuantity,
//           price: customQuantity * product.price,
//         }
//       : {
//           id: selectedPackage?.id || "default",
//           name: selectedPackage?.name || "Default",
//           quantity: selectedPackage?.quantity || 1,
//           price: selectedPackage?.price || product.price,
//         };

//     // Optional: log the payload
//     console.log("Adding to cart:", {
//       product,
//       quantity,
//       notes,
//       selectedPackage: finalPackage,
//     });

//     dispatch(
//       addToCart({
//         product,
//         quantity,
//         notes,
//         selectedPackage: finalPackage,
//       })
//     );

//     setQuantity(1);
//     setNotes("");
//     onOpenChange(false);
//   };

//   const currentPrice = isCustomOrder
//     ? product.price * customQuantity
//     : selectedPackage?.price || product.price;

//   const totalPrice = currentPrice * quantity;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg max-h-[90vh]">
//         <ScrollArea className="max-h-[90vh]">
//           <div className="flex flex-col">
//             <AspectRatio ratio={16 / 9} className="bg-muted">
//               <img
//                 src={product.image}
//                 alt={product.product}
//                 className="w-full h-full object-cover"
//               />
//             </AspectRatio>

//             <div className="p-6 space-y-5">
//               <DialogHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <DialogTitle className="text-xl font-bold">
//                       {product.product}
//                     </DialogTitle>
//                     <DialogDescription className="text-brand-500 font-medium mt-1">
//                       {hasPackageOptions
//                         ? `From ${formatCurrency(product.price)}`
//                         : formatCurrency(product.price)}
//                     </DialogDescription>
//                   </div>
//                 </div>
//               </DialogHeader>

//               <p className="text-neutral-600">{product.description}</p>

//               {hasPackageOptions && (
//                 <div className="space-y-3">
//                   <label className="text-sm font-medium">Choose Package</label>
//                   <RadioGroup
//                     value={selectedPackage?.id}
//                     onValueChange={(value) => {
//                       const found = packageOptions.find((p) => p.id === value);
//                       setSelectedPackage(found);
//                     }}
//                     className="flex flex-col space-y-2"
//                   >
//                     {packageOptions.map((pkg) => (
//                       <label
//                         key={pkg.id}
//                         className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${
//                           selectedPackage?.id === pkg.id
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-200"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <RadioGroupItem value={pkg.id} id={pkg.id} />
//                           <div>
//                             <p className="font-medium text-sm">{pkg.name}</p>
//                             <p className="text-xs text-neutral-500">
//                               {pkg.description}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="font-medium text-green-500">
//                           {pkg.id === "custom"
//                             ? `From ${formatCurrency(pkg.price)}`
//                             : formatCurrency(pkg.price)}
//                         </span>
//                       </label>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               {isCustomOrder && (
//                 <div className="space-y-2 border-t border-dashed pt-4">
//                   <label className="text-sm font-medium">
//                     Custom Quantity (Minimum: {minOrder})
//                   </label>
//                   <div className="flex items-center">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() =>
//                         handleCustomQuantityChange(customQuantity - 1)
//                       }
//                       disabled={customQuantity <= minOrder}
//                     >
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                     <Input
//                       type="number"
//                       value={customQuantity}
//                       onChange={(e) =>
//                         handleCustomQuantityChange(
//                           parseInt(e.target.value) || minOrder
//                         )
//                       }
//                       className="w-16 text-center mx-2 h-8"
//                       min={minOrder}
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() =>
//                         handleCustomQuantityChange(customQuantity + 1)
//                       }
//                     >
//                       <ChevronUp className="h-4 w-4" />
//                     </Button>
//                     <span className="ml-3 text-base text-neutral-500">
//                       {formatCurrency(product.price * customQuantity)}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {!hasPackageOptions && (
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">
//                     Package Quantity
//                   </label>
//                   <div className="flex items-center">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => handleQuantityChange(quantity - 1)}
//                       disabled={quantity <= 1}
//                     >
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                     <Input
//                       type="number"
//                       value={quantity}
//                       onChange={(e) =>
//                         handleQuantityChange(parseInt(e.target.value) || 1)
//                       }
//                       className="w-16 text-center mx-2 h-8"
//                       min={1}
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => handleQuantityChange(quantity + 1)}
//                     >
//                       <ChevronUp className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               <div className="pt-2 border-t">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-sm">Total:</span>
//                   <span className="text-lg font-bold text-green-500">
//                     {formatCurrency(totalPrice)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center pt-2">
//                 <DialogClose asChild>
//                   <Button variant="outline" size="sm">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//                 <Button
//                   onClick={handleAddToCart}
//                   size="sm"
//                   className="bg-green-500 hover:bg-green-600 text-white"
//                 >
//                   Add to Cart <ShoppingCartIcon className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect, useMemo } from "react";
// import {
//   ChevronUp,
//   ChevronDown,
//   ShoppingCart as ShoppingCartIcon,
// } from "lucide-react";
// import { Product, PackageOption } from "@/data/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { formatCurrency } from "@/lib/utils";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../services/cartSlice";

// interface ProductModalProps {
//   product: Product;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export default function ProductModal({
//   product,
//   open,
//   onOpenChange,
// }: ProductModalProps) {
//   const dispatch = useDispatch();
//   const minOrder = product.minOrder || 1;

//   const hasPackageOptions = useMemo(
//     () => Array.isArray(product.packages) && product.packages.length > 0,
//     [product.packages]
//   );

//   const [quantity, setQuantity] = useState(1);
//   const [notes, setNotes] = useState("");
//   const [customQuantity, setCustomQuantity] = useState(minOrder);
//   const [selectedPackage, setSelectedPackage] = useState<PackageOption>();

//   const packageOptions = useMemo(() => {
//     if (hasPackageOptions) {
//       return [
//         {
//           id: "custom",
//           name: "Custom Order",
//           description: `Choose your own quantity (min ${minOrder})`,
//           quantity: 0,
//           price: product.price,
//         },
//         ...(product.packages?.map((pkg, index) => ({
//           id: `pkg-${index}`,
//           name: pkg.name,
//           description: `${pkg.quantity} units`,
//           quantity: pkg.quantity,
//           price: pkg.quantity * product.price,
//         })) || []),
//       ];
//     }

//     return [
//       {
//         id: "default",
//         name: "Default",
//         description: "",
//         quantity: 1,
//         price: product.price,
//       },
//     ];
//   }, [product, minOrder, hasPackageOptions]);

//   useEffect(() => {
//     if (open) {
//       setQuantity(1);
//       setNotes("");
//       setCustomQuantity(minOrder);
//       setSelectedPackage(
//         packageOptions.find((p) => p.id === "custom") || packageOptions[0]
//       );
//     }
//   }, [open, packageOptions, minOrder]);

//   const handleQuantityChange = (val: number) => {
//     setQuantity(Math.max(1, val));
//   };

//   const handleCustomQuantityChange = (val: number) => {
//     setCustomQuantity(Math.max(minOrder, val));
//   };

//   const handleAddToCart = () => {
//     if (!selectedPackage) return;

//     const isCustom = selectedPackage.id === "custom";

//     const finalPackage = {
//       id: selectedPackage.id,
//       name: selectedPackage.name,
//       quantity: isCustom ? customQuantity : selectedPackage.quantity,
//       price: isCustom ? product.price * customQuantity : selectedPackage.price,
//     };

//     dispatch(
//       addToCart({
//         product,
//         quantity: finalPackage.quantity,
//         notes,
//         selectedPackage: finalPackage,
//       })
//     );

//     onOpenChange(false);
//   };

//   const totalPrice = useMemo(() => {
//     if (!selectedPackage) return 0;
//     return selectedPackage.id === "custom"
//       ? product.price * customQuantity
//       : selectedPackage.price;
//   }, [selectedPackage, customQuantity, product.price]);

//   if (!product) return null;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-lg max-h-[90vh]">
//         <ScrollArea className="max-h-[90vh]">
//           <div className="flex flex-col">
//             <AspectRatio ratio={16 / 9} className="bg-muted">
//               <img
//                 src={product.image || "/placeholder.jpg"}
//                 alt={product.product}
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//               />
//             </AspectRatio>

//             <div className="p-6 space-y-5">
//               <DialogHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <DialogTitle className="text-xl font-bold">
//                       {product.product}
//                     </DialogTitle>
//                     <DialogDescription className="text-brand-500 font-medium mt-1">
//                       {hasPackageOptions
//                         ? `From ${formatCurrency(product.price)}`
//                         : formatCurrency(product.price)}
//                     </DialogDescription>
//                   </div>
//                 </div>
//               </DialogHeader>

//               {product.description && (
//                 <p className="text-neutral-600">{product.description}</p>
//               )}

//               {hasPackageOptions && (
//                 <div className="space-y-3">
//                   <label className="text-sm font-medium">Choose Package</label>
//                   <RadioGroup
//                     value={selectedPackage?.id}
//                     onValueChange={(value) => {
//                       const found = packageOptions.find((p) => p.id === value);
//                       if (found) setSelectedPackage(found);
//                     }}
//                     className="flex flex-col space-y-2"
//                   >
//                     {packageOptions.map((pkg) => (
//                       <label
//                         key={pkg.id}
//                         className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-colors ${
//                           selectedPackage?.id === pkg.id
//                             ? "border-green-500 bg-green-50"
//                             : "border-gray-200"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           <RadioGroupItem value={pkg.id} id={pkg.id} />
//                           <div>
//                             <p className="font-medium text-sm">{pkg.name}</p>
//                             <p className="text-xs text-neutral-500">
//                               {pkg.description}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="font-medium text-green-500">
//                           {pkg.id === "custom"
//                             ? `From ${formatCurrency(pkg.price)}`
//                             : formatCurrency(pkg.price)}
//                         </span>
//                       </label>
//                     ))}
//                   </RadioGroup>
//                 </div>
//               )}

//               {selectedPackage?.id === "custom" && (
//                 <div className="space-y-2 border-t border-dashed pt-4">
//                   <label className="text-sm font-medium">
//                     Custom Quantity (Minimum: {minOrder})
//                   </label>
//                   <div className="flex items-center">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() =>
//                         handleCustomQuantityChange(customQuantity - 1)
//                       }
//                       disabled={customQuantity <= minOrder}
//                     >
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                     <Input
//                       type="number"
//                       min={minOrder}
//                       value={customQuantity}
//                       onChange={(e) => {
//                         const val = parseInt(e.target.value);
//                         handleCustomQuantityChange(isNaN(val) ? minOrder : val);
//                       }}
//                       className="w-16 text-center mx-2 h-8"
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() =>
//                         handleCustomQuantityChange(customQuantity + 1)
//                       }
//                     >
//                       <ChevronUp className="h-4 w-4" />
//                     </Button>
//                     <span className="ml-3 text-base text-neutral-500">
//                       {formatCurrency(totalPrice)}
//                     </span>
//                   </div>
//                 </div>
//               )}

//               {!hasPackageOptions && (
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Quantity</label>
//                   <div className="flex items-center">
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => handleQuantityChange(quantity - 1)}
//                       disabled={quantity <= 1}
//                     >
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                     <Input
//                       type="number"
//                       min={1}
//                       value={quantity}
//                       onChange={(e) => {
//                         const val = parseInt(e.target.value);
//                         handleQuantityChange(isNaN(val) ? 1 : val);
//                       }}
//                       className="w-16 text-center mx-2 h-8"
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="icon"
//                       className="h-8 w-8"
//                       onClick={() => handleQuantityChange(quantity + 1)}
//                     >
//                       <ChevronUp className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               <div className="pt-2 border-t">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-sm">Total:</span>
//                   <span className="text-lg font-bold text-green-500">
//                     {formatCurrency(totalPrice)}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center pt-2">
//                 <DialogClose asChild>
//                   <Button variant="outline" size="sm">
//                     Cancel
//                   </Button>
//                 </DialogClose>
//                 <Button
//                   onClick={handleAddToCart}
//                   size="sm"
//                   className="bg-green-500 hover:bg-green-600 text-white"
//                 >
//                   Add to Cart <ShoppingCartIcon className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   );
// }
