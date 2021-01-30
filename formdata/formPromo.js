import moment from 'moment'

export const initialValue = {value: "", isValid: true, message: null};

export const formPeriod = { 
  start: { ...initialValue }, 
  end: { ...initialValue } 
}

export const formPeriodIsValid = (state, setState) => {
  const start = { ...state.start }
  const end = { ...state.end }
  let isGood = true

  if(moment(end.value).diff(moment(start.value), "days") > 180){
    isGood = false
    start.isValid = false
    start.message = "Periode Promo harus kurang dari 180 hari"
  }
  if(moment(start.value) < moment()){
    isGood = false
    start.isValid = false
    start.message = "Waktu mulai harus setelah waktu saat ini"
  }
  if(moment(end.value).format("L") === moment(start.value).format("L") && moment(end.value).subtract(1, "hour") < moment(start.value)){
    isGood = false
    start.isValid = false
    start.message = "Waktu berakhir minimal satu jam lebih lama dari waktu mulai"
  }

  if(!isGood) setState({ ...state, start, end })

  return isGood
}

export const formTablePromoIsValid = (state, setState, idx) => {
  const newState = [...state]
  let isGood = true

  let normalPriceValue = newState[idx]["product"]["normal_price"].value
  let priceValue = newState[idx]["product"]["price"].value
  let discountValue = newState[idx]["product"]["discount"].value
  let activeValue = newState[idx]["product"]["active"].value

  if(priceValue < (normalPriceValue - (normalPriceValue * (95/100)))){
    isGood = false
    newState[idx]["product"]["price"].isValid = false
    newState[idx]["product"]["price"].message = "Harga promo kurang dari 95% harga awal"
  }
  if(priceValue > normalPriceValue){
    isGood = false
    newState[idx]["product"]["price"].isValid = false
    newState[idx]["product"]["price"].message = "Harga tidak valid"
  }

  if(discountValue > 95){
    isGood = false
    newState[idx]["product"]["discount"].isValid = false
    newState[idx]["product"]["discount"].message = "Diskon masksimal 95%"
  }
  if(discountValue <= 0 && discountValue >= 95 && activeValue){
    isGood = false
    newState[idx]["product"]["discount"].isValid = false
    newState[idx]["product"]["discount"].message = "Diskon tidak valid"
  }
  if(discountValue < 0 && discountValue >= 95 && !activeValue){
    isGood = false
    newState[idx]["product"]["discount"].isValid = false
    newState[idx]["product"]["discount"].message = "Diskon tidak valid"
  }

  if(!isGood) setState(newState)

  return isGood
}
