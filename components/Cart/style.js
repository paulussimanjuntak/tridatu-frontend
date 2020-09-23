import css from "styled-jsx/css";

const Cart = css`
.cart-header{
  width: 100%;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom: 5px solid rgb(243, 244, 245);
}
:global(.cart-item .cart-item-body){
  padding-left: 0px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(243, 244, 245);
}
:global(.cart-item .cart-item-body:last-child){
  border-bottom: 0;
}
:global(.cart-item-body > .cart-item-checkbox){
  align-self: center;
  margin-right: 14px;
}
.cart-item-img{
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: .2rem;
}
.cart-item-price{
  letter-spacing: -1px;
  color: #d63031;
}
.cart-item-price > .price-disc{
  color: #bbb;
  font-weight: 400;
  margin-right: 10px;
}
:global(.cart-item-quantity-input){
  top: 1px;
}

:global(.checkout-summary){
  margin-top: 16px;
  box-shadow: rgb(202, 211, 225) 0px 1px 4px 0px;
  border: 0;
  border-radius: .2rem;
  position: sticky;
  top: 5rem;
}

:global(.search-promo .ant-btn-primary){
  color: #343a40;
  background-color: transparent;
  border-color: #343a40 !important; 
}
:global(.search-promo .ant-btn-primary:hover){
  color: #fff;
  background-color: #343a40;
  border-color: #343a40 !important; 
}

`

export default Cart
