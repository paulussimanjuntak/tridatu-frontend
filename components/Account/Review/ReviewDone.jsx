import { Rate } from 'antd'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'

const desc = ['Sangat Buruk', 'Buruk', 'Cukup', 'Baik', 'Sangat Baik'];

const ReviewDone = () => {
  return(
    <>
      <Card className="review-list">
        <Card.Header>
          <Row className="justify-content-between text-dark fs-12-s">
            <Col sm={12} md={6}>
              <span>INV/20191002/XIX/X/375442105</span>
            </Col>
            <Col sm={12} md={6}>
              <span className="float-md-right text-secondary">Pesanan diterima: 09 Okt 2019, 00:51</span>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body>
          <div className="media">
            <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" className="align-self-start mr-3 cart-item-img" alt="Tridatu Bali ID" />
            <div className="media-body">
              <h5 className="mt-0 fs-14-s fs-16 truncate-2 mb-0">
                Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih
              </h5>
              <Rate 
                value={5}
                allowClear={false}
                disabled={true}
                className="mr-2"
              />
              <br className="d-block d-md-none" />
              <span className="text-black-50 fs-12-s">{desc[5-1]}</span>

              {/*DESKTOP*/}
              <div className="d-none d-md-block">
                <p className="text-black-50 fs-12-s mb-0">
                  Produk sampai dengan rapih, baju nya juha berkualitas banget, penjual ramah
                </p>
                <small className="text-black-50 fs-10-s">09 Okt 2019, 01:10</small>
              
                <Alert variant="secondary" className="mt-3 response-seller">
                  <p className="font-weight-bold mb-0 fs-12-s">Respon penjual: </p>
                  {/*<small className="text-black-50">Hari ini</small>*/}
                  <p className="mb-0 text-secondary mt-2 fs-12-s">
                    Hai kakak, terimakasih untuk penilaiannya ya kak silahkan diorder kembali happy shopping.
                  </p>
                </Alert>
              </div>
              {/*DESKTOP*/}

            </div>
          </div>

          {/*MOBILE*/}
          <div className="d-block d-md-none">
            <p className="text-black-50 fs-12-s mb-0 mt-3">
              Produk sampai dengan rapih, baju nya juha berkualitas banget, penjual ramah
            </p>
            <small className="text-black-50 fs-10-s">09 Okt 2019, 01:10</small>

            <Alert variant="secondary" className="mt-3 response-seller">
              <p className="font-weight-bold mb-0 fs-12-s">Respon penjual: </p>
              <p className="mb-0 text-secondary mt-2 fs-12-s">
                Hai kakak, terimakasih untuk penilaiannya ya kak silahkan diorder kembali :)) happy shopping.
              </p>
            </Alert>
          </div>
          {/*MOBILE*/}
        </Card.Body>
      </Card>
    </>
  )
}

export default ReviewDone
