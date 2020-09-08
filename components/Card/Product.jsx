import Card from "react-bootstrap/Card";
import { Rate } from "antd";

const CardProduct = () => {
  return (
    <>
      <Card className="mb-4 border-0 shadow">
        <Card.Img
          variant="top"
          src="https://www.specialbrandstore.com/wp-content/uploads/2017/08/3978-rvca-zap-va_1-330x0.jpg"
          alt="Tridatu Bali"
          height="200"
          className="img-fit"
        />
        <Card.Body className="p-2">
          <Card.Text>
            <a href="#" className="text-decoration-none text-secondary">
              <p className="fs-14 mb-2 font-weight-light text-break truncate-2">
                Kaos - Baju - Tshirt Deus Ex Machina 02 - Putih, M
              </p>
            </a>
            <p className="fs-12 font-weight-light mb-2">
              <span className="text-danger">
                <s>Rp. 150.000</s>
              </span>
              <br />
              <span className="font-weight-bold h6 fs-14-s">Rp. 105.000</span>
            </p>
            <div className="card-rating fs-12 mb-2">
              <Rate
                className="fs-14 mx-0"
                allowHalf
                disabled
                defaultValue={4.5}
              />
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <style jsx>{`
        .card-rating{
          font-size: 12px;
          line-height: 16px;
        }
        :global(.ant-rate){
          color: #fbbc04;
        }
        :global(.ant-rate-star:not(:last-child)){
          margin-right: 4px;
        }
      `}</style>
    </>
  );
};

export default CardProduct;
