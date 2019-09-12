<template>
    <b-card-group deck>
        <b-card no-body header="TODO List">
            <div class="input">
            <b-input-group prepend="TODO" class="mt-3">
                <b-form-input v-model="text" placeholder="Enter TODO"></b-form-input>
                <b-input-group-append>
                    <b-button variant="info" v-on:click="addList">Submit</b-button>
                </b-input-group-append>
            </b-input-group>
            </div>
            <div class="list">
            <b-list-group v-for="todo in todoList" v-bind:key="todo.id">
                <b-list-group-item>
                    {{ todo.title }}
                    <div class="icons">
                        <font-awesome-icon icon="check" size="lg" @click="remove(todo.id)" />
                        <font-awesome-icon icon="edit" size="lg" @click="edit(todo.id)" />
                    </div>
                </b-list-group-item>
            </b-list-group>
            </div>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
    data() {
      return {
        text: ''
      }
    },
    computed: {
        // 一覧の取得呼び出し
        todoList: function(){
            return this.$store.getters.getTodos;
        }
    },
    methods: {
        // リストへの追加呼び出し
        addList(){
            this.$store.commit('setTodo', {
                title: this.text
            });
            this.text = '';
        },
        // TODOリストの削除呼び出し
        remove: function(listId){
            this.$store.commit('removeTodo', {
                id: listId
            });
        },
        // TODOリストの編集
        edit: function(listId){
            // TODO: 編集する処理
            console.log(listId);
        },
        tmpLog: function(){
            console.log("test");
        }
    }
}
</script>

<style scoped>
.icons {
    float: right
}
.input {
    margin: 5px;
}
.list {
    margin: 5px;
}
</style>