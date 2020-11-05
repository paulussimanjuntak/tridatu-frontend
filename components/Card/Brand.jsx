import Link from "next/link";
import Image from "next/image";
import Card from "react-bootstrap/Card";

const CardBrand = ({ name, image }) => {
  return (
    <>
      <Card className="border-0 shadow text-center p-t-20">
        <Link href="/products" as="/products">
          <a className="text-decoration-none text-dark text-center mx-auto brand-image">
            <Image
              className="mx-auto d-block"
              src={image}
              width={64}
              height={64}
              alt="Tridatu Bali ID"
            />
            <Card.Body>
              <span className="font-weight-bold">{name}</span>
            </Card.Body>
          </a>
        </Link>
      </Card>

      <style jsx>{`
      :global(.brand-image > div){
        margin-left: auto!important;
        margin-right: auto!important;
        margin-bottom: 4px;
      }
      `}</style>
    </>
  );
};

export default CardBrand;
