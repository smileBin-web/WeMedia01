
import service from '../../../service/index'
import { changeLoadingState } from '../../../utils/common'
const { homeApi } = service

export default {
    namespace: 'applist',
    state: {
      recommandList: [],
      searchRecommandList: [],
      topList: [],
      searchTopList: [],
      lookup: null,
      isAll: false, // topList列表后面还有数据
    },
    effects: {
      *fetchRecommandList({ payload }, { call, put, select }) {
        try {
          // 启动当前请求的loading 下同
          yield changeLoadingState(put, 'fetchRecommandList', true)

          const data = yield call(
              homeApi.getRecommandList({LoadingTips: false})
          , payload)
          
          // 关闭当前请求的loading
          yield changeLoadingState(put, 'fetchRecommandList', false)
         
          yield put({
            type: 'changeRecommandList',
            payload: data.data,
          });
        
        } catch (e) {

        }
        
      },
      *fetchTopList({ payload }, { call, put, select }) {
        const {
          LoadingTips = 'loading',
          data: _data
        } = payload

        try {
          yield changeLoadingState(put, 'fetchTopList', true)

          const data = yield call(
              homeApi.getTopList({LoadingTips})
          , _data)

          yield changeLoadingState(put, 'fetchTopList', false)

          yield put({
            type: 'changeTopList',
            payload: data.data,
          });
          
        } catch (e) {
          yield changeLoadingState(put, 'fetchTopList', false)

          yield put({
            type: 'changeisAllState',
            payload: true,
          });
        }
      },
      *fetchCheckTopList({ payload }, { call, put, select }) {
        try {
          const data = yield call(
              homeApi.getTopSearchList({LoadingTips: false})
          , payload)
          
          yield changeLoadingState(put, 'fetchCheckTopList', false)
          yield put({
            type: 'changeCheckTopList',
            payload: data.data,
          });
        
        } catch (e) {
          
        }
        
      },
      *fetchCheckRecommandList({ payload }, { call, put, select }) {
        try {

          const data = yield call(
              homeApi.getRecommandSearchList({LoadingTips: false})
          , payload)
          
          yield changeLoadingState(put, 'fetchCheckRecommandList', false)

          yield put({
            type: 'changeCheckRecommandList',
            payload: data.data,
          });
        
        } catch (e) {
          
        }
        
      },
      *fetchLookup({ payload }, { call, put, select }) {
        
        try {
          yield changeLoadingState(put, 'fetchLookup', true)

          const data = yield call(
              homeApi.getAppDetail()
          , payload)
          
          yield changeLoadingState(put, 'fetchLookup', false)

          yield put({
            type: 'changeLookup',
            payload: data.data,
          });
        
        } catch (e) {
          
        }
        
      },
    },
    reducers: {
      changeRecommandList(state, { payload }) {
        return {
          ...state,
          recommandList: payload,
        };
      },
      changeTopList(state, { payload }) {
        return {
          ...state,
          topList: state.topList.concat(payload),
        };
      },
      changeCheckTopList(state, { payload }) {
        return {
          ...state,
          searchTopList: payload,
        };
      },
      changeCheckRecommandList(state, { payload }) {
        return {
          ...state,
          searchRecommandList: payload,
        };
      },
      changeLookup(state, { payload }) {
        return {
          ...state,
          lookup: payload,
        };
      },
      changeisAllState(state, { payload }) {
        return {
          ...state,
          isAll: payload,
        };
      },
    },
  };