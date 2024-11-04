import { memo, useCallback } from "react";
import { Item } from "../hooks/useCart";
import { useCartStore } from "../hooks/useCartStore";

const CartItem = memo(({ name, price, quantity }: Item) => (
  <li>
    Item: {name}, Cost: {price.toFixed(2)}, Quantity: {quantity}
  </li>
));

const CartItems = memo(({ items }: { items: Item[] }) => (
  <ul>
    {items.map((item, index) => (
      <CartItem key={`${item.name}-${index}`} {...item} />
    ))}
  </ul>
));

export const CartList = () => {
  // Only select what you need to prevent unnecessary rerenders
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const total = useCartStore((state) => state.total);

  const handleAddItem = useCallback(() => {
    addItem({
      name: "Gaming Mouse",
      price: 39.99,
      quantity: 2,
    });
  }, [addItem]);

  return (
    <section>
      <button onClick={handleAddItem}>New Item</button>

      <CartItems items={items} />
      <div>Total: ${total.toFixed(2)}</div>
    </section>
  );
};

// Optional: Create a custom hook for cart operations
export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const isLoading = useCartStore((state) => state.isLoading);

  return {
    items,
    total,
    addItem,
    removeItem,
    isLoading,
  };
};
