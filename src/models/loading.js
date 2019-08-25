
export default {
  namespace: 'loadingState',
  state: {
    loading: {} // 存储各个请求的loading 状态
  },
  effects: {
  },
  reducers: {
    changeLoading(state, { payload }) {
      return {
        loading: {
          ...state.loading,
          ...payload
        }
      };
    }
  },
}