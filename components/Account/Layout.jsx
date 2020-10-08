import { Avatar, Button } from 'antd'

import { useRouter } from 'next/router'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const PROFILE = '/account/profile'
const ORDERS = '/account/orders'
const REVIEW = '/account/review'
const FAVORITE = '/account/favorite'
const ADDRESS = '/account/address'
const PASSWORD = '/account/password'

const AccountLayout = ({ children, pathname }) => {
  const router = useRouter()

  return(
    <>
      <div className="bg-light">
        <Container className="pt-4 pb-4 account">
          <Row>
            <Nav 
              activeKey={pathname} 
              onSelect={e => router.push(e, e)}
              className="flex-column col-md-2 d-none d-lg-block pl-2 fs-14"
            >
              <Nav.Link className="text-truncate text-dark align-middle text-decoration-none px-0 mb-3">
                <Avatar size="large" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" />
                <span className="pl-1 align-middle">Jhon Bakery Handler</span>
              </Nav.Link>
              
              <Nav.Link eventKey={PROFILE} className="side-nav-link">
                <span>
                  <i className="far fa-user-circle mr-2" />
                  Akun Saya
                </span>
              </Nav.Link>

              <Nav.Link eventKey={ORDERS} className="side-nav-link">
                <span>
                  <i className="far fa-clipboard-list mr-2" />
                  Pesanan Saya
                </span>
              </Nav.Link>

              <Nav.Link eventKey={FAVORITE} className="side-nav-link">
                <span>
                  <i className="far fa-heart mr-2" />
                  Favorit
                </span>
              </Nav.Link>

              <Nav.Link eventKey={REVIEW} className="side-nav-link">
                <span>
                  <i className="far fa-file-signature mr-2" />
                  Ulasan
                </span>
              </Nav.Link>

              <Nav.Link eventKey={ADDRESS} className="side-nav-link">
                <span>
                  <i className="far fa-address-book mr-2" />
                  Daftar Alamat
                </span>
              </Nav.Link>

              <Nav.Link eventKey={PASSWORD} className="side-nav-link">
                <span>
                  <i className="far fa-lock mr-2" />
                  Atur Password
                </span>
              </Nav.Link>

            </Nav>

            <Col lg={10} md={12} className="bg-white px-0 rounded h-100">
              {children}
            </Col>

          </Row>

          <Row className="fixed-bottom mb-3 d-block d-sm-block d-md-block d-lg-none d-xl-none">
            <Col>
              <Button   
                size="large"
                shape="circle" 
                icon={<i className="far fa-plus fa-lg" />} 
                className="rounded-circle float-right mr-3 btn-dark"
              />
            </Col>
          </Row>

        </Container>
      </div>

      <style jsx>{`
        :global(.side-nav-link){
          padding-left: 0;
          padding-right: 0;
          color: rgba(0, 0, 0, 0.65);
        }
        :global(.side-nav-link.active){
          color: rgba(0, 0, 0, 0.95);
          font-weight: 500;
        }
        :global(.side-nav-link:hover){
          color: rgba(0, 0, 0, 0.95);
        }

        @media only screen and (max-width: 575px){
          :global(.account.pt-4.pb-4){
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          :global(.account .card.card-container){
            border: 0;
          }
        }

      `}</style>
    </>
  )
}

export default AccountLayout
