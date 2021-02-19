import { Row, Col, Input, Select } from 'antd'

import ColB from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from "react-bootstrap/Card";
import Container from 'react-bootstrap/Container'

import CardVoucherOnly from "components/Card/Admin/Voucher/VoucherOnly";
import CardVoucherOnly1 from "components/Card/Admin/Voucher/VoucherOnly1";
import CardPromo from "components/Card/Admin/Voucher/Card";
import CardPromo1 from "components/Card/Admin/Voucher/Card1";
import CardPromo2 from "components/Card/Admin/Voucher/Card2";
import CardPromo3 from "components/Card/Admin/Voucher/Card3";
import EmptyPromo from "components/Card/Empty/Promo";

import { promos } from "data/promoData";

const CardPromoMemo = React.memo(CardPromo);

const orderList = [
  { name: "Semua", value: "all" },
  { name: "Tanpa Kode Promo", value: "without_promo", },
  { name: "Dengan Kode Promo", value: "with_promo", },
  { name: "Promo Tidak Ditampilkan", value: "nolive_promo", }
]

const Promo = () => {
  return(
    <>
      <Card className="border-0 shadow-none card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Kelola Promo</h5>
        </Card.Body>
        <Card.Body className="p-3">
          <Form>
            <Form.Row>
              <Form.Group as={ColB} lg={8} md={6}>
                <Input 
                  className="h-35"
                  placeholder="Cari berdasarkan nama" 
                  prefix={<i className="far fa-search" />}
                  // value={search}
                  // onChange={onSearchChange}
                />
              </Form.Group>
              <Form.Group as={ColB} lg={4} md={6}>
                <Select 
                  placeholder="Urutkan" 
                  style={{ width: "100%"}}
                  className="product-search-select"
                  defaultValue="all"
                  // value={order_by}
                  // onChange={onOrderChange}
                >
                  {orderList.map((list, i) => (
                    <Select.Option key={i} value={list.value}>{list.name}</Select.Option>
                  ))}
                </Select>
              </Form.Group>
            </Form.Row>
          </Form>

          <Row gutter={[16, 16]} className="make-columns">
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <CardPromoMemo image='/static/images/promo/2.jpeg' />
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <CardPromo1 image='/static/images/promo/used.jpg' />
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <CardPromo2 image='https://ecs7.tokopedia.net/img/blog/promo/2020/01/Thumbnail_600x3282.jpg' />
            </Col>
            <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <CardPromo3 image='/static/images/promo/no-image.jpg' />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default Promo
