import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, PackageOption } from "@/data/types";

interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
  selectedPackage?: PackageOption;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        notes?: string;
        selectedPackage?: PackageOption;
      }>
    ) => {
      const { product, quantity, notes, selectedPackage } = action.payload;
      const existing = state.items.find(
        (item) =>
          item.product._id === product._id &&
          item.selectedPackage?.id === selectedPackage?.id
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ product, quantity, notes, selectedPackage });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; packageId?: string }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          item.product._id !== action.payload.productId ||
          item.selectedPackage?.id !== action.payload.packageId
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        packageId?: string;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.product._id === action.payload.productId &&
          item.selectedPackage?.id === action.payload.packageId
      );

      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
