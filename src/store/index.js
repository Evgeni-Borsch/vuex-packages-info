import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      packages: [],
      
    },
    actions:{
      // СПОСОБ: ФЕТЧ-ЗАПРОС ДАННЫХ С СЕРВЕРА ДЛЯ ЗАПОЛНЕНИЯ ТАБЛИЦЫ
      async showDateInTable(ctx) {
        const res = await fetch (
          "https://data.jsdelivr.com/v1/stats/packages"
        );
        const packages = await res.json();
        
        ctx.commit('showTable', packages)
      },
      
    },
    mutations: {
      showTable(state, packages) {
        state.packages = packages
      },
      showText(state,packageText) {
        state.packageName = packageText
      }
      
    },
    getters:{
      allPackages(state) {
        return state.packages
      },
      getTextPackage(state) {
        return state.packageText
      }
    }
  })