import { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
// Assuming Product and PackageOption types are defined elsewhere,
// for this self-contained example, I'll define them here.
// In your actual project, ensure these imports are correct.
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
// import { AspectRatio } // from "@/components/ui/aspect-ratio";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../services/cartSlice";

// --- Mocking external dependencies for self-contained code ---
// You should replace these with your actual imports in your project
interface PackageOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity?: number; // Added for custom package handling
}

interface Product {
  id: string;
  product: string;
  description?: string;
  image: string;
  price: number;
  hasPackageOptions?: boolean;
  packageOptions?: PackageOption[];
  minimumOrder?: number;
}

// Mocking shadcn/ui components and lucide-react for demonstration
// In a real project, these would be imported from your UI library.
const Button = ({ children, onClick, className, variant, size, disabled, type }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded ${className} ${variant === 'outline' ? 'border' : 'bg-blue-500 text-white'}`}
    disabled={disabled}
    type={type}
  >
    {children}
  </button>
);
const Input = ({ type, value, onChange, className, min }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`border rounded p-1 ${className}`}
    min={min}
  />
);
const RadioGroup = ({ value, onValueChange, className, children }) => (
  <div className={className} role="radiogroup" aria-activedescendant={value}>
    {children}
  </div>
);
const RadioGroupItem = ({ value, id }) => (
  <input type="radio" value={value} id={id} checked={value === id} readOnly />
);
const Dialog = ({ open, onOpenChange, children }) => (
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  ) : null
);
const DialogContent = ({ children, className }) => (
  <div className={`bg-white shadow-lg ${className}`}>
    {children}
  </div>
);
const DialogHeader = ({ children }) => <div>{children}</div>;
const DialogTitle = ({ children, className }) => <h2 className={className}>{children}</h2>;
const DialogDescription = ({ children, className }) => <p className={className}>{children}</p>;
const DialogClose = ({ asChild, children }) => (asChild ? children : <button>{children}</button>);
const AspectRatio = ({ ratio, className, children }) => (
  <div style={{ paddingTop: `${100 / ratio}%` }} className={`relative ${className}`}>
    <div className="absolute inset-0">{children}</div>
  </div>
);
const ScrollArea = ({ children, className }) => (
  <div className={`overflow-y-auto ${className}`}>
    {children}
  </div>
);
const ChevronUp = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>;
const ChevronDown = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
const ShoppingCartIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;

// Mocking Redux for demonstration
const useDispatch = () => () => console.log("Dispatching action (mock)");
const addToCart = (payload) => ({ type: 'ADD_TO_CART', payload });

// Mocking formatCurrency utility
const formatCurrency = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;
// --- End Mocking ---

interface ProductModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function App({ // Changed to App for default export
  product = { // Provide a default product object for testing
    id: "mock-product-1",
    product: "Mock Fuel Type",
    description: "A high-quality mock fuel product.",
    image: "https://placehold.co/1600x900/000000/FFFFFF?text=Product+Image",
    price: 850,
    hasPackageOptions: true,
    packageOptions: [
      { id: "20L", name: "20 Liters", price: 17000 },
      { id: "50L", name: "50 Liters", price: 42500 },
      { id: "custom", name: "Custom Quantity", price: 850, description: "Enter your desired quantity" }
    ],
    minimumOrder: 5,
  },
  open,
  onOpenChange,
}: ProductModalProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState(""); // Notes state is present but not used in UI
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | undefined>(
    product.packageOptions?.[0]
  );
  const [customQuantity, setCustomQuantity] = useState(product.minimumOrder || 4);

  const isCustomOrder = selectedPackage?.id === "custom";
  const minOrder = product.minimumOrder || 4;

  useEffect(() => {
    if (open) {
      setQuantity(1);
      setNotes(""); // Reset notes on open
      setSelectedPackage(product.packageOptions?.[0]);
      setCustomQuantity(minOrder);
    }
  }, [open, product, minOrder]); // Added minOrder to dependencies

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
      {/* Adjusted DialogContent className for larger size and proper centering */}
      <DialogContent className="w-full max-w-lg sm:max-w-xl p-0 overflow-hidden rounded-xl max-h-[90vh]">
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
                    <DialogDescription className="text-green-600 font-medium mt-1 text-sm sm:text-base">
                      {product.hasPackageOptions
                        ? `From ${formatCurrency(product.price)}`
                        : formatCurrency(product.price)}
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

              {/* Package Options */}
              {product.hasPackageOptions && product.packageOptions && product.packageOptions.length > 0 && (
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
