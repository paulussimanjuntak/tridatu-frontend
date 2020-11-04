import { useState } from 'react'
import { Popconfirm, Button, Modal, Timeline } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

import OrderDetail from './OrderDetail'

import { history } from 'data/productTracking'

const OrderList = ({ status, message, kurir, noResi }) => {
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  const orderDetailHandler = () => setShowOrderDetail(!showOrderDetail)
  const showStatusHandler = () => setShowStatus(true)
  const closeStatusHandler = () => setShowStatus(false)

  const WAITING = status.toLowerCase() == "belum bayar"
  const PACKED = status.toLowerCase() == "dikemas"
  const SENT = status.toLowerCase() == "dikirim"
  const DONE = status.toLowerCase() == "selesai"
  const CANCELED = status.toLowerCase() == "dibatalkan"

  let badgeStatus = ""
  if(WAITING) badgeStatus = "warning"
  if(PACKED) badgeStatus = "info"
  if(SENT) badgeStatus = "primary"
  if(DONE) badgeStatus = "success"
  if(CANCELED) badgeStatus = "danger"

  let howtopayBtn = <Button block className="btn-howtopay">Cara Pembayaran</Button>
  if( !WAITING ) howtopayBtn = <Button block className="btn-howtopay" onClick={showStatusHandler}>Status Pesanan</Button>

  return(
    <>
      <Card className="order-list">
        <Card.Header>
          <i className="far fa-shopping-bag fa-lg" />
          <strong className="mx-2">Belanja</strong>
          <span className={`badge badge-${badgeStatus} fw-500`}>{status}</span>
          {WAITING && (
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
          )}
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
                  <i className="far fa-lightbulb-on mr-2" /> {message}
                </Alert>
              </div>
              <div className="payment-card-row text-truncate">
                <div className="payment-card-column">
                  {(DONE || PACKED || SENT) && <div className="payment-information-left">Nomor Invoice</div>}
                  <div className="payment-information-left">Metode Pembayaran</div>
                  <div className="payment-information-left">Nomor Virtual Account</div>
                </div>
                <div className="payment-card-column">
                  {(DONE || PACKED || SENT) && <div className="payment-information-center">:</div>}
                  <div className="payment-information-center">:</div>
                  <div className="payment-information-center">:</div>
                </div>
                <div className="payment-card-column text-truncate">
                  {(DONE || PACKED || SENT) && <div className="payment-information-right text-truncate">INV/20191002/XIX/X/375442105</div>}
                  <div className="payment-information-right text-truncate">Mandiri Virtual Account</div>
                  <div className="payment-information-right">8870885156565673</div>
                </div>
              </div>
            </Col>
            
            {/*MOBILE INFORMATION*/}
            <Col className="d-block d-md-none">
              <Alert variant="warning" className="w-100 alert-payment payment-mobile">
                <i className="far fa-lightbulb-on mr-2" /> {message}
              </Alert>
              <div className="payment-information-mobile">
                <p className="title-payment-information-mobile">Total</p>
                <p className="total-amount-mobile">Rp 1.284.200</p>
              </div>
              <div className="payment-information-mobile">
                <p className="title-payment-information-mobile">Tanggal Pembelian</p>
                <p className="data-payment-information-mobile">6 Oct 2020</p>
              </div>
              {(DONE || PACKED || SENT) && (
                <div className="payment-information-mobile">
                  <p className="title-payment-information-mobile">Nomor Invoice</p>
                  <p className="data-payment-information-mobile">INV/20191002/XIX/X/375442105</p>
                </div>
              )}
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

            <Col lg={4} md={4} sm={12} className="text-center align-self-center">
              <img 
                className="payment-method-logo" 
                src="https://ecs7.tokopedia.net/img/toppay/payment-logo/icon-mandiri.png"
              />
              {howtopayBtn}
              <Button block 
                className="btn-howtopay btn-tridatu" 
                onClick={orderDetailHandler}
              >
                  {showOrderDetail ? "Tutup" : "Lihat"} Rincian
              </Button>
            </Col>
          </Row>

        </Card.Body>

        <AnimatePresence>
          {showOrderDetail && (
            <motion.div
              transition={{ duration: ".5" }}
              initial={{ opacity: 0, height: "0" }}
              animate={{ opacity: 1, height: "100%" }}
              exit={{ height: "0", opacity: 0 }}
            >
              <OrderDetail
                notWaiting={!WAITING}
                notCanceled={!CANCELED}
                kurir={kurir}
                noResi={noResi}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Modal
        centered
        visible={showStatus}
        title={
          <div className="text-center">
            <span className="ant-modal-title">Status Pesanan</span>
          </div>
        }
        className="modal-rad-10"
        onOk={closeStatusHandler}
        onCancel={closeStatusHandler}
        closeIcon={<i className="fas fa-times" />}
        footer={false}
        bodyStyle={{paddingBottom: '0', maxHeight: '70vh', overflowY: 'auto' }}
      >
        <Timeline reverse={true}>
          {history.map((data, i)=> (
            <Timeline.Item dot={history.length === i+1 && <i className="fas fa-dot-circle text-tridatu-light" />} color="grey" key={i}>
              <div className="text-content">
                <p className="fw-500 mb-0">{data.desc}</p>
                <small>{data.date}</small>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Modal>

      <style jsx>{`
        :global(.order-list:not(:last-of-type)){
          margin-bottom: 10px; 
        }

        .payment-card-row:not(:last-of-type){
          padding-bottom: 10px;
        }
        .payment-card-row{
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .payment-card-column{
          display: flex;
          flex-direction: column;
        }
        .payment-card-total-text{
          color: rgba(0,0,0,.54);
          text-align: left;
          margin-right: 8px;
        }
        .payment-card-total-amount{
          color: #d63031;
          font-weight: 700;
          margin-right: 8px;
        }
        .payment-card-transaction-date{
          font-weight: 700;
          color: rgba(0,0,0,.80);
          text-align: left;
          margin-right: 8px;
        }

        .payment-information-left{
          color: rgba(0,0,0,.54);
          text-align: left;
        }
        .payment-information-center{
          color: rgba(0,0,0,.54);
          padding: 0 8px;
        }
        .payment-information-right{
          font-weight: 700;
          color: rgba(0,0,0,.54);
          text-align: left;
        }

        .payment-information-mobile > .title-payment-information-mobile{
          margin-bottom: 0px;
          color: rgba(0,0,0,.54);
          font-size: 12px;
        }
        .payment-information-mobile > .total-amount-mobile{
          color: #d63031;
          font-weight: 700;
        }
        .payment-information-mobile > .data-payment-information-mobile{
          color: rgba(0,0,0,.7);
        }

        .payment-method-logo{
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
        :global(.alert-payment.payment-mobile){
          color: #856404;
          background-color: #fffbec;
          margin-bottom: 8px;
        }

        .text-content{
          color: #000000b3;
          margin-bottom: 0;
        }

      `}</style>
    </>
  )
}

export default OrderList
