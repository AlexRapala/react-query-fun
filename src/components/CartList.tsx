import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCart, useCart } from "../hooks/useCart";
import React from "react";

export const CartList = () => {
  const queryClient = useQueryClient();

  const { data, isPending } = useCart();

  const mutation = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleAddItem = React.useCallback(() => {
    mutation.mutate({ name: "Gaming Mouse", price: 39.99, quantity: 2 });
  }, [mutation]);

  if (isPending) return <div>Loading</div>;

  return (
    <section>
      <ul>
        {data?.items.map((item, index) => (
          <li key={index}>
            Item: {item.name}, Cost: {item.price.toFixed(2)}, Quantity:{" "}
            {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleAddItem}>New Item</button>
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: "";
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  );
};
