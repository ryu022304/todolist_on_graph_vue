import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        todos: [],
        count: 0,
        axises: [],
    },
    getters: {
        // TODOリスト一覧の取得
        getTodos(state){ return state.todos },
        // 軸の取得
        getAxises(state){ return state.axises }
    },
    mutations: {
        // TODOリストの追加
        setTodo(state, payload){
            state.todos.push(
            {
                id: state.count, 
                title: payload.title,
                xpos: 0,
                ypos: 0,
                isEditing: false
            });
            state.count++;
        },
        // TODOリストの削除
        removeTodo(state, payload){
            state.todos = state.todos.filter(function(v){
                return v.id != payload.id
            });
        },
        // TODOリストの座標更新
        updateTodoPos(state, payload){
            const index = state.todos.findIndex(item=>item.id==payload.id);
            state.todos[index].xpos = payload.x-payload.w/2;
            state.todos[index].ypos = payload.y-payload.h/2;
        },
        // TODOリストの編集状態更新
        updateTodoIsEditing(state, payload){
            const index = state.todos.findIndex(item=>item.id==payload.id);
            state.todos[index].isEditing = payload.isEditing;
        },
        // 軸の設定
        setAxises(state, payload){
            state.axises = state.axises.filter(function(v){
                return v.label != payload.label
            });
            state.axises.push(payload);
        },
        // 設定を全てクリアする
        removeAll(state){
            state.todos = [];
            state.count = 0;
            state.axises = [];
        }
    },
    plugins: [
        createPersistedState({
            key: 'todo_graph',
            storage: {
              getItem: key => ls.get(key),
              setItem: (key, value) => ls.set(key, value),
              removeItem: key => ls.remove(key)
            }
        })
    ]
})