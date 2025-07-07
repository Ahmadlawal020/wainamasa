// Only showing key modified areas for brevity
// Apply Tailwind breakpoints and spacing smartly

<div className="h-full flex flex-col">
  <SheetHeader className="px-4 py-3 border-b md:px-6 md:py-4">
    <SheetTitle className="text-lg md:text-xl font-semibold font-display">
      Your Cart
    </SheetTitle>
  </SheetHeader>

  <ScrollArea className="flex-1 px-4 py-4 md:px-6">
    <div className="space-y-4">
      {items.map((item, index) => {
        const packageId = item.selectedPackage?.id;
        const itemPrice = item.selectedPackage?.price || item.product.price;

        return (
          <div
            key={`${item.product._id}-${packageId || index}`}
            className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-3 sm:space-y-0 pb-4 border-b"
          >
            <div className="bg-neutral-100 rounded-lg w-full sm:w-20 h-36 sm:h-20 overflow-hidden">
              <img
                src={item.product.image}
                alt={item.product.product}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-semibold text-sm sm:text-base">{item.product.product}</h4>
                  {item.selectedPackage && (
                    <p className="text-xs text-brand-500 font-medium">
                      {item.selectedPackage.name}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-500"
                  onClick={() =>
                    dispatch(removeFromCart({ productId: item.product._id, packageId }))
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-neutral-500 line-clamp-2">
                {item.selectedPackage?.description || item.notes || item.product.description}
              </p>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ productId: item.product._id, packageId, quantity: item.quantity - 1 })
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
                        updateQuantity({ productId: item.product._id, packageId, quantity: item.quantity + 1 })
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

  <div className="p-4 md:p-6 border-t">
    <div className="flex justify-between mb-3 text-sm md:text-base">
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
