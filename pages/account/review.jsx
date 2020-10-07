import { Tabs, Input, Select, Rate } from 'antd'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const WAITING = 'waiting'
const DONE = 'done'

const sortList = ['Semua Waktu', '7 Hari Terakhir', 'Bulan Ini', '3 Bulan Lalu']

const Review = () => {

  const searchComponent = (
    <Form>
      <Form.Row>
        <Form.Group as={Col} lg={8} md={6}>
          <Input 
            className="account-search h-100"
            placeholder="Cari berdasarkan invoice / produk" 
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
      <Card>
        <Card.Body className="bg-transparent">
          <Tabs>
            <Tabs.TabPane tab="Menunggu Diulas" key={WAITING}>
              {searchComponent}
              <Card className="order-list">
                <Card.Header>
                  <Row className="justify-content-between text-dark">
                    <Col sm={12} md={6}>
                      <span>INV/20191002/XIX/X/375442105</span>
                    </Col>
                    <Col sm={12} md={6}>
                      <span className="float-md-right text-secondary">Pesanan diterima: 09 Okt 2019, 00:51</span>
                    </Col>
                  </Row>
                </Card.Header>
      
                <Card.Body>
                  <div className="media">
                    <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" className="align-self-start mr-3 cart-item-img" alt="Tridatu Bali ID" />
                    <div className="media-body">
                      <h5 className="mt-0 fs-12-s fs-16 truncate-2">
                        Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih
                      </h5>
                      <p className="text-secondary mb-1">Bagaimana kualitas produk ini secara keseluruhan?</p>
                      <Rate />
                    </div>
                  </div>

                </Card.Body>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Ulasan Saya" key={DONE}>
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>

      </Card>

      <style jsx>{`
        :global(.ant-input-affix-wrapper.account-search, 
                .account-search.ant-select-focused.ant-select-single .ant-select-selector,
                .account-search.ant-select:not(.ant-select-disabled):hover .ant-select-selector){
          box-shadow: none !important;
        }

        .cart-item-img{
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: .2rem;
        }
      `}</style>
    </>
  )
}

export default Review
