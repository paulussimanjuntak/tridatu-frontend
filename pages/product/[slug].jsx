import { Rate } from "antd";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import ImageGallery from 'react-image-gallery'

import { renderLeftNav, renderRightNav, renderFullscreenButton } from 'components/Products/ImageGalleryButton'
import PHOTOS from 'components/Products/photos'

const ProductDetail = () => {
  return(
    <>
      <Container className="pt-4 pb-2">
        <Row>
          <Col lg={5}>
            <ImageGallery
              items={PHOTOS} 
              showPlayButton={false}
              renderLeftNav={renderLeftNav}
              renderRightNav={renderRightNav}
              renderFullscreenButton={renderFullscreenButton}
            />
          </Col>
          <Col lg={7}>
            <div className="header-product">
              <h1 className="header-product-title">Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih, M</h1>
              <div className="header-product-rating">
                <Rate
                  className="header-product-rating-rate"
                  allowHalf
                  disabled
                  defaultValue={5}
                />
                <span className="header-product-rating-detail">
                  116 Ulasan • 127 Terjual
                </span>
              </div>
            </div>
            {[...Array(3)].map((_,i) => (
              <div className="media info-product" key={i}>
                <h5 className="info-product-left">Harga</h5>
                <div className="media-body info-product-body">
                  {/* <h5 className="info-product-body-title">Top-aligned media</h5> */}
                  <div className="fs-14 font-weight-light mb-2">
                    <span className="info-product-body-price-disc">
                      <s>Rp. 150.000</s>
                    </span>
                    <br />
                    <span className="info-product-body-price font-weight-bold h6 fs-14-s">Rp. 105.000</span>
                  </div>
                </div>
              </div>
            ))}
          </Col>
        </Row>
        <h1>Full Detail Product</h1>
      </Container>

      <style jsx>{`
        :global(.image-gallery-image){
          width: 443px;
          height: 443px;
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
      `}</style>
    </>
  )
}

export default ProductDetail
