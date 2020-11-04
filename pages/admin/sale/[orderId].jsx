import { Table, Row, Col } from 'antd'
import Card from 'react-bootstrap/Card'
import Media from 'react-bootstrap/Media'

import { dataSourceDetail, columnsDetail } from 'data/salesAdmin'
import formatNumber from 'lib/formatNumber'

import AddStyleAdmin from 'components/Admin/addStyle'

const OrderDetail = () => {
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
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm card-add-product mb-0">
        <Card.Body className="border-bottom p-4">
          <Media className="detail-order-media">
            <i className="fal fa-money-check-alt align-self-start mr-3 text-tridatu w-22" />
            <Media.Body className="media-with-table">
              <h5 className="fs-16">Informasi Pembayaran</h5>
              <Table dataSource={dataSourceDetail} columns={columnsDetail} pagination={false} size="middle" scroll={{ x: '100vh', y: 300 }} />
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
