import Head from "next/head";
import Layout from "components/Layout";

import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Tridatu Bali ID</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/tridatu-icon.png" />
        <link rel="stylesheet" href="/static/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="/static/css/utility.min.css" />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
      <style global jsx>{`
        body{
          font-size: 1rem;
          line-height: 1.5;
          padding-top: 80px;
        }
        .truncate-2 {
          -webkit-line-clamp: 2;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </>
  );
};

export default App;
