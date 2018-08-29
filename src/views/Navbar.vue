<template>
  <v-toolbar class="indigo lighten-1 white--text text-xs-center"> 
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link to="/" id="title" class="lighten-1 white--text">MEDIARY</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/question" class="lighten-1 white--text" v-if="this.isLogin">ADD QUESTION</v-btn>
      <v-btn flat to="/login" v-if="!this.isLogin" class="lighten-1 white--text">SIGN IN</v-btn>
      <v-btn flat to="/register" class="lighten-1 white--text" v-if="!this.isLogin">SIGN UP</v-btn>
      <v-btn flat @click="logOut" class="lighten-1 white--text" v-if="this.isLogin">LOGOUT</v-btn>
      <v-btn flat to="/about" class="lighten-1 white--text">ABOUT</v-btn>
      <v-btn flat to="/me" v-if="this.isLogin">
        <v-avatar v-if="imageProfile">
          <img :src="imageProfile" alt="">
        </v-avatar>
        <v-avatar v-else>
          <v-icon color="white">account_circle</v-icon>
        </v-avatar>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import swal from 'sweetalert';
import { mapState, mapActions } from 'vuex';

export default {
  props: ['propsislogin'],
  name: 'Navbar',
  data: () => ({
    imageProfile: localStorage.getItem('photo')
  }),
  methods: {
    ...mapActions(['logout', 'checkToken']),
    logOut() {
      this.logout()
    },
  },
  computed: {
    ...mapState(['isLogin'])
  },
};
</script>

<style>
  .btn, #title {
    text-decoration: none;
    color: black;
  }
</style>
