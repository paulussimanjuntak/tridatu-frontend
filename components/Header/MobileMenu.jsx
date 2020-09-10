import { Drawer } from 'antd';
import Nav from 'react-bootstrap/Nav'

const MobileMenu  = ({ visible, close, register, login }) => {
  return(
    <>
      <Drawer
        placement="right"
        zIndex="1030"
        onClose={close}
        visible={visible}
        closeIcon={<i className="fas fa-times" />}
        className="d-block d-sm-block d-md-block d-lg-none d-xl-none"
        headerStyle={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
      >
        <Nav className="flex-column mobile-menu">
          <Nav.Link onClick={login}>Login</Nav.Link>
          <Nav.Link onClick={register}>Daftar</Nav.Link>
          <Nav.Link>Promo</Nav.Link>
          <Nav.Link>Semua Produk</Nav.Link>
        </Nav>
      </Drawer>

      <style jsx>{`
        :global(.mobile-menu > a){
          color: #343a40!important;
          border-bottom: 1px solid #dee2e6!important;
        }
      `}</style>
    </>
  )
}

export default MobileMenu
