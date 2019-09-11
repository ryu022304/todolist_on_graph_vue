<template>
    <b-card-group deck>
        <b-card header="Graph Area" id="graph">
            <v-stage :config="configKonva">
                <v-layer>
                    <v-shape :config="configAxisLine"></v-shape>
                    <v-circle :config="configCircle"></v-circle>
                </v-layer>
            </v-stage>
        </b-card>
    </b-card-group>
</template>

<script>

const width = document.getElementById('graph').clientWidth * 0.9;
const height = document.getElementById('graph').clientHeight * 0.9;

export default {
    data() {
        return {
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
            },
            configCircle: {
                x: 200,
                y: 100,
                radius: 70,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 4,
                draggable: true
            }
        }
    }
};
</script>