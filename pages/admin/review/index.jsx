import { useState } from 'react'
import { Tabs, Table, Button } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import AddStyleAdmin from 'components/Admin/addStyle'

const ALL = 'all'
const NORESPOND = 'norespond'

const ReviewAdmin = () => {
  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <Tabs className="order-tabs">
            <Tabs.TabPane tab="Semua" key={ALL}>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Perlu Direspon" key={NORESPOND}>
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>
      </Card>

      <style jsx>{AddStyleAdmin}</style>
    </>
  )
}

export default ReviewAdmin
