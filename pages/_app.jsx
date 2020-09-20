import { Provider } from "react-redux";

import Head from "next/head";
import Layout from "components/Layout";

import withReduxStore from "lib/with-redux-store";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-image-gallery/styles/css/image-gallery.css";

import "react-circular-progressbar/dist/styles.css";

const App = ({ Component, pageProps, store }) => {
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

      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>

      <style global jsx>{`
        body {
          font-size: 1rem;
          line-height: 1.5;
          padding-top: 68px;
        }
        section {
          margin-bottom: 1.5rem;
        }

        /*DROPDOWN BOOTSTRAP*/
        .dropdown-item.active, 
        .dropdown-item:active{
          color: #212529;
          background-color: #cccccc66;
        }
        /*DROPDOWN BOOTSTRAP*/

        /*ANT RATE*/
        .ant-rate{
          color: #fbbc04;
        }
        .ant-rate-star:not(:last-child){
          margin-right: 4px;
        }
        /*ANT RATE*/

        /*ANT RADIO*/
        .ant-radio{
          top: -1px;
        }
        .ant-radio-checked::after{
          border: 1px solid #ff4d4f;
        }
        .ant-radio-wrapper:hover .ant-radio, 
        .ant-radio:hover .ant-radio-inner, 
        .ant-radio-input:focus + .ant-radio-inner{
          border-color: #ff4d4f;
        }
        .ant-radio-inner::after{
          background-color: #ff4d4f;
        }
        .ant-radio-checked .ant-radio-inner{
          border-color: #ff4d4f;
        }
        .ant-radio-input:focus + .ant-radio-inner{
          box-shadow: 0 0 0 3px rgb(255 77 79 / 0.08);
        }
        /*ANT RADIO*/

        /*ANT CHECKBOX*/
        .ant-checkbox-checked .ant-checkbox-inner{
          background-color: #ff4d4f;
          border-color: #ff4d4f;
        }
        .ant-checkbox-wrapper:hover .ant-checkbox-inner, 
        .ant-checkbox:hover .ant-checkbox-inner {
          border-color: #ff4d4f;
        }
        .ant-checkbox-input:focus + .ant-checkbox-inner{
          border: 1px solid #ff4d4f;
        }
        .ant-checkbox-checked::after{
          border: 1px solid #ff4d4f;
        }
        /*ANT CHECKBOX*/

        /*ANT SLIDER*/
        :global(.ant-slider-handle){
          background-color: white;
          border: solid 2px #ff4d4f;
        }
        :global(.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open)){
          border-color: #d63031;
        }
        :global(.ant-slider-handle:focus, 
                .ant-slider-handle-dragging.ant-slider-handle-dragging.ant-slider-handle-dragging){
          border: solid 2px #ff4d4f;
          box-shadow: 0 0 0 5px #ff4d4f36;
        }
        :global(.ant-slider:hover .ant-slider-track) {
          background-color: #f9696be0;
        }
        :global(.ant-slider-track){
          background-color: #f9696be0;
        }
        /*ANT SLIDER*/

        /*ANT INPUT NUMBER*/
        .ant-input-number{
          border-radius: .25rem;
        }
        .ant-input-number:hover{
          border-color: #8c8c8c;
        }
        .ant-input-number:focus, 
        .ant-input-number-focused{
          box-shadow: none;
          border-color: #8c8c8c;
          border-radius: .25rem;
        }
        .ant-input-number-input{
          border-radius: .25rem;
        }
        .ant-input-number:hover .ant-input-number-handler-wrap{
          opacity: 0;
        }
        /*ANT INPUT NUMBER*/

        /*ANT SELECT*/
        .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
          border-radius: .25rem;
        }
        .ant-select:not(.ant-select-disabled):hover .ant-select-selector{
          border-color: #8c8c8c !important;
          box-shadow: 0 0 0 2px rgb(151 151 151 / 21%) !important;
        }
        .ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
          border-color: #8c8c8c !important;
          box-shadow: 0 0 0 2px rgb(151 151 151 / 21%) !important;
        }
        .ant-select-focused.ant-select-single .ant-select-selector{
          border-color: #8c8c8c !important;
          box-shadow: 0 0 0 2px rgb(151 151 151 / 21%) !important;
        }
        /*ANT SELECT*/

        /*ANT TABS*/
        .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
          color: #343a40!important;
        }
        .ant-tabs-ink-bar{
          background: #343a40!important;
        }
        .ant-tabs-tab:hover{
          color: #505050 !important;
        }
        .ant-tabs-tab{
          color: #5d5d5d !important;
        }
        .ant-tabs-tab-btn:focus, 
        .ant-tabs-tab-remove:focus, 
        .ant-tabs-tab-btn:active, 
        .ant-tabs-tab-remove:active{
          color: #343a40!important;
        }
        /*ANT TABS*/

        /*ANT INPUT SEARCH*/
        .ant-input-affix-wrapper{
          border-radius: .25rem;
        }
        .ant-input-affix-wrapper:focus, 
        .ant-input-affix-wrapper-focused{
          border-color: #8c8c8c !important;
          box-shadow: 0 0 0 2px rgb(151 151 151 / 21%) !important;
        }
        .ant-input-affix-wrapper:hover{
          border-color: #8c8c8c !important;
        }
        /*ANT INPUT SEARCH*/

        /*ANT BUTTON*/
        .ant-btn, .ant-btn-icon-only, .ant-btn-icon-only.ant-btn-lg{
          border-radius: .2rem;
        }
        .ant-btn:hover, .ant-btn:focus, .ant-btn:active{
          border-color: #8c8c8c !important;
          color: inherit;
        } 
        /*ANT BUTTON*/

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
        .text-tridatu:hover{
          color: #ff4d4f;
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
          border-color: #d63031 !important;
        }
        .btn-tridatu.focus, .btn-tridatu:focus{
          color: #fff;
          background-color: #d63031;
          border-color: #d63031 !important;
          box-shadow: 0 0 0 0.2rem rgb(255 77 79 / 16%);
        }
        .btn-tridatu:not(:disabled):not(.disabled).active, 
        .btn-tridatu:not(:disabled):not(.disabled):active, 
        .show>.btn-tridatu.dropdown-toggle{
          color: #fff;
          background-color: #d63031;
          border-color: #d63031 !important;
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

        .va-inherit{
          vertical-align: inherit!important;
        }

        .noselect{
          -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
             -khtml-user-select: none; /* Konqueror HTML */
               -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                    user-select: none; /* Non-prefixed version, currently
                                          supported by Chrome, Edge, Opera and Firefox */
        }

        @media only screen and (max-width: 425px){
          body{
            padding-top: 58px;
          }
        }

        .custom-gutters {
          margin-right: -15px;
          margin-left: -15px;
        }
        .custom-gutters > [class*="col-"], .custom-gutters > [class*="col"] {
          padding-right: 15px;
          padding-left: 15px;
        }

        @media only screen and (max-width: 767.98px){
          .custom-gutters {
            margin-right: -5px;
            margin-left: -5px;
          }
          .custom-gutters > [class*="col-"], .custom-gutters > [class*="col"] {
            padding-right: 5px;
            padding-left: 5px;
          }
        }

        .product-search .ant-input-affix-wrapper{
          background-color: #fff;
          box-shadow: 0rem .3rem .8rem .0rem rgba(0,0,0,.15)!important;
        }

      `}</style>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default withReduxStore(App);
