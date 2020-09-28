import { useRouter } from "next/router";
import Header from "components/Header";
import ShipmentHeader from "components/Header/Shipment";
import Footer from "components/Footer";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname === '/cart/shipment' ? <ShipmentHeader /> : <Header />}
        {children} 
      <Footer />
    </>
  );
};

export default Layout;
