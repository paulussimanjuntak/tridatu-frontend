import { useState, useEffect  } from 'react'
import { Table, Input, Select } from 'antd'
import { useSelector, useDispatch } from "react-redux";

import { orderList, columns, dataNoVar, dataVar1, dataVar2, productsList, product1, product2, product3 } from 'data/discount'

import axios, { signature_exp, resNotification } from "lib/axios";
import ColB from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Pagination from "components/Pagination";

import EditableCell from 'components/Card/Admin/Product/Promo/Cell'
import AddPromoModal from 'components/Modal/Admin/Products/AddPromo'
import EditPromoModal from 'components/Modal/Admin/Products/EditPromo'

const components = { body: { cell: EditableCell } };

const Discount = () => {

  const [show, setShow] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [dataSourceProducts, setDataSourceProducts] = useState([])
  const [product, setProduct] = useState({})


  const closeModalSetPromoHandler = () => {
    setShow(false)
    setProduct({})
  }

  const updatePromoHandler = (index) => {
    if(index == 0) setProduct(dataNoVar)
    if(index == 1) setProduct(dataVar1)
    if(index == 2) setProduct(dataVar2)
    setShowUpdate(true)
  }

  const setPromoHandler = (index) => {
    if(index == 3) setProduct(product1)
    if(index == 4) setProduct(product2)
    if(index == 5) setProduct(product3)
    setShow(true)
  }

  const closeUpdatePromoHandler = () => {
    setProduct({})
    setShowUpdate(false)
  }

  const columnsProductList = columns.map(col => {
    if(!col.action) return col
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index: index,
        action: col.action,
        onSet: () => setPromoHandler(index),
        onUpdate: () => updatePromoHandler(index),
      })
    }
  })

  useEffect(() => {
    if(productsList && productsList.data){
      productsList.data.map((obj, i) => {
        obj["products_discount"] = i == 0 && 10 || i == 1 && 50 || i == 2 && 20 || false
        obj["promo_active"] = i == 0 && true || i == 1 && true || i == 2 && true || false
        obj["promo_status"] = i == 0 && "Akan Datang" || i == 1 && "Akan Datang" || i == 2 && "Sedang Berjalan" || "Tidak Aktif"
        obj["promo_start"] = i == 0 && "27 Jan 2021 00:04" || i == 1 && "27 Jan 2021 00:04" || i == 2 && "25 Jan 2021 10:04" || "Belum Ada Diskon"
        obj["promo_end"] = i == 0 && "30 Jan 2021 00:04" || i == 1 && "30 Jan 2021 00:04" || i == 2 && "30 Jan 2021 10:04" || false
        return obj
      })
      
      let tmp = []
      for(let val of productsList.data){
        tmp.push({ key: val.products_id, products: val })
      }

      setDataSourceProducts(tmp)
    }
  }, [productsList])

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Daftar Promo</h5>
        </Card.Body>
        <Card.Body className="p-3 border-bottom">
          <Form>
            <Form.Row>
              <Form.Group as={ColB} lg={8} md={6}>
                <Input 
                  className="h-35"
                  placeholder="Cari berdasarkan nama" 
                  prefix={<i className="far fa-search" />}
                />
              </Form.Group>
              <Form.Group as={ColB} lg={4} md={6}>
                <Select 
                  placeholder="Urutkan" 
                  style={{ width: "100%"}}
                  className="product-search-select"
                  defaultValue="all"
                >
                  {orderList.map((list, i) => (
                    <Select.Option key={i} value={list.value}>{list.name}</Select.Option>
                  ))}
                </Select>
              </Form.Group>
            </Form.Row>
          </Form>

          <Table 
            pagination={false}
            scroll={{ x: 1000 }}
            components={components}
            columns={columnsProductList} 
            dataSource={dataSourceProducts}
          />
          <Card.Body className="text-right">
            <Pagination 
              total={30} 
              // goTo={pageChange} 
              // current={currentPage} 
              hideOnSinglePage 
              pageSize={10}
            />
          </Card.Body>
        </Card.Body>
      </Card>


      <AddPromoModal 
        visible={show}
        onClose={closeModalSetPromoHandler}
        product={product}
      />

      <EditPromoModal
        visible={showUpdate}
        onClose={closeUpdatePromoHandler}
        product={product}
      />


      <style jsx>{`
        :global(.product-list-admin:not(:last-of-type)){
          margin-bottom: .5rem !important;
        }
        :global(.ant-picker-dropdown){
          z-index: 3010;
        }
      `}</style>
    </>
  )
}

export default Discount
