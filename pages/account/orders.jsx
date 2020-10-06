import { Tabs, Input, Select, Popconfirm, Button } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

const WAITING = 'waiting'
const PACKED = 'packed'
const SENT = 'sent'
const DONE = 'done'
const CANCELED = 'canceled'

const sortList = ['Paling Sesuai', 'Harga Tertinggi', 'Harga Terendah']

const Orders = () => {
  const searchComponent = (
    <Row className="mb-3">
      <Col className="align-self-center" lg={8}>
        <Form>
          <Form.Group as={Col} className="px-0">
            <Input 
              className="order-search"
              placeholder="Cari berdasarkan nama" 
              prefix={<i className="far fa-search" />}
            />
          </Form.Group>
        </Form>
      </Col>
      <Col lg={4}>
        <Form inline>
          <Form.Group as={Col} className="flex-row flex-flow-nowrap px-0">
            <Form.Label className="mr-1">
              Urutkan:
            </Form.Label>
            <Select defaultValue={sortList[0]} style={{ width: "100%"}} className="order-search">
              {sortList.map(x => (
                <Select.Option key={x} value={x}>{x}</Select.Option>
              ))}
            </Select>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )

  return(
    <>
      <Card>
        <Card.Body className="bg-transparent">
          <Tabs defaultActiveKey="1" className="noselect order-tabs">
            <Tabs.TabPane tab="Belum Bayar" key={WAITING}>
              {searchComponent}
              <Form>
                <Form.Row>
                  <Form.Group as={Col} lg={8}>
                    <Input 
                      className="order-search"
                      placeholder="Cari berdasarkan nama" 
                      prefix={<i className="far fa-search" />}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Select 
                      placeholder="Urutkan" 
                      defaultValue={sortList[0]} 
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
                    <Col lg={8}>
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
                          <div className="payment-information-left">Metode Pembayaran</div>
                          <div className="payment-information-left">Nomor Virtual Account</div>
                        </div>
                        <div className="payment-card-column">
                          <div className="payment-information-center">:</div>
                          <div className="payment-information-center">:</div>
                        </div>
                        <div className="payment-card-column text-truncate">
                          <div className="payment-information-right text-truncate">Mandiri Virtual Account</div>
                          <div className="payment-information-right">8870885156565673</div>
                        </div>
                      </div>
                    </Col>

                    <Col className="text-center">
                      <img 
                        className="payment-method-logo" 
                        src="https://ecs7.tokopedia.net/img/toppay/payment-logo/icon-mandiri.png"
                      />
                      <Button block className="btn-howtopay">Cara Pembayaran</Button>
                      <Button block className="btn-howtopay btn-tridatu">Lihat Rincian</Button>
                    </Col>
                  </Row>

                </Card.Body>
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
          color: #ff5722;
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
