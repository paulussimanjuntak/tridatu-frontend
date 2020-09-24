import { useState } from 'react'
import { Modal, Rate, InputNumber, Button, Select, Tabs, Progress, Breadcrumb } from "antd";
import { Comment, Avatar, List, Input } from 'antd';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import Slider from "react-slick";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

import ImageGallery from 'react-image-gallery'

import Pagination from "components/Pagination";
import UlasanContainer from 'components/Card/Ulasan'
import ShareModal from 'components/Card/ShareModal'
import CardProduct from "components/Card/Product";

const CardProductMemo = React.memo(CardProduct);

import { renderLeftNav, renderRightNav, renderFullscreenButton } from 'components/Products/ImageGalleryButton'
import { brandSettings } from "lib/slickSetting";

import PHOTOS from 'components/Products/photos'

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1)
  const [showShareModal, setShowShareModal] = useState(false)

  const quantityHandler = (e, val) => {
    if(val == "input"){
      setQuantity(e)
    }
    if(val === "min"){
      if(quantity == 1) e.stopPropagation()
      else setQuantity(quantity-1)
    }
    if(val === "plus"){
      setQuantity(quantity+1) 
    }
  }

  return(
    <>
      <Container className="pt-4 pb-2">
        <Row className="mb-3">
          <Col className="col-12">
            <Breadcrumb>
              <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
              <Breadcrumb.Item href="/products">Baju</Breadcrumb.Item>
              <Breadcrumb.Item>Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          {/* POTHOS OF PRODUCTS */}
          <Col lg={6} className="product-images">
            <ImageGallery
              items={PHOTOS} 
              showPlayButton={false}
              useBrowserFullscreen={false}
              renderLeftNav={renderLeftNav}
              renderRightNav={renderRightNav}
              renderFullscreenButton={renderFullscreenButton}
            />
          </Col>
          {/* POTHOS OF PRODUCTS */}

          <Col lg={6}>
            {/* TITLE PRODUCTS INFORMATION */}
            <div className="header-product">
              <h1 className="header-product-title">Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih</h1>
              <div className="header-product-rating">
                <Rate
                  className="header-product-rating-rate"
                  allowHalf
                  disabled
                  defaultValue={5}
                />
                <span className="header-product-rating-detail">
                  116 Ulasan • 127 Terjual • 169x Dilihat
                </span>
              </div>
            </div>
            {/* TITLE PRODUCTS INFORMATION */}

            {/* PRICE PRODUCTS INFORMATION */}
            <div className="media info-product">
              <h5 className="info-product-left">Harga</h5>
              <div className="media-body info-product-body">
                {/* <h5 className="info-product-body-title">Top-aligned media</h5> */}
                <div className="fs-14 font-weight-light">
                  {/*
                  <span className="info-product-body-price-disc">
                    <s>Rp. 150.000</s>
                  </span>
                  <br />
                  */}
                  <span className="info-product-body-price font-weight-bold h6 fs-14-s">Rp. 105.000</span>
                </div>
              </div>
            </div>
            {/* PRICE PRODUCTS INFORMATION */}

            {/* QUANTITY PRODUCTS INFORMATION */}
            <div className="media info-product">
              <h5 className="info-product-left">Jumlah</h5>
              <div className="media-body info-product-body">
                <div className="mb-2">
                  <Button 
                    disabled={quantity == 1}
                    icon={<i className="far fa-minus" />} 
                    onClick={(e) => quantityHandler(e, 'min')} 
                  />
                  <InputNumber 
                    size="middle"
                    className="mx-2" 
                    min={1} 
                    value={quantity} 
                    onChange={(e) => quantityHandler(e, 'input')} 
                  />
                  <Button 
                    icon={<i className="far fa-plus" />} 
                    onClick={(e) => quantityHandler(e, 'plus')} 
                  />
                </div>
                <span className="fs-14">
                  Tersedia 12 pcs
                </span>
              </div>
            </div>
            {/* QUANTITY PRODUCTS INFORMATION */}

            {/* COLOR PRODUCTS INFORMATION */}
            <div className="media info-product">
              <h5 className="info-product-left">Warna</h5>
              <div className="media-body info-product-body">
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} lg={4} className="mb-0">
                      <Select placeholder="Pilih warna" className="w-100">
                        <Select.Option value="1">Hitam</Select.Option>
                        <Select.Option value="3">Coklat</Select.Option>
                        <Select.Option value="2">Hijau</Select.Option>
                      </Select>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </div>
            </div>
            {/* COLOR PRODUCTS INFORMATION */}

            {/* SIZE PRODUCTS INFORMATION */}
            <div className="media info-product">
              <h5 className="info-product-left">Ukuran</h5>
              <div className="media-body info-product-body">
                <Form>
                  <Form.Row>
                    <Form.Group as={Col} lg={4} className="mb-0">
                      <Select placeholder="Pilih ukuran" className="w-100">
                        <Select.Option value="1">XS</Select.Option>
                        <Select.Option value="3">S</Select.Option>
                        <Select.Option value="2">M</Select.Option>
                        <Select.Option value="4">L</Select.Option>
                        <Select.Option value="5">XL</Select.Option>
                        <Select.Option value="6">XXL</Select.Option>
                      </Select>
                    </Form.Group>
                  </Form.Row>
                </Form>
              </div>
            </div>
            {/* SIZE PRODUCTS INFORMATION */}

            {/* PRODUCTS INFORMATION */}
            <div className="media info-product">
              <h5 className="info-product-left">Info produk</h5>
              <div className="media-body info-product-body">
                <div className="d-flex">
                  <div className="info-item">
                    <p>Berat</p>
                    <p>100gr</p>
                  </div>
                  <div className="info-item">
                    <p>Kondisi</p>
                    <p>Baru</p>
                  </div>
                  <div className="info-item">
                    <p>Kategori</p>
                    <p>Baju</p>
                  </div>
                </div>
              </div>
            </div>
            {/* PRODUCTS INFORMATION */}

            {/* ACTIONS PRODUCTS INFORMATION */}
            <div className="info-product">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} lg={6} className="mb-0 col-auto col-sm-auto col-md-auto">
                    <Button 
                      size="large"
                      className="btn-tridatu w-100 p-l-8-s p-r-8-s fs-14-s"
                      icon={<i className="far fa-cart-plus p-r-10 p-r-8-s" />} 
                    >Tambah Ke Keranjang</Button>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-0 col-auto">
                    <Button 
                      size="large"
                      icon={<i className="fal fa-heart va-inherit" />} 
                    />
                  </Form.Group>
                  <Form.Group as={Col} className="mb-0">
                    <Button 
                      onClick={() => setShowShareModal(true)}
                      size="large"
                      icon={<i className="fal fa-share-square va-inherit" />} 
                    />
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
            {/* ACTIONS PRODUCTS INFORMATION */}

          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Deskripsi" key="1">
                <p>
                  1 pcs Rp 40.000<br />3pcs Rp 105.000 (motif boleh campur)<br /><br />Caranya : Klik 'BELI' di 1 Gambar saja, Lalu isi Kuantitinya 3pcs. Maka otomatis harga akan berubah menjadi 35rb.<br />Kemudian sebutkan nama motif yang ingin kamu order di kolom keterangan. Terima Kasih.<br /><br />Ukuran : ALL SIZE FIT TO L<br />LD (lingkar dada): 96 cm<br/>P (panjang): 65 cm<br />Bahan: Cotton combed 30s<br /><br />Jika masih belum mengerti untuk mendapatkan hrga 3pcs 105.000 dgn motif campur silahkan order melalui<br />line: @ellipses.inc (pakai @ ya) / Pin: D47B1DA4 WA : 081932547692<br /><br />Follow IG: @ellipses.inc</p>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Ulasan (20)" key="2">
                <Row className="mt-4">
                  <Col className="col-auto align-self-center mr-3">
                    <div className="d-inline-flex">
                      <CircularProgressbar 
                        className="wh-80 mr-3" 
                        strokeWidth={5} 
                        value={4.5} 
                        text={4.5} 
                        minValue={0} 
                        maxValue={5} 
                        styles={buildStyles({
                          pathColor: "#fbbc04",
                          trailColor: "#f5f5f5",
                        })}
                      />
                      <div className="align-self-center">
                        <Rate
                          className="header-product-rating-rate"
                          allowHalf
                          disabled
                          value={5}
                        />
                        <p className="font-weight-light mb-0">dari 20 ulasan</p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} md={6}>
                    <div className="ulasan-rating">
                      <Rate disabled
                        className="ulasan-rating-rate"
                        count={1} value={1}
                      />
                      <span className="ulasan-rating-text">5</span>
                      <Progress 
                        className="ulasan-star-rating" 
                        percent={80} 
                        strokeWidth="5px" 
                        format={percent => `${percent} %`}
                      />
                    </div>
                    <div className="ulasan-rating">
                      <Rate disabled
                        className="ulasan-rating-rate"
                        count={1} value={1}
                      />
                      <span className="ulasan-rating-text">4</span>
                      <Progress 
                        className="ulasan-star-rating" 
                        percent={100} 
                        strokeWidth="5px" 
                        format={percent => `${percent} %`}
                      />
                    </div>
                    <div className="ulasan-rating">
                      <Rate disabled
                        className="ulasan-rating-rate"
                        count={1} value={1}
                      />
                      <span className="ulasan-rating-text">3</span>
                      <Progress 
                        className="ulasan-star-rating" 
                        percent={90} 
                        strokeWidth="5px" 
                        format={percent => `${percent} %`}
                      />
                    </div>
                    <div className="ulasan-rating">
                      <Rate disabled
                        className="ulasan-rating-rate"
                        count={1} value={1}
                      />
                      <span className="ulasan-rating-text">2</span>
                      <Progress 
                        className="ulasan-star-rating" 
                        percent={30} 
                        strokeWidth="5px" 
                        format={percent => `${percent} %`}
                      />
                    </div>
                    <div className="ulasan-rating">
                      <Rate disabled
                        className="ulasan-rating-rate"
                        count={1} value={1}
                      />
                      <span className="ulasan-rating-text">1</span>
                      <Progress 
                        className="ulasan-star-rating" 
                        percent={90} 
                        strokeWidth="5px" 
                        format={percent => `${percent} %`}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col><h5 className="text-secondary">Daftar Ulasan</h5></Col>
                </Row>
                <Row className="mt-3">
                  {[...Array(3)].map((_,i) => (
                    <Col className="col-12 border-bottom" key={i}>
                      <UlasanContainer />
                    </Col>
                  ))}
                </Row>
                <Row className="mt-3">
                  <Col className="align-self-center text-right">
                    <Pagination />
                  </Col>
                </Row>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Diskusi (3)" key="3">
                <section>

                </section>
              </Tabs.TabPane>

            </Tabs>
          </Col>
        </Row>

        <section className="mt-3 border-top pt-4 recomend-section">
          <h4 className="fs-20-s mb-4">Rekomendasi untuk mu</h4>
          <Slider {...brandSettings}>
            {[...Array(10)].map((_, i) => (
              <Col key={i} className="px-0">
                <CardProductMemo />
              </Col>
            ))}
          </Slider>
        </section>
      </Container>

      <Modal
        centered
        footer={null}
        visible={showShareModal}
        onCancel={() => setShowShareModal(false)}
        title="Bagikan"
        closeIcon={ <i className="fas fa-times" /> }
        bodyStyle={{padding: "10px 0px"}}
        width="400px"
      >
        <ShareModal link="www.google.com" />
      </Modal>

      <style jsx>{`
        :global(.image-gallery-image){
          width: 443px;
          height: 100%;
        }
        .header-product{
          margin-bottom: 20px;
        }
        .header-product-title{
          font-size: 22px;
          margin-bottom: 10px;
        }
        .header-product-rating{
          font-size: 14px;
          margin-bottom: 10px;
        }
        :global(.header-product-rating-rate){
          font-size: 14px;
          margin-left: 0px;
        }
        .header-product-rating-detail{
          font-size: 14px;
          padding-left: 5px;
          vertical-align: middle;
        }

        .info-product{
          padding: 20px 0px;
          border-top: 1px solid rgb(229, 231, 233);
        }
        .info-product-left{
          font-size: 14px;
          text-transform: uppercase;
          color: #6c757d; 
          width: 70px;
        }
        .info-product-body{
          padding-left: 20px;
        }
        .info-product-body-title{
          font-size: 14px;
        }
        .info-product-body-price{
          font-weight: 700;
          font-size: 22px;
          color: #d63031;
        }
        .info-product-body-price-disc{
          font-weight: 400;
          color: #bbb;
          text-decoration: line-through;
        }

        .ulasan-rating{
          display: flex!important;
        }
        :global(.ulasan-rating-rate){
          font-size: 14px;
          margin-left: 0px;
          margin-top: -1px;
        }
        .ulasan-rating-text{
          font-size: 14px;
          padding-left: 3px;
          padding-right: 8px;
          color: rgba(0, 0, 0, 0.45);
        }

        .info-item{
          padding: 0px 16px;
          border-right: 1px solid rgb(229, 231, 233);
        }
        .info-item:last-child{
          border-right: 0;
        }
        .info-item:first-of-type{
          padding-left: 0;
        }
        .info-item p{
          margin-bottom: 0;
          font-size: 14px;
        }
        .info-item p:first-of-type{
          color: #828282;
          font-weight: 300;
        }

        :global(.wh-80){
          width: 80px;
          height: 80px;
        }
        :global(.CircularProgressbar .CircularProgressbar-text){
          dominant-baseline: central;
          fill: rgba(0, 0, 0, 0.85);
          font-size: 1.7rem;
          font-weight: 600;
        }
        :global(.ulasan-star-rating.ant-progress-show-info .ant-progress-outer){
          padding-right: calc(4em);
        }
        :global(.ulasan-star-rating.ant-progress-status-success .ant-progress-text, 
                .ulasan-star-rating > .ant-progress-text){
          color: rgba(0, 0, 0, 0.45);
          margin-left: -10px;
        }
        :global(.ulasan-star-rating.ant-progress-status-success .ant-progress-bg, .ulasan-star-rating .ant-progress-bg){
          background-color: #fbbc04;
        }

        
        :global(.product-images > .image-gallery.fullscreen-modal){
          z-index: 1040;
          background: #000000cc;
        }
        :global(.product-images > .image-gallery > .image-gallery-content.fullscreen){
          background: #00000000;
        }
        :global(.product-images > .image-gallery > .image-gallery-content.fullscreen .image-gallery-image){
          max-height: calc(100vh - 200px);
        }
        :global(.image-gallery-thumbnail.active, .image-gallery-thumbnail:hover, .image-gallery-thumbnail:focus){
          border: 4px solid #6c757d;
        }

        :global(.recomend-section .slick-list){
          padding-bottom: 20px;
        }
        :global(.recomend-section .slick-prev, .recomend-section .slick-next){
          top: calc(50% - 10px);
        }
        :global(.recomend-section .slick-prev:before, .recomend-section .slick-next:before){
          display: none;
        }
      `}</style>
    </>
  )
}

export default ProductDetail
