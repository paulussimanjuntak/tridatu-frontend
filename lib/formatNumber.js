const formatNumber = number => { 
  return new Intl.NumberFormat(['ban', 'id']).format(number)
}

export default formatNumber
