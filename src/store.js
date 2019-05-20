import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

const mutations = {
  increment(state){
    state.count++;
  },
  decreament(state){
    state.count--;
  }
}

const actions = {
  increment:({commit})=>{
    commit('increment')
  },
  decreament:({commit})=>{
    commit('increment')
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
})