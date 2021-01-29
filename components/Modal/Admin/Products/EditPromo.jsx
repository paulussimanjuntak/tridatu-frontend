import { DatePicker, Table, Modal } from 'antd'
import Button from "antd-button-color"

const EditPromoModal = ({ visible, onClose, columns, dataSource, disabledDate, disabledRangeTime, dateChange }) => {
  return(
    <>
      <Modal
        centered
        width={1000}
        zIndex={3000}
        visible={visible}
        title={false}
        closable={false}
        onOk={onClose}
        onCancel={onClose}
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
        <Table pagination={false} columns={columns} dataSource={dataSource} />

        <h5 className="my-3 fs-16">Periode Diskon</h5>
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
      </Modal>
    </>
  )
}

export default EditPromoModal
