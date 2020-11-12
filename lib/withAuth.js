import { Component } from "react";
import Router from "next/router";
import nookies from "nookies";

/*
 * Function for checking when user go to page that needs authentication 
 * @param {object} ctx - The Next.JS context object
 * @param {bool} isAdmin - Check the page that the user want to visit
 */

const authenticate = async (ctx, isAdmin) => {
  const { csrf_access_token } = nookies.get(ctx);

  /*
   * TODO for user
   * get user data with axios
   * return true if token is valid and false if not
   */

  if (ctx.req && !csrf_access_token) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return false;
  }

  if (!csrf_access_token) {
    Router.replace("/");
    return false;
  }

  console.log("isAdmin -> ", isAdmin)

  return csrf_access_token; // add user not null
};

/*
 * HOC withAuth is a Wrapped Component for pages that needs authentication
 * @param {Component} WrappedComponent - The component that needs to be wrapped with authentication
 */
const withAuth = (WrappedComponent) => {
  return class extends Component {
    static async getInitialProps(ctx) {
      const isAdmin = ctx.pathname.startsWith("/admin");
      const isAuth = authenticate(ctx, isAdmin);
      const componentProps = WrappedComponent.getInitialProps && await WrappedComponent.getInitialProps(ctx);
      return { ...componentProps, isAuth };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export { withAuth };
