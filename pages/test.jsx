import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Col from "react-bootstrap/col";
import Row from "react-bootstrap/row";
import Container from "react-bootstrap/container";

const Test = () => {
  const [bigImageRef, setBigImageRef] = useState(null)
  const [smallImageRef, setSmallImageRef] = useState(null)

  let _topImage = []
  let _bottomImage = []

  useEffect(() => {
    setBigImageRef(_topImage)
    setSmallImageRef(_bottomImage)
  }, [_topImage, _bottomImage])

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg={6}>
              <Slider
                asNavFor={smallImageRef}
                ref={slider => (_topImage = slider)}
              >
                {[...Array(5)].map((_, i) => (
                  <Image
                    key={i}
                    width={700}
                    height={700}
                    src={`/static/images/products/detail/${i+1}.jpeg`}
                  />
                ))}
              </Slider>

                <Slider
                  asNavFor={bigImageRef}
                  ref={slider => (_bottomImage = slider)}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  slidesToShow={5}
                >
                  {[...Array(5)].map((_, i) => (
                    <Col key={i} className="px-0 col-auto">
                      <Image
                        key={i}
                        width={50}
                        height={50}
                        src={`/static/images/products/detail/${i+1}.jpeg`}
                      />
                    </Col>
                  ))}
                </Slider>
            </Col>

            <Col lg={6}>
              <h1>Detail Product</h1>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Test;
