import { queryCharity } from '../services/api';

export default {
  namespace: 'donate',

  state: {
    charity: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCharity, payload);
      yield put({
        type: 'queryCharity',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryCharity(state, action) {
      return {
        ...state,
        charity: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
