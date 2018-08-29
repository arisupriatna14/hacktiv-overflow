<template>
  <v-layout row wrap>
    <v-flex lg8 md12 sm12 v-for="(question, index) in this.allQuestion" :key="index">
      <v-card>
        <v-card-title>
          <v-avatar style="text-align: left" v-if="question.user.imageUrl">
            <img :src="question.user.imageUrl" alt="">
          </v-avatar>
          <v-avatar style="text-align: left" v-else>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          <h3>{{ question.user.username }}</h3>
        </v-card-title>
        <v-card-title>
          <h3>{{ question.title }}</h3>
        </v-card-title>
        <v-card-text v-html="question.question">
        </v-card-text>
        <v-card-actions v-if="isLogin">
          <v-flex lg6 md6 sm12 v-if="user === question.user._id">
            <v-btn @click="upVote(question._id)" disabled>
              <v-icon>thumb_up</v-icon>
              {{ question.upVote.length }}
            </v-btn>
            <v-btn @click="downVote(question._id)" disabled>
              <v-icon>thumb_down</v-icon>
              {{ question.downVote.length }}
            </v-btn>
            <v-btn
              :to="{ path: `/answer/${question._id}`, params: { id: question._id } }"
            >
              <v-icon>mode_comment</v-icon>
            </v-btn>
          </v-flex>
          <v-flex lg6 md6 sm12 v-else>
            <v-btn @click="upVote(question._id)">
              <v-icon>thumb_up</v-icon>
              {{ question.upVote.length }}
            </v-btn>
            <v-btn @click="downVote(question._id)">
              <v-icon>thumb_down</v-icon>
              {{ question.downVote.length }}
            </v-btn>
            <v-btn
              :to="{ path: `/answer/${question._id}`, params: { id: question._id } }"
            >
              <v-icon>mode_comment</v-icon>
            </v-btn>
          </v-flex>
          <v-flex lg6 md6 sm12>
            <v-card-title>
              <v-chip color="grey" class="white--text" v-for="(tag, index) in question.tags" :key="index" >
              <strong>{{ tag }}</strong>
            </v-chip>
            </v-card-title>
          </v-flex>
        </v-card-actions>
        <v-card-actions v-else>
          <v-flex lg6 md6 sm12>
            <v-btn @click="upVote(question._id)" disabled>
              <v-icon>thumb_up</v-icon>
              {{ question.upVote.length }}
            </v-btn>
            <v-btn @click="downVote(question._id)" disabled>
              <v-icon>thumb_down</v-icon>
              {{ question.downVote.length }}
            </v-btn>
            <v-btn
              :to="{ path: `/answer/${question._id}`, params: { id: question._id } }"
            >
              <v-icon>mode_comment</v-icon>
            </v-btn>
          </v-flex>
          <v-flex lg6 md6 sm12>
            <v-card-title>
              <v-chip color="grey" class="white--text" v-for="(tag, index) in question.tags" :key="index" >
              <strong>{{ tag }}</strong>
            </v-chip>
            </v-card-title>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex'
import firebase from 'firebase'

export default {
  data: () => ({
    user: localStorage.getItem('userId')
  }),
  methods: {
    ...mapActions([
      'getAllQuestion', 
      'updateUpVote', 
      'updateDownVote'
    ]),
    upVote(id) {
      const userId = localStorage.getItem('userId')
      let voteUp = {
        userId: userId,
        questionId: id
      }
      this.updateUpVote(voteUp)
    },
    downVote(id) {
      console.log('id question yang di downvote',id)
      const userId = localStorage.getItem('userId')
      let voteDown = {
        userId: userId,
        questionId: id
      }
      this.updateDownVote(voteDown)
    }
  },
  created() {
    this.getAllQuestion()
  },
  computed: {
    ...mapState(['allQuestion', 'isLogin']),
  }
}
</script>

<style scoped>
p, img {
  text-align: left;
}
</style>

