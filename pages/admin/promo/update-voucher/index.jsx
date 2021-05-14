import { withAuth } from 'lib/withAuth'
import Router from 'next/router'

const Promo = () => null;

Promo.getInitialProps = (ctx) => {
  if(process.browser){
    Router.replace("/admin/promo", "/admin/promo")
  } 
  else {
    ctx.res.writeHead(302, { Location: "/admin/promo" })
    ctx.res.end();
  }
};

export default withAuth(Promo)
