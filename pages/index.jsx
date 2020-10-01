import Link from "next/link";
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

import { brandSettings, bannerSettings, infoStoreSettings } from "lib/slickSetting";

// let banners = ['https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/5/53863f31-bd90-437a-8a6d-da203de8682f.jpg', 'https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/8/cafdfacb-e36c-49af-b917-d62b3e5e2131.jpg', 'https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/8/c66dd503-4300-40a6-bb32-a785e14dd563.jpg','https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/5/53863f31-bd90-437a-8a6d-da203de8682f.jpg', 'https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/8/cafdfacb-e36c-49af-b917-d62b3e5e2131.jpg', 'https://ecs7-p.tokopedia.net/img/cache/750/NsjrJu/2020/9/8/c66dd503-4300-40a6-bb32-a785e14dd563.jpg']
let banners = ['https://s4.bukalapak.com/rev-banner/flash_banner/852356698/s-628-412/desktop_BukamartIDC_a5b7b80c-4a86-4e19-9e4c-d9082e266604.jpeg','https://s4.bukalapak.com/rev-banner/flash_banner/852356698/s-628-412/desktop_BukamartIDC_a5b7b80c-4a86-4e19-9e4c-d9082e266604.jpeg','https://s4.bukalapak.com/rev-banner/flash_banner/852356698/s-628-412/desktop_BukamartIDC_a5b7b80c-4a86-4e19-9e4c-d9082e266604.jpeg','https://s4.bukalapak.com/rev-banner/flash_banner/852356698/s-628-412/desktop_BukamartIDC_a5b7b80c-4a86-4e19-9e4c-d9082e266604.jpeg','https://s4.bukalapak.com/rev-banner/flash_banner/852356698/s-628-412/desktop_BukamartIDC_a5b7b80c-4a86-4e19-9e4c-d9082e266604.jpeg',]
let infoStores = ['https://s4.bukalapak.com/rev-banner/flash_banner/64904150/w-196/desktop_Megcheese_c12f8a2e-a778-4f9f-a236-6bcd04a93b33.jpeg','https://s4.bukalapak.com/rev-banner/flash_banner/64904150/w-196/desktop_Megcheese_c12f8a2e-a778-4f9f-a236-6bcd04a93b33.jpeg','https://s4.bukalapak.com/rev-banner/flash_banner/64904150/w-196/desktop_Megcheese_c12f8a2e-a778-4f9f-a236-6bcd04a93b33.jpeg','https://s4.bukalapak.com/rev-banner/flash_banner/64904150/w-196/desktop_Megcheese_c12f8a2e-a778-4f9f-a236-6bcd04a93b33.jpeg','https://s4.bukalapak.com/rev-banner/flash_banner/64904150/w-196/desktop_Megcheese_c12f8a2e-a778-4f9f-a236-6bcd04a93b33.jpeg']

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

        <Row>
          <Col lg={10} md={12}>
            <section className="banner-section">
              <h4 className="fs-20-s">Promo</h4>
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
          </Col>

          <Col lg={2} md={12}>
            <section className="info-store">
              <h4 className="fs-20-s info-store-title mb-3">Informasi Outlet</h4>
              <Slider {...infoStoreSettings}>
                {infoStores.map((data, i) => (
                  <img src={data} className="mb-2 info-store-img" alt="Tridatu Bali ID" key={i} />
                ))}
              </Slider>
            </section>
          </Col>
        </Row>

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
            <Link href="/products" as="/products">
              <Button size="lg" className="btn-dark-tridatu-outline d-none d-lg-block mx-auto">Lihat Semua Produk</Button>
            </Link>
            <Link href="/products" as="/products">
              <Button className="btn-dark-tridatu-outline d-lg-none mx-auto">Lihat Semua Produk</Button>
            </Link>
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

        :global(.info-store > .info-store-title){
          font-size: 24px;
        }
        :global(.info-store .slick-track){
          height: auto !important;
        }
        :global(.info-store-img){
          width: 130px;
          object-fit: cover;
        }

        @media only screen and (min-width: 992px){
          :global(.info-store > .info-store-title){
            font-size: 18px !important;
          }
        }
        @media only screen and (min-width: 1200px){
          :global(.info-store-img){
            height: 144px;
          }
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
