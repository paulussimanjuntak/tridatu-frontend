import Card from "react-bootstrap/Card";

const CardBrand = () => {
  return (
    <>
      <Card className="border-0 shadow text-center">
        <a href="#" className="text-decoration-none text-dark">
          <img
            className="mx-auto d-block mt-2"
            src="https://www.urbanrider.co.uk/media/catalog/product/cache/1/image/85e4522595efc69f496374d01ef2bf13/d/m/dmw41808e_shield_tee.jpg"
            width="64"
            height="64"
            alt="Tridatu Bali ID"
          />
          <Card.Body>
            <span className="font-weight-bold">Baju</span>
          </Card.Body>
        </a>
      </Card>
    </>
  );
};

export default CardBrand;
