import { Select } from 'antd'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import Container from 'react-bootstrap/Container'

const sortList = ['Semua', 'Belum dibaca']

const Notification = () => {
  return(
    <>
      <Container className="pt-4 pb-4 notification">
        <Row>
          <Col className="col-12 px-0 rounded h-100">
            <Card className="card-container">
              <Card.Header>
                <Row>
                  <Col className="align-self-center">
                    <span className="text-dark fw-500">Notifikasi</span>
                  </Col>
                  <Col className="d-none d-md-block">
                    <Form inline className="float-right">
                      <Form.Label className="my-1 mr-2 text-dark fs-14">
                        Filter:
                      </Form.Label>
                      <Select defaultValue={sortList[0]} style={{ width: 130 }} size="small">
                        {sortList.map(x => (
                          <Select.Option key={x} value={x}>{x}</Select.Option>
                        ))}
                      </Select>
                    </Form>
                  </Col>
                </Row>
              </Card.Header>

              <Card.Body className="p-0">
                {/* DIKIRIM */}
                <div className={`p-3 p-md-4 notification-item unread`}>
                  <p className="fs-15 fs-14-s fw-500 text-dark mb-2">
                    Pesananmu sedang dalam perjalanan ⛴
                    <span className="mx-2 text-secondary">•</span>
                    <span className="fs-12 font-weight-normal">16.30</span>
                  </p>
                  <small className="text-wrap mb-0 text-secondary fs-14 fs-12-s">
                    "Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih, M” telah dikirim. Lihat detail barang pesananmu di sini!
                  </small>
                </div>
                {/* DIKIRIM */}
                {/* DIPROSES */}
                <div className={`p-3 p-md-4 notification-item`}>
                  <p className="fs-15 fs-14-s fw-500 text-dark mb-2">
                    Pembayaranmu sudah kami terima
                    <span className="mx-2 text-secondary">•</span>
                    <span className="fs-12 font-weight-normal">13.30</span>
                  </p>
                  <small className="text-wrap mb-0 text-secondary fs-14 fs-12-s">
                    Tunggu ya, Pesanan anda sedang diproses...
                  </small>
                </div>
                {/* DIPROSES */}
                {/* BELUM BAYAR */}
                <div className={`p-3 p-md-4 notification-item`}>
                  <p className="fs-15 fs-14-s fw-500 text-dark mb-2">
                    Selesaikan Pembayaran Anda
                    <span className="mx-2 text-secondary">•</span>
                    <span className="fs-12 font-weight-normal">11 Okt</span>
                  </p>
                  <small className="text-wrap mb-0 text-secondary fs-14 fs-12-s">
                    Hi Paulus, batas waktu pembayaranmu di Tokopedia hampir habis. Silakan melakukan pembayaran Rp 94.200 + biaya layanan di Gerai (Indomaret, Alfamart/Alfamidi/Lawson, Kioson, Kantorpos, JNE) terdekat menggunakan kode pembayaran AD085156565673 sebelum 7 Oct 14:19.
                  </small>
                </div>
                {/* BELUM BAYAR */}
              </Card.Body>

            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        :global(.notification-item){
          background: white;
        }
        :global(.notification-item:last-child){
          border-bottom-left-radius: .20rem;
          border-bottom-right-radius: .20rem;
        }
        :global(.notification-item:not(:last-child)){
          border-bottom: 1px solid #dee2e6!important;
        }
        :global(.notification-item:hover, .notification-item.unread:hover){
          cursor: pointer;
          background-color: #f5f5f5;
        }
        :global(.notification-item.unread){
          background-color:#effaf3;
        }

        @media only screen and (max-width: 575px){
          :global(.notification.pt-4.pb-4){
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          :global(.notification .card.card-container){
            border: 0;
          }
        }
      `}</style>
    </>
  )
}

export default Notification
