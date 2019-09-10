import {queryBusinessManege} from '@/services/businessManege';
const BusinessManegeModel = {
  namespace: 'businessManege',
  state: {
    businessManegeData:[],
    total:0,
  },
  effects: {
    *fetchLoadBusinessManege(_, { call, put }) {
      const response = yield call(queryBusinessManege,_.payload);
      yield put({
        type: 'changeBusinessManegeData',
        payload: response,
      });
    },
  },
  reducers: {
    changeBusinessManegeData(state, action) {
    //   action.payload.data.list.forEach(function(item){
    //     for(let key in item){
    //       item[key]===null?item[key]='-':item[key];
    //     }
    //   });
      return { ...state,businessManegeData:action.payload.data.list,total:action.payload.data.total};
    },
  },
};
export default BusinessManegeModel;