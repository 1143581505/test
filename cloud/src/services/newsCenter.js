import request from '@/utils/request';
export async function queryNewsCenter(param) {
  return request('/api/notice/pageQuery',{
      method:'get',
      params:param,
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
export async function queryAddNewsCenter(param) {
  return request('/api/notice/saveOrUpdate',{
      method:'post',
      params:param,
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
export async function queryStatusNewsCenter(param) {
  return request('/api/notice/changeStatus',{
      method:'get',
      params:param,
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}
export async function queryDeleteNewsCenter(param) {
  return request('/api/notice/deleteById',{
      method:'get',
      params:param,
      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
}