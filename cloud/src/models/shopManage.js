import {queryShopManage} from '@/services/shopManage';
const ShopManageModel = {
  namespace: 'shopManage',
  state: {
    shopManageData:[],
    total:0,
  },
  effects: {
    *fetchLoadShopManage(_, { call, put }) {
      const response = yield call(queryShopManage,_.payload);
      yield put({
        type: 'changeShopManageData',
        payload: response,
      });
    },
  },
  reducers: {
    changeShopManageData(state, action) {
    //   action.payload.data.list.forEach(function(item){
    //     for(let key in item){
    //       item[key]===null?item[key]='-':item[key];
    //     }
    //   });
      return { ...state,shopManageData:action.payload.data.list,total:action.payload.data.total};
    },
  },
};
export default ShopManageModel;