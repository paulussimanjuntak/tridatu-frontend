import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import CardProduct from "components/Card/Product"

const Home = () => {
  return (
    <>
      <Container>
        <section>
          <h4>Paling Banyak Dilihat</h4>

          <Row className="row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {[...Array(9)].map((_, i) => (
              <Col key={i}>
                <CardProduct />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </>
  )
}

export default Home;
