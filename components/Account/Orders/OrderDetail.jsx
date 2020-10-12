import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

import CartItemCheckout from 'components/Cart/CartItemCheckout'

const OrderDetail = ({ notWaiting, notCanceled, kurir, noResi }) => {
  return(
    <>
      <Card.Footer className="bg-white border-top-5">
        <Row className="align-items-center">
          <Col className="fs-12 col-12">
            <p className="font-weight-bold mb-0">Jhony Bakerey Suardhana</p>
            <p className="text-secondary mb-0">(+62) 8123451234</p>
            <p className="text-secondary mb-0">Jalan Pulau Suarhana Blok Santhy No 2, KOTA BADUNG, KUTA SELATAN, BALI, ID, 80622</p>
          </Col>
        </Row>
        {notWaiting && notCanceled && (
          <>
            <div className="border-delivery m-t-8 m-b-8" />
            <Row className="align-items-center">
              <Col>
                <p className="mb-0 title-no-order">
                  No Invoice: 
                  <br className="d-block d-md-none" /> 
                  <span className="data-no-order fs-14-s">{' '}INV/20191002/XIX/X/375442105</span>
                  <a className="float-right text-tridatu">
                    Invoice
                  </a>
                </p>
                {kurir && (
                  <p className="mb-0 data-no-order fs-12 fs-14-s fw-500">
                    {kurir}
                  </p>
                )}
                {noResi && (
                  <p className="mb-0 title-no-order">
                    No Resi: 
                    <br className="d-block d-md-none" /> 
                    <span className="data-no-order fs-14-s">{' '}{noResi}</span>
                  </p>
                )}
              </Col>
            </Row>
          </>
        )}
      </Card.Footer>

      <Card.Footer className="bg-white border-top-5">
        <Row className="order-items">
          {[...Array(3)].map((_, i) => (
            <CartItemCheckout key={i} />
          ))}
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
      
      <style jsx>{`
        .border-delivery{
          height: .1875rem;
          width: 100%;
          background-position-x: -1.875rem;
          background-size: 7.25rem .1875rem;
          background-image: repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px);
        }
        .title-no-order{
          margin-bottom: 0px;
          color: rgba(0,0,0,.54);
          font-size: 12px;
        }
        .data-no-order{
          color: rgba(0,0,0,.7);
        }
        :global(.order-items > .cart-item-body:not(:last-of-type)){
          padding-bottom: 8px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(0,0,0,.125);
        }

        .detail-box-content:not(:last-of-type){
          border-bottom: 1px dashed rgba(0,0,0,.125);
        }
        .detail-box-content{
          padding-top: 10px;
          padding-bottom: 10px;
        }

        .detail-item{
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          line-height: 18px;
        }
        .detail-item-name{
          color: rgba(0,0,0,.54);
        }
        .detail-item:not(:first-of-type){
          margin-top: 8px;
        }
        .detail-item-left{
          max-width: 65%;
        }
        .detail-item .detail-item-price{
          color: rgba(0,0,0,.6);
          font-size: 12px;
          font-weight: 700;
          max-width: 35%;
        }

        .detail-item .detail-item-info{
          color: rgba(0,0,0,.38);
          max-width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .detail__tagihan-amount{
          display: flex;
          justify-content: flex-start;
          color: #d63031;
          font-weight: 800;
        }
      `}</style>
    </>
  )
}

export default OrderDetail
