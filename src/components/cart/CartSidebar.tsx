import { Trash2, ChevronRight, ShoppingCart } from "lucide-react";
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
            <ShoppingCart className="mx-auto h-16 w-16 text-neutral-300 mb-4" />
            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-neutral-500 mb-6">Add some items to get started!</p>
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
                      <h4 className="font-medium text-sm md:text-base">{item.product.product}</h4>
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
                        dispatch(removeFromCart({ productId: item.product._id, packageId }))
                      }
                    >
                      <Trash2 className="h-4 w-4 text-neutral-500" />
                    </Button>
                  </div>

                  <p className="text-sm text-neutral-500 mb-2 line-clamp-1">
                    {item.selectedPackage?.description || item.notes || item.product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center border rounded-md overflow-hidden">
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
                        <span className="text-base">−</span>
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
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
                        <span className="text-base">+</span>
                      </Button>
                    </div>
                    <span className="font-semibold text-sm">
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
        <div className="flex justify-between mb-4 text-sm md:text-base">
          <span className="font-medium">Subtotal</span>
          <span className="font-medium">{formatCurrency(totalAmount)}</span>
        </div>
        <p className="text-xs text-neutral-500 mb-4">
          Delivery charges calculated at checkout
        </p>
        <SheetClose asChild>
          <Button asChild className="w-full py-3 text-sm md:text-base">
            <Link to="/checkout" className="flex items-center justify-center gap-1">
              Proceed to Checkout
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}
