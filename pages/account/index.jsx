import Router from 'next/router'

const Account = () => null;

Account.getInitialProps = (ctx) => {
  process.browser
    ? Router.replace("/account/profile", "/account/profile") //Redirec from Client Side
    : ctx.res.writeHead(302, { Location: "/account/profile" }).end(); //Redirec from Server Side
};

export default Account
