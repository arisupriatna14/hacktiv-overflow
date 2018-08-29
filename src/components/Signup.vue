<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex sm3 xs12/>
      <v-flex sm6 xs12>
        <h1>SIGN UP</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="username"
            :rules="nameRules"
            :counter="10"
            label="Username"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show1 ? 'visibility_off' : 'visibility'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            :rules="[rules.length(6)]"
            label="Password"
          >
          </v-text-field>
          <input
            type="file"
            accept="image/*"
            @change="processFile($event.target.files)"
          >
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
          Sign Up
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
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    name: 'Register',
    valid: true,
    username: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    rules: {
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
    },
    select: null,
    checkbox: false,
    show1: false,
    isToken: false,
    image: '',
  }),

  methods: {
    ...mapActions(['submitRegister']),
    processFile(data) {
      this.image = data[0];
      console.log('====> image process', this.image)
    },
    submit() {
      if (this.$refs.form.validate()) {
        let formData = new FormData()
        formData.append('image', this.image)
        axios
          .post('http://localhost:3030/upload', formData)
          .then(({ data }) => {
            console.log('result image ==>', data.link)
            let newProfile = {
              username: this.username,
              email: this.email,
              password: this.password,
              imageUrl: data.link
            }
            this.submitRegister(newProfile);
          })
          .catch((err) => {
            console.log(err)
          })
        
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
  },
};
</script>

<style>
</style>
