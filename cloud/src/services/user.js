import request from '@/utils/request';
export async function query() {
  
  return request('/api/users');
}
export async function queryCurrent() {
  console.log('8888888');
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
