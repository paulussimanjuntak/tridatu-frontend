import { useState, useEffect } from 'react'
import { DatePicker, Table, Modal, Form } from 'antd'

import { formItemLayout } from 'data/productsAdmin'
import { disabledDate, disabledRangeTime } from 'lib/utility'
import { columnsProductVariant, columnsProductNoVariant } from 'data/discount'
import { initialValue, formPeriod, formPeriodIsValid, formTablePromoIsValid } from 'formdata/formPromo'

import moment from 'moment'
import makeid from 'lib/makeid'
import Button from "antd-button-color"

import ErrorMessage from "components/ErrorMessage";
import EditableCell from 'components/Card/Admin/Product/Promo/ModalCell'

const components = { body: { cell: EditableCell } };

const EditPromoModal = ({ visible, onClose, product }) => {
  if(!visible) return null
  const { products_name, products_variant } = product

  const [dataSource, setDataSource] = useState([])
  const [periode, setPeriode] = useState(formPeriod)
  const [columns, setColumns] = useState(columnsProductVariant)

  const { start, end } = periode

  useEffect(() => {
    if(product && products_variant){
      const { va1_name, va2_name, va1_items } = products_variant

      /* NO VARIANT DATA */
      if(va1_items && !va1_name && !va2_name){ 
        let variant = []
        for(let item of va1_items){
          variant.push({ 
            key: makeid(10),
            product: {
              stock: {...initialValue, value: item.va1_stock},
              normal_price: {...initialValue, value: item.va1_price},
              price: {...initialValue, value: item.va1_price},
              discount: {...initialValue, value: item.va1_discount},
              active: {...initialValue, value: item.va1_discount_active},
            }
          })
        }
        setDataSource(variant)
        setColumns(columnsProductNoVariant)
      }

      /* ONLY ONE VARIANT DATA */
      if(va1_name && va1_items && !va2_name){
        let variant = []
        for(let item of va1_items){
          variant.push({ 
            key: makeid(10),
            product: {
              va1_option: {...initialValue, value: item.va1_option},
              stock: {...initialValue, value: item.va1_stock},
              normal_price: {...initialValue, value: item.va1_price},
              price: {...initialValue, value: item.va1_price},
              discount: {...initialValue, value: item.va1_discount},
              active: {...initialValue, value: item.va1_discount_active},
            }
          })
        }
        setDataSource(variant)
      }

      if(va2_name){
        let variant = []
        for(let val1 of va1_items){
          let variant_tmp = []
          for(let val2 of val1.va2_items){
            variant_tmp.push({
              va1_option: {...initialValue, value: val1.va1_option},
              va2_option: {...initialValue, value: val2.va2_option},
              stock: {...initialValue, value: val2.va2_stock},
              normal_price: {...initialValue, value: val2.va2_price},
              price: {...initialValue, value: val2.va2_price},
              discount: {...initialValue, value: val2.va2_discount},
              active: {...initialValue, value: val2.va2_discount_active},
            })
          }
          for(let item of variant_tmp){
            variant.push({ key: makeid(10), product: item })
          }
        }
        console.log(JSON.stringify(variant, null, 2))
        setDataSource(variant)
      }
    }

    const start = moment().add(30, "minutes").format("DD MMM YYYY HH:mm")
    const data = {
      ...periode,
      start: { value: start, isValid: true, message: null },
      end: { value: moment(start).add(1, "hours").format("DD MMM YYYY HH:mm"), isValid: true, message: null },
    }
    setPeriode(data)
  }, [product])

  const onTableChange = (e, item, index, normal_price) => {
    const newData = [...dataSource]
    if(item === "price"){
      newData[index]["product"]["price"].value = e
      newData[index]["product"]["price"].isValid = true
      newData[index]["product"]["price"].message = null

      newData[index]["product"]["discount"].value = 100 - Math.round(((e/normal_price) * 100))
      newData[index]["product"]["discount"].isValid = true
      newData[index]["product"]["discount"].message = null
    }
    if(item === "discount"){
      newData[index]["product"]["discount"].value = e
      newData[index]["product"]["discount"].isValid = true
      newData[index]["product"]["discount"].message = null

      newData[index]["product"]["price"].value = ((100 - e)/100) * normal_price
      newData[index]["product"]["price"].isValid = true
      newData[index]["product"]["price"].message = null
    }
    if(item === "active"){
      newData[index]["product"]["active"].value = e
      newData[index]["product"]["active"].isValid = true
      newData[index]["product"]["active"].message = null
    }
    setDataSource(newData)
  }

  const dateChange = (_, dateStrings) => {
    let endVal = dateStrings[1]

    if(moment(endVal) <= moment()) endVal = moment(start.value).add(1, "hour")

    const data = {
      ...periode,
      start: { value: moment(start.value), isValid: true, message: null },
      end: { value: endVal, isValid: true, message: null },
    }
    setPeriode(data)
  }

  const onOkDateChange = (date) => {
    let endVal = date[1] || ""

    if(moment(endVal) <= moment()) endVal = moment(start.value).add(1, "hour")

    const data = {
      ...periode,
      start: { value: moment(start.value), isValid: true, message: null },
      end: { value: endVal, isValid: true, message: null },
    }
    setPeriode(data)
  }

  const columnsProduct = columns.map(col => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index: index,
        type: col.type,
        editable: col.editable,
        onChange: e => onTableChange(e, col.type, index, record.product.normal_price.value),
        onBlur: () => formTablePromoIsValid(dataSource, setDataSource, index)
      })
    }
  })

  return(
    <>
      <Modal centered width={1000} 
        zIndex={3000} visible={visible}
        title={false} closable={false}
        onOk={onClose} onCancel={onClose}
        maskClosable={false}
        footer={[
          <Button key="cancel" className="float-left text-danger fw-500" onClick={onClose}>
            <i className="fas fa-times mr-1" /> Nonaktifkan Diskon
          </Button>,
          <Button key="back" onClick={onClose}>
            Tutup
          </Button>,
          <Button key="submit" type="primary" className="btn-tridatu" onClick={onClose}>
            Simpan
          </Button>,
        ]}
      >
        <h5 className="mb-3 fs-16">Atur Diskon - {products_name}</h5>
        <Table 
          pagination={false} 
          scroll={{ x: 800, y: 500 }}
          components={components}
          dataSource={dataSource} 
          columns={columnsProduct}
        />

        <h5 className="my-3 fs-16">Periode Diskon</h5>
        <Form layout="vertical" {...formItemLayout} className="mb-0">
          <Form.Item
            name="DatePicker"
            // validateStatus={!start.isValid && start.message && "error"}
            className="mb-0"
          >
            <div>
              <DatePicker.RangePicker 
                showTime 
                inputReadOnly
                format="DD MMM YYYY HH:mm"
                disabled={[true, false]} 
                onChange={dateChange}
                disabledDate={disabledDate}
                onOk={onOkDateChange}
                onBlur={() => formPeriodIsValid(periode, setPeriode)}
                disabledTime={(current, type) => disabledRangeTime(current, type, start.value)}
                value={[start.value !== "" && moment(start.value), end.value !== "" && moment(end.value)]}
              /> 
              <span className="ml-2">WITA</span>
              <ErrorMessage item={start} />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditPromoModal
