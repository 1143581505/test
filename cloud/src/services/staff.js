// import axios from 'axios';
// export async function queryStaff(params) {
//   return axios.get('http://152.136.136.220:7788/user/pageQuery',{params});
// }


import request from '@/utils/request';
export async function queryStaff(param) {
  return request('/api/user/pageQuery',{
      method:'get',
      params:param,
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
export async function queryStaffChangeStatus(param) {
  return request('/api/user/changeEnabled',{
      method:'get',
      params:param,
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}