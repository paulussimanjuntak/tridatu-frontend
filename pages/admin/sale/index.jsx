import { useState } from 'react'
import { Tabs, Table, Button, Avatar } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'

import { dataSource, columns } from 'data/salesAdmin'

const ALL = 'all'
const WAITING = 'waiting'
const SENT = 'sent'
const DONE = 'done'
const CANCELED = 'canceled'

const Sales = () => {

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <Tabs className="order-tabs">
            <Tabs.TabPane tab="Semua" key={ALL}>

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
    </>
  )
}

export default Sales
