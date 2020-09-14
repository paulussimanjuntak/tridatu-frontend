import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Slider from "react-slick";

import { Input } from "antd";

import CardProduct from "components/Card/Product";
import CardBrand from "components/Card/Brand";
import CardBanner from "components/Card/Banner";

const CardProductMemo = React.memo(CardProduct);
const CardBrandMemo = React.memo(CardBrand);
const CardBannerMemo = React.memo(CardBanner);

import { brandSettings, bannerSettings } from "lib/slickSetting";

let banners = ['https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/5/53863f31-bd90-437a-8a6d-da203de8682f.jpg', 'https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/8/cafdfacb-e36c-49af-b917-d62b3e5e2131.jpg', 'https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/8/c66dd503-4300-40a6-bb32-a785e14dd563.jpg','https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/5/53863f31-bd90-437a-8a6d-da203de8682f.jpg', 'https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/8/cafdfacb-e36c-49af-b917-d62b3e5e2131.jpg', 'https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/8/c66dd503-4300-40a6-bb32-a785e14dd563.jpg']

const Home = () => {
  return (
    <>
      <Container className="pt-4">
        <section className="banner-section d-lg-none">
          <Form inline className="mx-lg-2 w-100">
            <div className="w-100 nav-search product-search">
              <Input.Search size="large" placeholder="Search" />
            </div>
          </Form>
        </section>

        <section className="banner-section">
          <h4 className="fs-20-s"> Promo </h4>
          <Slider {...bannerSettings}>
            {banners.map((data, i) => (
              <Col key={i} className="px-0">
                <CardBannerMemo image={data} />
              </Col>
            ))}
          </Slider>
        </section>

        <section className="brand-section">
          <h4 className="fs-20-s mb-4">Brand</h4>
          <Slider {...brandSettings}>
            {[...Array(6)].map((_, i) => (
              <Col key={i} className="px-0">
                <CardBrandMemo />
              </Col>
            ))}
          </Slider>
        </section>

        <section>
          <h4 className="fs-20-s mb-4">Paling Banyak Dilihat</h4>
          <Row className="row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 custom-gutters">
            {[...Array(10)].map((_, i) => (
              <Col key={i}>
                <CardProductMemo />
              </Col>
            ))}
          </Row>
          <div className="text-center mb-5 mt-3">
            <Button size="lg" className="btn-dark-tridatu-outline d-none d-lg-block mx-auto">Muat Lebih Banyak</Button>
            <Button className="btn-dark-tridatu-outline d-lg-none mx-auto">Muat Lebih Banyak</Button>
          </div>
        </section>
      </Container>

      <style jsx>{`
        :global(.brand-section .slick-list){
          padding-bottom: 20px;
        }
        :global(.brand-section .slick-prev, .brand-section .slick-next){
          top: calc(50% - 10px);
        }
        :global(.brand-section .slick-prev:before, .brand-section .slick-next:before){
          display: none;
        }
        :global(.slick-slider > i.arrow-slick:before, i.arrow-slick:before){
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @media only screen and (min-width: 600px){
          :global(.banner-section .slick-list){
            padding-top: 25px !important;
            padding-bottom: 18px !important;
            padding-left: 20% !important;
            padding-right: 20% !important;
            margin-left: 0px;
            margin-right: 0px;
          }
          :global(.banner-section .slick-slide){
            transform: scale(0.8, 0.8);
            transition: transform 0.3s;
          }
          :global(.banner-section .slick-slide.slick-center){
            transform: scale(1.2);
          }
          :global(.banner-section .slick-prev, .banner-section .slick-next){
            opacity: 0;
            transition: .3s all;
          }
          :global(.banner-section:hover .slick-prev, .banner-section:hover .slick-next){
            opacity: 1;
          }
        }

        @media only screen and (max-width: 600px){
          :global(.banner-section .slick-slider > .slick-dots){
            bottom: -15px;
          }
          :global(.slick-next){
            right: -10px;
          }
          :global(.slick-prev){
            left: -10px;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
