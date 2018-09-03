import { queryFakeList } from '../services/api';

export default {
  namespace: 'tax',

  state: {
    tax: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      console.log('calling from tax model');
      const response = yield call(queryFakeList, payload);
      console.log('calling from tax model');
      console.log(response);
      yield put({
        type: 'queryTax',
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
    queryTax(state, action) {
      return {
        ...state,
        tax: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        tax: state.list.concat(action.payload),
      };
    },
  },
};
