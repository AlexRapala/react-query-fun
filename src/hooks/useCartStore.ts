import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { addItemToCart, fetchCart } from './useCart';
import { useEffect } from 'react';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  initialized: boolean;  // Add this to track initialization
  initializeCart: () => Promise<void>;  // Add initialization function
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (itemName: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const useCartStore = create<CartStore>()(
  devtools(
    (set, get) => ({
      // Initialize with empty array
      items: [] as CartItem[],
      isLoading: false,
      initialized: false,
      itemCount: 0,
      initializeCart: async () => {
        if (get().initialized) return; // Prevent multiple initializations

        set({ isLoading: true });
        try {
          const cart = await fetchCart();
          set({
            items: cart.items,
            initialized: true,
            itemCount: cart.items.length,
            isLoading: false
          });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          set({ isLoading: false });
        }
      },
      addItem: async (item: CartItem) => {
        set({ isLoading: true });
        try {
          await addItemToCart(item);
          set((state) => ({
            items: [...state.items, item],
            itemCount: state.items.length + 1,
            isLoading: false
          }));
        } catch (error) {
          console.error('Failed to add item:', error);
          set({ isLoading: false });
        }
      },

      removeItem: (itemName: string) =>
        set((state) => ({
          items: state.items.filter(item => item.name !== itemName)
        })),

      clearCart: () => set({ items: [] }),

      // Initialize total with 0
      total: 0,
    }),
    {
      name: 'cart-store' // Optional: Name for Redux DevTools
    }
  )
);

export const useInitializeCart = () => {
  const initialized = useCartStore((state) => state.initialized);
  const initializeCart = useCartStore((state) => state.initializeCart);

  useEffect(() => {
    if (!initialized) {
      initializeCart();
    }
  }, [initialized, initializeCart]);
};