import Col from 'react-bootstrap/Col'

import CartStyle from './style'

const ProductCartCheckout = () => {
  return(
    <>
      <Col className="col-12 d-flex cart-item-body">
        <div className="media">
          <img src="https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp" className="mr-3 cart-item-img" alt="Tridatu Bali ID" />
          <div className="media-body">
            <h5 className="mt-0 fs-12-s fs-16 truncate-2">
              Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih
            </h5>
            <h5 className="mt-0 fs-12-s fs-16 font-weight-bold cart-item-price">
              <span className="price-disc">
                <s>Rp. 150.000</s>
              </span>
              <br className="d-block d-sm-none"/>
              Rp. 105.000
            </h5>
            <p className="fs-12-s text-black-50 ls-n1 mb-0">5 barang (3,75 kg)</p>
          </div>
        </div>
      </Col>
      <style jsx>{CartStyle}</style>
    </>
  )
}

export default ProductCartCheckout
