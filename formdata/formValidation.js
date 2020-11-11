/**
 * Function for checking validation form
 * @param {object} state - The state of form that want to check the validation of their own item
 * return {bool} valid
 */

export const isValidForm = (state) => {
  let valid = true;
  for (let key in state) {
    valid = state[key].isValid && valid && state[key].value && valid;
  }
  return valid
}
