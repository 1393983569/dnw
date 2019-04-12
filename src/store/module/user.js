// vuex User状态
import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded
} from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: [],
    shopName: '',
    shopId: ''
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setShopName (state, shopName) {
      state.shopName = shopName
    },
    setShopId (state, shopId) {
      state.shopId = shopId
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      // userName = userName.trim()
      // 这里用Promise做判断
      return new Promise((resolve, reject) => {
        login({userName, password}).then(res => {
          const data = res
          if (data.status === '0') {
            reject(data.info)
            return
          }
          // 存入token
          commit('setToken', data.msg)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          let arr = res.msg
          const data = res.info
          // 图片
          commit('setAvator', 'http://qiniu.dnwapp.com/1544149701527.png')
          // 名称
          // commit('setUserName', data.accountTitle)
          // id
          // commit('setUserId', data.accountId)
          commit('setAccess', arr)
          commit('setShopId', data.shopId + '')
          commit('setShopName', data.shopName)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
