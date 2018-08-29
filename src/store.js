import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import swal from 'sweetalert'
import router from './router'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import config from './firebase/firebase.js'
import { stat } from 'fs';
import { get } from 'https';

export default new Vuex.Store({
  state: {
    isLogin: '',
    dataUser: '',
    token: localStorage.getItem('token'),
    allQuestion: '',
    dataAnswer: ''
  },
  mutations: {
    STATUS_LOGIN(state, payload) {
      state.isLogin = payload
    },
    DATA_USER(state, payload) {
      state.dataUser = payload
    },
    DATA_QUESTION(state, payload) {
      state.allQuestion = payload
    },
    DATA_ANSWER(state, payload) {
      state.dataAnswer = payload
    }
  },
  actions: {
    submitRegister({ commit }, payload) {
      axios
        .post('http://localhost:3030/users/register', payload)
        .then(() => {
          router.push('/login');
        })
        .catch(() => {
          swal('Email already exist', 'Try Again!', 'error');
        }); 
    },
    submitLogin({ commit }, payload) {
      axios
        .post('http://localhost:3030/users/login', payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('photo', data.imageUrl)
          localStorage.setItem('userId', data.userId)
          swal('Sign in success', 'Overflow, Inc', 'success');
          commit('STATUS_LOGIN', true)
          router.push('/')
        })
        .catch(() => {
          swal('Email or password failed', 'Try again!', 'error');
        });
    },
    logout({ commit }, payload) {
      swal('Logout success', 'Overflow, Inc', 'success')
      localStorage.clear()
      firebase.auth().signOut();
      commit('STATUS_LOGIN', false)
      router.push('/')
    },
    checkToken({ commit }, paylod) {
      const token = localStorage.getItem('token')
      if (token) {
        commit('STATUS_LOGIN', true)
      } else {
        commit('STATUS_LOGIN', false)
      }
    },
    submitFromOAuth({ commit }, payload) {
      axios
        .post('http://localhost:3030/users/login/oauth', payload)
        .then(({ data }) => {
          console.log('Sukses. from oAuth =>', data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.userId)
          commit('STATUS_LOGIN', true)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    createQuestion({ commit }, payload) {
      console.log('payload in store ==>', payload)
      axios({
        method: 'POST',
        url: 'http://localhost:3030/questions',
        headers: {
          Authorization: localStorage.getItem('token')
        },
        data: {
          title: payload.title,
          question: payload.question,
          tags: payload.tags
        }
      })
        .then(() => {
          swal('Add question success', 'Overflow, Inc', 'success');
          router.push('/')
        })
        .catch((err) => {
          swal(`${err.message}`, 'Try again!', 'error')
        })
    },
    getAllQuestion({ commit }) {
      axios
        .get('http://localhost:3030/questions/')
        .then(({ data }) => {
          commit('DATA_QUESTION', data.result)
          if (localStorage.getItem('token')) {
            commit('STATUS_LOGIN', true)
            console.log('masuk if')
          } else {
            commit('STATUS_LOGIN', false)
            console.log('masuk else')
          }
        })
        .catch((err) => {
          swal('Get all question failed', `${err}`, 'error')
        })
    },
    updateUpVote({ commit }, payload) {
      axios({
        method: 'PUT',
        url: 'http://localhost:3030/questions/upvote',
        headers: {
          Authorization: localStorage.getItem('token'),
          questionId: payload.questionId
        },
        data: {
          userId: payload.userId
        },
      })
        .then((result) => {
          console.log('upvote success =>', result)
          swal('Upvote success', '', 'success')
          router.push('/')
        })
        .catch((err) => {
          console.log('upvote gagal => ', err.message)
          if (!localStorage.getItem('token')) {
            swal('Silahkan login terlebih dahulu', '', 'warning')
          } else {
            swal('Tidak bisa upvote lagi cuy', '', 'warning')
          }
        })
    },
    updateDownVote({ commit }, payload) {
      console.log('payload downvote ==>', payload)
      axios({
        method: 'PUT',
        url: 'http://localhost:3030/questions/downvote',
        headers: {
          Authorization: localStorage.getItem('token'),
          questionId: payload.questionId
        },
        data: {
          userId: payload.userId
        },
      })
        .then((result) => {
          swal('Downvote success', '', 'success')
          console.log('downvote success =>', result)
          router.push('/')
        })
        .catch((err) => {
          console.log('downvote gagal => ', err.message)
          if (!localStorage.getItem('token')) {
            swal('Silahkan login terlebih dahulu', '', 'warning')
          } else {
            swal('Tidak bisa downvote lagi', '', 'warning')
          }
        })
    },
    submitAnswer({ commit }, payload) {
      axios({
        method: 'POST',
        url: 'http://localhost:3030/answers',
        headers: {
          Authorization: localStorage.getItem('token')
        },
        data: {
          answer: payload.answer,
          questionId: payload.questionId
        }
      })
        .then(({ data }) => {
          console.log('success => ', data)
          swal('Add answer success', '', 'success')
          let newAnswer = this.state.dataAnswer.push(data)
          commit('DATA_ANSWER', newAnswer)
          // router.push('/')
        })
        .catch((err) => {
          swal('Add answer failed', '', 'error')
        })
    },
    getAnswerByIdQuestion({ commit }, payload) {
      axios({
        method: 'GET',
        url: `http://localhost:3030/answers/${payload.questionId}`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('DATA_ANSWER', data.result)
          console.log('success get answer =>', data)
        })
        .catch((err) => {
          console.log('error', err)
        })
      console.log('get answr ==>', payload)
    }
  }
})
