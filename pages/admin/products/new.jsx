import { useState } from 'react'
import { Form, Input, Select, InputNumber, Divider, Button, Cascader } from 'antd'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

import { categoryData } from 'components/Header/categoryData'
const brandData = ['Adidas', 'Billabong', 'Bershka', 'Converse', 'Deus', 'GAP', 'Giordano', 'Gucci', 'H&M', 'Mango', 'New Balance', 'Pull & Bear', 'Louis Vuitton', 'Levis', 'Nike', 'Top Man', 'Uniqlo', 'Supreme', 'Zara']

const NewProduct = () => {
  const [isAddBrand, setIsAddBrand] = useState(false)
  const [brandList, setBrandList] = useState(brandData)
  const [colorList, setColorList] = useState([])
  const [sizeList, setSizeList] = useState([])
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

  console.log(colorList)

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

          <Form
            form={form}
            layout="vertical"
          >
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

          <Form
            form={form}
            layout="vertical"
          >

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

            <Form.Item label="Daftar Produk">
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Warna</th>
                    <th>Ukuran</th>
                    <th>Stok</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeList.map(size => (
                    <tr key={size}>
                      {colorList.map(color => (
                        <td key={color}>{color}</td>
                      ))}
                      <td>{size}</td>
                      <td>
                        <InputNumber className="border-0 p-0" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form.Item>

            <Form.Item label="Harga" required>
              <InputNumber
                className="w-100"
                formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={value => value.replace(/\Rp\s?|(\.*)/g, '')}
              />
            </Form.Item>
            <Form.Item label="Stok" required>
              <InputNumber
                className="w-100"
                defaultValue={0}
                min={0} max={100}
              />
            </Form.Item>
          </Form>

        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Pengiriman</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form
            form={form}
            layout="vertical"
          >
            <Form.Item label={<>Berat <span className="text-secondary pl-1"> /gr</span></>} required>
              <InputNumber className="w-100" />
            </Form.Item>
          </Form>

        </Card.Body>
      </Card>

      <style jsx global>{`
        :global(.card-add-product:not(:last-of-type)){
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
