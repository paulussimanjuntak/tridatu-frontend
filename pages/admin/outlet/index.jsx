import { useState } from 'react'
import { Form, Input, Button, Space, Upload } from 'antd'
import Card from 'react-bootstrap/Card'

import { formImage } from 'formdata/formImage'
import { imageValidation, uploadButton } from 'lib/imageUploader'

import AddStyleAdmin from 'components/Admin/addStyle'

const OutletInformation = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageList, setImageList] = useState(formImage)

  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="p-3 border-bottom">
          <h5 className="mb-0 fs-16-s">Tambah Informasi Outlet</h5>
        </Card.Body>
        <Card.Body className="p-3">

          <Form form={form} layout="vertical">
            <Form.Item label="Foto Outlet" className="mb-0" required>
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

          <Space>
            <Button className="btn-tridatu">Simpan</Button>
            <Button>Batal</Button>
          </Space>

        </Card.Body>
      </Card>


      <style jsx>{AddStyleAdmin}</style>
    </>
  )
}

export default OutletInformation
