<template>
  <div id="app">
    <Header />
    <Description />
    <b-container fluid class="bv-example-row">
        <b-row>
          <b-col cols="12" lg="4" md="4" sm="12">
            <List />
          </b-col>
          <b-col cols="12" lg="8" md="8" sm="12">
            <Canvas />
          </b-col>
        </b-row>
    </b-container>
    <Footer />
  </div>
</template>

<script>
import Description from './components/Description'
import Header from './components/Header'
import List from './components/List'
import Canvas from './components/Canvas'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Description,
    Header,
    List,
    Canvas,
    Footer
  }
}
</script>
