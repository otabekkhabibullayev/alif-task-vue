import { createStore } from "vuex";
import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default createStore({
    state() {
        return {
            list: [],
            detail: {},
        }
    },
    mutations: {
        setList(state, payload) {
            state.list = payload
        },
        setDetail(state, payload) {
            state.detail = payload
        },
    },
    getters: {
        list(state) {
            return state.list
        },
        detail(state) {
            return state.detail
        },
    },
    actions: {
        async fetchList({ commit }) {
            try {
                let res = await axios.get('/list')
                commit('setList', res.data)
            } catch (e) {
                console.error(e)
            }
        },
        async getListSlug({ commit }, id) {
            try {
                let res = await axios.get(`/list/${id}`)
                commit('setDetail', res.data)
            } catch (e) {
                console.error(e)
            }
        },
        async sendData(_, { payload }) {
            try {
                let res = await axios.post('/list/', payload)
                console.log(res, 'send');
                return res
            } catch (e) {
                console.error(e)
            }
        },
        async deleteData(_, id) {
            try {
                let res = await axios.delete(`/list/${id}`)
                return res
            } catch (e) {
                console.error(e)
            }
        },
        async updateData(_, { id, payload }) {
            try {
                let res = await axios.put(`/list/${id}`, payload)
                return res
            } catch (e) {
                console.error(e)
            }
        }
    }
})