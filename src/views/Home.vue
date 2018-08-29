<template>
  <v-container grid-list-md>
    <AllQuestion></AllQuestion>
  </v-container>
  <!-- <div class="home">

    {{ this.allQuestion }}
  </div> -->
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex'
import firebase from 'firebase'
import AllQuestion from '@/components/AllQuestion.vue'

export default {
  name: 'home',
  components: {
    AllQuestion
  },
  data: () => ({
  }),
  methods: {
    ...mapActions(['submitFromOAuth', 'getAllQuestion']),
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem('uid', user.uid)
        localStorage.setItem('name', user.displayName)
        localStorage.setItem('email', user.email)
        localStorage.setItem('photo', user.photoURL)
        // this.$router.push('/');
        let dataUser = {
          username: user.displayName,
          email: user.email,
          imageUrl: user.photoURL
        }
        this.submitFromOAuth(dataUser)
      } else {
        // localStorage.clear()
        this.$router.push('/')
      }
    });
  },
  created() {
    this.getAllQuestion()
  },
  computed: {
    ...mapState(['allQuestion']),
  }
}
</script>

<style scoped>
p, img {
  text-align: left;
}
</style>

