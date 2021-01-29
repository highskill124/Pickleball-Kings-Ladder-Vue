import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        logedInUser: [],
        socials: null,
    },
    getters: {
        getSocials(state){
            return state.socials
        },
    },
    mutations: {
        LOGEDIN(state, payload) {
            state.logedInUser.push(payload);
        },
        LOGOUT(state, payload) {
            state.logedInUser = payload
        },
        SetSocials(state, payload){
            state.socials = payload;
        }

    },
    actions: {
        islogedIn({ commit }, payload) {
            commit('LOGEDIN', payload)
        },
        islogut({ commit }, payload) {
            commit('LOGOUT', payload)
        },
        setSocials({commit}, payload){
            commit('SetSocials', payload)
        },
        
    }
});