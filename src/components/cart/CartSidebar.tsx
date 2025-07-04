import { Trash2, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { removeFromCart, updateQuantity } from "../../services/cartSlice";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

export default function CartSidebar() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalAmount = items.reduce((total, item) => {
    const price = item.selectedPackage?.price || item.product.price;
    return total + price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-xl font-display">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <ShoppingCartIcon className="mx-auto h-16 w-16 text-neutral-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-neutral-500 mb-6">
              Add some items to get started!
            </p>
            <SheetClose asChild>
              <Button asChild>
                <Link to="/menu">Browse Menu</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="px-6 py-4 border-b">
        <SheetTitle className="text-xl font-display">Your Cart</SheetTitle>
      </SheetHeader>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {items.map((item, index) => {
            const packageId = item.selectedPackage?.id;
            const itemPrice = item.selectedPackage?.price || item.product.price;

            return (
              <div
                key={`${item.product._id}-${packageId || index}`}
                className="flex items-start space-x-4 pb-4 border-b"
              >
                <div className="bg-neutral-100 rounded-md w-20 h-20 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.product}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{item.product.product}</h4>
                      {item.selectedPackage && (
                        <p className="text-xs text-brand-500 font-medium">
                          {item.selectedPackage.name}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            productId: item.product._id,
                            packageId: packageId,
                          })
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4 text-neutral-500" />
                    </Button>
                  </div>

                  <p className="text-sm text-neutral-500 mb-2 line-clamp-1">
                    {item.selectedPackage?.description ||
                      item.notes ||
                      item.product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product._id,
                              packageId,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <span className="text-lg font-medium">-</span>
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product._id,
                              packageId,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        <span className="text-lg font-medium">+</span>
                      </Button>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(itemPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-6 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Subtotal</span>
          <span className="font-medium">{formatCurrency(totalAmount)}</span>
        </div>
        <p className="text-xs text-neutral-500 mb-4">
          Delivery charges will be calculated at checkout
        </p>
        <SheetClose asChild>
          <Button asChild className="w-full">
            <Link to="/checkout" className="flex items-center justify-center">
              Proceed to Checkout
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}

// Local icon for empty cart state
function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
