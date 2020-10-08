import { useState } from 'react'
import { Rate, Button, Space } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const TEXT = 'Bagaimana kualitas produk ini?'
const desc = ['Sangat Buruk', 'Buruk', 'Cukup', 'Baik', 'Sangat Baik'];

const ReviewWating = () => {
  const [showReview, setShowReview] = useState(false)
  const [rate, setRate] = useState({ value: 0, text: TEXT })

  const rateChangeHandler = e => {
    setShowReview(true)
    const data = {
      ...rate,
      value: e,
      text: desc[e-1]
    }
    setRate(data)
  }

  const rateHoverHandler = e => {
    let text = ""
    if(e == undefined && rate.value == 0) text = TEXT
    if(e == undefined && rate.value !== 0) text = desc[rate.value-1]
    if(e !== undefined) text = desc[e-1]
    const data = {
      ...rate,
      text: text
    }
    setRate(data)
  }

  const onCancelHandler = () => {
    setShowReview(false)
    const data = {
      ...rate,
      value: 0,
      text: TEXT
    }
    setRate(data)
  }

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
              <h5 className="mt-0 fs-14-s fs-16 truncate-2">
                Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih
              </h5>
              <p className="text-secondary mb-1 fs-12-s d-none d-md-block">
                Bagaimana kualitas produk ini secara keseluruhan?
              </p>
              <Form>
                <Form.Group className="mb-0">
                  {/*MOBILE*/}
                  <p className="d-block d-md-none text-black-50 fs-12-s mb-0">{rate.text}</p>
                  {/*MOBILE*/}
                  <Rate 
                    value={rate.value}
                    allowClear={false}
                    onChange={rateChangeHandler}
                    onHoverChange={rateHoverHandler}
                    className="mr-2"
                  />
                  {/*MOBILE*/}
                  <br className="d-block d-md-none" />
                  {/*MOBILE*/}
                  {/*DESKTOP*/}
                  <span className="d-none d-md-inline-block text-black-50 fs-12-s">{rate.text}</span>
                </Form.Group>
                <AnimatePresence>
                  {showReview && (
                    <motion.div
                      className="d-none d-md-block"
                      transition={{ duration: ".3" }}
                      initial={{ opacity: 0, height: "0" }}
                      animate={{ opacity: 1, height: "100%" }}
                      exit={{ height: "0", opacity: 0 }}
                    >
                      <Form.Group className="mt-3">
                        <Form.Label className="fs-12-s">Berikan ulasan untuk produk ini</Form.Label>
                        <Form.Control 
                          as="textarea" 
                          rows={3} 
                          placeholder="Tulis deskripsi Anda mengenai produk ini..."
                        />
                      </Form.Group>
                      <Space>
                        <Button className="btn-tridatu">Simpan</Button>
                        <Button onClick={onCancelHandler}>Batal</Button>
                      </Space>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/*DESKTOP*/}
              </Form>
            </div>
          </div>

          {/*MOBILE*/}
          <AnimatePresence>
            {showReview && (
              <motion.div
                className="d-block d-md-none"
                transition={{ duration: ".3" }}
                initial={{ opacity: 0, height: "0" }}
                animate={{ opacity: 1, height: "100%" }}
                exit={{ height: "0", opacity: 0 }}
              >
                <Form.Group className="mt-3">
                  <Form.Label className="fs-12-s">Berikan ulasan untuk produk ini</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Tulis deskripsi Anda mengenai produk ini..."
                  />
                </Form.Group>
                <Space>
                  <Button className="btn-tridatu">Simpan</Button>
                  <Button onClick={onCancelHandler}>Batal</Button>
                </Space>
              </motion.div>
            )}
          </AnimatePresence>
          {/*MOBILE*/}
        </Card.Body>
      </Card>

    </>
  )
}

export default ReviewWating
