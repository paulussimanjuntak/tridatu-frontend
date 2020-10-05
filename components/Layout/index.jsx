import { useRouter } from "next/router";
import Header from "components/Header";
import CheckoutHeader from "components/Header/Checkout";
import Footer from "components/Footer";

import AccountLayout from "components/Account/Layout";

const Layout = ({ children }) => {
  const router = useRouter();
  const isAccount = router.pathname.startsWith('/account');
  return (
    <>
      {router.pathname === '/checkout' ? <CheckoutHeader/> : <Header />}
        {isAccount ? <AccountLayout pathname={router.pathname}>{children}</AccountLayout> : <>{children}</>}
      <Footer />
    </>
  );
};

export default Layout;
