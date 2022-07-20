import Mock from 'mockjs'
import homeApi from './mockServeData/home.js'
import userApi from './mockServeData/user.js'
import permissionApi from './mockServeData/permission.js'
Mock.mock('/home/getdata', homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/user\/getuser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/permission\/getmenu/, 'post', permissionApi.getMenu)
