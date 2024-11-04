import { QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import React from "react";
import { useInitializeCart } from "../hooks/useCartStore";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  void useInitializeCart();
  return <Component {...pageProps} />;
}
