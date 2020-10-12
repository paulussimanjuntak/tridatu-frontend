import { useState } from 'react';
import { Drawer, Avatar, Button, Input, AutoComplete } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

import CategoryMenu from './CategoryMenu';

const routes = [
  {link: "/account/profile", text: "Akun Saya"},
  {link: "/account/orders", text: "Pesanan Saya"},
  {link: "/account/favorite", text: "Favorit"},
]

const MobileMenu  = ({ visible, close, register, login, logout, isAuth }) => {
  const [showCategory, setShowCategory] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const showCategoryHandler = () => setShowCategory(true)
  const closeCategoryHandler = () => setShowCategory(false)

  const showSearchHandler = () => {
    setShowSearch(true)
    setTimeout(() => {
      close()
    }, 200)
  }

  let headerMobile;
  if(isAuth){
    headerMobile = (
      <div className="text-truncate mr-4">
        <Avatar src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" />
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
          <Button
            onClick={showSearchHandler}
            className={`${!isAuth && 'mt-4'}`}
          >
            Search
          </Button>

          {!isAuth && (
            <>
              <Nav.Link onClick={login}>Login</Nav.Link>
              <Nav.Link onClick={register}>Daftar</Nav.Link>
            </>
          )}

          <Link href="/products" as="/products">
            <Nav.Link as="a" onClick={showCategoryHandler}>
              Kategori
            </Nav.Link>
          </Link>

          <Link href="/promo" as="/promo">
            <Nav.Link as="a" onClick={close}>
              Promo
            </Nav.Link>
          </Link>

          {isAuth && (
            <>
              {routes.map((route, i) => (
                <Link href={route.link} as={route.link} key={i}>
                  <Nav.Link as="a" onClick={close}>
                    {route.text}
                  </Nav.Link>
                </Link>
              ))}
              <Nav.Link onClick={logout}>Keluar</Nav.Link>
            </>
          )}
        </Nav>
      </Drawer>

      <AnimatePresence>
        {showSearch && (
          <motion.div 
            className={`modal ${showSearch && "show modal-open d-block"}`}
            transition={{ duration: ".3" }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-dialog m-0">
              <div className="modal-content rounded-0 border-0 vh-100">
                <div className="modal-body">
                  <Form inline>
                    <Form.Row className="align-items-center w-100">
                      <Col>
                        <AutoComplete 
                          className="w-100 search-mobile"
                          autoFocus={true}
                        >
                          <Input
                            placeholder="Search"
                            className="jhghjgdhjsagjdgask"
                            prefix={<i className="far fa-search" />}
                          />
                        </AutoComplete>
                      </Col>
                      <Col xs="auto" className="pr-0">
                        <a className="text-tridatu fw-500" onClick={() => setShowSearch(false)}>Batal</a>
                      </Col>
                    </Form.Row>
                  </Form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Drawer
        placement="right"
        zIndex="1031"
        width="100vw"
        onClose={closeCategoryHandler}
        visible={showCategory}
        closeIcon={<i className="fas fa-times" />}
        className="d-block d-sm-block d-md-block d-lg-none d-xl-none"
        headerStyle={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}
        title={<b>Kategori</b>}
      >
        <CategoryMenu />
      </Drawer>

      <style jsx>{`
        :global(.mobile-menu > a){
          color: #343a40!important;
          border-bottom: 1px solid #dee2e6!important;
        }

        :global(.modal-search){
          animation-duration: 100ms !important;
        }
        :global(.search-mobile > .ant-select-selector .ant-input-affix-wrapper:focus, 
                .search-mobile.ant-select:not(.ant-select-disabled):hover .ant-select-selector,
                .search-mobile.ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
                 .search-mobile.ant-select-focused.ant-select-single .ant-select-selector,
                 .search-mobile .ant-input-affix-wrapper:focus, .search-mobile .ant-input-affix-wrapper-focused){
          box-shadow: none !important;
        }
      `}</style>
    </>
  )
}

export default MobileMenu
