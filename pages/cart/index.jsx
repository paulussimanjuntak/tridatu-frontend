import { useState } from 'react'
import { Alert, Checkbox, Button, InputNumber, Popconfirm, message, Input, Modal, Radio } from 'antd';

import Link from 'next/link'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

import CartStyle from 'components/Cart/style'

import { promos } from 'pages/promo'

const plainOptions = ['A', 'A'];
const defaultCheckedList = ['A'];

message.config({ top: 90, duration: 3, maxCount: 1, rtl: false });

const Cart = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList)
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showPromoModal, setShowPromoModal] = useState(false)

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

  const showPromoModalHandler = () => {
    setShowPromoModal(true)
  }

  const closePromoModalHandler = () => {
    setShowPromoModal(false)
  }

  return(
    <>
      <Container className="pt-2 pt-sm-4 pb-2">
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
              <Popconfirm
                title="Anda yakin ingin menghapus semua item?"
                okText="Ya"
                cancelText="Batal"
                placement="bottomRight"
                arrowPointAtCenter
              >
                <b className="text-tridatu float-right hover-pointer">Hapus</b>
              </Popconfirm>
            </div>
            <div className="cart-item">
              <Checkbox.Group value={checkedList} onChange={onChange} className="w-100">
                <Row className="mx-0">
                  {[...Array(19)].map((_, i) => (
                    <Col className="col-12 d-flex cart-item-body" key={i}>
                      <Checkbox value="A" className="cart-item-checkbox" />
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
                <Button 
                  block
                  size="large"
                  className="text-left text-secondary"
                  onClick={showPromoModalHandler}
                >
                  <i className="fad fa-badge-percent text-tridatu mr-2" />
                  <span className="font-weight-bold">Pakai kode promo</span>
                  <i className="fas fa-angle-right" 
                    style={{
                      right: '15px',
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  />
                </Button>
                <Alert
                  closable
                  type="success"
                  className="mt-2 promo-success-selected"
                  closeText={<i className="fas fa-times" />}
                  onClose={() => console.log('closed')}
                  message={
                    <Row className="">
                      <Col className="col-12">
                        <p className="mb-0 text-truncate promo-success-selected-title font-weight-bold">
                          Khusus Pulau Sumatera, Belanja di BukaMart Ada Cashback!
                          Khusus Pulau Sumatera, Belanja di BukaMart Ada Cashback!
                        </p>
                        <p className="mb-0 text-break">ssqweqwesddsjahdkjsahkdsqweqwesddsjahdkjsahkdqweqwesddsjahdkjsahkd</p>
                      </Col>
                    </Row>
                  }
                />
              </Card.Body>
              <Card.Body>
                <p className="font-weight-bold">Ringkasan belanja</p>
                <p className="font-weight-light checkout-summary-price"> 
                  Total Harga
                  <span className="float-right cart-item-price font-weight-bold">Rp. 120.000</span>
                </p>
                <Link href="/cart/shipment" as="/cart/shipment">
                  <a>
                    <Button 
                      block
                      size="large"
                      className="btn-tridatu"
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

      <Modal
        centered
        title=" "
        visible={showPromoModal}
        onOk={closePromoModalHandler}
        onCancel={closePromoModalHandler}
        zIndex="1030"
        closeIcon={<i className="fas fa-times" />}
        footer={null}
        className="modal-promo"
        bodyStyle={{padding: '0'}}
      >
        <Card.Body className="border-0 px-4 pb-0">
          <h4 className="fs-20-s mb-0">
            Pakai Promo
            <a href="#" className="fs-12 float-right text-tridatu pt-2">
              Reset Promo
            </a>
          </h4>
        </Card.Body>
        <Card.Body className="border-0 px-4 border-bottom-5">
          <Input.Search
            size="large"
            className="search-promo"
            placeholder="Masukkan kode promo"
            enterButton={<Button className="text-danger">Pakai</Button>}
            onSearch={value => console.log(value)}
          />
        </Card.Body>
        <Card.Body className="border-0 px-4 pb-2">
          <h6 className="fs-16-s">
            Promo yang tersedia
          </h6>
        </Card.Body>
        <Card.Body className="pt-0 px-0">
          <Card.Body className="border-0 px-4 pb-0 pt-1 promo-list">
            <Radio.Group 
              className="promo-radio"
              onChange={e => console.log(e)}
            >
              {promos.map((data, i) => (
                <Radio.Button value={i} key={i}>
                  <Row>
                    <Col className="pr-0">
                      <Card.Img 
                        className="promo-list-img"
                        src={data}
                      />
                    </Col>
                    <Col className="pl-0 truncate-2">
                      <Card.Body className="p-2">
                        <p className="mb-1 truncate-2 fs-16 noselect">
                          <b>Belanja Gadget dan Electronic Ter-update Belanja Gadget dan Electronic Ter-update</b>
                        </p>
                        <p className="text-truncate mb-1 text-secondary">10 Sep - 29 Okt 2020</p>
                        <p className="mb-0 text-truncate text-tridatu">BRINUF4BRINUF4</p>
                      </Card.Body>
                    </Col>
                  </Row>
                </Radio.Button>
              ))}
            </Radio.Group>
          </Card.Body>
        </Card.Body>
      </Modal>

      <style jsx>{CartStyle}</style>
      <style jsx>{`
        :global(.modal-promo > .ant-modal-content, 
                .modal-promo > .ant-modal-content > .ant-modal-header) {
          border-radius: 10px;
          border: unset;
        }
        :global(.promo-radio){
          width: 100%;
        }
        :global(.promo-list){
          max-height: 50vh;
          overflow: auto;
        }
        :global(.promo-radio > .ant-radio-button-wrapper){
          color: rgb(0 0 0 / 70%);
          display: block;
          margin-bottom: 10px;
          padding: 0px;
          height: 120px;
          border: 1px dashed #d9d9d9;
          border-radius: 3px;
          line-height: unset;
        }
        :global(.promo-radio > .ant-radio-button-wrapper:hover, 
                .promo-radio > .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active){
          color: #000000;
          box-shadow: 0 0 0 0.2rem rgb(255 77 79 / 10%);
        }
        :global(.promo-radio > .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within){
          box-shadow: 0 0 0 0.2rem rgb(255 77 79 / 10%);
        }
        :global(.promo-radio > .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover){
          border-color: #ff4d4f;
        }
        :global(.promo-radio > .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child){
          border-color: #ff4d4f;
        }
        :global(.promo-radio > .ant-radio-button-wrapper.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)){
          border-color: #ff4d4f;
        }
        :global(.promo-list-img){
          height: -webkit-fill-available;
          object-fit: cover;
          border-bottom-right-radius: 0;
          border-top-right-radius: 0;
          border-bottom-left-radius: 2px;
          border-top-left-radius: 2px;
        }
        :global(.promo-radio > .ant-radio-button-wrapper .col:first-of-type){
          border-right: 1px dashed #d9d9d9;
        }
        :global(.promo-success-selected){
          border: 0px;
          background-color: #effaf3;
          border-left: 3px solid #48c774;
        }
        :global(.promo-success-selected-title){
          width: 100%; 
        }
        :global(.ant-radio-button-wrapper:not(:first-child)::before){
          left: 0px;
          background-color: unset;
        }
        @media only screen and (max-width: 575px){
          :global(.cart-item-quantity-input){
            width: 50px;
            top: 0;
          }
          :global(.cart-item-quantity-input .ant-input-number-input){
            height: 22px;
          }
          :global(.cart-item-body){
            padding-right: 0px;
          }
          :global(.sm-btn-custom){
            width: 24px;
            height: 24px;
            padding: 0px 0;
            font-size: 14px;
          }
        }
        @media only screen and (min-width: 992px){
          :global(.promo-success-selected-title){
            width: 200px; 
          }
        }
        @media only screen and (min-width: 1200px){
          :global(.promo-success-selected-title){
            width: 260px; 
          }
        }
      `}</style>
    </>
  )
}

export default Cart
