import { useState, useEffect } from 'react'
import { Button, Modal, Checkbox, Select, Input } from 'antd'

import axios from 'lib/axios'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const AddAddressModal = ({ show, submit, close }) => {
  const [qAddress, setQAddress] = useState("")
  const [addressList, setAddressList] = useState([])
  const [postalCode, setPostalCode] = useState([])

  const fetchAddress = value => {
    if(value.length < 4) return

    axios.get(`/address/search/city-or-district?q=${value}`)
      .then(res => {
        console.log(res.data)
        setAddressList(res.data)
      })
      .catch(err => console.log(err.response))
  }

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
                <Input addonBefore="+62" placeholder="Nomor Telepon" className="input-h-35" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={8} sm={12}>
                <Form.Label>Kota atau Kecamatan</Form.Label>
                <Select
                  showSearch
                  labelInValue
                  className="w-100"
                  placeholder="Tulis Nama Alamat / Kota / Kecamatan tujuan pengiriman"
                  onSearch={fetchAddress}
                >
                  {addressList.map((data, i) => (
                    <Select.Option key={i} value={data.value}>
                      <div onClick={() => setPostalCode(data.postal_code)}>
                        {data.value}
                      </div>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Group>

              <Form.Group as={Col} md={4} sm={12}>
                <Form.Label>Kode Pos</Form.Label>
                <Select
                  showSearch
                  labelInValue
                  className="w-100 height-100"
                  placeholder="Kode Pos"
                >
                  {postalCode.map((data, i) => (
                    <Select.Option key={i} value={data}>
                      {data}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Alamat</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Isi dengan nama jalan, nomor rumah, nomor kompleks, nama gedung, lantai atau nomor unit." />
            </Form.Group>

            <Form.Group className="mb-0">
              <Checkbox className="noselect">Atur sebagai alamat utama</Checkbox>
            </Form.Group>

          </Form>
        </Card.Body>
      </Modal>

      <style jsx>{`
        :global(.input-h-35 .ant-input){
          height: 35px;
        }
      `}</style>
    </>
  )
}

export default AddAddressModal
