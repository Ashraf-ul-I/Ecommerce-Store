import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,

  // Fetch cart items from the server
  getCartItem: async () => {
    try {
      const res = await axios.get('/cart');
      set({ cart: res.data }); // Set the cart data from the server
      get().calculateTotals();  // Recalculate totals after fetching
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Add item to the cart
  addToCart: async (product) => {
    try {
      // Assuming we're sending the productId to the server
      await axios.post("/cart", { productId: product._id });

      toast.success("Product added to cart", { id: "cart" });

      // Update local cart state
      set((state) => {
        const existingItem = state.cart.find((item) => item._id === product._id);

        // If product exists in cart, increase the quantity, otherwise add new item
        const newCart = existingItem
          ? state.cart.map((item) =>
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...state.cart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });

      // Recalculate totals
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  // Calculate subtotal and total
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let total = subtotal;

    // Apply discount if a coupon exists
    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },

  // Set or remove coupon
  setCoupon: (coupon) => {
    set({ coupon });
    get().calculateTotals();  // Recalculate totals when a coupon is added/removed
  },

  // Optionally, remove item from the cart
  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      toast.success("Product removed from cart");

      set((state) => {
        const newCart = state.cart.filter((item) => item._id !== productId);
        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },
}));
