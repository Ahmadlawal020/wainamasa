"use client";

import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import {
  removeFromCart,
  updateQuantity,
} from "@/lib/redux/features/cart/cartSlice";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function formatCurrency(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const totalAmount = items.reduce((acc, item) => {
    const price = item.selectedPackage?.price || item.product.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <ShoppingCart className="h-6 w-6" />
          {items.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-[90vw] md:w-[500px] p-0 flex flex-col">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-lg md:text-xl font-semibold font-display">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-neutral-500 mb-4">
              Your cart is currently empty.
            </p>
            <Link href="/shop">
              <Button className="mt-2">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4 py-4">
              {items.map((item, index) => {
                const packageId = item.selectedPackage?._id;
                const itemPrice = (item.selectedPackage?.price || item.product.price) * item.quantity;

                return (
                  <div key={`${item.product._id}-${packageId || index}`} className="flex gap-4 mb-6 border-b pb-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover w-20 h-20"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-base">{item.product.name}</h3>
                          {item.selectedPackage && (
                            <p className="text-sm text-muted-foreground">
                              {item.selectedPackage.name}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() =>
                            dispatch(removeFromCart({ productId: item.product._id, packageId }))
                          }
                          aria-label="Remove item"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-muted-foreground">Qty:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              dispatch(updateQuantity({
                                productId: item.product._id,
                                packageId,
                                quantity: item.quantity - 1,
                              }))
                            }
                            disabled={item.quantity <= 1}
                          >-</Button>

                          <span className="font-medium">{item.quantity}</span>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              dispatch(updateQuantity({
                                productId: item.product._id,
                                packageId,
                                quantity: item.quantity + 1,
                              }))
                            }
                          >+</Button>
                        </div>
                      </div>

                      <p className="text-right text-sm mt-2 font-medium">
                        {formatCurrency(itemPrice)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </ScrollArea>

            <div className="border-t px-4 py-4">
              <div className="flex justify-between mb-4 text-base font-medium">
                <span>Total</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
