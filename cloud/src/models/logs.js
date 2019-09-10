import {queryLogs} from '@/services/logs';
const LogsModel = {
  namespace: 'logs',
  state: {
    logsData:[],
    total:0,
  },
  effects: {
    *fetchLoadLogs(_, { call, put }) {
      const response = yield call(queryLogs,_.payload);
      yield put({
        type: 'changeStaffData',
        payload: response,
      });
    },
  },
  reducers: {
    changeStaffData(state, action) {
      // action.payload.data.list.forEach(function(item){
      //   for(let key in item){
      //     item[key]===null?item[key]='-':item[key];
      //   }
      // });
      return { ...state,logsData:action.payload.data.list,total:action.payload.data.total};
    },
  },
};
export default LogsModel;