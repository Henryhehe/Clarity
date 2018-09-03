import {
  query as queryUsers,
  queryCurrent,
  queryDonorUser,
  queryCharityUser,
  queryBeneficiaryUser,
  queryGovernmentUser,
} from '../services/user';
import { getAuthority } from '../utils/authority';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const authorityRole = getAuthority();
      // different role
      let response;
      if (authorityRole === 'donor') {
        response = yield call(queryDonorUser);
      } else if (authorityRole === 'government') {
        response = yield call(queryGovernmentUser);
      } else if (authorityRole === 'charity') {
        response = yield call(queryCharityUser);
      } else if (authorityRole === 'beneficiary') {
        response = yield call(queryBeneficiaryUser);
      } else {
        response = yield call(queryCurrent);
      }

      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
