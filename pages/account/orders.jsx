import { Tabs, Input, Select, Popconfirm, Button } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import CartItemCheckout from 'components/Cart/CartItemCheckout'

const WAITING = 'waiting'
const PACKED = 'packed'
const SENT = 'sent'
const DONE = 'done'
const CANCELED = 'canceled'

const sortList = ['Paling Sesuai', 'Harga Tertinggi', 'Harga Terendah']

const Orders = () => {
  const searchComponent = (
    <Form>
      <Form.Row>
        <Form.Group as={Col} lg={8} md={6}>
          <Input 
            className="order-search h-100"
            placeholder="Cari berdasarkan nama" 
            prefix={<i className="far fa-search" />}
          />
        </Form.Group>
        <Form.Group as={Col} lg={4} md={6}>
          <Select 
            placeholder="Urutkan" 
            style={{ width: "100%"}}
            className="order-search"
          >
            {sortList.map(x => (
              <Select.Option key={x} value={x}>{x}</Select.Option>
            ))}
          </Select>
        </Form.Group>
      </Form.Row>
    </Form>
  )

  return(
    <>
      <Card>
        <Card.Body className="bg-transparent">
          <Tabs defaultActiveKey="1" className="noselect order-tabs">
            <Tabs.TabPane tab="Belum Bayar" key={WAITING}>
              {searchComponent}
              <Card>
                <Card.Header>
                  <i className="far fa-shopping-bag fa-lg" />
                  <strong className="mx-2">Belanja</strong>
                  <span className="badge badge-warning">Belum bayar</span>
                  <Popconfirm
                    title="Batalkan transaksi ini?"
                    okText="Ya"
                    cancelText="Batal"
                    placement="bottomRight"
                    arrowPointAtCenter
                  >
                    <a className="float-right text-tridatu fs-12">
                      Batalkan <span className="d-none d-md-inline-block">transaksi</span>
                    </a>
                  </Popconfirm>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col lg={8} md={8} sm={12} className="d-none d-md-block">
                      <div className="payment-card-row">
                        <div className="payment-card-total-text">Total:</div>
                        <div className="payment-card-total-amount">Rp 1.284.200</div>
                        <div className="payment-card-total-text">Tanggal Pembelian</div>
                        <div className="payment-card-transaction-date">6 Oct 2020</div>
                      </div>
                      <div className="payment-card-row">
                        <Alert variant="dark" className="w-100 alert-payment mb-0">
                          <i className="far fa-lightbulb-on mr-2" /> Bayar sebelum 7 Oct 2020, 15:56 WIB
                        </Alert>
                      </div>
                      <div className="payment-card-row text-truncate">
                        <div className="payment-card-column">
                          <div className="payment-information-left">Nomor Pesanan</div>
                          <div className="payment-information-left">Metode Pembayaran</div>
                          <div className="payment-information-left">Nomor Virtual Account</div>
                        </div>
                        <div className="payment-card-column">
                          <div className="payment-information-center">:</div>
                          <div className="payment-information-center">:</div>
                          <div className="payment-information-center">:</div>
                        </div>
                        <div className="payment-card-column text-truncate">
                          <div className="payment-information-right text-truncate">201006KFTF78US</div>
                          <div className="payment-information-right text-truncate">Mandiri Virtual Account</div>
                          <div className="payment-information-right">8870885156565673</div>
                        </div>
                      </div>
                    </Col>
                    
                    {/*MOBILE INFORMATION*/}
                    <Col className="d-block d-md-none">
                      <Alert variant="warning" className="w-100 alert-payment payment-mobile">
                        <i className="far fa-lightbulb-on mr-2" /> Bayar sebelum 7 Oct 2020, 15:56 WIB
                      </Alert>
                      <div className="payment-information-mobile">
                        <p className="title-payment-information-mobile">Total</p>
                        <p className="total-amount-mobile">Rp 1.284.200</p>
                      </div>
                      <div className="payment-information-mobile">
                        <p className="title-payment-information-mobile">Nomor Pesanan</p>
                        <p className="data-payment-information-mobile">201006KFTF78US</p>
                      </div>
                      <div className="payment-information-mobile">
                        <p className="title-payment-information-mobile">Nomor Virtual Account</p>
                        <p className="data-payment-information-mobile">8870885156565673</p>
                      </div>
                      <div className="payment-information-mobile">
                        <p className="title-payment-information-mobile">Metode Pembayaran</p>
                        <p className="data-payment-information-mobile">Mandiri Virtual Account</p>
                      </div>
                    </Col>
                    {/*MOBILE INFORMATION*/}

                    <Col lg={4} md={4} sm={12} className="text-center">
                      <img 
                        className="payment-method-logo" 
                        src="https://ecs7.tokopedia.net/img/toppay/payment-logo/icon-mandiri.png"
                      />
                      <Button block className="btn-howtopay">Cara Pembayaran</Button>
                      <Button block className="btn-howtopay btn-tridatu">Lihat Rincian</Button>
                    </Col>
                  </Row>

                </Card.Body>

                <Card.Footer className="bg-white border-top-5">
                  <Row className="align-items-center">
                    <Col className="fs-12 col-12">
                      <p className="font-weight-bold mb-0">Jhony Bakerey Suardhana</p>
                      <p className="text-secondary mb-0">(+62) 8123451234</p>
                      <p className="text-secondary">Jalan Pulau Suarhana Blok Santhy No 2, KOTA BADUNG, KUTA SELATAN, BALI, ID, 80622</p>
                    </Col>
                  </Row>
                  <div className="border-delivery" />
                  <Row className="align-items-center mt-2">
                    <Col>
                      <p className="mb-0 title-no-order">
                        No Pesanan: 
                        <br className="d-block d-md-none" /> 
                        <span className="data-no-order fs-14">{' '}201006KFTF78US</span>
                      </p>
                    </Col>
                    <Col>
                      <a className="float-right text-tridatu">
                        Invoice
                      </a>
                    </Col>
                  </Row>
                </Card.Footer>

                <Card.Footer className="bg-white border-top-5">
                  <Row className="order-items">
                    {[...Array(3)].map((_, i) => (
                      <CartItemCheckout key={i} />
                    ))}
                  </Row>
                  <Row className="delivery-order">
                  </Row>
                </Card.Footer>

                <Card.Footer className="bg-white border-top-5">
                  <div className="detail-box-content">
                    <div className="detail-item">
                      <div className="detail-item-left">
                        <div className="font-weight-bold">Total Harga</div>
                      </div>
                      <div className="font-weight-bold">Rp1.155.000</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-item-left">
                        <div className="detail-item-name">Total Ongkos Kirim</div>
                      </div>
                      <div className="detail-item-price">Rp 124.000</div>
                    </div>
                    <div className="detail-item detail-item-other">
                      <div className="detail-item-left">
                        <div className="detail-item-name">Biaya Layanan</div>
                      </div>
                      <div className="detail-item-price">Gratis</div>
                    </div>
                  </div>

                  <div className="detail-box-content">
                    <div className="detail-item">
                      <div className="detail-item-left">
                        <div className="fs-14 text-black font-weight-bold">Total Bayar</div>
                        <div className="detail-item-info detail-main-gateway">Mandiri Virtual Account</div>
                      </div>
                      <div className="detail__tagihan-amount align-self-center">
                        Rp. 1.284.200
                      </div>
                    </div>
                  </div>
                </Card.Footer>

              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dikemas" key={PACKED}>
              {searchComponent}
              Dikemas
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dikirim" key={SENT}>
              {searchComponent}
              Dikirim
            </Tabs.TabPane>
            <Tabs.TabPane tab="Selesai" key={DONE}>
              {searchComponent}
              Selesai
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dibatalkan" key={CANCELED}>
              Dibatalkan
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>

      </Card>
      
      <style jsx>{`
        :global(.ant-input-affix-wrapper.order-search, 
                .order-search.ant-select-focused.ant-select-single .ant-select-selector,
                .order-search.ant-select:not(.ant-select-disabled):hover .ant-select-selector){
          box-shadow: none !important;
        }
        :global(.flex-flow-nowrap){
          flex-flow: nowrap!important;
        }

        :global(.text-price){
          font-weight: 700;
          color: rgba(0,0,0,1);
          letter-spacing: -1px;
        }
        :global(.text-price-total){
          color: rgba(0,0,0,.54);
        }

        :global(.payment-card-row:not(:last-of-type)){
          padding-bottom: 10px;
        }
        :global(.payment-card-row){
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        :global(.payment-card-column){
          display: flex;
          flex-direction: column;
        }
        :global(.payment-card-total-text){
          color: rgba(0,0,0,.54);
          text-align: left;
          margin-right: 8px;
        }
        :global(.payment-card-total-amount){
          color: #d63031;
          font-weight: 700;
          margin-right: 8px;
        }
        :global(.payment-card-transaction-date){
          font-weight: 700;
          color: rgba(0,0,0,.80);
          text-align: left;
          margin-right: 8px;
        }

        :global(.alert-payment){
          background-color: #f8f8f8;
          font-size: 13px;
          padding: 8px;
          flex: 1 1;
          text-align: left;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-radius: 8px;
          border: 0;
          color: rgba(0,0,0,.7);
        }

        :global(.payment-information-left){
          color: rgba(0,0,0,.54);
          text-align: left;
        }
        :global(.payment-information-center){
          color: rgba(0,0,0,.54);
          padding: 0 8px;
        }
        :global(.payment-information-right){
          font-weight: 700;
          color: rgba(0,0,0,.54);
          text-align: left;
        }

        :global(.payment-method-logo){
          padding: 0 10px 10px 10px;
          margin-top: 0px;
          margin: 5px auto;
          object-fit: contain;
        }

        :global(.btn-howtopay:not(:last-of-type)){
          margin-bottom: 8px;
        }
        :global(.btn-howtopay){
          color: rgba(0,0,0,.7);
        }
        :global(.btn-howtopay.btn-tridatu){
          color: #fff;
        }

        :global(.alert-payment.payment-mobile){
          color: #856404;
          background-color: #fffbec;
          // border: 1px solid #f5ce59;
          margin-bottom: 8px;
        }
        :global(.payment-information-mobile > .title-payment-information-mobile, .title-no-order){
          margin-bottom: 0px;
          color: rgba(0,0,0,.54);
          font-size: 12px;
        }
        :global(.payment-information-mobile > .total-amount-mobile){
          color: #d63031;
          font-weight: 700;
        }
        :global(.payment-information-mobile > .data-payment-information-mobile, .data-no-order){
          color: rgba(0,0,0,.7);
        }
        
        :global(.title-no-order){
          font-size: 14px;
        }

        :global(.order-items > .cart-item-body:not(:last-of-type)){
          padding-bottom: 8px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(0,0,0,.125);
        }

        :global(.detail-box-content:not(:last-of-type)) {
          border-bottom: 1px dashed rgba(0,0,0,.125);
        }
        :global(.detail-box-content) {
          padding-top: 10px;
          padding-bottom: 10px;
        }
        :global(.detail-item){
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          line-height: 18px;
        }
        :global(.detail-item-name){
          color: rgba(0,0,0,.54);
        }
        :global(.detail-item:not(:first-of-type)){
          margin-top: 8px;
        }
        :global(.detail-item-left){
          max-width: 65%;
        }
        :global(.detail-item .detail-item-price){
          color: rgba(0,0,0,.6);
          font-size: 12px;
          font-weight: 700;
          max-width: 35%;
        }

        :global(.detail-item .detail-item-info){
          color: rgba(0,0,0,.38);
          max-width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        :global(.detail__tagihan-amount){
          display: flex;
          justify-content: flex-start;
          color: #d63031;
          font-weight: 800;
        }

        .border-delivery {
          height: .1875rem;
          width: 100%;
          background-position-x: -1.875rem;
          background-size: 7.25rem .1875rem;
          background-image: repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px);
      }

        @media only screen and (min-width: 432px){
          :global(.order-tabs > .ant-tabs-nav){
            width: 100% !important;
          }
          :global(.ant-tabs.order-tabs > .ant-tabs-nav .ant-tabs-nav-list, 
                  .ant-tabs.order-tabs > div > .ant-tabs-nav .ant-tabs-nav-list){ 
            width: 100%;
          }
          :global(.order-tabs .ant-tabs-tab){
            margin : 0;
            flex: 1 !important;
            display: block !important;
            text-align: center !important;
          }
        }
      `}
      </style>
    </>
  )
}

export default Orders
