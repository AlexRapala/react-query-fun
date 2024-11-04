import { useCart } from "./CartList";
import { CartNumberItems } from "./CartNumberItems";

export const CartHeader = () => {
  const { items } = useCart();

  const total =
    items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0;

  return (
    <section>
      <div style={{ padding: 0, margin: 0 }}>Total: ${total.toFixed(2)}</div>
      <CartNumberItems />
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          gap: 4px;
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
