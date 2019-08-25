import { commonUserFetch } from '../utils/fetch'

import {
    PARAM_TYPE,
} from '../config/index'

export const getTopList = commonUserFetch
    .get('/hk/rss/topfreeapplications/json')(PARAM_TYPE.QUERY)

export const getTopSearchList = commonUserFetch
    .get('/hk/rss/topfreeapplications/check/json')(PARAM_TYPE.QUERY)

export const getRecommandList = commonUserFetch
    .get('/hk/rss/recommand/json')(PARAM_TYPE.QUERY)

export const getRecommandSearchList = commonUserFetch
    .get('/hk/rss/recommand/check/json')(PARAM_TYPE.QUERY)


export const getAppDetail = commonUserFetch
    .get('/hk/lookup')(PARAM_TYPE.QUERY)





