/**
 * Created by qige on 2019/1/14.
 */
import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter,withRouter} from 'react-router-dom'
import storageUtils from './utils/storageUtils'
import MemoryUtils from './utils/memoryUtils'
import App from './App'

// 读取local中user, 如果存在, 保存到内存中
const user = storageUtils.getUser()
if(user && user._id) {
  MemoryUtils.user = user
}



render((<BrowserRouter><App/></BrowserRouter>),document.getElementById('root'))