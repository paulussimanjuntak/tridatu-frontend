import { useState, useEffect } from 'react'
import { Select, Button, Upload, InputNumber, Input } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import { uploadButton, imagePreview, imageValidation } from 'lib/imageUploader'

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState({
    image: { value: [], isValid: true, message: null }
  })

  const onAvatarChangeHandler = ({file: newFile}) => {
    const tmp = []
    tmp.push(newFile)
    const data = {
      ...avatar, 
      image: {value: tmp, isValid: true, message: null}
    }
    setAvatar(data)
  }

  useEffect(() => {
    const avatarData = {
      image: { 
        value: [{
          uid: -Math.abs(Math.random()),
          url: `https://www.inibaru.id/media/4608/large/normal/531b6a64-631b-4bd2-aa0b-9204707eb18d__large.jpg`
        }], 
        isValid: true, 
        message: null 
      },
    }
    setAvatar(avatarData)
  },[])

  const avatarImage = avatar.image;

  return(
    <>
      <Card className="card-container">
        <Card.Header className="bg-transparent border-bottom">
          <h1 className="fs-16 mt-1 mb-0">Akun Saya</h1>
          <small>
            Kelola informasi profil Anda untuk mengontrol dan melindungi akun anda
          </small>
        </Card.Header>
        <Row noGutters>
          <Col lg={8} className="border-right-profile fs-14 order-lg-1 order-md-12 order-12">
            <Card.Body>
              <Form>

                <Form.Row>
                  <Form.Group as={Col} lg={6} md={6} sm={12}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                  </Form.Group>

                  <Form.Group as={Col} lg={6} md={6} sm={12}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email@example.com" disabled />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} lg={6} md={6} sm={12}>
                    <Form.Label>Nomor Telepon</Form.Label>
                    {/*
                    <InputNumber
                      min={0}
                      max={100}
                      formatter={value => `+62${value}`}
                      parser={value => value.replace('+62', '')}
                      className="w-100"
                    />
                    */}
                    {/* <Form.Control type="number" placeholder="Nomor Telepon" /> */}
                    <Input addonBefore="+62" placeholder="Nomor Telepon" className="input-h-35" />
                  </Form.Group>

                  <Form.Group as={Col} lg={6} md={6} sm={12}>
                    <Form.Label>Jenis Kelamin</Form.Label>
                    <Select className="w-100" placeholder="Pilih jenis kelamin">
                      <Select.Option value="Laki-laki">Laki-laki</Select.Option>
                      <Select.Option value="Perempuan">Perempuan</Select.Option>
                      <Select.Option value="Lainnya">Lainnya</Select.Option>
                    </Select>
                  </Form.Group>
                </Form.Row>
                
               <Button className="btn-tridatu">Simpan</Button> 

              </Form>
            </Card.Body>
          </Col>

          <Col lg={4} className="text-center order-lg-12 order-md-1 order-1 align-self-center">
            <Card className="border-0">
              <Card.Body>
                <Upload
                  accept="image/*"
                  listType="picture-card"
                  className="avatar-uploader"
                  onPreview={imagePreview}
                  fileList={avatarImage.value}
                  showUploadList={{showRemoveIcon: false, showPreviewIcon: true}}
                >
                  {avatarImage.value.length >= 1 ? null : uploadButton(loading)}
                </Upload>
                <Upload
                  showUploadList={false}
                  onChange={onAvatarChangeHandler}
                  beforeUpload={(file) => imageValidation(file, "file", "/users/update-avatar", "put", () => setLoading())}
                >
                  <Button>Pilih Foto</Button>
                </Upload>
                <p className="fs-12 mb-0 mt-3 text-secondary mt-0">
                  Ukuran gambar: maks. 4 MB
                </p>
                <p className="fs-12 text-secondary mt-0">
                  Format gambar: .JPEG, .JPG, .PNG
                </p>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Card>

      <style jsx>{`
        :global(.avatar-uploader .ant-upload){
          vertical-align: middle;
          border-radius: 50%;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        :global(.avatar-uploader .ant-upload-list-picture-card-container){
          margin-right: 0;
          border-radius: 50%;
        }
        :global(.avatar-uploader .ant-upload-list-item-info,
                .avatar-uploader .ant-upload-list-picture-card .ant-upload-list-item-info::before){
          border-radius: 50%;
        }
        :global(.avatar-uploader .ant-upload-list-picture-card .ant-upload-list-item){
          padding: 5px;
          border-radius: 50%;
        }

        :global(.border-right-profile){
          border-right: 1px solid #dee2e6!important;
        }

        :global(.input-h-35 .ant-input){
          height: 35px;
        }

        @media only screen and (max-width: 992px){
          :global(.border-right-profile){
            border-right: 0!important;
          }
        }
      `}</style>
    </>
  )
}

export default Profile
