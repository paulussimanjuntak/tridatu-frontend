import { useState } from 'react'
import { Tabs, Table, Button } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const ALL = 'all'
const LIVE = 'live'
const OUTOFSTOCK = 'outofstock'

import { productsColumns, productsData } from 'data/productsAdmin'


const Products = () => {
  const [selectedItem, setSelectedItem] = useState([])

  const rowSelection = {
    onChange: selectedRowKeys => {
      setSelectedItem(selectedRowKeys)
    },
  };

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <Tabs className="order-tabs">
            <Tabs.TabPane tab="Semua" key={ALL}>
              <Table 
                className="custom-table border"
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                  columnWidth: '25px',
                }}
                scroll={{ x: '100vh'}}
                rowClassName="va-sub" 
                columns={productsColumns} 
                dataSource={productsData} 
                pagination={false}
              />

              {selectedItem.length > 0 && (
                <Card className="border-0 mt-4 mb-2">
                  <Row className="align-items-center">
                    <Col className="align-self-center">
                      <h6 className="mb-0">
                        {selectedItem.length} produk dipilih
                      </h6>
                    </Col>
                    <Col>
                      <Button className="fw-500 float-right">Hapus</Button>
                    </Col>
                  </Row>
                </Card>
              )}
            </Tabs.TabPane>

            <Tabs.TabPane tab="Live" key={LIVE}>
              <p>live</p>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Habis" key={OUTOFSTOCK}>
              <p>Produk Habis</p>
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>
      </Card>
    </>
  )
}

export default Products
