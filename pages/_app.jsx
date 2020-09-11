import Head from "next/head";
import Layout from "components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Tridatu Bali ID</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/tridatu-icon.png" />
        <link rel="stylesheet" href="/static/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="/static/css/utility.min.css" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
      <style global jsx>{`
        body {
          font-size: 1rem;
          line-height: 1.5;
          padding-top: 68px;
        }
        section {
          margin-bottom: 1.5rem;
        }

        /*SLICK-SLIDE*/
        .slick-slide {
          padding: 0px 15px;
        }
        .slick-list {
          margin: 0 -1em;
        }
        .slick-prev, .slick-next {
          font-size: 15px !important;
        }
        .slick-prev:before, .slick-next:before  {
          content: '' !important;
        }
        /*SLICK-SLIDE*/

        .text-tridatu{
          color: #d63031;
        }

        /*CUSTOM BUTTON*/
        .btn-tridatu{
          color: #fff;
          background-color: #ff4d4f;
          border-color: #ff4d4f;
        }
        .btn-tridatu:hover{
          color: #fff;
          background-color: #d63031;
          border-color: #d63031;
        }
        .btn-tridatu.focus, .btn-tridatu:focus{
          background-color: #d63031;
          border-color: #d63031;
          box-shadow: 0 0 0 0.2rem rgb(255 77 79 / 16%);
        }
        .btn-tridatu:not(:disabled):not(.disabled).active, 
        .btn-tridatu:not(:disabled):not(.disabled):active, 
        .show>.btn-tridatu.dropdown-toggle{
          background-color: #d63031;
          border-color: #d63031;
        }
        .btn-tridatu:not(:disabled):not(.disabled).active:focus,
        .btn-tridatu:not(:disabled):not(.disabled):active:focus,
        .show>.btn-tridatu.dropdown-toggle:focus{
          background-color: #d63031;
          border-color: #d63031;
          box-shadow: 0 0 0 0.2rem rgb(255 77 79 / 16%);
        }

        .btn-dark-tridatu-outline{
          color: #343a40;
          background-color: transparent;
          border-color: #343a40;
        }
        .btn-dark-tridatu-outline:hover{
          color: #343a40;
          background-color: transparent;
          border-color: #343a40;
        }
        .btn-dark-tridatu-outline.focus, .btn-dark-tridatu-outline:focus{
          color: #343a40;
          background-color: transparent;
          border-color: #343a40;
          box-shadow: 0 0 0 0.2rem rgb(52 58 64 / 21%);
        }
        .btn-dark-tridatu-outline:not(:disabled):not(.disabled).active, 
        .btn-dark-tridatu-outline:not(:disabled):not(.disabled):active, 
        .show>.btn-dark-tridatu-outline.dropdown-toggle{
          color: #343a40;
          background-color: transparent;
          border-color: #343a40;
          box-shadow: 0 0 0 0.2rem rgb(52 58 64 / 21%);
        }
        .btn-dark-tridatu-outline:not(:disabled):not(.disabled).active:focus,
        .btn-dark-tridatu-outline:not(:disabled):not(.disabled):active:focus,
        .show>.btn-dark-tridatu-outline.dropdown-toggle:focus{
          color: #343a40;
          background-color: transparent;
          border-color: #343a40;
          box-shadow: 0 0 0 0.2rem rgb(52 58 64 / 21%);
        }
        /*CUSTOM BUTTON*/

        .truncate-2 {
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        @media only screen and (max-width: 425px){
          body{
            padding-top: 58px;
          }
        }

      `}</style>
    </>
  );
};

export default App;
