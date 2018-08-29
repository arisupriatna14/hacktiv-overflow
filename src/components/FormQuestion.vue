<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex md10 xs12 offset-md1>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="title"
            color="purple darken-2"
            label="Title"
            required
          >
          </v-text-field>
          <wysiwyg v-model="question" />
          <v-text-field
            v-model="tags"
            color="purple darken-2"
            label="Tags"
            required
          >
          </v-text-field>
          <br>
          <v-btn
            @click="submit"
            color="green"
            style="color: white"
          >
            Publish
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';
import { mapActions } from 'vuex';

export default {
  name: 'FormCreateArticle',
  data: () => ({
    title: '',
    question: '',
    tags: '',
  }),
  methods: {
    ...mapActions([
      'createQuestion'
    ]),
    submit() {
      let newQuestion = {
        title: this.title,
        question: this.question,
        tags: this.tags
      }
      this.createQuestion(newQuestion)
      
    },
  },

};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
