import Col from 'react-bootstrap/Col'

import CartStyle from './style'

const ProductCartCheckout = () => {
  return(
    <>
      <Col className="col-12 d-flex cart-item-body px-0">
        <div className="media">
          <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" className="mr-3 cart-item-img sm align-self-center" alt="Tridatu Bali ID" />
          <div className="media-body">
            <h5 className="mt-0 mb-1 fs-12-s fs-14 text-truncate item-nav-title">
              Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih
            </h5>
            <h5 className="my-0 fs-12-s fs-12 font-weight-bold cart-item-price">
              Rp. 105.000
            </h5>
            <p className="fs-12-s fs-12 text-black-50 mb-0 ls-n1">5 barang (3,75 kg)</p>
          </div>
        </div>
      </Col>
      <style jsx>{CartStyle}</style>
      <style jsx>{`
        .item-nav-title{
          width: 250px;
        }
      `}</style>
    </>
  )
}

export default ProductCartCheckout
