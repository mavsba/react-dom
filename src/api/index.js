import jsonp from 'jsonp'
import ajax from './ajax'
const BASE = 'http://localhost:5000'

// 登陆
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

// 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})
// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST')
// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

export const reqProducts = (pageNum,pageSize) => ajax('/manage/product/list',{pageNum,pageSize})

export const reqSearchProducts = (pageNum,pageSize,productType,productValue) => ajax('/manage/product/search',{pageNum,pageSize,[productType]:productValue})
// 请求获取天气
export function reqWeather (city) {
  return new Promise(function (resolve, reject) {

    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发异步ajax请求
    jsonp(
      url,
      {
        param: 'callback'
      },
      (error, data) => {
        if(!error) { // 如果成功了, 调用resolve传递数据
          const {dayPictureUrl, weather} = data.results[0].weather_data[0]
          resolve({dayPictureUrl, weather})
        } else { // 如果出错了, 显示提示
          alert('请求天气接口出错啦!!!')
        }
      }
    )
  })
}

// reqWeather('北京').then(() => {}).catch(() => {})