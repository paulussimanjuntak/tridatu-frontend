import { Row, Col } from 'antd'
import Container from 'react-bootstrap/Container'
import Card from "react-bootstrap/Card";

import CardPromo from "components/Card/Promo";
import EmptyPromo from "components/Card/Empty/Promo";

import { promos } from "data/promoData";

const CardPromoMemo = React.memo(CardPromo);

const Promo = () => {
  return(
    <>
      <Card className="border-0 shadow-none card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Kelola Voucher</h5>
        </Card.Body>
        <Card.Body className="p-3">
          <Row gutter={[16, 16]}>
            {promos.reverse().map((data, i) => (
              <Col xl={6} lg={8} md={12} sm={12} xs={24} key={i} >
                <CardPromoMemo image={data} />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default Promo
