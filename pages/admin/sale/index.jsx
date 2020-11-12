import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Tabs, Table, Input, Select } from 'antd'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import { columns, dataSource, dataSourceWaiting, dataSourceToship, } from 'data/salesAdmin'

import AddStyleAdmin from 'components/Admin/addStyle'

const ALL = 'all'
const UNPAID = 'unpaid'
const SENT = 'toship'
const SENDING = 'shipping'
const DONE = 'done'
const CANCELED = 'canceled'

const sortList = ['Paling Sesuai']

const Sales = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(ALL)

  const onTabClick = key => {
    setActiveTab(key)
    router.replace(`?type=${key}`)
  }

  useEffect(() => {
    for(let key in router.query){
      if(key === "type") setActiveTab(router.query[key])
    }
  }, [router.query])
  
  const searchComponent = (
    <Form>
      <Form.Row>
        <Form.Group as={Col} lg={8} md={6}>
          <Input 
            className="order-search h-100"
            placeholder="Cari pesanan" 
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
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <Tabs className="order-tabs noselect" activeKey={activeTab} onTabClick={onTabClick}>
            <Tabs.TabPane tab="Semua" key={ALL}>
              {searchComponent}
              <Table dataSource={dataSource} columns={columns} size="middle" scroll={{ x: '100vh', y: 300 }} rowClassName="va-top mb-3" />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Belum Bayar" key={UNPAID}>
              {searchComponent}
              <Table dataSource={dataSourceWaiting} columns={columns} size="middle" scroll={{ x: '100vh', y: 300 }} rowClassName="va-top mb-3" />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Perlu Dikirim" key={SENT}>
              {searchComponent}
              <Table dataSource={dataSourceToship} columns={columns} size="middle" scroll={{ x: '100vh', y: 300 }} rowClassName="va-top mb-3" />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Dikirim" key={SENDING}>
              <h1>Dikirim</h1>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Selesai" key={DONE}>
              <h1>Selesai</h1>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Pembatalan" key={CANCELED}>
              <h1>Pembatalan</h1>
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>
      </Card>

      <style jsx>{AddStyleAdmin}</style>
    </>
  )
}

Sales.whyDidYouRender = true;

export default withAuth(Sales)
