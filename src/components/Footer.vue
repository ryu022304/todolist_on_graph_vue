<template>
    <footer class="text-right">
        {{text}}
    </footer>
</template>

<script>
export default {
    data(){
        return {
            text: "(c)2019 ryu022304"
        }
    }
}
</script>

<style scoped>
footer{
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    color: white;
    background-color: silver;
}
</style>