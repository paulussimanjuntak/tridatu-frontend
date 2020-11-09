import isEqual from 'validator/lib/equals'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'

export const formRegister = {
  username: { value: "", isValid: true, message: "" },
  email: { value: "", isValid: true, message: "" },
  password: { value: "", isValid: true, message: "" },
  confirm_password: { value: "", isValid: true, message: "" },
}

export const formRegisterIsValid = (state, setState) => {
  const username = { ...state.username }
  const email = { ...state.email }
  const password = { ...state.password }
  const confirm_password = { ...state.confirm_password }
  let isGood = true

  if(!isLength(username.value, { min: 3, max: undefined })){
    isGood = false;
    username.isValid = false;
    username.message = "ensure this value has at least 3 characters";
  }

  if(!isEmail(email.value)){
    isGood = false;
    email.isValid = false;
    email.message = "value is not a valid email address";
  }

  if(!isLength(password.value, { min: 6, max: undefined })){
    isGood = false;
    password.isValid = false;
    password.message = "ensure this value has at least 6 characters";
  }

  if(!isEqual(password.value, confirm_password.value)){
    isGood = false;
    password.isValid = false;
    password.message = "Password must match with confirmation.";
  }

  if(!isLength(confirm_password.value, { min: 6, max: undefined })){
    isGood = false;
    confirm_password.isValid = false;
    confirm_password.message = "ensure this value has at least 6 characters";
  }

  if(!isGood) setState({ ...state, username, email, password, confirm_password })

  return isGood
}
