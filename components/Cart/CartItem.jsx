import Col from 'react-bootstrap/Col'

import CartStyle from './style'

const ProductCart = () => {
  return(
    <>
      <Col className="col-12 d-flex cart-item-body">
        <div className="media">
          <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" className="mr-3 cart-item-img" alt="Tridatu Bali ID" />
          <div className="media-body">
            <h5 className="mt-0 fs-16">Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih, M </h5>
            <h5 className="mt-0 fs-16 font-weight-bold cart-item-price">
              <span className="price-disc">
                <s>Rp. 150.000</s>
              </span>
              Rp. 105.000
            </h5>
            <p className="fw-500">1x</p>
          </div>
        </div>
      </Col>
      <style jsx>{CartStyle}</style>
    </>
  )
}

export default ProductCart
