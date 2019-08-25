import { fetch } from 'whatwg-fetch'
import qs from 'querystringify'
import { Toast } from 'antd-mobile'

import {
    DURATION,
    PARAM_TYPE,
    SUCCESS_CODE
} from '../config/index'

import {
    turnDataToPath
} from './common'

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}
  
export function parseJSON(response) {
    return response.json()
}

export const userFetch =  (httpOptions = {}) => 
    (method = 'GET') => 
    url =>
    (paramType = PARAM_TYPE.QUERY) =>
    (userOptions = {}) => 
    data => {
        const options = {
            // body: JSON.stringify(data), // must match 'Content-Type' header
            credentials: 'include', // include, same-origin, *omit
            headers: {
              'content-type': 'application/json'
            },
            method, 
            mode: '*same-origin', // no-cors, cors, *same-origin
            ...httpOptions
        }
        let _url =''
        if (method === 'GET') {
            if (paramType === PARAM_TYPE.QUERY) {
                _url = url + qs.stringify(data, true)
            } else if (paramType === PARAM_TYPE.PATH) {
                _url = url + turnDataToPath(data)
            }
            
        } else {
            options.body = JSON.stringify(data)
        }
        const {
            LoadingTips  = 'loading',
            isNeedErrorTips = true,
            errorTips = '',
            successTips = '',
        } = userOptions

        if(LoadingTips) Toast.loading(LoadingTips, 0)
        
        return fetch(_url, options)
            .then(checkStatus)
            .then(parseJSON)
            .catch(error => {
                if(LoadingTips) Toast.hide()
                Toast.fail('request failed', DURATION)
                throw new Error('request failed')
            })
            .then((res = {}) => {

                if(LoadingTips) Toast.hide()

                const {
                    meta: {
                        code,
                        msg
                    }
                } = res

                if(code === SUCCESS_CODE) { // 表示无业务逻辑上的错误 要根据后台接口文档具体定义
                    if(successTips) Toast.success(successTips, DURATION)
                    return res
                } else {
                    if(isNeedErrorTips) Toast.fail(errorTips || msg, DURATION)
                    const error  = new Error(res.meta.msg)
                    error.res = res
                    throw error
                }
            })

    }


export const commonUserFetch =  {
    get: userFetch()('GET'),
    post: userFetch()('POST'),
    // 其他restful method
}

  