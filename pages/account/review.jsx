import { Tabs, Input, Select, Rate } from 'antd'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import ReviewWaiting from 'components/Account/Review/ReviewWaiting'
import ReviewDone from 'components/Account/Review/ReviewDone'

const WAITING = 'waiting'
const DONE = 'done'

const desc = ['Sangat Buruk', 'Buruk', 'Cukup', 'Baik', 'Sangat Baik'];
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
      <Card className="card-container">
        <Card.Body className="bg-transparent">
          <Tabs>
            <Tabs.TabPane tab="Menunggu Diulas" key={WAITING}>
              {searchComponent}
              {[...Array(3)].map((_, i) => (
                <ReviewWaiting key={i} />
              ))}
            </Tabs.TabPane>

            <Tabs.TabPane tab="Ulasan Saya" key={DONE}>
              {searchComponent}
              {[...Array(3)].map((_, i) => (
                <ReviewDone key={i} />
              ))}
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

        :global(.review-list:not(:last-of-type)){
          margin-bottom: 10px; 
        }

        :global(.cart-item-img){
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: .2rem;
        }

        :global(.response-seller){
          background-color: rgb(243, 244, 245);
          border: 0;
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

export default Review
