import { Trash2, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { removeFromCart, updateQuantity } from "../../services/cartSlice";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import {
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export default function CartSidebar() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalAmount = items.reduce((total, item) => {
    const price = item.selectedPackage?.price ?? item.product.price;
    return total + price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="text-xl font-display">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex items-center justify-center px-6 py-10 text-center">
          <div>
            <ShoppingCartIcon className="mx-auto h-16 w-16 text-muted mb-4" />
            <h3 className="text-lg font-semibold mb-1">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Let’s fix that — start shopping!
            </p>
            <SheetClose asChild>
              <Button asChild variant="default">
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

      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-5">
          {items.map((item, index) => {
            const packageId = item.selectedPackage?.id;
            const itemPrice = item.selectedPackage?.price ?? item.product.price;

            return (
              <div
                key={`${item.product._id}-${packageId || index}`}
                className="flex items-start gap-4 pb-4 border-b last:border-none"
              >
                <div className="bg-neutral-100 rounded-md w-20 h-20 overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.product}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-semibold text-sm leading-tight">
                        {item.product.product}
                      </h4>
                      {item.selectedPackage && (
                        <p className="text-xs text-brand-600 font-medium">
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
                            packageId,
                          })
                        )
                      }
                    >
                      <Trash2 className="h-4 w-4 text-muted" />
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {item.selectedPackage?.description ||
                      item.notes ||
                      item.product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex border rounded-md overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
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
                        <span className="text-lg">−</span>
                      </Button>
                      <span className="w-8 flex items-center justify-center text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
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
                        <span className="text-lg">+</span>
                      </Button>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(itemPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="px-6 py-5 border-t bg-white">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Subtotal</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Delivery charges will be calculated at checkout.
        </p>
        <SheetClose asChild>
          <Button asChild className="w-full text-sm h-11">
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
