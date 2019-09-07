import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [],
        count: 0
    },
    getters: {
        getTodos(state){ return state.todos }
    },
    mutations: {
        setTodos(state, payload){
            state.todos.push(
            {
                id: state.count, 
                title: payload.title,
                xpos: 0,
                ypos: 0
            });
            state.count++;
        }
    }
})