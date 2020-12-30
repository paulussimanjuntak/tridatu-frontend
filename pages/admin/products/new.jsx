import { useState } from 'react'
import { Form, Input, Select, InputNumber, Button, Cascader, Space, Upload, Col, Row, Table } from 'antd'
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'

import Card from 'react-bootstrap/Card'

import { formImage } from 'formdata/formImage'
import { imageValidation, uploadButton } from 'lib/imageUploader'
import SizeGuideModal from 'components/Modal/Admin/Products/SizeGuide'

import TableVariant from 'components/Admin/Variant/TableVariant'
import AddStyleAdmin from 'components/Admin/addStyle'

import { categoryData } from 'components/Header/categoryData'

import { brandData } from 'data/brand'
import { formItemLayout } from 'data/productsAdmin'

const NewProduct = () => {
  const [brandList, setBrandList] = useState(brandData)
  const [imageList, setImageList] = useState(formImage);
  const [loading, setLoading] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Informasi Produk</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form layout="vertical">
            <Form.Item label="Nama Produk" required>
              <Input placeholder="Nama Produk" className="h-35" />
            </Form.Item>
            <Form.Item label="Deskripsi Produk" required>
              <Input.TextArea autoSize={{ minRows: 8 }} placeholder="Deskripsi produk" />
            </Form.Item>
            <Form.Item label="Kategori" required>
              <Cascader options={categoryData} placeholder="Pilih Kategori" />
            </Form.Item>
            <Form.Item label="Brand">
              <Select
                showSearch
                placeholder="Buat Brand"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {brandList.map(val => (
                  <Select.Option value={val.name} key={val.name}>{val.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Kondisi" required>
              <Select placeholder="Kondisi produk" defaultValue="true">
                <Select.Option value="true">Baru</Select.Option>
                <Select.Option value="false">Bekas</Select.Option>
              </Select>
            </Form.Item>
          </Form>

        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Informasi Penjualan</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form layout="vertical" {...formItemLayout}>
            <Form.Item label="Harga" required>
              <div className="ant-input-group-wrapper">
                <div className="ant-input-wrapper ant-input-group">
                  <span className="ant-input-group-addon noselect">Rp</span>
                  <InputNumber
                    className="w-100 bor-left-rad-0 h-33-custom-input"
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={value => value.replace(/\Rp\s?|(\.*)/g, '')}
                  />
                </div>
              </div>
            </Form.Item>

            <Form.Item label="Stok" required>
              <InputNumber 
                min={0} 
                placeholder="Jumlah Stok"
                className="w-100 h-33-custom-input" 
              />
            </Form.Item>

            <Form.Item label="Kode Variasi">
              <Input placeholder="Kode Variasi" className="h-35" />
            </Form.Item>

            <Form.Item label="Barcode">
              <Input placeholder="Barcode" className="h-35" />
            </Form.Item>

            <Form.Item label="Diskon">
              <div className="ant-input-group-wrapper">
                <div className="ant-input-wrapper ant-input-group">
                  <span className="ant-input-group-addon noselect">%</span>
                  <InputNumber
                    min={0}
                    max={100}
                    placeholder="Diskon"
                    className="w-100 bor-left-rad-0 h-33-custom-input"
                  />
                </div>
              </div>
            </Form.Item>

            <hr />
            {/*
            <Form.Item label="Grosir">
              <ButtonColor with="dashed" type="primary" className="px-5" onClick={setIsGrosirHandler}>
                <i className="fal fa-plus-circle mr-1" />Tambah Harga Grosir
              </ButtonColor>
            </Form.Item>
            */}
          </Form>

          <TableVariant />

        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Pengaturan Media</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form layout="vertical">
            <Form.Item label="Foto Produk" className="" required>
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

            <Form.Item label="Panduan Ukuran" className="mb-0" required>
              <div className="w-min-content">
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  className="size-guide-uploader"
                  fileList={imageList.file.value}
                  beforeUpload={(file) => imageValidation(file, "www.google.com", "avatar", "formHeader")}
                >
                  {imageList.file.value.length >= 1 ? null : uploadButton(loading)}
                </Upload>
                <p className="text-center text-secondary noselect hover-pointer" onClick={() => setShowSizeGuide(true)}>Contoh</p>
              </div>
            </Form.Item>

            <Form.Item label="Video Produk" className="mb-0">
              <Input placeholder="Youtube embed link" className="h-35" />
            </Form.Item>
          </Form>

        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Pengiriman</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form layout="vertical">
            <Form.Item label="Berat" required>
              <div className="ant-input-group-wrapper">
                <div className="ant-input-wrapper ant-input-group">
                  <span className="ant-input-group-addon noselect">gr</span>
                  <InputNumber
                    min={0}
                    placeholder="Berat paket"
                    className="w-100 bor-left-rad-0 h-33-custom-input"
                  />
                </div>
              </div>
            </Form.Item>
          </Form>

        </Card.Body>
      </Card>

      <Space>
        <Button className="btn-tridatu">Simpan</Button>
        <Button>Batal</Button>
      </Space>

      <SizeGuideModal 
        show={showSizeGuide} 
        close={() => setShowSizeGuide(false)}
        image="/static/images/size-guide.jpg"
      />

      <style jsx>{`
        :global(.h-33-custom-input .ant-input-number-input){
          height: 33px;
        }
        :global(.size-guide-uploader .ant-upload.ant-upload-select-picture-card){
          margin-right: 0;
          margin-bottom: 5px;
        }
      `}</style>
      <style jsx>{AddStyleAdmin}</style>
    </>
  )
}

export default NewProduct
