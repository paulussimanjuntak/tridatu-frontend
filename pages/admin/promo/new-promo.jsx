import { useState } from 'react'
import { Form, Input, Radio, InputNumber, Popover, Table, Tooltip, Space, Upload, DatePicker } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import dynamic from 'next/dynamic'
import Card from 'react-bootstrap/Card'
import Button from "antd-button-color"

import { formImage } from 'formdata/formImage'
import { imageValidation, uploadButton } from 'lib/imageUploader'
import { columnsVoucher, columnsOngkir } from 'data/voucher'

// import { productsData } from 'data/products'

import AddStyleAdmin from 'components/Admin/addStyle'
const Editor = dynamic(import('../../../components/Editor'), { ssr: false })

import PageInfoPopover from 'components/Admin/Voucher/PageInfoPopover'

const maxPromoName = 30
const CountChar = ({children}) => <span className="text-muted noselect border-left pl-2 fs-12">{children}</span>

const NewPromo = () => {
  const [loading, setLoading] = useState(false)
  const [imageList, setImageList] = useState(formImage)
  const [showPromo, setShowPromo] = useState(true)

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Rincian Dasar</h5>
        </Card.Body>
        <Card.Body className="p-3">
          <Form layout="vertical">
            <Form.Item label="Nama Promo" required>
              <Input 
                placeholder="Nama Promo" 
                maxLength={maxPromoName}
                suffix={<CountChar>0/{maxPromoName}</CountChar>} 
              />
              <small className="form-text text-left text-muted">
                Contoh: Kejutan Promo Spesial
              </small>
            </Form.Item>
            
            <Form.Item label="Periode Klaim Promo" required>
              <DatePicker.RangePicker 
                showTime 
                inputReadOnly
                format="DD MMM YYYY HH:mm"
              />
              <span className="ml-2">WITA</span>
            </Form.Item>

            <Form.Item label="Pengaturan Tampilan Promo" required className="mb-0">
              <Radio.Group value={showPromo} onChange={e => setShowPromo(e.target.value)}>
                <Radio value={true} className="noselect d-block h-30">
                  Tampilkan di semua halaman 
                  <Popover placement="bottomLeft" content={PageInfoPopover}>
                    <i className="fal fa-question-circle ml-1" />
                  </Popover>
                </Radio>
                <Radio value={false} className="noselect d-block h-30">
                  Tidak Ditampilkan
                  <Popover placement="bottomLeft" content={
                    <small className="form-text text-left text-muted mt-0 text-wrap text-center">
                      Promo tidak akan ditampilkan namun kamu dapat <br/>menambahkan kode voucher dan membagikannya kepada pembeli.
                    </small>
                    }
                  >
                    <i className="fal fa-question-circle ml-1" />
                  </Popover>
                </Radio>
              </Radio.Group>
            </Form.Item>

          </Form>
        </Card.Body>
      </Card>

      {showPromo && (
        <Card className="border-0 shadow-sm card-add-product">
          <Card.Body className="p-3 border-bottom">
            <h5 className="mb-0 fs-16-s">Pengaturan Informasi</h5>
          </Card.Body>
          <Card.Body className="p-3">
            <Form layout="vertical">

              <Form.Item label="Foto Promo (800 × 400 px)">
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  className="avatar-uploader"
                  fileList={imageList.file.value}
                  beforeUpload={(file) => imageValidation(file, "www.google.com", "avatar", "formHeader")}
                >
                  {imageList.file.value.length >= 1 ? null : uploadButton(loading)}
                </Upload>
              </Form.Item>

              <Form.Item label="Deskripsi Promo">
                <Input.TextArea 
                  name="desc"
                  autoSize={{ minRows: 8, maxRows: 10 }} 
                  placeholder="Deskripsi Promo" 
                />
              </Form.Item>
              
              <Form.Item label="Syarat dan Ketentuan">
                <Editor 
                  initialValue=""
                  setContent={() => {}} 
                  height="200"
                />
              </Form.Item>

            </Form>
          </Card.Body>
        </Card>
      )}


      <Space>
        <Button className="btn-tridatu">Simpan</Button>
        <Button>Batal</Button>
      </Space>

      <style jsx>{AddStyleAdmin}</style>
      <style jsx>{`
        :global(.voucher-radio-button-wrapper, .voucher-radio-button-wrapper:first-child, .ant-radio-button-wrapper:last-child){
          margin-right: 8px;
          margin-bottom: 8px;
          border-radius: .25rem;
          border-left-width: 1px!important;
          height: auto;
          padding: 5px 15px;
        }
        :global(.ant-radio-button-wrapper:last-child){
          margin-right: 0px;
        }
        :global(.voucher-radio-button-wrapper:hover){
          color: rgba(0, 0, 0, 0.85);
          box-shadow: rgb(49 53 59 / 16%) 0px 2px 6px 0px;
        }
        :global(
          .voucher-radio-button-wrapper:not(:first-child)::before, 
          .voucher-radio-button-wrapper.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before
        ){
          width: 0px;
        }
        :global(.voucher-radio-button-wrapper.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within){
          box-shadow: 0 0 0 3px #ff434412;
        }
        :global(.voucher-radio-button-wrapper.ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child) {
          border-right-color: #d63031;
        }
        :global(.voucher-radio-button-wrapper.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)){
          color: #d63031;
          background: #d630310a;
          border-color: #d63031;
        }
        :global(.voucher-radio-button-wrapper.ant-radio-button-wrapper-disabled:hover){
          color: rgba(0, 0, 0, 0.25);
          box-shadow: unset;
        }
      `}</style>
    </>
  )
}

export default NewPromo
