import { Tabs, Input, Select } from 'antd'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import OrderList from 'components/Account/Orders/OrderList'

const WAITING = 'waiting'
const PACKED = 'packed'
const SENT = 'sent'
const DONE = 'done'
const CANCELED = 'canceled'

const sortList = ['Paling Sesuai', 'Harga Tertinggi', 'Harga Terendah']

const Orders = () => {

  const searchComponent = (
    <Form>
      <Form.Row>
        <Form.Group as={Col} lg={8} md={6}>
          <Input 
            className="order-search h-100"
            placeholder="Cari berdasarkan nama" 
            prefix={<i className="far fa-search" />}
          />
        </Form.Group>
        <Form.Group as={Col} lg={4} md={6}>
          <Select 
            placeholder="Urutkan" 
            style={{ width: "100%"}}
            className="order-search"
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
          <Tabs defaultActiveKey="1" className="order-tabs">
            <Tabs.TabPane tab="Belum Bayar" key={WAITING}>
              {searchComponent}
              {[...Array(3)].map((_, i) => (
                <OrderList key={i}
                  status="Belum Bayar"
                  payBefore="Bayar sebelum 7 Oct 2020, 15:56 WIB"
                />
              ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dikemas" key={PACKED}>
              {searchComponent}
              Dikemas
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dikirim" key={SENT}>
              {searchComponent}
              Dikirim
            </Tabs.TabPane>
            <Tabs.TabPane tab="Selesai" key={DONE}>
              {searchComponent}
              {[...Array(3)].map((_, i) => (
                <OrderList key={i}
                  status="Selesai"
                  payBefore="[DENPASAR] Paket telah diterima"
                />
              ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dibatalkan" key={CANCELED}>
              {searchComponent}
              {[...Array(3)].map((_, i) => (
                <OrderList key={i}
                  status="Dibatalkan"
                  payBefore="Pesanan ini telah dibatalkan"
                />
              ))}
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>

      </Card>
      
      <style jsx>{`
        :global(.ant-input-affix-wrapper.order-search, 
                .order-search.ant-select-focused.ant-select-single .ant-select-selector,
                .order-search.ant-select:not(.ant-select-disabled):hover .ant-select-selector){
          box-shadow: none !important;
        }

        @media only screen and (min-width: 432px){
          :global(.order-tabs > .ant-tabs-nav){
            width: 100% !important;
          }
          :global(.ant-tabs.order-tabs > .ant-tabs-nav .ant-tabs-nav-list, 
                  .ant-tabs.order-tabs > div > .ant-tabs-nav .ant-tabs-nav-list){ 
            width: 100%;
          }
          :global(.order-tabs .ant-tabs-tab){
            margin : 0;
            flex: 1 !important;
            display: block !important;
            text-align: center !important;
          }
        }
      `}
      </style>
    </>
  )
}

export default Orders
