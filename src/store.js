import Vue from 'vue'
import Vuex from 'vuex'
import VueIdb from './idb'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [],
        count: 0,
        axises: [],
        hydrated: false
    },
    getters: {
        // TODOリスト一覧の取得
        getTodos(state){ return state.todos },
        // 軸の取得
        getAxises(state){ return state.axises },
        hydrated: state => state.hydrated
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
        },
        // 軸の設定
        setAxises(state, payload){
            state.axises = state.axises.filter(function(v){
                return v.label != payload.label
            });
            state.axises.push(payload);
        },
        'DELETE_INDEXED_DB'(){}
    },
    modules: VueIdb.modules,
    plugins: [ VueIdb.plugin ],
    strict: true
})