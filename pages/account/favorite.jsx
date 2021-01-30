import { withAuth } from 'lib/withAuth'
import { useState, useEffect } from 'react'
import { Input, Select, Row, Col } from 'antd'
import { useSelector, useDispatch } from "react-redux";
import { AnimatePresence } from 'framer-motion'

import ColB from 'react-bootstrap/Col'
import RowB from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import isEmpty from 'validator/lib/isEmpty';

import * as actions from "store/actions";
import CardProduct from "components/Card/Product";
import Pagination from "components/Pagination";
import formFilter from "formdata/formFilter";

const CardProductMemo = React.memo(CardProduct);

const sortList = [
  { value: "", label: "Terbaru" }, 
  { value: "longest", label: "Terlama" },
  { value: "high_price", label: "Harga Tertinggi" }, 
  { value: "low_price", label: "Harga Terendah" },
] 

const Favorite = () => {
  const dispatch = useDispatch()

  const [page, setPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState(formFilter);

  const products = useSelector(state => state.auth.wishlist)

  const { q, order_by } = activeFilter

  useEffect(() => {
    let queryString = {}
    if(page) queryString["page"] = page

    if(!isEmpty(q.value)) queryString["q"] = q.value
    else delete queryString["q"]

    if(order_by.value !== "") queryString["order_by"] = order_by.value
    else delete queryString["order_by"]

    dispatch(actions.getWishlist(queryString))
  }, [activeFilter])

  useEffect(() => {
    if(products) setPage(products.page)
  }, [products])

  const onFilterChange = (e, item) => {
    const name = !item && e.target.name
    const value = !item && e.target.value

    if(item){
      const data = {
        ...activeFilter,
        [item]: { ...activeFilter[item], value: e, isValid: true, message: null }
      }
      setActiveFilter(data)
    }
    else {
      const data = {
        ...activeFilter,
        [name]: { ...activeFilter[name], value: value, isValid: true, message: null }
      }
      setActiveFilter(data)
    }
  }

  return(
    <>
      <Card className="card-container">
        <Card.Header className="bg-transparent border-bottom">
          <h1 className="fs-16 mt-1 mb-0">Favorit</h1>
          <small>
            Kelola item favorit Anda dari sini
          </small>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Row>
              <Form.Group as={ColB} lg={8} md={6}>
                <Input 
                  name="q"
                  className="account-search h-100"
                  placeholder="Cari produk favoritmu" 
                  prefix={<i className="far fa-search" />}
                  value={q.value}
                  onChange={onFilterChange}
                />
              </Form.Group>
              <Form.Group as={ColB} lg={4} md={6}>
                <Select 
                  name="order_by"
                  placeholder="Urutkan" 
                  style={{ width: "100%"}}
                  className="account-search"
                  value={order_by.value}
                  onChange={(e) => onFilterChange(e, "order_by")}
                >
                  {sortList.map(sort => (
                    <Select.Option key={sort.value} value={sort.value}>{sort.label}</Select.Option>
                  ))}
                </Select>
              </Form.Group>
            </Form.Row>
          </Form>

          <Row gutter={[10, 10]}>
            <AnimatePresence>
              {products && products.data && products.data.length > 0 && products.data.map(product => (
                <Col lg={5} md={6} sm={8} xs={12} key={product.products_id} className="modif-col">
                  <CardProductMemo data={product} />
                </Col>
              ))}
            </AnimatePresence>
          </Row>

          <RowB className="mt-4">
            <ColB className="align-self-center text-center">
              <Pagination />
            </ColB>
          </RowB>
        </Card.Body>
      </Card>

      <style jsx>{`
        @media (min-width: 992px){
          :global(.ant-col-lg-5.modif-col){
            display: block;
            flex: 0 0 20%;
            max-width: 20%;
          }
        }
      `}</style>
    </>
  )
}

export default withAuth(Favorite)
