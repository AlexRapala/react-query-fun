import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart, Item } from '../../hooks/useCart';

let cart: Cart = { items: [] };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Cart | { message: string }>
) {
  if (req.method === 'GET') {
    // Return the current cart
    return res.status(200).json(cart);
  }

  if (req.method === 'POST') {
    // Add a new item to the cart
    const { name, price, quantity }: Item = req.body;

    if (!name || price == null || quantity == null) {
      return res.status(400).json({ message: 'Missing item data' });
    }

    const newItem: Item = { name, price, quantity };
    cart.items.push(newItem);

    return res.status(201).json(cart);
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}