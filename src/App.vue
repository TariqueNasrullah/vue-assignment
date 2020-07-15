<template>
  <div id="app">
    <div style="height: 100px"></div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch('load')
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
