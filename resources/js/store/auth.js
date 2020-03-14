import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

// ステート・ゲッター・ミューテーション・アクションを定義してストアオブジェクトとしてエクスポートしています。これが認証したユーザのデータが入るストアになります。
const state = {
  user: null,
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null
}

const getters = {
  // check はログインチェックに使用します。確実に真偽値を返すために二重否定しています。
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
}

//mutationsは同期通信で使用
const mutations = {
  // ミューテーションの第一引数は必ずステートです。ミューテーションを呼び出すときの実引数は仮引数では第二引数以降として渡されますので注意
  setUser (state, user) {
    state.user = user
  },
  setApiStatus (state, status) {
    state.apiStatus = status
  },
  setLoginErrorMessages (state, messages) {
    state.loginErrorMessages = messages
  },
  setRegisterErrorMessages (state, messages) {
    state.registerErrorMessages = messages
  }
}

//actionsは非同期通信で使用
const actions = {
  // 会員登録
  async register (context, data) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/register', data)

    if (response.status === CREATED) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }

    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setRegisterErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  // ログイン
  async login (context, data) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/login', data)

    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }

    context.commit('setApiStatus', false)
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit('setLoginErrorMessages', response.data.errors)
    } else {
      context.commit('error/setCode', response.status, { root: true })
    }
  },

  // ログアウト
  async logout(context) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/logout')

    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', null)
      return false
    }

    context.commit('setApiStatus', false)
    context.commit('error/setCode', response.status, { root: true })
  },

  // ログインユーザーチェック
  async currentUser (context) {
    context.commit('setApiStatus', null)
    const response = await axios.get('/api/user')
    const user = response.data || null

    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', user)
      return false
    }
    
    context.commit('setApiStatus', false)
    context.commit('error/setCode', response.status, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}