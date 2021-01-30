import moment from 'moment'

export const updateObject = (oldObject, updateValue) => {
  return { ...oldObject, ...updateValue };
};

export const disabledDate = (current) => {
  return current && current < moment().startOf("day");
}

export const disabledRangeTime = (current, type, start) => {
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
    if(start){
      const disabledHours = () => {
        if(current && current.format('L') === moment(start).format('L')){
          return [...Array(moment(start).hour())].map((_, i) => i)
        }
      }
      const disabledMinutes = () => {
        if(current && current.format('L') === moment(start).format('L') && current.hour() === moment(start).hour()){
          return [...Array(moment().add(10, "minute").minute())].map((_, i) => i)
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
}
