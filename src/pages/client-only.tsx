import { Header, InfoBox, Layout } from "../components";
import { CartList } from "../components/CartList";

const ClientOnly = () => {
  console.log("here");
  return (
    <Layout>
      <Header />
      <InfoBox>ℹ️ This data is loaded on client and not prefetched</InfoBox>
      <CartList />
    </Layout>
  );
};

export default ClientOnly;
