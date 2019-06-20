import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  store_currentPage: 0,     //当前页数
  store_globalContion: {},  //全局条件查询配置
  store_labelPosition: 'top',  //条件查询form表单的label位置控制
  store_colSpan: 8,        //条件查询form表单的元素之前的距离控制（每行放几个，一个24个栅格，设置8表示可以放3个元素）
  selectedWidgetId: '',        //选择中的组件id
}

const mutations = {
  setCurrentPage(state,page){
    state.store_currentPage = page;
  },
  setGlobalContion(state,condition){
    state.store_globalContion = condition;
  },
  setLabelPosition(state,n){
    state.store_labelPosition = n;
  },
  setColSpan(state,n){
    state.store_colSpan = n;
  },
  setSelectWidgetId(state,n){
    state.selectedWidgetId = n;
  },
}

const actions = {
  setCurrentPage:({commit},page)=>{
    commit('setCurrentPage',page)
  },
  setGlobalContion:({commit},x)=>{
    commit('setGlobalContion',x)
  },
  setLabelPosition:({commit},x)=>{
    commit('setLabelPosition',x)
  },
  setColSpan:({commit},x)=>{
    commit('setColSpan',x)
  },
  setSelectWidgetId:({commit},x)=>{
    commit('setSelectWidgetId',x)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
})