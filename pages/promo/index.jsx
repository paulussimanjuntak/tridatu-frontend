import { Tabs } from 'antd';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import CardPromo from "components/Card/Promo";
import EmptyPromo from "components/Card/Empty/Promo";

const CardPromoMemo = React.memo(CardPromo);
const EmptyPromoMemo = React.memo(EmptyPromo);

const TabPane = Tabs.TabPane ;

let promos = ['https://ecs7.tokopedia.net/img/blog/promo/2020/09/Thumbnail-600x328-4.jpg', 'https://ecs7.tokopedia.net/img/blog/promo/2020/01/Thumbnail_600x3282.jpg', 'https://ecs7.tokopedia.net/img/blog/promo/2020/09/Thumbnail-600x328.jpg', 'https://ecs7.tokopedia.net/img/blog/promo/2020/06/Thumbnail-23.jpg', 'https://ecs7.tokopedia.net/img/blog/promo/2020/08/REALME-THUMBNAIL.jpg', 'https://ecs7.tokopedia.net/img/blog/promo/2020/09/Thumbnail-6.jpg', 'https://ecs7.tokopedia.net/img/blog/promo/2020/07/Thumbnail-Interior.png', 'https://ecs7.tokopedia.net/img/blog/promo/2019/09/ZHIYUN-THUMBNAIL.jpg']

const Promo = () => {

  const callback = (key) => {
    console.log(key);
  }

  return(
    <>
      <div className="slider-container">
        <div className="slider-wrapper">
          <img src="https://ecs7.tokopedia.net/img/blog/promo/2019/08/Hotel_Launching_Digital-Hompage.jpg" className="slider-image" alt="Tridatu Bali ID" />
        </div>
      </div>

      <Tabs defaultActiveKey="1" onChange={callback} centered>
        <TabPane tab="Semua Promo (12)" key="1">
          <Container>
            <section>
              <Row>
                {promos.map((data, i) => (
                  <Col md={4} sm={6} key={i}>
                    <CardPromoMemo image={data} />
                  </Col>
                ))}
              </Row>
            </section>
          </Container>
        </TabPane>

        <TabPane tab="Promo Tridatu (4)" key="2">
          <Container>
            <section>
              <Row>
                {promos.map((data, i) => (
                  <Col md={4} sm={6} key={i}>
                    <CardPromoMemo image={data} />
                  </Col>
                ))}
              </Row>
            </section>
          </Container>
        </TabPane>

        <TabPane tab="Promo Bulan Ini (0)" key="3">
          <Container>
            <section>
              <EmptyPromoMemo />
            </section>
          </Container>
        </TabPane>
      </Tabs>


      <style jsx>{`
        :global(body){
          padding-top: 68px;
        }
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
        @media only screen and (max-width: 425px){
          :global(body){
            padding-top: 58px;
          }
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
