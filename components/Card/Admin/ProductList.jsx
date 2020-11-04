import Image from 'next/image'
import Media from 'react-bootstrap/Media'

const ProductList = ({ item }) => {
  return(
    <>
      <Media className="align-self-start product-list-admin">
        <div className="mr-2">
          <Image width={50} height={50} src={item.image} className="align-self-start bor-rad-2rem" />
        </div>
        <Media.Body>
          <p className="align-top text-wrap mb-n1">{item.name}</p>
          <p className="mb-n1 fs-11 text-secondary">Variasi: {item.color}, {item.size}</p>
          {item.amount && <small className="text-dark">x{item.amount}</small>}
        </Media.Body>
      </Media>

      <style jsx>{`
        :global(.product-list-admin:not(:last-of-type)){
          margin-bottom: .5rem !important;
        }
      `}</style>
    </>
  )
}

export default ProductList
