import { useState } from 'react'
import { Checkbox, Button, InputNumber, Popconfirm, message } from 'antd';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

const plainOptions = ['A', 'A'];
const defaultCheckedList = ['A'];

message.config({
  top: 90,
  duration: 3,
  maxCount: 1,
  rtl: false,
});

const Cart = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const onChange = checkedList => {
    setCheckedList(checkedList)
    setIndeterminate(!!checkedList.length && checkedList.length < plainOptions.length)
    setCheckAll(checkedList.length === plainOptions.length)
  }

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
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

  return(
    <>
      <Container className="pt-4 pb-2">
        <Row>
          <Col lg={8}>
            <div className="cart-header">
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
              >
                <span className="p-l-4 fs-16 noselect">Pilih semua</span>
              </Checkbox>            
            </div>
            <div className="cart-item">
              <Checkbox.Group value={checkedList} onChange={onChange} className="w-100">
                <Row className="mx-0">
                  {[...Array(8)].map((_, i) => (
                    <Col className="col-12 d-flex cart-item-body" key={i}>
                      <Checkbox value="A" className="cart-item-checkbox" />
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
                          <div>
                            <Button 
                              disabled={quantity == 1}
                              icon={<i className="far fa-minus" />} 
                              onClick={(e) => quantityHandler(e, 'min')} 
                            />
                            <InputNumber 
                              size="middle"
                              className="mx-2 cart-item-quantity-input"
                              min={1} 
                              value={quantity} 
                              onChange={(e) => quantityHandler(e, 'input')} 
                            />
                            <Button 
                              icon={<i className="far fa-plus" />} 
                              onClick={(e) => quantityHandler(e, 'plus')} 
                            />
                            <Popconfirm
                              title="Hapus barang ini?"
                              onConfirm={() => message.success({
                                content: 'Berhasil dihapus!', 
                              })}
                              okText="Ya"
                              cancelText="Batal"
                            >
                              <Button 
                                className="ml-2"
                                icon={<i className="far fa-trash-alt" />} 
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
              <Card.Body>
                <p className="font-weight-bold">Ringkasan belanja</p>
                <p className="font-weight-light checkout-summary-price"> 
                  Total Harga
                  <span className="float-right cart-item-price font-weight-bold">Rp. 120.000</span>
                </p>
                <Button 
                  block
                  className="btn-tridatu"
                >
                  Beli (8)
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .cart-header{
          width: 100%;
          padding-bottom: 16px;
          padding-top: 16px;
          border-bottom: 5px solid rgb(243, 244, 245);
        }
        :global(.cart-item .cart-item-body){
          padding-top: 14px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgb(243, 244, 245);
        }
        :global(.cart-item-body > .cart-item-checkbox){
          align-self: center;
          margin-right: 14px;
        }
        .cart-item-img{
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: .2rem;
        }
        .cart-item-price{
          letter-spacing: -1px;
          color: #d63031;
        }
        .cart-item-price > .price-disc{
          color: #bbb;
          font-weight: 400;
          margin-right: 10px;
        }
        :global(.cart-item-quantity-input){
          top: 1px;
        }

        :global(.checkout-summary){
          margin-top: 16px;
          box-shadow: rgb(202, 211, 225) 0px 1px 4px 0px;
          border: 0;
          border-radius: .2rem;
          position: sticky;
          top: 5rem;
        }
        :global(.checkout-summary-total){
        }
      `}</style>
    </>
  )
}

export default Cart
