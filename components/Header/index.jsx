import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";

import { Input, Badge } from "antd";

const category_data = [ "Aksesoris", "Baju", "Celana", "Jaket", "Tas Selempang"];

const render_category = data => {
  const list_category = [];
  data.forEach(x =>
    list_category.push(
      <NavDropdown.Item key={x + Math.random()}>{x}</NavDropdown.Item>
    )
  );
  return list_category;
};

const Header = () => {
  return (
    <>
      <Navbar
        expand="lg"
        variant="light"
        bg="light"
        fixed="top"
        className="bg-white navbar-shadow-bottom py-2"
      >
        <Container>
          <Navbar.Brand href="/" className="font-italic">
            <img
              src="/tridatu-icon.png"
              width="auto"
              height="42"
              className="d-inline-block align-top"
              alt="Tridatu Bali"
            />
            <span className="text-dark font-weight-bold align-self-center align-baseline-middle pl-1">
              Tridatu
              <span className="text-muted font-weight-bold"> Bali ID</span>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="tridatu-navbar-nav" />
          <Navbar.Collapse id="tridatu-navbar-nav">
            <Nav className="w-100">
              <NavDropdown
                title={<span className="text-dark">Kategori</span>}
                id="Kategori"
                className="dropdown-kategori"
              >
                {render_category(category_data)}
              </NavDropdown>
              <Nav.Link href="#promo" className="text-dark">
                Promo
              </Nav.Link>
              
              <Form inline className="mx-2 w-100">
                <div className="w-100 nav-search">
                  <Input.Search placeholder="Search" />
                </div>
              </Form>

              <Nav.Link className="mx-2">
                <Badge count={100} size="small" className="nav-notification">
                  <i className="far fa-bell fa-lg" />
                </Badge>
              </Nav.Link>
              <Nav.Link className="ml-2">
                <Badge count={100} size="small" className="nav-notification">
                  <i className="far fa-shopping-cart fa-lg" />
                </Badge>
              </Nav.Link>

              <span className="border-right mx-4"></span>

              <Nav.Item className="mr-2 align-self-center">
                <Button size="sm" variant="outline-dark">Daftar</Button>
              </Nav.Item>
              <Nav.Item className="align-self-center">
                <Button size="sm" variant="secondary">Masuk</Button>
              </Nav.Item>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
          background-color: #f1f3f5;
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
      `}</style>
    </>
  );
};

export default Header;
