// ステート・ゲッター・ミューテーション・アクションを定義してストアオブジェクトとしてエクスポートしています。これが認証したユーザのデータが入るストアになります。
const state = {
  user: null
}

const getters = {}

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
  }  
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}