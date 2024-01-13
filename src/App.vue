<template>
  <PeopleManagement />
</template>

<script>
import PeopleManagement from './components/PeopleManagement.vue'

export default {
  name: 'App',
  components: {
    PeopleManagement
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
