import { Button } from 'antd'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const Password = () => {
  return(
    <>
      <Card>
        <Card.Header className="bg-transparent border-bottom">
          <h1 className="fs-16 mt-1 mb-0">Atur Password</h1>
          <small>
            Untuk keamanan akun Anda, mohon untuk tidak menyebarkan password Anda ke orang lain.
          </small>
        </Card.Header>
        <Card.Body>
          <Form>

            <Form.Row>
              <Form.Group as={Col} lg={8} md={8} sm={12}>
                <Form.Label>Password Saat Ini</Form.Label>
                <Form.Control type="password" placeholder="Password saat ini" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} lg={8} md={8} sm={12}>
                <Form.Label>Password Yang Baru</Form.Label>
                <Form.Control type="password" placeholder="Password yang baru" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} lg={8} md={8} sm={12}>
                <Form.Label>Konfirmasi Password</Form.Label>
                <Form.Control type="password" placeholder="Konfirmasi Password" />
              </Form.Group>
            </Form.Row>
            
           <Button className="btn-tridatu">Simpan</Button> 

          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Password
