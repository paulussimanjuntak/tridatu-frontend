import { Button, Modal } from 'antd'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const AddAddressModal = ({ show, submit, close }) => {
  return(
    <>
      <Modal
        centered
        title="Tambah Alamat Baru"
        visible={show}
        onOk={submit}
        onCancel={close}
        zIndex="1030"
        closeIcon={<i className="fas fa-times" />}
        footer={[
          <Button key="back" onClick={close}>
            Batal
          </Button>,
          <Button key="submit" type="primary" className="btn-tridatu" onClick={submit}>
            Simpan
          </Button>,
        ]}
        className="modal-rad-10"
        bodyStyle={{padding: '0'}}
      >
        <Card.Body>
          <Form>

            <Form.Group>
              <Form.Label>Label Alamat</Form.Label>
              <Form.Control placeholder="Alamat Rumah, Alamat Kantor, Apartemen..." />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Nama Penerima</Form.Label>
                <Form.Control type="text" placeholder="Nama" />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control type="number" placeholder="081234567890" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={8} sm={12}>
                <Form.Label>Kota atau Kecamatan</Form.Label>
                <Form.Control type="text" placeholder="Tulis Nama Alamat / Kota / Kecamatan tujuan pengiriman" />
              </Form.Group>

              <Form.Group as={Col} md={4} sm={12}>
                <Form.Label>Kode Pos</Form.Label>
                <Form.Control type="text" placeholder="Kode Pos" />
              </Form.Group>
            </Form.Row>

            <Form.Group className="mb-0">
              <Form.Label>Alamat</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Isi dengan nama jalan, nomor rumah, nomor kompleks, nama gedung, lantai atau nomor unit." />
            </Form.Group>

          </Form>
        </Card.Body>
      </Modal>
    </>
  )
}

export default AddAddressModal
