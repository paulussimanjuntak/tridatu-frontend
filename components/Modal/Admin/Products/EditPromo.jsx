import { useState, useEffect } from 'react'
import { DatePicker, Table, Modal, Form } from 'antd'

import { formItemLayout } from 'data/productsAdmin'
import { columnsProductVariant, columnsProductNoVariant } from 'data/discount'

import moment from 'moment'
import Button from "antd-button-color"

import EditableCell from 'components/Card/Admin/Product/Promo/ModalCell'

const components = { body: { cell: EditableCell } };

const EditPromoModal = ({ visible, onClose, columns, dataSource, disabledDate, disabledRangeTime, dateChange }) => {
  if(!visible) return null

  // const [dataSource, setDataSource] = useState([])
  // const [columns, setColumns] = useState(columnsProductVariant)

  const columnsProduct = columns.map(col => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        index: index,
        type: col.type,
        editable: col.editable,
        // onChange: e => onTableChange(e, col.type, index, record.product.normal_price.value),
        // onBlur: () => formTablePromoIsValid(dataSource, setDataSource, index)
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
        <h5 className="mb-3 fs-16">Atur Diskon - Baju Bekas</h5>
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
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                onChange={dateChange}
              /> 
              <span className="ml-2">WITA</span>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditPromoModal
