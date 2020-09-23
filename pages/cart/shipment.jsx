import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import CartItem from 'components/Cart/CartItem'

const Shipment = () => {
  return(
    <>
      <Container className="pt-4 pb-2">
        <h4 className="fs-20-s mb-4">Checkout</h4>
        <Row>
          <Col lg={8}>
            <p className="fw-500 fs-18">Alamat penerima</p>
            <Card className="address-card">
              <p className="user-address-title mb-0 fw-500">
                Andi salamen <span className="font-weight-light">(Rumah)</span>
              </p>
              <p className="font-weight-light user-phone mb-0">628515678910</p>
              <p className="text-secondary mb-0">
                Jl. Kenari Raya, Kec. Kuta Sel., Kabupaten Badung, Bali, 80361 [Tokopedia Note: JALAN TAMAN GIRIYA PERUMAHAN BINA SATYA PERMAI GANG MAWAR-Y NOMOR 41]
Kuta Selatan, Kab. Badung, 80361
              </p>
            </Card>
            
            <div className="cart-item">
              <Row className="mx-0">
                {[...Array(8)].map((_, i) => (
                  <CartItem key={i} />
                ))}
              </Row>
            </div>


          </Col>
        </Row>
      </Container>

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

export default Shipment
