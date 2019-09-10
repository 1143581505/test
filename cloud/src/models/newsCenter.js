import {queryNewsCenter,queryAddNewsCenter,queryStatusNewsCenter,queryDeleteNewsCenter} from '@/services/newsCenter';
const NewsCenterModel = {
  namespace: 'newsCenter',
  state: {
    newsCenterData:[],
    total:0,
  },
  effects: {
    *fetchLoadNewsCenter(_, { call, put }) {
      const response = yield call(queryNewsCenter,_.payload);
      yield put({
        type: 'changeNewsCenterData',
        payload: response,
      });
    },
    *fetchLoadAddNewsCenter(_, { call, put }) {
      const response = yield call(queryAddNewsCenter,_.payload.newsCenterAdd);
      yield put({
        type: 'fetchLoadNewsCenter',
        payload: _.payload.newsCenter,
      });
    },
    *fetchLoadStatusNewsCenter(_, { call, put }) {
      const response = yield call(queryStatusNewsCenter,_.payload.status);
      yield put({
        type: 'fetchLoadNewsCenter',
        payload: _.payload.newsCenter,
      });
    },
    *fetchLoadDeleteNewsCenter(_, { call, put }) {
      const response = yield call(queryDeleteNewsCenter,_.payload.deleteData);
      yield put({
        type: 'fetchLoadNewsCenter',
        payload: _.payload.newsCenter,
      });
    },
  },
  reducers: {
    changeNewsCenterData(state, action) {
      // action.payload.data.list.forEach(function(item){
      //   for(let key in item){
      //     item[key]===null?item[key]='-':item[key];
      //   }
      // });
      return { ...state,newsCenterData:action.payload.data.list,total:action.payload.data.total};
    },
  },
};
export default NewsCenterModel;