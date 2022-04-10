// 在这里导入网络模块，如果以后要用的网路模块改变，可以只改封装文件就可以让整个项目的网络模块全改
import axios from 'axios'

export function request(config) {
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = axios.create({
			baseURL: 'http://152.136.185.210:7878/api/hy66',
			timeout: 5000
		}) 
		
		// 2.2.响应拦截
		instance.interceptors.response.use(res => {
			// console.log(res)
			return res.data
		},err => {
			console.log(err)
		})
		
		// 3.发送真正的网络请求
		instance(config)
			.then(res => {
				resolve(res)
			})
			.catch(err => {
				reject(err)
			})
		// return instance(config)
	})
}