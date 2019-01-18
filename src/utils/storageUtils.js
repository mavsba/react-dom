/*
 local存储工具模块
 */
import store from 'store'

const USER_KEY = 'user_key' // 保存user的标识key

export default  {
  /*保存user*/
  saveUser(user) {
    store.set(USER_KEY, user)
  },

  /*获取User*/
  getUser() {
    return store.get(USER_KEY)||''
  },

  /*移除user*/
  removeUser() {
    store.remove(USER_KEY)
  }
}