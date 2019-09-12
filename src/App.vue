<template>
  <div id="app">
    <Header />
    <div class="grid">
        <div class="grid-cell twice">
            <Canvas />
        </div>
        <div class="grid-cell">
            <List />
        </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import List from './components/List'
import Canvas from './components/Canvas'

export default {
  name: 'app',
  components: {
    Header,
    List,
    Canvas
  }
}
</script>

<style scoped>
.grid {
  margin: 0;
  padding: 0;
	display: -webkit-flex;
  display: flex;
  list-style: none;
}
.grid-cell {
  margin: 5px;
  padding: 0px;
  border-radius: 5px;
  line-height: 1;
  flex: 1;
}
.twice {
  flex: 2;
}
</style>