/* eslint-disable */
<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <mapRe/> -->

    <!-- <notice/> -->
    <!-- <markText/> -->
    <biaoZhu/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import mapRe from './components/mapRe.vue'
// import notice from './components/notice.vue';
// import markText  from './components/markText.vue';
import biaoZhu from './components/biaoZhu.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // mapRe,
    // notice,
    
    // markText,
    biaoZhu,
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
