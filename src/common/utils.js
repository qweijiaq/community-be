import { getValue } from '../config/Redis'

export const checkCode = async (key, value) => {
  const resData = await getValue(key)
  if (resData != null) {
    if (resData.toLowerCase() === value.toLowerCase()) {
      return true
    }
    return false
  }
  return false
}
