<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md10 xs12 offset-md1>
        <v-form ref="form" lazy-validation>
          <wysiwyg v-model="answer" />
          <v-btn
            @click="submit"
            color="green"
            style="color: white"
          >
            Send
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex md10 xs12 offset-md1>
        <v-card v-for="(data, index) in this.dataAnswer" :key="index">
          <v-card-title v-html="data.answer"></v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import { mapActions, mapState } from 'vuex';

export default {
  props: ['id'],
  name: 'FormAnswer',
  data: () => ({
    answer: '',
  }),
  methods: {
    ...mapActions([
      'submitAnswer',
      'getAnswerByIdQuestion'
    ]),
    submit() {
      let newAnswer = {
        answer: this.answer,
        questionId: this.id
      }
      this.submitAnswer(newAnswer)
      this.answer = ''
    },
  },
  created() {
    let idQuestion = {
      questionId: this.id
    }
    this.getAnswerByIdQuestion(idQuestion)
    console.log('ini id  question ==>', this.id)
  },
  computed: {
    ...mapState(['dataAnswer'])
  },

};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
