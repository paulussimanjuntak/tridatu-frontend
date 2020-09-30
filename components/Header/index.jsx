import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Badge, Menu, Dropdown, Avatar } from "antd";

import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

import Login from "../Header/Auth/Login";
import Register from "../Header/Auth/Register";
import MobileMenu from "./MobileMenu";

import CartItem from 'components/Cart/CartItemNavbar'

import * as actions from "store/actions";

const category_data = [ "Aksesoris", "Baju", "Celana", "Jaket", "Tas Selempang"];

const render_category = data => {
  const list_category = [];
  data.forEach((x, i) =>
    list_category.push(
      <Link href="/products" as="/products" key={i}>
          <NavDropdown.Item as="a">{x}</NavDropdown.Item>
      </Link>
    )
  );
  return list_category;
};

const accountMenu = (logoutHandler) => (
  <Menu>
    <Menu.Item> <a href="#" className="text-decoration-none"> Informasi Akun </a> </Menu.Item>
    <Menu.Item> <a href="#" className="text-decoration-none"> Belanjaan Saya </a> </Menu.Item>
    <Menu.Item> <a href="#" className="text-decoration-none"> Favorit </a> </Menu.Item>
    <Menu.Divider />
    <Menu.Item onClick={logoutHandler}> <a href="#" className="text-decoration-none"> Keluar </a> </Menu.Item>
  </Menu>
);

const notificationMenu = (
  <Menu className="d-none d-lg-block">
    <Menu.ItemGroup 
      title={
        <>
          <b className="text-dark">Notifikasi</b>
          <a className="text-tridatu view-all-text-navbar">Baca Semua</a>
        </>
      }
    />
    <Menu.Divider />
    <Menu.ItemGroup className="cart-item-navbar notification-item-navbar">
    {[...Array(10)].map((_,i) => (
      <Menu.Item key={i} className="notification-item">
        <b className="text-wrap truncate-2">Tagihan Anda Sudah Ada</b>
        <small className="text-wrap mb-0 text-secondary truncate-3">
          Davis, tagihan IndiHome / Telepon Anda sudah ada. Bayar sekarang biar hati tenang.
        </small>
      </Menu.Item>
    ))}
    </Menu.ItemGroup>
  </Menu>
);

const cartMenu = (
  <Menu className="d-none d-lg-block">
    <Menu.ItemGroup 
      title={
        <>
          <b className="text-dark">Keranjang</b>
          <Link href="/cart" as="/cart">
            <a className="text-tridatu view-all-text-navbar">Lihat Sekarang</a>
          </Link>
        </>
      }
    />
    <Menu.Divider />
    <Menu.ItemGroup className="cart-item-navbar">
    {[...Array(10)].map((_,i) => (
      <Menu.Item key={i}>
        <CartItem />
      </Menu.Item>
    ))}
    </Menu.ItemGroup>
  </Menu>
);

