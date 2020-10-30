import { Row, Col } from 'antd'
import Image from 'next/image'
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
              <Col xl={4} lg={6} md={8} sm={8} xs={12} key={i} >
                <Card className="text-center">
                  <Card.Body className="card-body-brand">
                    <Image 
                      width={270}
                      height={270}
                      src={brand.image}
                      alt="Tridatu Bali Id"
                      className="img-fit"
                    />
                    <Card.Title className="mt-4 mb-0 fs-16-s">{brand.name}</Card.Title>
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
        :global(.card-body-brand > div){
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </>
  )
}

export default Brand
