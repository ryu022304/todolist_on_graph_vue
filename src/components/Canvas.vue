<template>
    <b-card-group deck>
        <b-card header="Graph Area">
            <v-stage :config="configKonva">
                <v-layer>
                    <v-shape :config="configLine">
                    </v-shape>
                </v-layer>
            </v-stage>
        </b-card>
    </b-card-group>
</template>

<script>
export default {
  data() {
    return {
      configKonva: {
        width: 500,
        height: 200
      },
      configLine: {
        sceneFunc: function(context) {
            context.beginPath();
            // 横軸
            context.moveTo(100, 100);
            context.lineTo(900, 100);
            // 縦軸
            context.moveTo(300, 20);
            context.lineTo(300, 620);
            context.stroke();
            context.closePath();
        },
        stroke: 'black'
        }
      }
  }
};
</script>