<template>
    <b-card-group deck>
        <b-modal id="my-modal"
         size="xl"
         @ok="downloadImage"
        >
            この画像をダウンロードしますか？
            <div id="preview"></div>
        </b-modal>
        <b-card header="Graph Area">
            <b-button variant="info" v-b-modal="'my-modal'">
                <font-awesome-icon icon="camera" size="lg" @click="takeScreenShot" />
            </b-button>
            <v-stage :config="{
                width: this.width,
                height: this.height
            }"
                    ref="stage"
                    @dragstart="handleDragstart"
                    @dragend="handleDragend"
                    class="graph"
                    id="graph"
            >
                <v-layer ref="axisLayer">
                    <v-shape :config="{
                        sceneFunc: function(context) {
                            context.beginPath();
                            // 横軸
                            context.moveTo(width*0.05, height/2);
                            context.lineTo(width*0.95, height/2);
                            // 縦軸
                            context.moveTo(width/2, height*0.05);
                            context.lineTo(width/2, height*0.95);
                            context.stroke();
                        }
                    }"></v-shape>
                </v-layer>
                <v-layer ref="axisLabelLayer">
                    <v-text v-for="axis in axisList" v-bind:key="axis.label" :config="{
                        text: axis.name,
                        x: axis.xOffset+width*axis.xPercent,
                        y: axis.yOffset+height*axis.yPercent,
                        fontSize: 15,
                        draggable: false,
                        fill: 'red'
                    }"></v-text>
                </v-layer>
                <v-layer ref="todoLayer">
                    <v-text v-for="todo in todoList" v-bind:key="todo.id" :config="{
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
import html2canvas from 'html2canvas';

export default {
    data() {
        return {
            width: 0,
            height: 0,
            configAxisLine: {
                sceneFunc: function(context) {
                    context.beginPath();
                    // 横軸
                    context.moveTo(this.width*0.05, this.height/2);
                    context.lineTo(this.width*0.95, this.height/2);
                    // 縦軸
                    context.moveTo(this.width/2, this.height*0.05);
                    context.lineTo(this.width/2, this.height*0.95);
                    context.stroke();
                }
            }
        }
    },
    created() {
        this.width = 800;
        this.height = 400;
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
        },
        // ウィンドウサイズの取得
        handleResize(){
            this.height = document.getElementById('graph').clientHeight;
            this.width = document.getElementById('graph').clientWidth;
        },
        // canvasのスクリーンショット
        takeScreenShot(){
            let graph = document.getElementById('graph');
            html2canvas(graph,{
                height: this.height,
                width: this.width
            }).then(function(canvas){
                canvas.id = "preview-canvas"
                document.getElementById('preview').appendChild(canvas);
            }).catch(function(err){
                alert(err);
            });
        },
        // 画像のダウンロード
        downloadImage(){
            let dataURL = document.getElementById("preview-canvas").toDataURL('image/png');
            let link = document.createElement("a");
            link.href = dataURL;
            link.download = "test.png";
            console.log(dataURL);
            link.click();
        }
    },
    mounted() {
        this.height = document.getElementById('graph').clientHeight;
        this.width = document.getElementById('graph').clientWidth;
        window.addEventListener('resize', this.handleResize);
    }
};
</script>

<style scoped>
graph {
    object-fit: fill;
}
</style>