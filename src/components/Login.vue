<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex sm3 xs12/>
      <v-flex sm6 xs12>
        <h1>SIGN IN</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          >
          </v-text-field>
          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          >
          </v-checkbox>
          <v-btn
            :disabled="!valid"
            @click="submit"
          >
          Sign In
          </v-btn>
          <v-btn
            @click="clear"
          >
          Reset
          </v-btn>
        </v-form>
      </v-flex>
      <v-flex sm3 xs12 />
    </v-layout>
    <div id="firebaseui-auth-container"></div>
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import { mapActions } from 'vuex';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import config from '@/firebase/firebase.js'

export default {
  data: () => ({
    name: 'Register',
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    checkbox: false,
    password: '',
    isToken: false,
    user: ''
  }),

  methods: {
    ...mapActions(['submitLogin', 'submitFromOAuth']),
    submit() {
      if (this.$refs.form.validate()) {
        let userProfile = {
          email: this.email,
          password: this.password
        }
        this.submitLogin(userProfile)
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    checkToken() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isToken = true;
        this.$router.push('/');
      }
    },
  },
  mounted() {
    this.checkToken();
    var uiConfig = {
      signInSuccessUrl: '/',
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ]
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  },
};
</script>

<style>
</style>
