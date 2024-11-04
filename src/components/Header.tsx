import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { CartHeader } from "./CartHeader";

export const Header = () => {
  const { pathname } = useRouter();

  return (
    <nav>
      <Link href="/" className={pathname === "/" ? "is-active" : ""}>
        Home
      </Link>
      <Link
        href="/client-only"
        className={pathname === "/client-only" ? "is-active" : ""}
      >
        Client-Only
      </Link>
      <CartHeader />
      <style jsx>{`
        nav {
          margin-bottom: 25px;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        a {
          font-size: 14px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
};
