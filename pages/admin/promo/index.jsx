import { withAuth } from 'lib/withAuth'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Input, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatePresence } from 'framer-motion'

import * as actions from 'store/actions'

import ColB from 'react-bootstrap/Col'
import Masonry from 'react-masonry-css'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import formFilter from 'formdata/formFilter'
import Pagination from 'components/Pagination'
import CardPromo from 'components/Card/Admin/Voucher/Card'

// import CardVoucherOnly from "components/Card/Admin/Voucher/VoucherOnly";
// import CardVoucherOnly1 from "components/Card/Admin/Voucher/VoucherOnly1";
// import CardPromo1 from "components/Card/Admin/Voucher/Card1";
// import CardPromo2 from "components/Card/Admin/Voucher/Card2";
// import CardPromo3 from "components/Card/Admin/Voucher/Card3";
// import EmptyPromo from "components/Card/Empty/Promo";

// import { promos } from "data/promoData";

const CardPromoMemo = React.memo(CardPromo);

const orderListStatus = [
  { label: "Semua Status", value: "" },
  { label: "Akan Datang", value: "will_come", },
  { label: "Sedang Berjalan", value: "ongoing", },
  { label: "Telah Berakhir", value: "have_ended", }
]

const breakpointColumnsObj = {
  default: 3, 1200: 2,
  992: 2, 576: 1
}

const per_page = 9
const Promo = ({ searchQuery }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const promos = useSelector(state => state.promo.promos)

  const [page, setPage] = useState(promos.page)
  const [filter, setFilter] = useState(formFilter)

  const { q, status } = filter

  const onSearchChange = e => {
    const data = {
      ...filter,
      q: { value: e.target.value }
    }
    setFilter(data)
    setPage(1)
  }

  const onStatusChange = val => {
    const data = {
      ...filter,
      status: { value: val }
    }
    setFilter(data)
    setPage(1)
  }

  useEffect(() => {
    if(promos && promos.data && !router.query.hasOwnProperty("page")){
      setPage(promos.page)
    }
    if(promos && router.query.hasOwnProperty("page")){
      setPage(+router.query.page)
    }
  }, [promos])

  useEffect(() => {
    let queryString = router.query
    if(page) queryString["page"] = page

    if(q.value) queryString["q"] = q.value
    else delete queryString["q"]

    if(status.value[0] !== "" || status.value !== "") queryString["status"] = status.value
    else delete queryString["order_by"]
    if(status.value === "" || status.value[0] === "") delete queryString["status"]

    router.replace({
      pathname: "/admin/promo",
      query: queryString
    })
  }, [filter, page])

  useEffect(() => {
    if(!searchQuery) return
    const state = JSON.parse(JSON.stringify(filter))
    if(searchQuery.hasOwnProperty("page")) {
      if(+searchQuery.page !== page) setPage(searchQuery.page)
      else setPage(page)
    }
    if(searchQuery.hasOwnProperty("status")) {
      state.status.value = [searchQuery.status]
    }
    if(searchQuery.hasOwnProperty("q")) {
      state.q.value = [searchQuery.q]
    }
    setFilter(state)
  }, [])

  const showPagination = promos !== null && promos && promos.data && promos.data.length > 0 && (promos.next_num !== null || promos.prev_num !== null);

  return(
    <>
      <Card className="border-0 shadow-none card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Kelola Promo</h5>
        </Card.Body>
        <Card.Body className="p-3">
          <Form>
            <Form.Row>
              <Form.Group as={ColB} lg={8} md={12}>
                <Input 
                  className="h-35"
                  placeholder="Cari berdasarkan nama" 
                  prefix={<i className="far fa-search" />}
                  value={q.value}
                  onChange={onSearchChange}
                />
              </Form.Group>
              <Form.Group as={ColB} lg={4} md={12}>
                <Select 
                  placeholder="Status" 
                  style={{ width: "100%"}}
                  className="product-search-select"
                  value={status.value}
                  onChange={onStatusChange}
                >
                  {orderListStatus.map((list, i) => (
                    <Select.Option key={i} value={list.value}>{list.label}</Select.Option>
                  ))}
                </Select>
              </Form.Group>
            </Form.Row>
          </Form>

          <AnimatePresence>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {promos && promos.data && promos.data.length > 0 && promos.data.map(promo => (
                <CardPromoMemo 
                  key={promo.promos_id}
                  data={promo} 
                  deletePromo={(id) => dispatch(actions.deletePromo(id, {...router.query, per_page: per_page}))}
                />
              ))}
            </Masonry>
          </AnimatePresence>

          {showPagination && (
            <Card.Body className="text-center">
              <Pagination 
                total={promos.total} 
                goTo={val => setPage(val)} 
                current={page} 
                hideOnSinglePage 
                pageSize={per_page}
              />
            </Card.Body>
          )}

        </Card.Body>
      </Card>

      <style jsx global>{`
        .my-masonry-grid {
          display: -webkit-box; /* Not needed if autoprefixing */
          display: -ms-flexbox; /* Not needed if autoprefixing */
          display: flex;
          margin-left: -16px; /* gutter size offset */
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 16px; /* gutter size */
          background-clip: padding-box;
        }
         
        /* Style your items */
        .my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
          margin-bottom: 16px;
        }
      `}</style>
    </>
  )
}

Promo.getInitialProps = async ctx => {
  const searchQuery = ctx.query
  await ctx.store.dispatch(actions.getPromos({ ...searchQuery, per_page: per_page }))
  console.log(searchQuery)
  return { searchQuery: searchQuery }
}

export default withAuth(Promo)
