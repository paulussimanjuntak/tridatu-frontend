import { Radio } from 'antd';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const PromoCard = ({ code, image }) => {
  return(
    <>
      <Radio.Button value={code}>
        <Row>
          <Col className="pr-0">
            <Card.Img 
              className="promo-list-img"
              src={image}
            />
          </Col>
          <Col className="pl-0 truncate-2">
            <Card.Body className="p-2">
              <p className="mb-1 truncate-2 fs-16 noselect fs-14-s">
                <b>Belanja Gadget dan Electronic Ter-update Belanja Gadget dan Electronic Ter-update</b>
              </p>
              <p className="text-truncate mb-1 text-secondary fs-14-s">10 Sep - 29 Okt 2020</p>
              <p className="mb-0 text-truncate text-tridatu fs-14-s">{code}</p>
            </Card.Body>
          </Col>
        </Row>
      </Radio.Button>
    </>
  )
}

export default PromoCard
