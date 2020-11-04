import NoSSR from 'react-no-ssr'

const formatNumber = number => { 
  return(
    <NoSSR>
      {new Intl.NumberFormat(['ban', 'id']).format(number)}
    </NoSSR>
  )
}

export default formatNumber
