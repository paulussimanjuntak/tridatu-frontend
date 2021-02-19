import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DatePicker, Table, Modal, Form, Row, Col, Empty } from 'antd'

import * as actions from "store/actions";

import { columnsVoucherProduct } from 'data/voucher'

import Card from 'react-bootstrap/Card'
import Pagination from "components/Pagination";

const EmptyProduct = () => (
  <div className="w-100">
    <Empty className="my-5" description={<span className="text-secondary">Tidak ada produk</span>} />
  </div>
)


const per_page = 10
const SetupProduct = ({ typeVoucher, visible, onClose }) => {
  if(!visible) return null
  const dispatch = useDispatch()

  /* GLOBAL STATE */
  const products = useSelector(state => state.products.products)
  const loadingProduct = useSelector(state => state.products.loading)
  /* GLOBAL STATE */

  const [page, setPage] = useState(products.page)
  const [dataSourceProducts, setDataSourceProduct] = useState([])
  const [selectedProductKeys, setSelectedProductKey] = useState([])

  useEffect(() => {
    if(typeVoucher.value === "specific_product"){
      dispatch(actions.getProducts({page: page, per_page: per_page, live: "true"}))
    }
  }, [visible, page])

  useEffect(() => {
    if(products && products.data && products.data.length >= 0){
      let tmp = []
      for(let val of products.data){
        tmp.push({ key: val.products_id, products: { ...val, stock: 30 }})
      }
      setDataSourceProduct(tmp)
    }
  }, [products.data])

  useEffect(() => {
    if(products && products.data){
      setPage(products.page)
    }
  }, [products])

  const rowSelection = {
    selectedProductKeys,
    onChange: (selectedRowKeys) => {
      setSelectedProductKey(selectedRowKeys)
    }
  };


  return(
    <>
      <Modal centered width={1000} 
        zIndex={3000} visible={visible}
        title={`Pilih ${typeVoucher.label}`} closable={false}
        onOk={onClose} onCancel={onClose}
        maskClosable={false}
        // footer={buttonActions}
      >
        <Table 
          rowSelection={rowSelection}
          pagination={false}
          scroll={{ x: 900, y: 400 }}
          columns={columnsVoucherProduct} 
          dataSource={dataSourceProducts}
          locale={{ emptyText: <EmptyProduct /> }}
        />

        <Card.Body className="text-right p-0 pt-3">
          <small>{selectedProductKeys}</small>
          <Pagination 
            current={page} 
            hideOnSinglePage 
            pageSize={per_page}
            total={products.total} 
            goTo={val => setPage(val)} 
          />
        </Card.Body>

      </Modal>
    </>
  )
}

export default SetupProduct
