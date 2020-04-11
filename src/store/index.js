import Vue from 'Vue'
import Vuex from 'Vuex'
import form from './modules/form'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {},
  modules: {
    form
  }
})
