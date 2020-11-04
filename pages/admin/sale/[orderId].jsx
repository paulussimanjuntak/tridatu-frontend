import { useState } from 'react'
import { Table, Row, Col, Timeline, Input, Modal, Button, Space } from 'antd'

import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'

import { dataSourceDetail, columnsDetail } from 'data/salesAdmin'
import formatNumber from 'lib/formatNumber'

import AddStyleAdmin from 'components/Admin/addStyle'

const OrderDetail = () => {
  const [showModal, setShowModal] = useState(false)

  const showModalHandler = () => setShowModal(true)
  const closeModalHandler = () => setShowModal(false)
  
  return(
    <>
      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="border-bottom p-4">
          <Media className="detail-order-media">
            <i className="fal fa-clipboard-list align-self-start mr-3 text-tridatu w-22" />
            <Media.Body>
              <h5 className="fs-16">Belum Bayar</h5>
              <p className="fs-14 text-content">
                Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai 03-11-2020. Silakan tunggu sampai pembayaran dikonfirmasi sebelum mengirimkan barang.
              </p>
            </Media.Body>
          </Media>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="border-bottom p-4">
          <Media className="detail-order-media">
            <i className="fal fa-hashtag align-self-start mr-3 text-tridatu w-22" />
            <Media.Body>
              <h5 className="fs-16">No. Invoice</h5>
              <p className="fs-14 text-content">
                INV/20191002/XIX/X/375442105
              </p>
            </Media.Body>
          </Media>
          <Media className="detail-order-media">
            <i className="fal fa-map-marker-alt align-self-start mr-3 text-tridatu w-22" />
            <Media.Body>
              <h5 className="fs-16">Alamat Pengiriman</h5>
              <p className="fs-14 text-content">
                Jhony Bakerey Suardhana, (+62) 8123451234
              </p>
              <p className="fs-14 text-content">
                Jalan Pulau Suarhana Blok Santhy No 2, KOTA BADUNG, KUTA SELATAN, BALI, ID, 80622
              </p>
            </Media.Body>
          </Media>
          <Media className="detail-order-media">
            <i className="fal fa-shipping-fast align-self-start mr-3 text-tridatu w-22" />
            <Media.Body>
              <h5 className="fs-16">Informasi Jasa Kirim</h5>
              <p className="fs-14 text-content">
                J&T Express
              </p>
            </Media.Body>
          </Media>

          {/* Hanya saat pembayaran telah dikonfirmasi */}
          <Media className="detail-order-media">
            <i className="fal fa-conveyor-belt-alt align-self-start mr-3 text-tridatu w-22" />
            <Media.Body>
              <h5 className="fs-16">No. Resi</h5>
              <Input placeholder="Masukkan No. Resi" />
              <Button className="btn-tridatu mt-2" size="sm" onClick={showModalHandler}>Simpan</Button>
            </Media.Body>
          </Media>

        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product">
        <Card.Body className="border-bottom p-4">
          <Media className="detail-order-media">
            <i className="fal fa-money-check-alt align-self-start mr-3 text-tridatu w-22" />
            <Media.Body className="media-with-table">
              <h5 className="fs-16">Informasi Pembayaran</h5>
              <Table dataSource={dataSourceDetail} columns={columnsDetail} pagination={false} size="middle" scroll={{ x: '100vh', y: 300 }} className="mt-3" />
            </Media.Body>
          </Media>
          <Row justify="end" gutter={[50, 16]}>
            <Col span={12} className="border-right">
              <p className="text-right fs-14">Total Pesanan</p>
              <p className="text-right fs-14">Ongkos Kirim</p>
              <p className="text-right fs-14">Voucher Tridatu</p>
              <p className="text-right fs-14-s fs-20-m mb-0 font-weight-bold">Total Penjualan</p>
            </Col>
            <Col className="border-left text-right">
              <p className="text-right fs-14">Rp. {formatNumber(530000)}</p>
              <p className="text-right fs-14">Rp. {formatNumber(30000)}</p>
              <p className="text-right fs-14">Rp. {formatNumber(0)}</p>
              <p className="text-right fs-14-s fs-20-m text-tridatu mb-0 font-weight-bold">Rp. {formatNumber(560000)}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product mb-0">
        <Card.Body className="border-bottom p-4">
          <Media className="detail-order-media">
            <i className="fal fa-file-alt align-self-start mr-3 text-tridatu w-22" />
            <Media.Body className="media-with-table">
              <h5 className="fs-16">Riwayat Pesanan</h5>
              <Timeline reverse={true} className="mt-4">
                <Timeline.Item color="grey">
                  <div className="text-content">
                    <p className="fw-500 mb-0">Pesanan Dibuat</p>
                    <small>04-11-2020 15:27</small>
                  </div>
                </Timeline.Item>
                <Timeline.Item color="grey">
                  <div className="text-content">
                    <p className="fw-500 mb-0">Pembayaran sudah diverifikasi.</p>
                    <small>04-11-2020 20:27</small>
                  </div>
                </Timeline.Item>
                <Timeline.Item color="grey">
                  <div className="text-content">
                    <p className="fw-500 mb-0">Pesanan sedang diproses.</p>
                    <small>05-11-2020 10:30</small>
                  </div>
                </Timeline.Item>
                <Timeline.Item color="grey">
                  <div className="text-content">
                    <p className="fw-500 mb-0">Pesanan telah dikirim.</p>
                    <small>05-11-2020 14:10</small>
                  </div>
                </Timeline.Item>
              </Timeline>
            </Media.Body>
          </Media>
        </Card.Body>
      </Card>

      <Modal
        centered
        title={false}
        footer={false}
        closable={false}
        visible={showModal}
        zIndex={3000}
        width={450}
      >
        <Media className="detail-order-media px-1 pt-3">
          <i className="fal fa-exclamation-circle align-self-start mr-3 fa-2x text-warning" />
          <Media.Body>
            <h5 className="fs-16">Apakah kamu yakin?</h5>
            <p className="fs-14">Dengan menyimpan No. Resi menyatakan bahwa barang telah dikirimkan oleh penjual, dan status pesanan akan berubah menjadi <b>Dikirim</b>.</p>

            <Space className="float-right mt-2">
              <Button onClick={closeModalHandler}>Batal</Button>
              <Button type="primary" onClick={closeModalHandler}>Lanjutkan</Button>
            </Space>

          </Media.Body>
        </Media>
      </Modal>

      <style jsx>{AddStyleAdmin}</style>
      <style jsx>{`
        .text-content{
          color: #000000b3;
          margin-bottom: 0;
        }
        :global(.detail-order-media:not(:last-of-type)){
          margin-bottom: 1.5rem;
        }
        :global(.media-with-table){
          width: calc(100% - 24px - 13px);
        }
        .w-22{
          width: 22px;
        }
      `}</style>
    </>
  )
}

export default OrderDetail
