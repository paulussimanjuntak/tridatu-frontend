import { Badge } from 'antd'
import formatNumber from 'lib/formatNumber'

const ItemPricePromo = ({ discount, price }) => {
  return(
    <>
      {discount ? (
        <div className="w-100">
          <div className="d-flex">
            <small className="mb-0 mr-1 text-muted text-truncate"><s>Rp.{formatNumber(price)}</s></small>
            <Badge count={`${discount}%`} size="small" className="nav-notification noselect" />
          </div>
          <p className="mb-0 text-truncate">Rp.{formatNumber(price - (price*(discount/100)))}</p>
        </div>
      ) : (
        <p className="mb-0 text-truncate">Rp.{formatNumber(price)}</p>
      )}
    </>
  )
}

export default ItemPricePromo
