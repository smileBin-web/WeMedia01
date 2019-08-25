import warning from 'warning'

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
export function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) return false
  
    let proto = obj
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto)
    }
  
    return Object.getPrototypeOf(obj) === proto
  }

/**
 * @param {array} data [{key: value}, {key: null}]
 * @returns {string} a path string
 */

export const turnDataToPath = data => {
    let path = ''
    if(!data instanceof Array) {
        warning(false, 'data is not a array')
    } else {
        data.forEach((obj, index) => {
            if (!isPlainObject(obj)) {
                warning(false, 'obj is not a plainObject')
            } else {
                const key = Object.keys(obj)[0]
                const value = obj[key]
                path += `${key}${value === null ? '' : '=' + value}${index === data.length -1 ? '' : '/'}`
            }
        })
    }
    
    return path
}


let timeoutObj = {}
export const viodShake =  (fn, time, mark) => {
    clearTimeout(timeoutObj[mark])
    timeoutObj[mark] = setTimeout(()=>{
        fn()
    } ,time)
}


export const changeLoadingState = (put, name, state) => {
    return put({
        type: 'loadingState/changeLoading',
        payload: {
            [name]: state
        },
    })
}