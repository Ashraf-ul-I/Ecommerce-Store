import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  products: [], // Store product data
  loading: false, // Track loading state
  error: null, // Track errors

  setProducts: (products) => set({ products }), // Set all products

  createProduct: async (productData) => {
    set({ loading: true }); // Start loading
    try {
      const res = await axios.post("/products", productData);
      set((state) => ({
        products: [...state.products, res?.data], // Add new product
        loading: false,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/products");
      set({ products: response?.data?.products || [], loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error?.response?.data?.error || "Failed to fetch products");
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to delete product");
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });

    try {
      const response = await axios.patch(`/products/${productId}`);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: response?.data?.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update product");
      set({ loading: false });
    }
  },

  fetchProductByCategory: async(category)=>{
    set({loading:true});
    try {
      const response= await axios.get(`/products/category/${category}`);
      set({products:response.data.products,loading:false});
    } catch (error) {
      set({error:"Failed to fetch products",loading:false});
      toast.error(error.response.data.error || "Failed to fetch products")
    }
  }
}));
