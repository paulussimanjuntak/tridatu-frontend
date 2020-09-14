import { useState } from "react";
import { Input, Badge, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';

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

const menu = (
  <Menu>
    <Menu.Item>
      <a href="#">
        Notifikasi 
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a href="#">
        Informasi Akun
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="#">
        Blanjaan Saya
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="#">
        Favorit
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a href="#">
        Keluar
      </a>
    </Menu.Item>
  </Menu>
);

const accountMenu = (
  <Menu>
    <Menu.Item>
      <a href="#">
        Informasi Akun
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="#">
        Blanjaan Saya
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="#">
        Favorit
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a href="#">
        Keluar
      </a>
    </Menu.Item>
  </Menu>
);

const Header = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

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

  return (
    <>
      <Navbar
        expand="lg"
        expanded={false}
        variant="light"
        bg="light"
        fixed="top"
        className="bg-white navbar-shadow-bottom py-2"
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
            <Badge count={400} size="small" className="nav-notification">
              <i className="far fa-shopping-cart fa-lg" />
            </Badge>
          </Navbar.Toggle>

          <Navbar.Toggle 
            className="border-0 px-0" 
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

              <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']} arrow>
                <Nav.Link className="mx-2 d-none d-lg-block">
                  <Badge count={100} size="small" className="nav-notification">
                    <i className="far fa-bell fa-lg" />
                  </Badge>
                </Nav.Link>
              </Dropdown>

              <Dropdown overlay={menu} placement="bottomCenter" arrow>
                <Nav.Link className="ml-2 d-none d-lg-block">
                  <Badge count={100} size="small" className="nav-notification">
                    <i className="far fa-shopping-cart fa-lg" />
                  </Badge>
                </Nav.Link>
              </Dropdown>

              <span className="border-right mx-4"></span>

              {/*
              <Dropdown overlay={accountMenu} placement="bottomRight">
                <a onClick={e => e.preventDefault()} className="text-truncate text-dark align-middle">
                  <Avatar size="large" icon={<UserOutlined />} />
                  <span className="pl-2 align-middle">Jhon Bakery Handler</span>
                </a>
              </Dropdown>
              */}

              <Nav.Item className="mr-2 align-self-center d-none d-lg-block" onClick={showLoginHandler}>
                <Button size="sm" className="btn-dark-tridatu-outline">Masuk</Button>
              </Nav.Item>
              <Nav.Item className="align-self-center d-none d-lg-block" onClick={showRegisterHandler}>
                <Button size="sm" className="btn-tridatu">Daftar</Button>
              </Nav.Item>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login show={showLogin} handler={showRegisterHandler} close={closeModalHandler} />
      <Register show={showRegister} handler={showLoginHandler} close={closeModalHandler} />
      <MobileMenu 
        visible={showMobileMenu} 
        close={closeMobileMenuHandler} 
        login={showLoginHandler} 
        register={showRegisterHandler}
      />

      <style jsx>{`
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
