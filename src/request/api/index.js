import axios from 'axios'
// export function getTableData () {
//   return serve({
//     method: 'GET',
//     url: '/home/tabledata'
//   })
// }
export function getData () {
  return axios.request({
    url: '/home/getdata'
  })
}
export function editUserDate (data) {
  return axios.post('/user/edit', data)
}
export function addUserDate (data) {
  return axios.post('/user/add', data)
}
export function getUser (params) {
  return axios.request({
    url: '/user/getuser',
    method: 'get',
    params
  })
}
export function delUser (params) {
  return axios.request({
    url: '/user/del',
    method: 'get',
    params
  })
}
export function getMenu (data) {
  return axios.request({
    url: '/permission/getmenu',
    method: 'post',
    data
  })
}
