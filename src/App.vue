<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/views/Navbar.vue';
// import Footer from '@/views/Footer.vue';

export default {
  data () {
    return {
      islogin: false,
      user: ''
    }
  },
  components: {
    Navbar,
    // Footer,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
