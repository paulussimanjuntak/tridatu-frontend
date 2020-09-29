import { Button, Input, Modal, Radio } from 'antd';

import Card from 'react-bootstrap/Card'
import isEmpty from 'validator/lib/isEmpty';

import PromoCard from './PromoCard'

const PromoModal = ({ show, close, reset, selectPromo, onChange, promo, dataPromo }) => {
  return(
    <>
      <Modal
        centered
        title=" "
        visible={show}
        onCancel={close}
        zIndex="1030"
        closeIcon={<i className="fas fa-times" />}
        footer={null}
        className="modal-promo"
        bodyStyle={{padding: '0'}}
      >
        <Card.Body className="border-0 px-4 pb-0">
          <h4 className="fs-20-s mb-0">
            Pakai Promo
            <Button 
              type="link" 
              disabled={isEmpty(promo.code, {ignore_whitespace:true})} 
              className="fs-12 float-right text-tridatu border-0"
              onClick={reset}
            >
              Reset Promo
            </Button>
          </h4>
        </Card.Body>
        <Card.Body className="border-0 px-4 border-bottom-5">
          <Input.Search
            size="large"
            className="search-promo"
            placeholder="Masukkan kode promo"
            value={promo.code}
            enterButton={
              <Button disabled={isEmpty(promo.code, {ignore_whitespace:true})}>
                Pakai
              </Button>
            }
            onSearch={selectPromo}
            onChange={onChange}
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
              value={promo.code}
              onChange={onChange}
            >
              {dataPromo.map((data, i) => (
                <PromoCard code={data.code} image={data.image} key={i} />
              ))}
            </Radio.Group>
          </Card.Body>
        </Card.Body>
      </Modal>
    </>
  )
}

export default PromoModal
