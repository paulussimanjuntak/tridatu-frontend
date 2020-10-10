import { Input, Select } from 'antd'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import CardProduct from "components/Card/Product";
import Pagination from "components/Pagination";

const CardProductMemo = React.memo(CardProduct);

const sortList = ['Terbaru', 'Terlama']

const Favorite = () => {

  const searchComponent = (
    <Form>
      <Form.Row>
        <Form.Group as={Col} lg={8} md={6}>
          <Input 
            className="account-search h-100"
            placeholder="Cari produk favoritmu" 
            prefix={<i className="far fa-search" />}
          />
        </Form.Group>
        <Form.Group as={Col} lg={4} md={6}>
          <Select 
            placeholder="Urutkan" 
            style={{ width: "100%"}}
            className="account-search"
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
      <Card className="card-container">
        <Card.Header className="bg-transparent border-bottom">
          <h1 className="fs-16 mt-1 mb-0">Favorit</h1>
          <small>
            Kelola item favorit Anda dari sini
          </small>
        </Card.Header>
        <Card.Body>
          {searchComponent}
          <Row className="row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 custom-gutters lg-screen">
            {[...Array(10)].map((_, i) => (
              <Col key={i}>
                <CardProductMemo />
              </Col>
            ))}
          </Row>
          <Row className="mt-4 mt-md-2">
            <Col className="align-self-center text-center">
              <Pagination />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default Favorite
