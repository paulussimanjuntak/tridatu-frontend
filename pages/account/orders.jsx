import { useState } from 'react'
import { Tabs, Input, AutoComplete } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const WAITING = 'waiting'
const PACKED = 'packed'
const SENT = 'sent'
const DONE = 'done'
const CANCELED = 'canceled'

const Orders = () => {

  return(
    <>
      <Card>
        <Card.Header className="bg-transparent">
          <Tabs defaultActiveKey="1" className="noselect order-tabs">
            <Tabs.TabPane tab="Belum Bayar" key={WAITING}>
              <Form>
                <Form.Row>
                  <Form.Group as={Col}>
                    <div className="w-100 nav-search order-search">
                      <Input.Search placeholder="Cari berdasarkan nama" />
                    </div>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Input placeholder="Basic usage" />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                </Form.Row>

              </Form>
              Belum bayar
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dikemas" key={PACKED}>
              Dikemas
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dikirim" key={SENT}>
              Dikirim
            </Tabs.TabPane>
            <Tabs.TabPane tab="Selesai" key={DONE}>
              Selesai
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dibatalkan" key={CANCELED}>
              Dibatalkan
            </Tabs.TabPane>
          </Tabs>
        </Card.Header>
      </Card>
      <style jsx>{`
        :global(.nav-search.order-search > .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused){
          border-color: none !important;
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
