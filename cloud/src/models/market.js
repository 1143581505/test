import {queryMarket} from '@/services/market';
const MarketModel = {
  namespace: 'market',
  state: {
    marketData:[],
    total:0,
  },
  effects: {
    *fetchLoadMarket(_, { call, put }) {
      const response = yield call(queryMarket,_.payload);
      yield put({
        type: 'changeMarketData',
        payload: response,
      });
    },
  },
  reducers: {
    changeMarketData(state, action) {
      // action.payload.data.list.forEach(function(item){
      //   for(let key in item){
      //     item[key]===null?item[key]='-':item[key];
      //   }
      // });
      return { ...state,marketData:action.payload.data.list,total:action.payload.data.total};
    },
  },
};
export default MarketModel;