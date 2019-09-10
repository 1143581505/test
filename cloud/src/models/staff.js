import {queryStaff,queryStaffChangeStatus} from '@/services/staff';
const StaffModel = {
  namespace: 'staff',
  state: {
    staffData:[],
    total:0,
    staffId:0,
  },
  effects: {
    *fetchLoadStaff(_, { call, put }) {
      const response = yield call(queryStaff,_.payload);
      yield put({
        type: 'changeStaffData',
        payload: response,
      });
    },
    *fetchChangeStatus(_, { call, put }) {
      const response = yield call(queryStaffChangeStatus,_.payload.status);
      yield put({
        type: 'fetchLoadStaff',
        payload: _.payload.form,
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
      return { ...state,staffData:action.payload.data.list,total:action.payload.data.total};
    },
  },
};
export default StaffModel;