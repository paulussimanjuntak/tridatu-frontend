import { Alert, Button } from 'antd'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const PromoSelected = ({ reset }) => {
  return(
    <>
      <Alert
        closable
        type="success"
        className="promo-success-selected"
        closeText={<i className="fas fa-times" />}
        afterClose={reset}
        message={
          <Row>
            <Col className="col-12 fs-12-s">
              <p className="mb-0 text-truncate promo-success-selected-title font-weight-bold">
                Kode promo : TDT-100K
              </p>
              <p className="mb-0 text-break">
                Kamu mendapatkan potongan sebesar Rp. 100.000
              </p>
            </Col>
          </Row>
        }
      />
    </>
  )
}

export const PromoButton = ({ disabled, show }) => {
  return(
    <>
      <Button 
        block
        size="large"
        className="text-left text-secondary fs-14 text-truncate fs-12-s"
        disabled={disabled}
        onClick={show}
      >
        <i className="fad fa-badge-percent text-tridatu mr-2 fa-lg" />
        <span className="font-weight-bold">Pakai kode promo</span>
        <i className="fas fa-angle-right" 
          style={{
            right: '15px',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
        />
      </Button>
    </>
  )
}
