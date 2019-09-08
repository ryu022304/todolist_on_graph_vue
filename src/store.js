import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [],
        count: 0
    },
    getters: {
        // TODOリスト一覧の取得
        getTodos(state){ return state.todos }
    },
    mutations: {
        // TODOリストの追加
        setTodo(state, payload){
            state.todos.push(
            {
                id: state.count, 
                title: payload.title,
                xpos: 0,
                ypos: 0
            });
            state.count++;
        },
        // TODOリストの削除
        removeTodo(state, payload){
            state.todos = state.todos.filter(function(v){
                return v.id != payload.id
            });
        }
    }
})