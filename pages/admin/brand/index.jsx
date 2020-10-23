import { Row, Col } from 'antd'
import Card from 'react-bootstrap/Card'

import { brandData } from 'data/brand'

const Brand = () => {
  return(
    <>
      <Card className="border-0 shadow-none card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Kelola Brand</h5>
        </Card.Body>
        <Card.Body className="p-3">
          <Row gutter={[16, 16]}>
            {brandData.map((brand, i) => (
              <Col key={i} >
                <Card className="w-100">
                  <img
                    className="d-block img-fit"
                    src={brand.image}
                    width="100"
                    height="100"
                    alt="Tridatu Bali ID"
                  />
                  <Card.Body>
                    <Card.Title>{brand.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      <style jsx>{`
        :global(.card-img-brand){
          height: 200px;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}

export default Brand
