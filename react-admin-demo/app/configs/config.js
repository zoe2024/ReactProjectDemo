/*
 * @Date: 2021-09-22 22:52:50
 * @Descripton: 配置项
 * @LastEditTime: 2021-10-11 23:15:48
 */

export const set = 'set$'
export const demo = 'demo$'
export const brandName = 'React' // slogan

// 开发环境默认配置
let _serverIp = 'http://192.168.1.222'
let _port = '1111'
let _baseURL = `${_serverIp}:${_port}`
let _mockURL = 'http://localhost:1111/'

if (process.env.NODE_ENV === 'testing') { // 测试环境
  _mockURL = 'http://localhost:1111/'
  _port = '1111'
  _baseURL = `${_serverIp}:${_port}`
}
if (process.env.NODE_ENV === 'production') { // 发布环境
  _port = '1111'
  _serverIp = 'http://192.168.1.123'
  _baseURL = `${_serverIp}:${_port}`
}

export const serverIp = _serverIp
export const path = '/mock'
export const timeout = '15000' // 接口超时限制(ms)
export const baseURL = _baseURL
export const mockURL = _mockURL
