import axios from 'axios'
import {message} from 'antd'
 export default  (url ,data ={}, type='GET') => {
    return new Promise ((resolve,reject) =>{
      let promise =''
      if(type === 'GET'){
        promise = axios.get(url,{params:data})
      }else if(type === 'POST'){
        promise = axios.post(url,data)
      }else {
        alert('没有此请求类型')
      }
      promise
        .then(res=>{
          resolve(res.data)
        })
        .catch(err=>{
          message.error('请求不正确'+err)
        })
    })
 }