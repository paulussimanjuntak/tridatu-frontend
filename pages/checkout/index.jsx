import { useState } from 'react'
import { Button, Divider } from 'antd'

import Link from 'next/link'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import AddAddressModal from 'components/Modal/AddAddress'
import PromoModal from 'components/Cart/PromoModal'
import CartItemCheckout from 'components/Cart/CartItemCheckout'
import { PromoSelected, PromoButton } from 'components/Cart/PromoSelected'

import CartStyle from 'components/Cart/style'

import { listPromo } from '../cart'

const Checkout = () => {
  const [showPromoModal, setShowPromoModal] = useState(false)
  const [promo, setPromo] = useState({ code: '', isUsed: false })
  const [showAddressModal, setShowAddressModal] = useState(false)

  const showAddressModalHandler = () => {
    setShowAddressModal(true)
  }

  const closeAddressModalHandler = () => {
    setShowAddressModal(false)
  }

  const showPromoModalHandler = () => {
    setShowPromoModal(true)
  }

  const closePromoModalHandler = () => {
    setPromo({ ...promo, code: '' })
    setShowPromoModal(false)
  }

  const promoChangeHandler = e => {
    const value = e.target.value
    setPromo({ ...promo, code: value })
  }

  const onUsePromoHandler = () => {
    setPromo({ ...promo, isUsed: true })
    setShowPromoModal(false)
  }

  const onRemovePromoHandler = () => {
    setPromo({ ...promo, isUsed: false, code: '' })
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

            <Card.Body className="border-0 p-0 mb-3">
              <Button onClick={showAddressModalHandler}>Tambah alamat</Button>
            </Card.Body>

            <div className="border-bottom-5 mb-2" />
            
            <div className="cart-item">
              <Row className="mx-0">
                {[...Array(8)].map((_, i) => (
                  <CartItemCheckout key={i} />
                ))}
              </Row>
            </div>
          </Col>

          <Col>
            <Card className="checkout-summary">
              <Card.Body className="border-bottom-5">
                {!promo.isUsed ? (
                  <PromoButton
                    disabled={false}
                    show={showPromoModalHandler}
                  />
                ) : (
                  <PromoSelected
                    reset={onRemovePromoHandler}
                  />
                )}
              </Card.Body>
              <Card.Body>
                <p className="font-weight-bold fs-14">Ringkasan belanja</p>
                <p className="font-weight-light checkout-summary-price fs-14 mb-1 text-truncate fs-12-s">
                  Total Harga (8 Produk)
                  <span className="float-right">
                    Rp. 600.000
                  </span>
                </p>
                <p className="font-weight-light checkout-summary-price fs-14 mb-1 text-truncate fs-12-s">
                  Onkos Kirim
                  <span className="float-right">
                    Rp. 60.000
                  </span>
                </p>
                <p className="font-weight-light checkout-summary-price fs-14 mb-1 text-truncate fs-12-s">
                  Onkos Kirim
                  <span className="float-right">
                    Rp. 60.000
                  </span>
                </p>
                <p className="font-weight-light checkout-summary-price fs-14 mb-1 text-truncate fs-12-s">
                  Promo
                  <span className="float-right">
                    - Rp. 10.000
                  </span>
                </p>

                <Divider className="my-2" />

                <p className="font-weight-bold checkout-summary-price fs-14 fs-12-s text-truncate">
                  Total Tagihan
                  <span className="float-right cart-item-price font-weight-bold">
                    Rp. 710.000
                  </span>
                </p>
                <Link href="/checkout" as="/checkout">
                  <a>
                    <Button 
                      block
                      size="large"
                      className="btn-tridatu font-weight-bold"
                    >
                      Pilih Pembayaran
                    </Button>
                  </a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <AddAddressModal
        show={showAddressModal}
        submit={closeAddressModalHandler}
        close={closeAddressModalHandler}
      />

      <PromoModal
        show={showPromoModal} 
        close={closePromoModalHandler}
        reset={onRemovePromoHandler}
        selectPromo={onUsePromoHandler}
        onChange={promoChangeHandler}
        promo={promo}
        dataPromo={listPromo}
      />


      <style jsx>{CartStyle}</style>
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
      `}</style>
    </>
  )
}

export default Checkout
