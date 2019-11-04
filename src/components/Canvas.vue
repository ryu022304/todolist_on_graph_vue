<template>
    <b-card-group deck>
        <b-modal id="preview-modal"
         size="xl"
         @hidden="resetModal"
        >
            <template v-slot:modal-title>
                Screenshot Preview
            </template>
            この画像をダウンロードしますか？ <br>
            ※画像が表示されない場合はRetryを押してください
            <div id="preview" class="text-center"></div>
            <template v-slot:modal-footer="{cancel}">
                <b-input-group prepend="-X" append="+X" class="mt-3">
                    <b-form-input type="range" min="-100" max="100" v-model="xScroll" @change="redrawPreview"></b-form-input>
                </b-input-group>
                <b-input-group prepend="-Y" append="+Y" class="mt-3">
                    <b-form-input type="range" min="-100" max="100" v-model="yScroll" @change="redrawPreview"></b-form-input>
                </b-input-group>
                <b-button variant="secondary" class="float-right" @click="cancel()">
                    Cancel
                </b-button>
                <b-button variant="success" class="float-right" @click="takeScreenShot">
                    Retry
                </b-button>
                <b-button variant="primary" class="float-right" @click="downloadImage">
                    OK
                </b-button>
            </template>
        </b-modal>
        <b-modal id="alert-modal" @ok="refreshAll">軸名、TODO内容を全て削除しますか？</b-modal>
        <b-card header="Graph Area">
            <b-button variant="info" v-b-modal="'preview-modal'">
                <font-awesome-icon icon="download" size="lg" @click="takeScreenShot" />
            </b-button>
            <!--
            <b-button variant="info">
                <font-awesome-icon :icon="['fab', 'twitter']" size="lg" @click="tweetWithImage" />
            </b-button>
            <b-button variant="info">
                <font-awesome-icon :icon="['fab', 'facebook-f']" size="lg" @click="postFacebookWithImage" />
            </b-button>
            -->
            <b-button variant="info" v-b-modal="'alert-modal'">
                <font-awesome-icon icon="trash-restore" size="lg" />
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
            xScroll: 0,
            yScroll: 0,
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
        // Modalのリセット
        resetModal(){
            this.xScroll = 0;
            this.yScroll = 0;
        },
        // canvasのスクリーンショットプレビュー
        takeScreenShot(){
            let graph = document.getElementById('graph');
            html2canvas(graph,{
                height: this.height,
                width: this.width
            }).then(function(canvas){
                // TODO: レスポンシブ対応の際の画像出力
                /*
                let dataURL = canvas.toDataURL('image/png');
                let imgEl = document.createElement("img");
                imgEl.id = "preview-canvas";
                imgEl.src = dataURL;
                document.getElementById('preview').appendChild(imgEl);
                */
                if (document.getElementById('preview-canvas') != null){
                    document.getElementById('preview-canvas').remove();
                    canvas.id = "preview-canvas"
                    document.getElementById('preview').appendChild(canvas);
                }
                else{
                    canvas.id = "preview-canvas"
                    document.getElementById('preview').appendChild(canvas);
                }
            }).catch(function(err){
                alert(err);
            });
            this.xScroll = 0;
            this.yScroll = 0;
        },
        // プレビューのリアルタイム修正
        redrawPreview: function(){
            let graph = document.getElementById('graph');
            if (document.getElementById('preview-canvas') != null){
                html2canvas(graph,{
                    height: this.height,
                    width: this.width,
                    scrollY: this.yScroll,
                    scrollX: this.xScroll
                }).then(function(canvas){
                    canvas.id = "preview-canvas"
                    document.getElementById('preview-canvas').remove();
                    document.getElementById('preview').appendChild(canvas);
                }).catch(function(err){
                    alert(err);
                });
            }
        },
        // 画像のダウンロード
        downloadImage(){
            let dataURL = document.getElementById("preview-canvas").toDataURL('image/png');
            let link = document.createElement("a");
            link.href = dataURL;
            link.download = "todo_graph.png";
            link.click();
        },
        /*
        // Twitterへの投稿
        tweetWithImage(){
            console.log('clicked tweet button');
            const siteURL = location.host;
            //const siteURL = "http://test.com"
            console.log(siteURL);
            const url = `https://twitter.com/intent/tweet?text=test&url=${siteURL}`;
            window.open(url, 'twitter');
        },
        // Facebookへの投稿
        postFacebookWithImage(){
            console.log('clicked facebook button');
        }
        */
       // Local Storageの内容を全てリフレッシュする
       refreshAll(){
           this.$store.commit('removeAll');
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