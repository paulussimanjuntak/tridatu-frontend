import { useEffect } from 'react';
import { useRouter } from "next/router";
import Header from "components/Header";
import CheckoutHeader from "components/Header/Checkout";
import Footer from "components/Footer";

import AccountLayout from "components/Account/Layout";
import AdminLayout from "Admin/Layout";

const Layout = ({ children }) => {
  const router = useRouter();
  const isAccount = router.pathname.startsWith('/account');
  const isAadmin = router.pathname.startsWith('/admin');

  useEffect(() => {
    if(isAadmin){
      document.body.style.paddingTop = '0';
    }
  }, [isAadmin])

  const layout = isAadmin ? <AdminLayout>{children}</AdminLayout> : (
    <>
      {router.pathname === '/checkout' ? <CheckoutHeader/> : <Header />}
        {isAccount ? <AccountLayout pathname={router.pathname}>{children}</AccountLayout> : <>{children}</>}
      <Footer />
    </>
  )

  return layout;
};

export default Layout;
