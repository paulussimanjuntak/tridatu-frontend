import { useState } from 'react'
import { Button, Modal } from 'antd'

import Link from 'next/link'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

import CartItemShipment from 'components/Cart/CartItemShipment'

const formAddress = {
  label: { value: '', isValid: true, message: false },
  nama_penerima: { value: '', isValid: true, message: false },
  telepon: { value: '', isValid: true, message: false },
  kota_kecamatan: { value: '', isValid: true, message: false },
  kode_pos: { value: '', isValid: true, message: false },
  alamat: { value: '', isValid: true, message: false }
}

const Shipment = () => {
  const [address, setAddress] = useState(formAddress)
  const [showAddressModal, setShowAddressModal] = useState(false)

  const showAddressModalHandler = () => {
    setShowAddressModal(true)
  }

  const closeAddressModalHandler = () => {
    setShowAddressModal(false)
  }

  return(
    <>
      <Container className="pt-4 pb-2">
        <h4 className="fs-20 mb-4">Checkout</h4>
        <Row>
          <Col lg={8}>
            <p className="fw-500 fs-16">Alamat penerima</p>
            <Card className="address-card fs-14">
              <p className="user-address-title mb-0 fw-500">
                Andi salamen <span className="font-weight-light">(Rumah)</span>
              </p>
              <p className="font-weight-light user-phone mb-0">628515678910</p>
              <p className="text-secondary mb-0">
                Jl. Kenari Raya, Kec. Kuta Sel., Kabupaten Badung, Bali, 80361 [Tokopedia Note: JALAN TAMAN GIRIYA PERUMAHAN BINA SATYA PERMAI GANG MAWAR-Y NOMOR 41]
Kuta Selatan, Kab. Badung, 80361
              </p>
            </Card>

            <Card>
              <Button onClick={showAddressModalHandler}>Tambah alamat</Button>
            </Card>
            
            <div className="cart-item">
              <Row className="mx-0">
                {[...Array(8)].map((_, i) => (
                  <CartItemShipment key={i} />
                ))}
              </Row>
            </div>
          </Col>

          <Col>
            <Card className="checkout-summary">
              <Card.Body className="border-bottom-5">
                <Button 
                  block
                  size="large"
                  className="text-left text-secondary fs-14"
                >
                  <i className="fad fa-badge-percent text-tridatu mr-2 fa-lg" />
                  <span className="font-weight-bold">Pakai kode promo</span>
                  <i className="fas fa-angle-right" 
                    style={{
                      right: '15px',
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  />
                </Button>
              </Card.Body>
              <Card.Body>
                <p className="font-weight-bold fs-14">Ringkasan belanja</p>
                <p className="font-weight-light checkout-summary-price fs-14">
                  Total Harga
                  <span className="float-right cart-item-price font-weight-bold">
                    Rp. 120.000
                  </span>
                </p>
                <Link href="/cart/shipment" as="/cart/shipment">
                  <a>
                    <Button 
                      block
                      size="large"
                      className="btn-tridatu"
                    >
                      Beli (8)
                    </Button>
                  </a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        centered
        title="Tambah Alamat Baru"
        visible={showAddressModal}
        onOk={closeAddressModalHandler}
        onCancel={closeAddressModalHandler}
        zIndex="1030"
        closeIcon={<i className="fas fa-times" />}
        footer={[
          <Button key="back">
            Batal
          </Button>,
          <Button key="submit" type="primary" className="btn-tridatu">
            Simpan
          </Button>,
        ]}
        className="modal-address"
        bodyStyle={{padding: '0'}}
      >
        <Card.Body>
          <Form>

            <Form.Group>
              <Form.Label>Label Alamat</Form.Label>
              <Form.Control placeholder="Alamat Rumah, Alamat Kantor, Apartemen..." />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nama Penerima</Form.Label>
                <Form.Control type="text" placeholder="Nama" />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control type="number" placeholder="081234567890" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={8} sm={12}>
                <Form.Label>Kota atau Kecamatan</Form.Label>
                <Form.Control type="text" placeholder="Tulis Nama Alamat / Kota / Kecamatan tujuan pengiriman" />
              </Form.Group>

              <Form.Group as={Col} md={4} sm={12}>
                <Form.Label>Kode Pos</Form.Label>
                <Form.Control type="text" placeholder="Kode Pos" />
              </Form.Group>
            </Form.Row>

            <Form.Group className="mb-0">
              <Form.Label>Alamat</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Isi dengan nama jalan, nomor rumah, nomor kompleks, nama gedung, lantai atau nomor unit." />
            </Form.Group>

          </Form>
        </Card.Body>
      </Modal>

      <style jsx>{`
        :global(.address-card){
          border-radius: 0;
          border-left: 0;
          border-right: 0;
          padding: 10px 0 10px 0;
          margin-bottom: 1em;
        }
        :global(.user-phone){
          letter-spacing : -1px;
        }
        :global(.modal-address > .ant-modal-content,
                .modal-address > .ant-modal-content > .ant-modal-header){
          border-radius: 10px;
          border: unset;
        }
      `}</style>
    </>
  )
}

export default Shipment
