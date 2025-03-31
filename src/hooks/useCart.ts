import { useQuery } from '@tanstack/react-query'


export type Item = {
  name: string;
  price: number;
  quantity: number;
};
export type Cart = {
  items: Array<Item>
};

const fetchCart = async (): Promise<Cart> => {
  const response = await fetch(`${window.location.protocol}//${window.location.host}/api/cart`);
  const data = await response.json();
  return data;
}

const addItemToCart = async (newItem: Item) => {
  const response = await fetch(`${window.location.protocol}//${window.location.host}/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }
};

const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart
  })
}

export { useCart, fetchCart, addItemToCart }
