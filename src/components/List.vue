<template>
    <b-card-group deck>
        <b-card header="TODO List">
            <b-list-group v-for="todo in todoList" v-bind:key="todo.id">
                <b-list-group-item>
                    {{ todo.title }}
                    <div class="icons">
                        <font-awesome-icon icon="check" size="lg" @click="remove(todo.id)" />
                        <font-awesome-icon icon="edit" size="lg" @click="edit(todo.id)" />
                    </div>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
    computed: {
        // 一覧の取得呼び出し
        todoList: function(){
            return this.$store.getters.getTodos;
        }
    },
    methods: {
        tmpLog: function(){
            console.log("test");
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
        }
    }
}
</script>

<style scoped>
.icons {
    float: right
}
</style>