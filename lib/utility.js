import moment from 'moment'

export const dateTimeFormat = "DD MMM YYYY HH:mm"
export const updateObject = (oldObject, updateValue) => {
  return { ...oldObject, ...updateValue };
};

export const countDiscPrice = (disc, price) => {
  return Math.round(((100 - disc) / 100) * price)
}

export const disabledDate = (current, start, products_discount_start) => {
  if(start){
    if(products_discount_start){
      return current && current < moment(products_discount_start).startOf("day") || current > moment(products_discount_start).add(180, "day");
    } else {
      return current && current < moment(start).startOf("day") || current > moment(start).add(180, "day");
    }
  } else {
    if(products_discount_start){
      return current && current < moment(products_discount_start).startOf("day") || current > moment(products_discount_start).add(180, "day").startOf("day");
    } else {
      return current && current < moment(start).startOf("day") || current > moment().add(180, "day").startOf("day");
    }
  }
}

export const disabledDateDiffOneDay = (current, start) => {
  return current && current < moment(start).add(1, "day").startOf("day") || current > moment().add(180, "day").startOf("day");
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
          return [...Array(moment(start).add(1, "hour").hour())].map((_, i) => i)
        }
      }
      const disabledMinutes = () => {
        if(current && current.format('L') === moment(start).format('L') && current.hour() === moment(start).add(1, "hour").hour()){
          return [...Array(moment(start).add(1, "hour").minute())].map((_, i) => i)
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
          return [...Array(moment().add(1, "hour").hour())].map((_, i) => i)
        }
      }
      const disabledMinutes = () => {
        if(current && current.format('L') === moment().format('L') && current.hour() === moment().add(1, "hour").hour()){
          return [...Array(moment().minute())].map((_, i) => i)
        }
      }
      return {
        disabledHours: () => disabledHours(),
        disabledMinutes: () => disabledMinutes()
      }
    }
  }
}

export const disabledRangeSameTime = (current, type, start) => {
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
        if(current && current.format('L') === moment(start).add(1, "days").format('L')){
          return [...Array(moment(start).hour())].map((_, i) => i)
        }
      }
      const disabledMinutes = () => {
        if(current && current.format('L') === moment(start).add(1, "days").format('L') && current.hour() === moment(start).hour()){
          return [...Array(moment(start).minute())].map((_, i) => i)
        }
      }
      return {
        disabledHours: () => disabledHours(),
        disabledMinutes: () => disabledMinutes()
      }
    } 
    else {
      const disabledHours = () => {
        if(current && current.format('L') === moment().add(1, "days").format('L')){
          return [...Array(moment().add(1, "hour").hour())].map((_, i) => i)
        }
      }
      const disabledMinutes = () => {
        if(current && current.format('L') === moment().add(1, "days").format('L') && current.hour() === moment().hour()){
          return [...Array(moment().minute())].map((_, i) => i)
        }
      }
      return {
        disabledHours: () => disabledHours(),
        disabledMinutes: () => disabledMinutes()
      }
    }
  }
}
