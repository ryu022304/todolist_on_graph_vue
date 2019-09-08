<template>
    <div>
        <b-input-group prepend="TODO" class="mt-3">
            <b-form-input v-model="text" placeholder="Enter TODO"></b-form-input>
            <b-input-group-append>
                <b-button variant="info" v-on:click="addList">Submit</b-button>
            </b-input-group-append>
        </b-input-group>
    </div>
</template>

<script>
export default {
    data() {
      return {
        text: ''
      }
    },
    methods: {
        // リストへの追加呼び出し
        addList(){
            this.$store.commit('setTodo', {
                title: this.text
            });
            this.text = '';
        }
    }
}
</script>