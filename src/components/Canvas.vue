<template>
    <b-card-group deck>
        <b-card header="Graph Area" id="graph">
            <v-stage :config="configKonva"
                    ref="stage"
                    @dragstart="handleDragstart"
                    @dragend="handleDragend"
            >
                <v-layer ref="axisLayer">
                    <v-shape :config="configAxisLine"></v-shape>
                </v-layer>
                <v-layer ref="axisLabelLayer" v-for="axis in axisList" v-bind:key="axis.label">
                    <v-text :config="{
                        text: axis.name,
                        x: axis.xOffset+width*axis.xPercent,
                        y: axis.yOffset+height*axis.yPercent,
                        fontSize: 15,
                        draggable: false,
                        fill: 'red'
                    }"></v-text>
                </v-layer>
                <v-layer ref="todoLayer" v-for="todo in todoList" v-bind:key="todo.id">
                    <v-text :config="{
                        id: todo.id,
                        text: todo.title,
                        x: todo.xpos+width/2,
                        y: todo.ypos+height/2,
                        fontSize: 24,
                        draggable: true,
                        fill: 'black'
                    }"></v-text>
                </v-layer>
            </v-stage>
        </b-card>
    </b-card-group>
</template>

<script>

//const width = document.getElementById('graph').clientWidth * 0.9;
//const height = document.getElementById('graph').clientHeight * 0.9;
const width = 800;
const height = 400;
export default {
    data() {
        return {
            width: width,
            height: height,
            configKonva: {
                width: width,
                height: height
            },
            configAxisLine: {
                sceneFunc: function(context) {
                    context.beginPath();
                    // 横軸
                    context.moveTo(width*0.1, height/2);
                    context.lineTo(width*0.9, height/2);
                    // 縦軸
                    context.moveTo(width/2, height*0.1);
                    context.lineTo(width/2, height*0.9);
                    context.stroke();
                }
            }
        }
    },
    computed: {
        // TODO一覧の取得呼び出し
        todoList: function(){
            return this.$store.getters.getTodos;
        },
        // 軸名一覧の取得呼び出し
        axisList: function(){
            return this.$store.getters.getAxises;
        }
    },
    methods: {
        handleDragstart(e){
            e.target.attrs.fontSize = 30;
            e.target.attrs.fill = 'green';
        },
        handleDragend(e){
            e.target.attrs.fontSize = 24;
            e.target.attrs.fill = 'black';
            // 再描画
            const stage = this.$refs.stage.getNode();
            stage.draw();
            // LocalStorageに状態を保存
            this.$store.commit('updateTodoPos', {
                id: e.target.attrs.id,
                x: e.target.attrs.x,
                y: e.target.attrs.y,
                w: this.width,
                h: this.height
            });
        }
    }
};
</script>