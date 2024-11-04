import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Header, InfoBox, Layout, PostList } from "../components";
import { fetchPosts } from "../hooks/usePosts";
import { fetchCart } from "../hooks/useCart";
import { CartList } from "../components/CartList";
import { CartHeader } from "../components/CartHeader";
import { CartNumberItems } from "../components/CartNumberItems";

const Home = () => {
  return (
    <Layout>
      <Header />
      <InfoBox>ℹ️ This page shows how to use SSG with React-Query.</InfoBox>
      <CartList />
    </Layout>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts", 10],
    queryFn: () => fetchPosts(10),
  });

  await queryClient.prefetchQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
