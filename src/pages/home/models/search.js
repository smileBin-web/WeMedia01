
export default {
  namespace: 'search',
  state: {
    keyword: '', // 关键字
    mode: 'recommand', // search 搜索模式 recommand 推荐模式
  },
  effects: {
  },
  reducers: {
    changeKeyWord(state, { payload }) {
      return {
        ...state,
        keyword: payload,
        mode: payload === '' ? 'recommand' : 'search',
      };
    }
  },
};