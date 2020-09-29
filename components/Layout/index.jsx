import { useRouter } from "next/router";
import Header from "components/Header";
import CheckoutHeader from "components/Header/Checkout";
import Footer from "components/Footer";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      {router.pathname === '/checkout' ? <CheckoutHeader/> : <Header />}
        {children} 
      <Footer />
    </>
  );
};

export default Layout;
