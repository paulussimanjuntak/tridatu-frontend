import { Drawer, Avatar } from 'antd';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav'

const MobileMenu  = ({ visible, close, register, login, logout, isAuth }) => {
  let headerMobile;
  if(isAuth){
    headerMobile = (
      <div className="text-truncate mr-4">
        <Avatar src="https://api.mentimun-mentah.tech/static/avatars/default.png" />
        <span className="text-capitalize text-truncate pl-2">
          Jhon Bakery Handler
        </span>
      </div>
    )
  }
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
        title={headerMobile}
      >
        <Nav className="flex-column mobile-menu">
          {!isAuth && (
            <>
              <Nav.Link onClick={login}>Login</Nav.Link>
              <Nav.Link onClick={register}>Daftar</Nav.Link>
            </>
          )}
          <Link href="/" as="/">
            <Nav.Link as="a" onClick={close}>
              Beranda
            </Nav.Link>
          </Link>
          <Link href="/products" as="/products">
            <Nav.Link as="a" onClick={close}>
              Kategori
            </Nav.Link>
          </Link>
          <Link href="/promo" as="/promo">
            <Nav.Link as="a" onClick={close}>
              Promo
            </Nav.Link>
          </Link>
          {isAuth && (
            <Nav.Link onClick={logout}>Keluar</Nav.Link>
          )}
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
