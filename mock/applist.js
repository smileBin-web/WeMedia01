import { delay } from 'roadhog-api-doc'

import appListData from '../src/assets/serviceData/appListData'
import lookup from '../src/assets/serviceData/lookUp'
import recommandData from '../src/assets/serviceData/recommandData'

import {
    DURATION
} from '../src/config/index'

const topList = appListData.feed.entry
const recommandList = recommandData.feed.entry

const match = (keyword = '', list = []) => {

    return list.filter(item => {
        const {
            "im:name": {
              label: name
            },
            category: {
              attributes: {
                label: category
              }
            },
            summary: {
                label: summary
            }
        }  = item

        const isNameMatch = name.includes(keyword)
        const isCategoryMatch = category.includes(keyword)
        const isSummaryMatch = summary.includes(keyword)

        return isNameMatch || isCategoryMatch || isSummaryMatch
    })
}

const proxy = {
    'GET /hk/rss/topfreeapplications/check/json': (req, res) => {
        let {
            keyword,
        } = req.query
        const matchData = match(keyword, topList)
        res.send({
            meta: {
                code: 0,
            },
            data: matchData
        })
    
    },
    'GET /hk/rss/topfreeapplications/json': (req, res) => {
        let {
            pageIndex,
        } = req.query
        if(pageIndex > 10){
            res.send({
                meta: {
                    code: 1123,
                    msg: '到底啦'
                }
            })
            
        }else{
            const data =  topList.slice((pageIndex-1)*10, pageIndex*10)
            res.send({
                meta: {
                    code: 0,
                },
                data
            })
        }
    },
    'GET /hk/rss/recommand/check/json': (req, res) => {
        let {
            keyword,
        } = req.query
        const matchData = match(keyword, recommandList)
        res.send({
            meta: {
                code: 0,
            },
            data: matchData
        })
    
    },
    'GET /hk/rss/recommand/json': (req, res) => {
        res.send({
            meta: {
                code: 0,
            },
            data: recommandList
        })
    },
    'GET /hk/lookup': (req, res) => {
        res.send({
            meta: {
                code: 0,
            },
            data: lookup
        })
    },
  };

// 调用 delay 函数，统一处理
export default delay(proxy, DURATION*1000/2)