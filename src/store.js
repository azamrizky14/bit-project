// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API } from '@/API';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    topbarTitle: '',
    routing: '',
    dataUsaha: [],
    dataProses: [],
    btnList: []
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
      localStorage.setItem('isAuthenticated', status)
    },
    setTopbarTitle(state, data) {
      state.topbarTitle = data;
    },
    setRouting(state, data) {
      state.routing = data;
    },
    setDataUsaha(state, data) {
      state.dataUsaha = data;
    },
    setDataProses(state, data) {
      state.dataProses = data;
    },
    setBtnList(state, data) {
      state.btnList = data;
    }
  }, 
  actions: {
    updateDataUsaha({commit}, data) {
      commit('setDataUsaha', data);
      localStorage.setItem('dataUsaha', JSON.stringify(data));
    },
    fetchMyArray({commit}) {
      const storedData = localStorage.getItem('dataUsaha')
      const dataUsaha = JSON.parse(storedData) || [];
      commit('setDataUsaha', dataUsaha)
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(API + "/user/login", credentials);

        commit('setAuthentication', true)

        return response.data
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit('setAuthentication', false)
    }
  }
});

export default store;