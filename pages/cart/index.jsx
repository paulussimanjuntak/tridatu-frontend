import { useState } from 'react'
import { Checkbox, Button, InputNumber, Popconfirm, message } from 'antd'

import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import PromoModal from 'components/Cart/PromoModal'
import { PromoSelected, PromoButton } from 'components/Cart/PromoSelected'

import CartStyle from 'components/Cart/style'

export const listPromo = [
  {code:'TDT-100K',image:'https://ecs7.tokopedia.net/img/blog/promo/2020/09/Thumbnail-6.jpg',discount:'100000'}, 
  {code:'TDT-200K',image:'https://ecs7.tokopedia.net/img/blog/promo/2020/07/Thumbnail-Interior.png',discount:'200000'},
  {code:'TDT-300K',image:'https://ecs7.tokopedia.net/img/blog/promo/2019/09/ZHIYUN-THUMBNAIL.jpg',discount:'300000'},
  {code:'TDT-400K',image:'https://ecs7.tokopedia.net/img/blog/promo/2020/09/Thumbnail-6.jpg',discount:'100000'}, 
  {code:'TDT-500K',image:'https://ecs7.tokopedia.net/img/blog/promo/2020/07/Thumbnail-Interior.png',discount:'200000'},
  {code:'TDT-600K',image:'https://ecs7.tokopedia.net/img/blog/promo/2019/09/ZHIYUN-THUMBNAIL.jpg',discount:'300000'},
]

const listItem = ['https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/5/18/3453155/3453155_740a5eed-2e1f-4aa7-b71e-2b1cdd64ab3c_1574_1574.webp', 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp', 'https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/5/18/3453155/3453155_4c4f2a88-54a1-46a2-b5d2-ddd39a9f9b87_1527_1527.webp', 'https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/5/18/3453155/3453155_740a5eed-2e1f-4aa7-b71e-2b1cdd64ab3c_1574_1574.webp', 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/5/18/3453155/3453155_bdfa5991-04e9-49a3-8246-34f9d270b180_1438_1438.webp', 'https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/5/18/3453155/3453155_4c4f2a88-54a1-46a2-b5d2-ddd39a9f9b87_1527_1527.webp']

message.config({ top: 90, duration: 3, maxCount: 1, rtl: false });

const Cart = () => {
  const [checkedList, setCheckedList] = useState([])
  const [checkAll, setCheckAll] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [promo, setPromo] = useState({ code: '', isUsed: false })
  const [showPromoModal, setShowPromoModal] = useState(false)

  const onSelectItemHandler = checkedList => {
    setCheckedList(checkedList)
    setCheckAll(checkedList.length === listItem.length)
  }

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? listItem : [])
    setCheckAll(e.target.checked)
    if(checkAll) setPromo({ code: '', isUsed: false })
  }

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

  const showPromoModalHandler = () => {
    setShowPromoModal(true)
  }

  const closePromoModalHandler = () => {
    setPromo({ ...promo, code: '' })
    setShowPromoModal(false)
  }

  const promoChangeHandler = e => {
    const value = e.target.value
    setPromo({ ...promo, code: value })
  }

  const onUsePromoHandler = () => {
    setPromo({ ...promo, isUsed: true })
    setShowPromoModal(false)
  }

  const onRemovePromoHandler = () => {
    setPromo({ ...promo, isUsed: false, code: '' })
  }

  return(
    <>
      <Container className="pt-2 pt-sm-4 pb-2">
        <Row>
          <Col lg={8}>
            <div className="cart-header">
              <Checkbox
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                <span className="p-l-4 fs-16 noselect">Pilih semua</span>
              </Checkbox>
              {checkedList.length > 0 && (
                <Popconfirm
                  title="Anda yakin ingin menghapus item yang anda pilih?"
                  okText="Ya"
                  cancelText="Batal"
                  placement="bottomRight"
                  arrowPointAtCenter
                >
                  <b className="text-tridatu float-right hover-pointer">Hapus</b>
                </Popconfirm>
              )}
            </div>
            <div className="cart-item">
              <Checkbox.Group value={checkedList} onChange={onSelectItemHandler} className="w-100">
                <Row className="mx-0">
                  {listItem.map((data, i) => (
                    <Col className="col-12 d-flex cart-item-body" key={i}>
                      <Checkbox value={data} className="cart-item-checkbox" />
                      <div className="media">
                        <img src={data} className="mr-3 cart-item-img" alt="Tridatu Bali ID" />
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
                          <div>
                            <Button 
                              className="sm-btn-custom"
                              disabled={quantity == 1}
                              icon={<i className="far fa-minus fs-12-s" />} 
                              onClick={(e) => quantityHandler(e, 'min')} 
                            />
                            <InputNumber 
                              className="mx-sm-2 mx-1 cart-item-quantity-input fs-12-s"
                              min={1} 
                              value={quantity} 
                              onChange={(e) => quantityHandler(e, 'input')} 
                            />
                            <Button 
                              className="sm-btn-custom"
                              icon={<i className="far fa-plus fs-12-s" />} 
                              onClick={(e) => quantityHandler(e, 'plus')} 
                            />
                            <Popconfirm
                              title="Hapus barang ini?"
                              onConfirm={() => message.success({
                                content: 'Berhasil dihapus!', 
                              })}
                              okText="Ya"
                              cancelText="Batal"
                              placement="bottomRight"
                              arrowPointAtCenter
                            >
                              <Button 
                                className="ml-2 sm-btn-custom"
                                icon={<i className="far fa-trash-alt fs-12-s" />} 
                              />
                            </Popconfirm>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>
          </Col>

          <Col>
            <Card className="checkout-summary">
              <Card.Body className="border-bottom-5">
                {!promo.isUsed ? (
                  <PromoButton
                    disabled={checkedList.length < 1}
                    show={showPromoModalHandler}
                  />
                ) : (
                  <PromoSelected
                    reset={onRemovePromoHandler}
                  />
                )}
              </Card.Body>
              <Card.Body>
                <p className="font-weight-bold fs-14">Ringkasan belanja</p>
                <p className="font-weight-light checkout-summary-price fs-14">
                  Total Harga
                  <span className="float-right cart-item-price font-weight-bold">
                    {checkedList.length < 1 ? "-" : "Rp. 120.000"}
                  </span>
                </p>
                <Link href="/checkout" as="/checkout">
                  <a>
                    <Button 
                      block
                      size="large"
                      className="btn-tridatu"
                      disabled={checkedList.length < 1}
                    >
                      Beli (8)
                    </Button>
                  </a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <PromoModal
        show={showPromoModal} 
        close={closePromoModalHandler}
        reset={onRemovePromoHandler}
        selectPromo={onUsePromoHandler}
        onChange={promoChangeHandler}
        promo={promo}
        dataPromo={listPromo}
      />

      <style jsx>{CartStyle}</style>
    </>
  )
}

export default Cart
