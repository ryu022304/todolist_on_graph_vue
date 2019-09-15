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
            <b-input-group prepend="Axis" class="mt-3">
                <b-form-input v-model="axis" placeholder="Enter Axis Label"></b-form-input>
                <b-input-group-append>
                    <b-button squared variant="outline-info" v-on:click="addAxisLavel('px')">+X</b-button>
                    <b-button squared variant="outline-info" v-on:click="addAxisLavel('mx')">-X</b-button>
                    <b-button squared variant="outline-info" v-on:click="addAxisLavel('py')">+Y</b-button>
                    <b-button squared variant="outline-info" v-on:click="addAxisLavel('my')">-Y</b-button>
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
        text: '',
        axis: ''
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
        // 軸名の追加呼び出し
        addAxisLavel(label){
            let x = 0
            let y = 0
            let xPer = 1
            let yPer = 1
            if(label=='px'){
                x = 0
                y = -20
                xPer = 0.85
                yPer = 0.5
            }
            else if(label=="mx"){
                x = -10
                y = -20
                xPer = 0.1
                yPer = 0.5
            }
            else if(label=="py"){
                x = 5
                y = 0
                xPer = 0.5
                yPer = 0.1
            }
            else if(label=="my"){
                x = 5
                y = 0
                xPer = 0.5
                yPer = 0.85
            }
            this.$store.commit('setAxises', {
                label: label,
                name: this.axis,
                xOffset: x,
                yOffset: y,
                xPercent: xPer,
                yPercent: yPer
            });
            this.axis = '';
        },
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