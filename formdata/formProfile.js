import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'

export const formProfile = {
  username: { value: "", isValid: true, message: "" },
  email: { value: "", isValid: true, message: "" },
  phone: { value: "", isValid: true, message: "" },
  gender: { value: [], isValid: true, message: "" },
}

export const formProfileIsValid = (state, setState) => {
  const username = { ...state.username }
  const phone = { ...state.phone} 
  const gender = { ...state.gender} 
  let isGood = true

  if(!isLength(username.value, { min: 3, max: 100 })){
    isGood = false;
    username.isValid = false;
    username.message = "ensure this value has at least 3 - 100 characters";
  }

  if(!isMobilePhone("+62"+phone.value, ['id-ID'])){
    isGood = false;
    phone.isValid = false;
    phone.message = "Please provide a valid mobile phone number";
  }

  if(isEmpty(gender.value ? gender.value : "")){
    isGood = false;
    gender.isValid = false;
    gender.message = "Gender can't be empty";
  }

  if(!isGood) setState({ ...state, username, phone, gender })

  return isGood
}
