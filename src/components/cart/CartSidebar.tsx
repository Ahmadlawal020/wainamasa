import { Trash2, ChevronRight, ShoppingCartIcon } from "lucide-react";
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
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle className="text-lg font-semibold">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <ShoppingCartIcon className="h-16 w-16 text-neutral-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
          <p className="text-neutral-500 mb-6">Add some items to get started!</p>
          <SheetClose asChild>
            <Button asChild>
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </SheetClose>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <SheetHeader className="px-4 py-3 border-b">
        <SheetTitle className="text-lg font-semibold">Your Cart</SheetTitle>
      </SheetHeader>

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-3">
          {items.map((item, index) => {
            const packageId = item.selectedPackage?.id;
            const itemPrice = item.selectedPackage?.price || item.product.price;

            return (
              <div
                key={`${item.product._id}-${packageId || index}`}
                className="flex items-start gap-3 py-3 border-b"
              >
                <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-neutral-100">
                  <img
                    src={item.product.image}
                    alt={item.product.product}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 text-sm"> {/* Removed space-y-1 here */}
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold text-sm">{item.product.product}</h4>
                      {item.selectedPackage && (
                        <p className="text-xs text-brand-500 font-medium">{item.selectedPackage.name}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-neutral-400 hover:text-neutral-600"
                      onClick={() =>
                        dispatch(removeFromCart({ productId: item.product._id, packageId }))
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {item.selectedPackage?.description || item.notes || item.product.description}
                  </p>

                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center border rounded overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          dispatch(updateQuantity({
                            productId: item.product._id,
                            packageId,
                            quantity: item.quantity - 1,
                          }))
                        }
                        disabled={item.quantity <= 1}
                      >
                        <span className="text-sm">−</span>
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          dispatch(updateQuantity({
                            productId: item.product._id,
                            packageId,
                            quantity: item.quantity + 1,
                          }))
                        }
                      >
                        <span className="text-sm">+</span>
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

      <div className="p-4 border-t">
        <div className="flex justify-between mb-2 text-sm">
          <span className="font-medium">Subtotal</span>
          <span className="font-medium">{formatCurrency(totalAmount)}</span>
        </div>
        <p className="text-xs text-neutral-500 mb-4">
          Delivery charges calculated at checkout
        </p>
        <SheetClose asChild>
          <Button asChild className="w-full py-3 text-sm">
            <Link to="/checkout" className="flex items-center justify-center gap-1">
              Proceed to Payment
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </SheetClose>
      </div>
    </div>
  );
 }
