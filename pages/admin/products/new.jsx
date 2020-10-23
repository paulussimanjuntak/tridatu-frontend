import { useState } from 'react'
import { Form, Input, Select, InputNumber, Divider, Button, Cascader, Space, Upload } from 'antd'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import { formImage } from 'formdata/addProduct'
import { imageValidation, uploadButton } from 'lib/imageUploader'

import { categoryData } from 'components/Header/categoryData'
const brandData = ['Adidas', 'Billabong', 'Bershka', 'Converse', 'Deus', 'GAP', 'Giordano', 'Gucci', 'H&M', 'Mango', 'New Balance', 'Pull & Bear', 'Louis Vuitton', 'Levis', 'Nike', 'Top Man', 'Uniqlo', 'Supreme', 'Zara']

const NewProduct = () => {
  const [isAddBrand, setIsAddBrand] = useState(false)
  const [brandList, setBrandList] = useState(brandData)
  const [colorList, setColorList] = useState([])
  const [sizeList, setSizeList] = useState([])
  const [imageList, setImageList] = useState(formImage);
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm();

  const setIsAddBrandHandler = () => {
    setIsAddBrand(!isAddBrand)
  }

  const colorChangeHandler = value => {
    if(value) setColorList(value)
  }

  const sizeChangeHandler = value => {
    if(value) setSizeList(value)
  }

  const newBrandMenu = menu => (
    <div>
      {menu}
      <Divider style={{ margin: '4px 0' }} />
      {isAddBrand ? (
        <div className="d-flex" style={{ flexWrap: 'nowrap', padding: "5px 12px" }}>
          <Input style={{ flex: 'auto' }} />
          <Button type="primary" className="mx-2">Tambah</Button>
          <Button onClick={setIsAddBrandHandler}>Batal</Button>
        </div>
      ) : (
        <div className="d-flex" style={{ flexWrap: 'nowrap', padding: "5px 12px" }}>
          <span className="text-secondary">
            Tidak ada di daftar?
            <a className="pl-2" onClick={setIsAddBrandHandler}>Klik disini untuk buat baru.</a>
          </span>
        </div>
      )}
    </div>
  )

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Informasi Produk</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form form={form} layout="vertical">
            <Form.Item label="Nama Produk" required>
              <Input placeholder="Nama Produk" />
            </Form.Item>
            <Form.Item label="Deskripsi Produk" required>
              <Input.TextArea autoSize={{ minRows: 8 }} />
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
                dropdownRender={newBrandMenu}
              >
                {brandList.map(val => (
                  <Select.Option value={val} key={val}>{val}</Select.Option>
                ))}
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

          <Form form={form} layout="vertical">

            <Form.Item label="Warna" required>
              <Select 
                mode="tags" 
                open={false}
                className="w-100" 
                value={colorList}
                onChange={colorChangeHandler}
                removeIcon={<i className="far fa-times" />}
                placeholder="Contoh: Merah, Hitam, Putih, dll."
              />
            </Form.Item>

            <Form.Item label="Ukuran" required>
              <Select 
                mode="tags" 
                open={false}
                className="w-100" 
                value={sizeList}
                onChange={sizeChangeHandler}
                removeIcon={<i className="far fa-times" />}
                placeholder="Contoh: S, M, L, dll."
              />
            </Form.Item>

            {sizeList.length > 0 && colorList.length > 0 && (
              <Form.Item label="Daftar Produk" className="mb-0" >
                <Table responsive bordered>
                  <thead className="bg-light">
                    <tr className="d-flex">
                      <th className="col-4">Warna</th>
                      <th className="col-4">Ukuran</th>
                      <th className="col-4">Stok</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colorList.map(color => {
                      return sizeList.map(size => (
                        <tr key={size} className="d-flex">
                          <td className="col-4">{color}</td>
                          <td className="col-4">{size}</td>
                          <td className="col-4">
                            <InputNumber className="border-0 p-0 w-100" size="small" min={0} defaultValue={0} />
                          </td>
                        </tr>
                      ))
                    })}
                  </tbody>
                </Table>
              </Form.Item>
            )}

            <Form.Item label="Harga" required>
              <InputNumber
                className="w-100"
                formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={value => value.replace(/\Rp\s?|(\.*)/g, '')}
              />
            </Form.Item>
          </Form>

        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Pengaturan Media</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form form={form} layout="vertical">
            <Form.Item label="Foto Produk" className="mb-0" required>
              <Upload
                accept="image/*"
                listType="picture-card"
                className="avatar-uploader"
                fileList={imageList.image.value}
                beforeUpload={(file) => imageValidation(file, "www.google.com", "avatar", "formHeader")}
              >
                {imageList.image.value.length >= 1 ? null : uploadButton(loading)}
              </Upload>
            </Form.Item>
          </Form>

        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Pengiriman</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form form={form} layout="vertical">
            <Form.Item label={<>Berat <span className="text-secondary pl-1"> /gr</span></>} required>
              <InputNumber className="w-100" />
            </Form.Item>

            <Form.Item label={<>Ukuran Paket <span className="text-secondary pl-1"> /cm</span></>}>
              <InputNumber className="mr-2" placeholder="Panjang" />
              <InputNumber className="mr-2" placeholder="Lebar" />
              <InputNumber placeholder="Tinggi" />
            </Form.Item>
          </Form>

        </Card.Body>
      </Card>

      <Space>
        <Button>Batal</Button>
        <Button>Simpan & Arsipkan</Button>
        <Button className="btn-tridatu">Simpan & Tampilkan</Button>
      </Space>
      

      <style jsx global>{`
        :global(.card-add-product){
          margin-bottom: 20px;
        }
        :global(.ant-row.ant-form-item:last-of-type){
          margin-bottom: 10px;
        }
      `}</style>
    </>
  )
}

export default NewProduct
