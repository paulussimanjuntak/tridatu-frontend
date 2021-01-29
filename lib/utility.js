import moment from 'moment'

export const updateObject = (oldObject, updateValue) => {
  return { ...oldObject, ...updateValue };
};

export const disabledDate = (current) => {
  return current && current < moment().startOf("day");
}

export const disabledRangeTime = (current, type) => {
  if(type === "start"){
    const disabledHours = () => {
      if(current && current.format('L') === moment().format('L')){
        return [...Array(moment().hour())].map((_, i) => i)
      }
    }
    const disabledMinutes = () => {
      if(current && current.format('L') === moment().format('L') && current.hour() === moment().hour()){
        return [...Array(moment().add(2, "minute").minute())].map((_, i) => i)
      }
    }
    return {
      disabledHours: () => disabledHours(),
      disabledMinutes: () => disabledMinutes()
    }
  }
  else {
    const disabledHours = () => {
      if(current && current.format('L') === moment().format('L')){
        return [...Array(moment().hour())].map((_, i) => i)
      }
    }
    const disabledMinutes = () => {
      if(current && current.format('L') === moment().format('L') && current.hour() === moment().hour()){
        return [...Array(moment().add(12, "minute").minute())].map((_, i) => i)
      }
    }
    return {
      disabledHours: () => disabledHours(),
      disabledMinutes: () => disabledMinutes()
    }
  }
}
