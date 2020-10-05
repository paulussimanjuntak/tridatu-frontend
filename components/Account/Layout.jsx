import { useState, useEffect } from 'react'
import { Avatar, Select, Button, Upload } from 'antd'

import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

import { uploadButton, imagePreview, imageValidation } from 'lib/imageUploader'

const AccountLayout = ({ children }) => {
  return(
    <>
      <div className="bg-light">
        <Container className="pt-4 pb-4">
          <Row>
            <Nav className="flex-column col-md-2 d-none d-lg-block pl-2 fs-14">
              <Nav.Link className="text-truncate text-dark align-middle text-decoration-none px-0 mb-3">
                <Avatar size="large" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" />
                <span className="pl-1 align-middle">Jhon Bakery Handler</span>
              </Nav.Link>
              <Nav.Link eventKey="user" className="side-nav-link">
                <span>
                  <i className="far fa-user-circle mr-2" />
                  Akun Saya
                </span>
              </Nav.Link>

              <Nav.Link eventKey="order" className="side-nav-link">
                <span>
                  <i className="far fa-clipboard-list mr-2" />
                  Pesanan Saya
                </span>
              </Nav.Link>

              <Nav.Link eventKey="favorit" className="side-nav-link">
                <span>
                  <i className="far fa-heart mr-2" />
                  Favorit
                </span>
              </Nav.Link>

              <Nav.Link eventKey="address" className="side-nav-link">
                <span>
                  <i className="far fa-address-book mr-2" />
                  Daftar Alamat
                </span>
              </Nav.Link>

              <Nav.Link eventKey="password" className="side-nav-link">
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
        </Container>
      </div>
    </>
  )
}

export default AccountLayout
