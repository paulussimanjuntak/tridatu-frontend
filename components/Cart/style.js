import css from "styled-jsx/css";

const Cart = css`
.cart-header{
  width: 100%;
  padding-bottom: 16px;
  padding-top: 16px;
  border-bottom: 5px solid rgb(243, 244, 245);
  position: sticky;
  top: 68px;
  background: #fff;
  z-index: 1;
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
.cart-item-img.sm{
  width: 50px;
  height: 50px;
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



:global(.modal-promo > .ant-modal-content, 
        .modal-promo > .ant-modal-content > .ant-modal-header) {
  border-radius: 10px;
  border: unset;
}
:global(.promo-radio){
  width: 100%;
}
:global(.promo-list){
  max-height: 50vh;
  overflow: auto;
}
:global(.promo-radio > .ant-radio-button-wrapper){
  color: rgb(0 0 0 / 70%);
  display: block;
  margin-bottom: 10px;
  padding: 0px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 3px;
  line-height: unset;
}
:global(.promo-radio > .ant-radio-button-wrapper:hover, 
        .promo-radio > .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active){
  color: #000000;
  box-shadow: 0 0 0 0.2rem rgb(255 77 79 / 10%);
}
:global(.promo-radio > .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within){
  box-shadow: 0 0 0 0.2rem rgb(255 77 79 / 10%);
}
:global(.promo-radio > .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover){
  border-color: #ff4d4f;
}
:global(.promo-radio > .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child){
  border-color: #ff4d4f;
}
:global(.promo-radio > .ant-radio-button-wrapper.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)){
  border-color: #ff4d4f;
}
:global(.promo-list-img){
  height: -webkit-fill-available;
  object-fit: cover;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
}
:global(.promo-radio > .ant-radio-button-wrapper .col:first-of-type){
  border-right: 1px dashed #d9d9d9;
}
:global(.promo-success-selected){
  border: 0px;
  background-color: #effaf3;
  border-left: 3px solid #48c774;
}
:global(.promo-success-selected-title){
  width: 100%; 
}
:global(.ant-radio-button-wrapper:not(:first-child)::before){
  left: 0px;
  background-color: unset;
}

@media only screen and (max-width: 425px){
  .cart-header{
    top: 58px;
  }
}
@media only screen and (max-width: 575px){
  :global(.cart-item-quantity-input){
    width: 50px;
    top: 0;
  }
  :global(.cart-item-quantity-input .ant-input-number-input){
    height: 22px;
  }
  :global(.cart-item-body){
    padding-right: 0px;
  }
  :global(.sm-btn-custom){
    width: 24px;
    height: 24px;
    padding: 0px 0;
    font-size: 14px;
  }
}
@media only screen and (min-width: 992px){
  :global(.promo-success-selected-title){
    width: 200px; 
  }
}
@media only screen and (min-width: 1200px){
  :global(.promo-success-selected-title){
    width: 260px; 
  }
}
`

export default Cart
