import './bootstrap'
import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
// ルートコンポーネントをインポートする
import App from './App.vue'
import store from './store'


new Vue({
  el: '#app',
  router, 
  store,
  components: { App }, 
  template: '<App />' 
})