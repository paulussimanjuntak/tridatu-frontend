import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Row, Col, Input, Select, Empty } from 'antd'
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ColB from 'react-bootstrap/Col'

import * as actions from "store/actions";
import Pagination from "components/Pagination";
import CardProductAdmin from "components/Card/Admin/Product/Card"

const CardProductMemo = React.memo(CardProductAdmin);

const ALL = 'all'
const LIVE = 'live'
const ARCHIVE = 'archive'

const orderList = [
  { name: "Terbaru", value: "newest" },
  { name: "Harga Tertinggi", value: "high_price", },
  { name: "Harga Terendah", value: "low_price", }
]

import { productsColumns, productsData } from 'data/productsAdmin'

const EmptyProduct = ({ loading, products }) => (
  <AnimatePresence>
    {!loading && (products == null || products && products.total == 0) && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: ".2" }}
        className="w-100"
      >
        <Empty className="my-5" description={<span className="text-secondary">Tidak ada produk</span>} />
      </motion.div>
    )}
  </AnimatePresence>
)

const ProductComponent = ({ products, dispatch }) => (
  <AnimatePresence>
    {products && products.data && products.data.length > 0 && products.data.map(product => (
      <Col xl={4} lg={6} md={6} sm={8} xs={12} key={product.products_id}>
        <CardProductMemo 
          data={product} 
          aliveArchive={(id) => dispatch(actions.aliveArchiveProduct(id))}
        />
      </Col>
    ))}
  </AnimatePresence>
)

const SearchComponent = ({ search, setSearch, orderBy, setOrderBy }) => (
  <Form>
    <Form.Row>
      <Form.Group as={ColB} lg={8} md={6}>
        <Input 
          placeholder="Cari berdasarkan nama" 
          prefix={<i className="far fa-search" />}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Form.Group>
      <Form.Group as={ColB} lg={4} md={6}>
        <Select 
          placeholder="Urutkan" 
          style={{ width: "100%"}}
          className="product-search-select"
          value={orderBy}
          onChange={e => setOrderBy(e)}
        >
          {orderList.map((list, i) => (
            <Select.Option key={i} value={list.value}>{list.name}</Select.Option>
          ))}
        </Select>
      </Form.Group>
    </Form.Row>
  </Form>
)

const perPage = 18;
const Products = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(ALL)
  const [currentPage, setCurrentPage] = useState(1)
  const [live, setLive] = useState("")
  const [search, setSearch] = useState("")
  const [orderBy, setOrderBy] = useState(orderList[0].value)

  const loading = useSelector(state => state.products.loading)
  const aliveArchiving = useSelector(state => state.products.aliveArchiving)
  const products = useSelector(state => state.products.products)

  let queryString = {
    page: currentPage,
    per_page: perPage,
    order_by: orderBy,
    live: live,
    q: search
  }

  const onTabClick = key => {
    setActiveTab(key)
    setCurrentPage(1)
    setSearch("")
    setOrderBy(orderList[0].value)
    if(key === ALL) setLive("")
    if(key === LIVE) setLive("true")
    if(key === ARCHIVE) setLive("false")
  }

  const pageChange = page => {
    setCurrentPage(page)
  }

  useEffect(() => {
    dispatch(actions.getProducts({ ...queryString }))
  },[currentPage, orderBy, live])

  useEffect(() => {
    dispatch(actions.getProducts({ ...queryString }))
  }, [search, aliveArchiving])

  useEffect(() => {
    if(products !== null){
      setCurrentPage(products.page)
    }
  }, [])

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <Tabs className="order-tabs" activeKey={activeTab} onTabClick={onTabClick}>
            <Tabs.TabPane tab="Semua" key={ALL}>
              
              <Form>
                <Form.Row>
                  <Form.Group as={ColB} lg={8} md={6}>
                    <Input 
                      placeholder="Cari berdasarkan nama" 
                      prefix={<i className="far fa-search" />}
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={ColB} lg={4} md={6}>
                    <Select 
                      placeholder="Urutkan" 
                      style={{ width: "100%"}}
                      className="product-search-select"
                      value={orderBy}
                      onChange={e => setOrderBy(e)}
                    >
                      {orderList.map((list, i) => (
                        <Select.Option key={i} value={list.value}>{list.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Group>
                </Form.Row>
              </Form>

              <Row gutter={[10, 10]}>
                <ProductComponent products={products} dispatch={dispatch} />
                <EmptyProduct loading={loading} products={products} />
              </Row>

              {products !== null && products && products.data && products.data.length > 0 && (
                <Card.Body className="text-center">
                  <Pagination 
                    total={products.total} 
                    goTo={pageChange} 
                    current={currentPage} 
                    hideOnSinglePage 
                    pageSize={perPage}
                  />
                </Card.Body>
              )}
            </Tabs.TabPane>


            <Tabs.TabPane tab="Live" key={LIVE}>
              <SearchComponent 
                search={search}
                setSearch={setSearch}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
              />

              <Row gutter={[10, 10]}>
                <ProductComponent products={products} dispatch={dispatch} />
                <EmptyProduct loading={loading} products={products} />
              </Row>

              {products !== null && products && products.data && products.data.length > 0 && (
                <Card.Body className="text-center">
                  <Pagination 
                    total={products.total} 
                    goTo={pageChange} 
                    current={currentPage} 
                    hideOnSinglePage 
                    pageSize={perPage}
                  />
                </Card.Body>
              )}
            </Tabs.TabPane>


            <Tabs.TabPane tab="Diarsipkan" key={ARCHIVE}>
              <SearchComponent 
                search={search}
                setSearch={setSearch}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
              />

              <Row gutter={[10, 10]}>
                <ProductComponent products={products} dispatch={dispatch} />
                <EmptyProduct loading={loading} products={products} />
              </Row>

              {products !== null && products && products.data && products.data.length > 0 && (
                <Card.Body className="text-center">
                  <Pagination 
                    total={products.total} 
                    goTo={pageChange} 
                    current={currentPage} 
                    hideOnSinglePage 
                    pageSize={perPage}
                  />
                </Card.Body>
              )}
            </Tabs.TabPane>
          </Tabs>
        </Card.Body>
      </Card>
      <style jsx>{`
        :global(.product-search-select > .ant-select-selector){
          height: 33px !important;
        }
        :global(.float-product-button) {
          float: left;
        }
        @media(min-width: 576px){
          :global(.float-product-button) {
            float: right;
          }
        }
      `}</style>
    </>
  )
}

export default withAuth(Products)
