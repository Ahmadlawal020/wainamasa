
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from '@/components/ui/sonner';
import { CartItem, Product, PackageOption } from '@/data/types';

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, notes?: string, selectedPackage?: PackageOption) => void;
  removeFromCart: (productId: string, packageId?: string) => void;
  updateQuantity: (productId: string, quantity: number, packageId?: string) => void;
  updateNotes: (productId: string, notes: string, packageId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Add a product to the cart
  const addToCart = (product: Product, quantity = 1, notes?: string, selectedPackage?: PackageOption) => {
    setItems(currentItems => {
      // Create a unique identifier for the item based on product ID and package ID if present
      const itemKey = `${product.id}${selectedPackage ? `-${selectedPackage.id}` : ''}`;
      
      // Check if item is already in cart
      const existingItemIndex = currentItems.findIndex(item => 
        item.product.id === product.id && 
        (!selectedPackage || (item.selectedPackage?.id === selectedPackage.id))
      );
      
      if (existingItemIndex !== -1) {
        // Update existing item
        return currentItems.map((item, index) => 
          index === existingItemIndex
            ? { 
                ...item, 
                quantity: item.quantity + quantity, 
                notes: notes || item.notes 
              } 
            : item
        );
      } else {
        // Add new item
        return [...currentItems, { product, quantity, notes, selectedPackage }];
      }
    });
    
    const packageName = selectedPackage ? ` (${selectedPackage.name})` : '';
    toast.success(`Added ${product.name}${packageName} to cart`);
  };

  // Remove a product from the cart
  const removeFromCart = (productId: string, packageId?: string) => {
    setItems(currentItems => currentItems.filter(item => 
      !(item.product.id === productId && 
        (!packageId || item.selectedPackage?.id === packageId))
    ));
    toast.info("Item removed from cart");
  };

  // Update quantity of a product
  const updateQuantity = (productId: string, quantity: number, packageId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, packageId);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.product.id === productId && 
        (!packageId || item.selectedPackage?.id === packageId)
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Update notes for a product
  const updateNotes = (productId: string, notes: string, packageId?: string) => {
    setItems(currentItems => 
      currentItems.map(item => 
        item.product.id === productId && 
        (!packageId || item.selectedPackage?.id === packageId)
          ? { ...item, notes } 
          : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate total items in cart
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total amount
  const totalAmount = items.reduce((sum, item) => {
    const itemPrice = item.selectedPackage ? item.selectedPackage.price : item.product.price;
    return sum + (itemPrice * item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateNotes,
        clearCart,
        totalItems,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
