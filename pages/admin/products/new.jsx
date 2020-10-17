import { Form, Input, Select, InputNumber } from 'antd'
import Card from 'react-bootstrap/Card'

const brandList = ['Adidas', 'Billabong', 'Bershka', 'Converse', 'Deus', 'GAP', 'Giordano', 'Gucci', 'H&M', 'Mango', 'New Balance', 'Pull & Bear', 'Louis Vuitton', 'Levis', 'Nike', 'Top Man', 'Uniqlo', 'Supreme', 'Zara']

const NewProduct = () => {
  const [form] = Form.useForm();

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
            <Form.Item label="Brand">
              <Select
                showSearch
                placeholder="Buat Brand"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
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
