import Link from "next/link";
import Image from "next/image";
import Card from "react-bootstrap/Card";

const CardBanner = ({ image }) => {
  return (
    <>
      <Card className="border-0">
        <Link href="/promo" as="/promo">
          <a className="text-decoration-none text-dark">
            <Image
              width={628}
              height={412}
              className="mx-auto d-block img-fit w-100 rounded"
              src={image}
              alt="Tridatu Bali ID"
            />
          </a>
        </Link>
      </Card>
    </>
  );
};

export default CardBanner;
