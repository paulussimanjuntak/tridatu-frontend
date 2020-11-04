import { Tabs, Table, Input, Select } from 'antd'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import { dataSource, columns } from 'data/salesAdmin'

import AddStyleAdmin from 'components/Admin/addStyle'

const ALL = 'all'
const WAITING = 'waiting'
const SENT = 'sent'
const DONE = 'done'
const CANCELED = 'canceled'

const sortList = ['Paling Sesuai']

const Sales = () => {
  
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
          <Tabs className="order-tabs">
            <Tabs.TabPane tab="Semua" key={ALL}>
              {searchComponent}
              <Table dataSource={dataSource} columns={columns} size="middle" scroll={{ x: '100vh', y: 300 }} rowClassName="va-top mb-3" />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Belum Bayar" key={WAITING}>
              <h1>Belum Bayar</h1>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Perlu Dikirim" key={SENT}>
              <h1>Perlu Dikirim</h1>
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

export default Sales
