import Router from 'next/router'

const Admin = () => null;

Admin.getInitialProps = ctx => {
  process.browser
    ? Router.replace("/admin/dashboard", "/admin/dashboard") //Redirec from Client Side
    : ctx.res.writeHead(302, { Location: "/admin/dashboard" }).end(); //Redirec from Server Side
}

export default Admin
