<template>
  <div id="app">
    <Header />
    <InputForm />
    <List />
  </div>
</template>

<script>
import Header from './components/Header'
import InputForm from './components/InputForm'
import List from './components/List'

export default {
  name: 'app',
  components: {
    Header,
    InputForm,
    List
  }
}
</script>

<style>
</style>