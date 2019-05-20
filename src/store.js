import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  store_currentPage: 0
}

const mutations = {
  setCurrentPage(state,page){
    state.store_currentPage = page;
  },
}

const actions = {
  setCurrentPage:({commit},page)=>{
    commit('setCurrentPage',page)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
})