const Header = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const isAuth = useSelector(state => state.auth.auth)

  // LOGIN & REGISTER HANDLER
  const showLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowMobileMenu(false)
  }

  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowMobileMenu(false)
  }

  const closeModalHandler = () => {
    setShowLogin(false)
    setShowRegister(false)
    setShowMobileMenu(false)
  }
  // LOGIN & REGISTER HANDLER
  
  // MOBILE MENU HANDLER
  const showMobileMenuHandler = () => {
    setShowMobileMenu(true)
  }

  const closeMobileMenuHandler = () => {
    setShowMobileMenu(false)
    setShowLogin(false)
    setShowRegister(false)
  }
  // MOBILE MENU HANDLER

  const loginHandler = () => {
    dispatch(actions.authSuccess())
    setShowMobileMenu(false)
  }
  const logoutHandler = () => {
    dispatch(actions.logout())
    setShowMobileMenu(false)
  }

  const goToHandler = (e, des) => {
    e.preventDefault()
    router.push(des, des)
  }

  useEffect(() => {
    if(!showMobileMenu) document.body.style.removeProperty('overflow')
  },[showMobileMenu])

  return (
    <>
      <Navbar
        expand="lg"
        expanded={false}
        variant="light"
        bg="light"
        fixed="top"
        className="bg-white navbar-shadow-bottom py-2 noselect"
      >
        <Container>
          <Navbar.Brand href="/" className="font-italic">
            <img
              src="/tridatu-icon.png"
              className="d-inline-block align-top logo-navbar"
              alt="Tridatu Bali ID"
            />
            <span className="text-dark font-weight-bold align-self-center align-baseline-middle pl-1 text-navbar">
              Tridatu
              <span className="text-muted font-weight-bold text-navbar"> Bali ID</span>
            </span>
          </Navbar.Brand>

          <Navbar.Toggle className="border-0 ml-auto d-lg-none">
            <Badge count={400} size="small" className="nav-notification">
              <i className="far fa-bell fa-lg" />
            </Badge>
          </Navbar.Toggle>
          <Navbar.Toggle className="border-0 mx-2 pl-1 d-lg-none">
            <Link href="/cart" as="/cart">
              <a>
                <Badge count={400} size="small" className="nav-notification">
                  <i className="far fa-shopping-cart fa-lg" />
                </Badge>
              </a>
            </Link>
          </Navbar.Toggle>

          <Navbar.Toggle 
            className="border-0 px-2"
            aria-controls="tridatu-navbar-nav" 
            onClick={showMobileMenuHandler}
          >
            <i className="far fa-bars" />
          </Navbar.Toggle>

          <Navbar.Collapse id="tridatu-navbar-nav">
            <Nav className="w-100">
              <NavDropdown
                title={<span className="text-dark">Kategori</span>}
                id="Kategori"
                className="dropdown-kategori"
              >
                {render_category(category_data)}
              </NavDropdown>

              <Link href="/promo" as="/promo">
                <Nav.Link as="a" className="text-dark">
                  Promo
                </Nav.Link>
              </Link>
              
              <Form inline className="mx-lg-2 w-100">
                <div className="w-100 nav-search">
                  <Input.Search placeholder="Search" />
                </div>
              </Form>

              <Dropdown 
                arrow
                overlay={notificationMenu} 
                trigger={['hover']}
                placement="bottomCenter" 
                overlayClassName="position-fixed top-50 w-340px"
                overlayStyle={{top: '500px'}}
              >
                <Nav.Link className="mx-2 d-none d-lg-block">
                  <Badge count={100} size="small" className="nav-notification">
                    <i className="far fa-bell fa-lg" />
                  </Badge>
                </Nav.Link>
              </Dropdown>

              <Dropdown 
                arrow
                overlay={cartMenu} 
                trigger={['hover']}
                placement="bottomCenter" 
                overlayClassName="position-fixed top-50 w-340px"
                onClick={(e) => goToHandler(e, 'cart')}
              >
                <Nav.Link className="ml-2 d-none d-lg-block">
                  <Badge count={100} size="small" className="nav-notification">
                    <i className="far fa-shopping-cart fa-lg" />
                  </Badge>
                </Nav.Link>
              </Dropdown>

              <span className="border-right mx-4"></span>

              {isAuth ? (
                <Dropdown overlay={() => accountMenu(logoutHandler)} placement="bottomRight">
                  <a className="text-truncate text-dark align-middle text-decoration-none">
                    <Avatar size="large" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" />
                    <span className="pl-2 align-middle">Jhon Bakery Handler</span>
                  </a>
                </Dropdown>
              ) : (
                <>
                  <Nav.Item className="mr-2 align-self-center d-none d-lg-block" onClick={showLoginHandler}>
                    <Button size="sm" className="btn-dark-tridatu-outline">Masuk</Button>
                  </Nav.Item>
                  <Nav.Item className="align-self-center d-none d-lg-block" onClick={showRegisterHandler}>
                    <Button size="sm" className="btn-tridatu">Daftar</Button>
                  </Nav.Item>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login show={showLogin} handler={showRegisterHandler} close={closeModalHandler} login={loginHandler} />
      <Register show={showRegister} handler={showLoginHandler} close={closeModalHandler} login={loginHandler} />
      <MobileMenu 
        isAuth={isAuth}
        visible={showMobileMenu} 
        close={closeMobileMenuHandler} 
        login={showLoginHandler} 
        register={showRegisterHandler}
        logout={logoutHandler}
      />

      <style jsx>{`
        :global(.top-50){
          top: 50px !important;
        }
        :global(.w-340px){
          width: 340px !important;
        }
        :global(.navbar-shadow-bottom) {
          box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 15px !important;
        }
        :global(.align-baseline-middle) {
          vertical-align: -webkit-baseline-middle !important;
        }
        :global(.dropdown-kategori > .dropdown-menu) {
          border: 0;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          max-height: 345px;
          overflow-y: auto;
        }
        :global(.nav-notification){
          color: rgba(0,0,0,.5);
          font-size: 16px;
        }
        :global(.nav-notification .ant-badge-count-sm){
          font-size: 10px;
          min-width: 15px;
          height: 15px;
        }
        :global(.nav-notification .ant-badge-multiple-words){
          padding: 0 4px;
        }
        :global(.nav-search .ant-input-affix-wrapper){
          border: 0;
          border-radius: .25rem;
          background-color: #f1f3f5;
        }
        :global(.nav-search .ant-input-affix-wrapper > input.ant-input){
          background-color: transparent;
        }
        :global(.nav-search .ant-input-affix-wrapper > .ant-input::placeholder){
          color: rgba(0, 0, 0, 0.45);
        }
        :global(.nav-search .ant-input-affix-wrapper > .ant-input-suffix > .ant-input-search-icon::before){
          border-left: 0;
        }
        :global(.nav-search > .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused){
          box-shadow: unset;
        }

        /*CART ITEM NAVBAR*/
        :global(.cart-item-navbar){
          max-height: 300px;
          overflow: scroll;
        }
        :global(.cart-item-navbar > .ant-dropdown-menu-item-group-title){
          padding: 0;
        }
        :global(.cart-item-navbar > .ant-dropdown-menu-item-group-list){
          margin: 0;
          max-height: 300px;
        }
        :global(.view-all-text-navbar){
          float: right;
          line-height: 2;
          font-size: 12px;
        }
        :global(.notification-item-navbar > .ant-dropdown-menu-item-group-list > .notification-item){
          background: white;
        }
        :global(.notification-item-navbar > .ant-dropdown-menu-item-group-list > .notification-item:not(:last-child)){
          border-bottom: 1px solid #dee2e6!important;
        }
        :global(.notification-item-navbar > .ant-dropdown-menu-item-group-list > .notification-item:hover){
          background-color: #f5f5f5;
        }
        :global(.notification-item-navbar > .ant-dropdown-menu-item-group-list > .notification-item.unread){
          background-color:#effaf3;
        }
        /*CART ITEM NAVBAR*/

        /* LOGIN & REGISTER */
        :global(.modal-login > .ant-modal-content, .modal-login
            > .ant-modal-content
            > .ant-modal-header) {
          border-radius: 10px;
          border: unset;
        }
        :global(.ant-divider-horizontal.ant-divider-with-text::before, 
                .ant-divider-horizontal.ant-divider-with-text::after) {
          border-top: 0.5px solid rgba(0, 0, 0, 0.12);
        }
        /* LOGIN & REGISTER */

        :global(.logo-navbar){
          height: 42px;
          width: auto;
        }
        @media only screen and (max-width: 425px){
          :global(.text-navbar){
            font-size: 16px;
          }
          :global(.logo-navbar){
            height: 32px;
            width: auto;
          }
          :global(.align-baseline-middle){
            vertical-align: unset !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
