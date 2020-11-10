import { useState } from 'react'
import { Tabs, Table, Select, Input } from 'antd'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import ModalDetailReview from 'components/Modal/Admin/DetailReview'

import AddStyleAdmin from 'components/Admin/addStyle'
import { columnsReview, dataSourceReview, dataSourceReviewNorespond, dataSourceReviewResponded } from 'data/reviewAdmin'
import { formContentReview } from 'formdata/formReviewAdmin'

const ALL = 'all'
const NORESPOND = 'norespond'
const RESPONDED = 'responded'
const sortList = ['Terbaru', 'Terlama', 'Rating Tertinggi', 'Ratting Terendah']

const tableProps = {
  pagination: false,
  size: "middle",
  scroll: { x: '100vh', y: 'calc(100vh - 270px)'},
  className: "mt-3",
  rowClassName: "va-top hover-pointer",
}

const ReviewAdmin = () => {
  const [showDetailReview, setShowDetailReview] = useState(false)
  const [contentReview, setContentReview] = useState(formContentReview)

  const onClickReviewRow = (record) => {
    setContentReview(record)
    setShowDetailReview(true)
  }

  const onCloseModalDetailReview = () => {
    setShowDetailReview(false)
  }

  const searchComponent = (
    <Form>
      <Form.Row>
        <Form.Group as={Col} lg={8} md={6} className="mb-0">
          <Input 
            className="order-search h-100"
            placeholder="Cari nama produk" 
            prefix={<i className="far fa-search" />}
          />
        </Form.Group>
        <Form.Group as={Col} lg={4} md={6} className="mb-0">
          <Select 
            placeholder="Urutkan" 
            style={{ width: "100%"}}
            className="order-search"
            defaultValue={sortList[0]}
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
              <Table 
                {...tableProps}
                dataSource={dataSourceReview} 
                columns={columnsReview} 
                onRow={(record) => {
                  return {
                    onClick: () => onClickReviewRow(record)
                  }
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Perlu Dibalas" key={NORESPOND}>
              {searchComponent}
              <Table 
                {...tableProps}
                dataSource={dataSourceReviewNorespond} 
                columns={columnsReview} 
                onRow={(record) => {
                  return {
                    onClick: () => onClickReviewRow(record)
                  }
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sudah Dibalas" key={RESPONDED}>
              {searchComponent}
              <Table 
                {...tableProps}
                dataSource={dataSourceReviewResponded} 
                columns={columnsReview} 
                onRow={(record) => {
                  return {
                    onClick: () => onClickReviewRow(record)
                  }
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>
      </Card>

      <ModalDetailReview 
        show={showDetailReview}
        close={onCloseModalDetailReview}
        submit={onCloseModalDetailReview}
        data={contentReview}
      />

      <style jsx>{AddStyleAdmin}</style>
    </>
  )
}

ReviewAdmin.whyDidYouRender = true;

export default ReviewAdmin
