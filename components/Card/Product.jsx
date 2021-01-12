import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Rate } from "antd";

import Link from "next/link";
import Image from "next/image";
import Card from "react-bootstrap/Card";

import formatNumber from 'lib/formatNumber'
import * as actions from "store/actions";

const loveLoginBtn = () => document.getElementById("id-btn-login").click();

const CardProduct = ({ data }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const { products_id, products_name, products_slug, products_love, products_image_product, variants_price } = data;

  const [love, setLove] = useState(products_love)

  const loveHandler = id => {
    if(!user) {
      loveLoginBtn()
    }
    if(user && !love) {
      setLove(!love)
      dispatch(actions.loveProduct(id))
    }
    if(user && love) {
      setLove(!love)
      dispatch(actions.unloveProduct(id))
    }
  }

  useEffect(() => {
    setLove(products_love)
  }, [products_love])

  return (
    <>
      <Card className="border-0 shadow h-100">
        <Image 
          width={270}
          height={270}
          src={`${process.env.NEXT_PUBLIC_API_URL}/static/products/${products_slug}/${products_image_product[0]}`}
          alt="Tridatu Bali"
          className="img-fit img-product noselect"
        />
        {/* <span className="card-discount noselect">70%</span> */}
        <i className={`fa${love ? "s":"r"} fa-heart card-wishlist hover-pointer`} onClick={() => loveHandler(products_id)} />
        <Link href="/products/Tshirt-Deus-Ex-Machina-02" as="/products/Tshirt-Deus-Ex-Machina-02">
          <a className="text-decoration-none text-secondary">
            <Card.Body className="p-2" style={{ height: "88px" }}>
              <p className="fs-13 mb-0 text-break truncate-2">
                {products_name}
              </p>
              <p className="fs-13 fw-500 text-dark mb-0">
                {/* <span className="text-danger"> */}
                {/*   <s>Rp. 150.000</s> */}
                {/* </span> */}
                {/* <br /> */}
                Rp.{formatNumber(variants_price)}
              </p>
              <div className="card-rating fs-12 mb-0">
                <Rate
                  className="fs-12 mx-0"
                  allowHalf
                  disabled
                  defaultValue={4.5}
                />
              </div>
            </Card.Body>
          </a>
        </Link>
      </Card>

      <style jsx>{`
        .card-discount{
          position: absolute;
          display: flex;
          width: 40px;
          height: 40px;
          color: white;
          background-color: #ff4d4f;
          border-radius: 4px 60% 60% 60%;
          font-size: 12px !important;
          align-items: center;
          justify-content: center;
        }
        .card-wishlist{
          position: absolute;
          display: flex;
          width: 40px;
          height: 40px;
          color: #ff4d4f;
          background-color: white;
          border-radius: 60% 4px 60% 60%;
          font-size: 16px !important;
          right: 0;
          align-items: center;
          justify-content: center;
        }
        .card-rating{
          font-size: 12px;
          line-height: 15px;
        }
        :global(.img-product){
          border-top-left-radius: .25rem;
          border-top-right-radius: .25rem;
        }
      `}</style>
    </>
  );
};

export default CardProduct;
