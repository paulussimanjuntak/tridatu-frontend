import { useState, useEffect } from 'react'
import { Avatar, Select, Button, Upload } from 'antd'

import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

import { uploadButton, imagePreview, imageValidation } from 'lib/imageUploader'

const Account = () => {
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
          url: `https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`
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
      <div className="bg-light">
        <Container className="pt-4 pb-4">
          <Row>
            <Nav className="flex-column col-md-2 d-none d-lg-block pl-2 fs-14">
              <Nav.Link className="text-truncate text-dark align-middle text-decoration-none px-0 mb-3">
                <Avatar size="large" src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" />
                <span className="pl-1 align-middle">Jhon Bakery Handler</span>
              </Nav.Link>
              <Nav.Link eventKey="user" className="side-nav-link">
                <span>
                  <i className="far fa-user-circle mr-2" />
                  Akun Saya
                </span>
              </Nav.Link>

              <Nav.Link eventKey="order" className="side-nav-link">
                <span>
                  <i className="far fa-clipboard-list mr-2" />
                  Pesanan Saya
                </span>
              </Nav.Link>

              <Nav.Link eventKey="favorit" className="side-nav-link">
                <span>
                  <i className="far fa-heart mr-2" />
                  Favorit
                </span>
              </Nav.Link>

              <Nav.Link eventKey="address" className="side-nav-link">
                <span>
                  <i className="far fa-address-book mr-2" />
                  Daftar Alamat
                </span>
              </Nav.Link>

              <Nav.Link eventKey="password" className="side-nav-link">
                <span>
                  <i className="far fa-lock mr-2" />
                  Atur Password
                </span>
              </Nav.Link>

            </Nav>

            <Col lg={10} md={12} className="bg-white px-0 rounded h-100">
              <Card>
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
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" placeholder="Nama" />
                          </Form.Group>

                          <Form.Group as={Col} lg={6} md={6} sm={12}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col} lg={6} md={6} sm={12}>
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control type="number" placeholder="Nomor Telepon" />
                          </Form.Group>

                          <Form.Group as={Col} lg={6} md={6} sm={12}>
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Select className="w-100" placeholder="Pilih jenis kelamin">
                              <Select.Option value="Laki-laki">Laki-laki</Select.Option>
                              <Select.Option value="Perempuan">Perempuan</Select.Option>
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
                          beforeUpload={(file) => imageValidation(file, "www.google.com", "avatar", "formHeader")}
                        >
                          {avatarImage.value.length >= 1 ? null : uploadButton(loading)}
                        </Upload>
                        <Upload
                          onChange={onAvatarChangeHandler}
                          showUploadList={false}
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
            </Col>

          </Row>
        </Container>
      </div>

      <style jsx>{`
        :global(.side-nav-link){
          padding-left: 0;
          padding-right: 0;
          color: rgba(0, 0, 0, 0.65);
        }
        :global(.side-nav-link.active){
          color: rgba(0, 0, 0, 0.95);
          font-weight: 500;
        }
        :global(.side-nav-link:hover){
          color: rgba(0, 0, 0, 0.95);
        }

        :global(.border-right-profile){
          border-right: 1px solid #dee2e6!important;
        }

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

        @media only screen and (max-width: 992px){
          :global(.border-right-profile){
            border-right: 0!important;
          }
        }
      `}</style>
    </>
  )
}

export default Account
