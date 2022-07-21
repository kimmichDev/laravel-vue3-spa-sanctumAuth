export default {
    state: {
        auth: null,
    },
    getters: {
        GET_AUTH: (state) => state.auth,
    },
    mutations: {
        SET_AUTH: (state, payload) => state.auth = payload
    },
    actions: {
        setAuth: ({ commit }, payload) => commit("SET_AUTH", payload),
    }
}