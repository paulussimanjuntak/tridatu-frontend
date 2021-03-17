import isEmpty from 'validator/lib/isEmpty'

export const formPromo = {
  name: { value: "", isValid: true, message: null },
  desc: { value: "", isValid: true, message: null },
  seen: { value: true, isValid: true, message: null },
  period_start: { value: "", isValid: true, message: null },
  period_end: { value: "", isValid: true, message: null },
}

export const formTermsCondition = {
  terms_condition: { value: "", isValid: true, message: null },
}

export const formPromoIsValid = (state, setState, state2, setState2, t) => {
  const name = { ...state.name }
  const seen = { ...state.seen }
  const desc = { ...state.desc }
  const period_start = { ...state.period_start }
  const period_end = { ...state.period_end }
  const terms_condition = { ...state2.terms_condition }
  let isGood = true

  if(isEmpty(name.value)){
    isGood = false
    name.isValid = false
    name.message = t.validation.empty
  }

  if(isEmpty(seen.value.toString())){
    isGood = false
    seen.isValid = false
    seen.message = t.validation.empty
  }

  if(isEmpty(period_start.value.toString())){
    isGood = false
    period_start.isValid = false
    period_start.message = t.validation.empty
  }

  if(isEmpty(period_end.value.toString())){
    isGood = false
    period_end.isValid = false
    period_end.message = t.validation.empty
  }

  if(seen.value){
    if(isEmpty(desc.value)){
      isGood = false
      desc.isValid = false
      desc.message = t.validation.empty
    }
    let plainText = terms_condition.value.replace(/<[^>]+>/g, '');
    let finalText = plainText.replace(/&nbsp;/g, " ");
    if(isEmpty(finalText)){
      isGood = false
      terms_condition.isValid = false
      terms_condition.message = t.validation.empty
    }
  }

  if(!isGood){
    setState2({ ...state2, terms_condition })
    setState({ ...state, name, seen, desc, period_start, period_end })
  }

  return isGood
}
