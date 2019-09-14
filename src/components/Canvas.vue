<template>
    <b-card-group deck>
        <b-card header="Graph Area" id="graph">
            <v-stage :config="configKonva"
                    ref="stage"
                    @dragstart="handleDragstart"
                    @dragend="handleDragend"
                    @mousemove="handleMouseMove"
            >
                <v-layer ref="layer">
                    <v-shape :config="configAxisLine"></v-shape>
                    <v-rect :config="{
                        x: this.width/2,
                        y: this.height/2,
                        width: 80,
                        height: 30,
                        fill: 'white',
                        stroke: 'black',
                        draggable: true
                    }"></v-rect>
                    <v-text :config="{
                        text: 'テスト',
                        x: this.recWidth,
                        y: this.recHeight,
                        fontSize: 24,
                        draggable: true
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
            isDragging: false,
            recWidth: width/2,
            recHeight: height/2,
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
    methods: {
        handleDragstart(e){
            console.log('start')
        },
        handleDragend(e){
            console.log('end')
        },
        handleMouseMove(e) {
            const mousePos = this.$refs.stage.getStage().getPointerPosition();
            const x = mousePos.x - this.width/2;
            const y = mousePos.y - this.height/2;
        }
    }
};
</script>