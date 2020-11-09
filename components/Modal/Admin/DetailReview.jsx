import { Modal, Button, Row, Col, Avatar, Rate, Input } from 'antd'
import Card from 'react-bootstrap/Card'

const DetailReview = ({ show, close, submit, data }) => {

  const { customer, product, rating, comment, reply } = data

  return(
    <>
      <Modal
        centered
        title="Detail Ulasan"
        visible={show}
        onOk={submit}
        onCancel={close}
        zIndex={3000}
        closeIcon={<i className="fas fa-times" />}
        width={600}
        className="modal-rad-10"
        footer={reply === null ? [
          <Button key="back" onClick={close}>
            Batal
          </Button>,
          <Button key="submit" type="primary" className="btn-tridatu" onClick={submit}>
            Kirim
          </Button>,
        ] : false}
      >
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={12} md={12} className="text-truncate">
            <p className="title-detail-review">Pembeli</p>
            <Avatar src={customer.avatar} /> <span>{customer.name}</span>
          </Col>
          <Col xs={12} sm={12} md={12} className="text-truncate">
            <p className="title-detail-review">Produk</p>
            <span>{product.name}</span>
          </Col>
          <Col xs={12} sm={12} md={12}>
            <p className="title-detail-review">Penilaian</p>
            <Rate
              allowHalf
              disabled
              defaultValue={rating}
              className="fs-14"
            />
          </Col>
          <Col xs={12} sm={12} md={12}>
            <p className="title-detail-review">Variasi</p>
            <span>{product.color}, {product.size}</span>
          </Col>
        </Row>

        <p className="title-detail-review">Komentar</p>
        <Card className="border-0 bg-light comment-card">
          <Card.Body className="p-2">
            {comment}
          </Card.Body>
        </Card>

        {reply === null ? (
          <>
            <p className="title-detail-review">Balas</p>
            <Card className="border-0 comment-card">
              <Input.TextArea
                placeholder="Balas ulasan disini"
                autoSize={{ minRows: 2, maxRows: 2 }}
              />
            </Card>
          </>
        ) : (
          <>
            <p className="title-detail-review">Balasanmu</p>
            <Card className="border-0 bg-light comment-card">
              <Card.Body className="p-2">
                {reply}
              </Card.Body>
            </Card>
          </>
        )}
      </Modal>

      <style jsx>{`
        .title-detail-review{
          font-size: 12px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.54);
          margin-bottom 5px;
        }
        :global(.comment-card){
          height: 100%;
          overflow: scroll;
          max-height: 110px;
          white-space: pre-line;
          margin-bottom: 15px;
        }
        :global(.comment-card:last-of-type){
          margin-bottom: 0px;
        }
      `}</style>
    </>
  )
}

export default DetailReview
