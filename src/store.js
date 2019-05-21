import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  store_currentPage: 0,
  store_globalContion: {},
}

const mutations = {
  setCurrentPage(state,page){
    state.store_currentPage = page;
  },
  setGlobalContion(state,condition){
    state.store_globalContion = condition;
  },
}

const actions = {
  setCurrentPage:({commit},page)=>{
    commit('setCurrentPage',page)
  },
  setGlobalContion:({commit},x)=>{
    commit('setGlobalContion',x)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
})