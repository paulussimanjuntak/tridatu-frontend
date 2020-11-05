import { useState } from 'react'
import { Button, Popconfirm, message, Divider } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import AddAddressModal from 'components/Modal/AddAddress'

const Address = () => {
  const [showAddressModal, setShowAddressModal] = useState(false)

  const showAddressModalHandler = () => {
    setShowAddressModal(true)
  }

  const closeAddressModalHandler = () => {
    setShowAddressModal(false)
  }

  return(
    <>
      <Card className="card-container">
        <Card.Header className="bg-transparent border-bottom">
          <Row className="justify-content-between">
            <Col className="align-self-center">
              <h1 className="fs-16 mb-0">Alamat Saya</h1>
            </Col>
            <Col>
              <Button 
                onClick={showAddressModalHandler}
                className="btn-tridatu float-right align-self-center"
                icon={<i className="far fa-plus pr-2" />}
              >
                Tambah Alamat
              </Button>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          {[...Array(3)].map((_,i) => (
            <React.Fragment key={i}>
              <Row className="address-card">
                <Col lg={2}>
                  <div className="text-left">
                    <h4 className="fs-16 text-secondary mb-sm-0">Penerima</h4>
                    <p className="fs-14 mb-0 fw-500">Jhon Bakery</p>
                    <p className="fs-14 mb-lg-0">0812345678</p>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="text-left">
                    <h4 className="fs-16 text-secondary mb-sm-0">Alamat Penerima</h4>
                    <p className="fs-14 mb-0 fw-500">
                      Rumah {i === 0 && <Badge variant="primary">Utama</Badge>}
                    </p>
                    <p className="fs-14 mb-lg-0">Jl. By pass Ngurah Rai Komp Ruko Nusa Dua Nomor 23</p>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="text-left">
                    <h4 className="fs-16 text-secondary mb-sm-0">Daerah Penerima</h4>
                    <p className="fs-14 mb-lg-0">Kec. Abiansemal, Kota/Kab. Badung Bali, 80352</p>
                  </div>
                </Col>
                <Col lg={2}>
                  <div className="text-center">
                    <Button 
                      onClick={showAddressModalHandler}
                      icon={<i className="far fa-pen" />} 
                    />
                    <Popconfirm
                      title="Hapus alamat ini?"
                      onConfirm={() => message.success({
                        content: 'Berhasil dihapus!', 
                      })}
                      okText="Ya"
                      cancelText="Batal"
                      placement="bottomRight"
                      arrowPointAtCenter
                    >
                      <Button 
                        className="ml-2"
                        icon={<i className="far fa-trash-alt" />} 
                      />
                    </Popconfirm>
                  </div>
                </Col>
              </Row>
              <Divider className="d-last-none" />
            </React.Fragment>
          ))}
        </Card.Body>

      </Card>

      <AddAddressModal
        show={showAddressModal}
        submit={closeAddressModalHandler}
        close={closeAddressModalHandler}
      />

      <style jsx>{`
        :global(.d-last-none:last-of-type){
          display: none;
        }
      `}</style>
    </>
  )
}

export default Address
