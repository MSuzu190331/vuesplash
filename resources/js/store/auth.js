// ステート・ゲッター・ミューテーション・アクションを定義してストアオブジェクトとしてエクスポートしています。これが認証したユーザのデータが入るストアになります。
const state = {
  user: null
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
  }
}

//actionsは非同期通信で使用
const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    const response = await axios.post('/api/login', data)
    context.commit('setUser', response.data)
  },
  async logout(context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async currentUser (context) {
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}