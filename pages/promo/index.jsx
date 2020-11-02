import { useState } from 'react';
import { Tabs, Input, Select, AutoComplete } from 'antd';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from "react-bootstrap/Form";

import CardPromo from "components/Card/Promo";
// import EmptyPromo from "components/Card/Empty/Promo";

import { promos } from "data/promoData";

const CardPromoMemo = React.memo(CardPromo);
// const EmptyPromoMemo = React.memo(EmptyPromo);

const TabPane = Tabs.TabPane ;

const ALL_PROMO = 'ALL_PROMO'
const SPECIAL_PROMO = 'SPECIAL_PROMO'
const MONTHLY_PROMO = 'MONTHLY_PROMO'

const Promo = () => {
  const [activeTab, setActiveTab] = useState()

  const callback = (key) => {
    setActiveTab(key);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return(
    <>
      <div className="slider-container">
        <div className="slider-wrapper">
          <img src="https://ecs7.tokopedia.net/img/blog/promo/2019/08/Hotel_Launching_Digital-Hompage.jpg" 
            className="slider-image" alt="Tridatu Bali ID" />
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={callback} centered className="px-1 noselect">
        <TabPane tab="Semua Promo (12)" key={ALL_PROMO}>
        </TabPane>

        <TabPane tab="Promo Spesial (4)" key={SPECIAL_PROMO}>
        </TabPane>

        <TabPane tab="Promo Bulan Ini (0)" key={MONTHLY_PROMO}>
        </TabPane>
      </Tabs>

      <Container>

        <section className="mt-4">
          <Row>
            <Col sm={12} md={6}>
              <Form inline className="w-100 mb-3">
                <div className="w-100 promo-search">
                  <AutoComplete className="w-100">
                    <Input.Search size="large" placeholder="Cari promo"/>
                  </AutoComplete>
                </div>
              </Form>
            </Col>
            <Col sm={12} md={6}>
              <Select 
                size="large" 
                className="w-100" 
                placeholder="Urutkan"
                onChange={handleChange}
              >
                <Select.Option value="1">Promo terpopuler</Select.Option>
                <Select.Option value="2">Promo terbaru</Select.Option>
              </Select>
            </Col>
          </Row>
        </section>

        <section>
          <Row>
            {promos.reverse().map((data, i) => (
              <Col md={4} sm={6} key={i}>
                <CardPromoMemo image={data} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>

      <style jsx>{`
        .slider-container{
          width: 100%;
          height: 240px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          overflow: hidden;
          z-index: 1;
          margin-bottom: 0;
        }
        .slider-wrapper{
          height: 100%;
        }
        .slider-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        :global(.promo-search .ant-input-search > .ant-input-group > .ant-input-group-addon .ant-input-search-button){
          border-top-right-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
        }
        :global(.promo-search .ant-select:not(.ant-select-disabled):hover .ant-select-selector, .promo-search .ant-select-focused){
          box-shadow: none !important;
        }
        @media only screen and (max-width: 480px){
          .slider-container{
            height: 120px;
          }
        }
      `}</style>
    </>
  )
}

export default Promo
