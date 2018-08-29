import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import wysiwyg from 'vue-wysiwyg';
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/es5/util/colors'
import firebase from 'firebase'
import config from './firebase/firebase.js'
import { mapActions } from 'vuex'

Vue.config.productionTip = false

Vue.use(wysiwyg, {
  hideModules: { bold: true },
  forcePlainTextOnPaste: true,
  maxHeight: '500px',
});

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base, // #3F51B5
  },
});

new Vue({
  router,
  methods: {
    ...mapActions(['submitFromOAuth']),
  },
  created() {
    firebase.initializeApp(config);
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     localStorage.setItem('uid', user.uid)
    //     localStorage.setItem('name', user.displayName)
    //     localStorage.setItem('email', user.email)
    //     localStorage.setItem('photo', user.photoURL)
    //     // this.$router.push('/');
    //     let dataUser = {
    //       username: user.displayName,
    //       email: user.email,
    //       imageUrl: user.photoURL
    //     }
    //     this.submitFromOAuth(dataUser)
    //   } else {
    //     localStorage.clear()
    //     this.$router.push('/login')
    //   }
    // });
  },  
  store,
  render: h => h(App)
}).$mount('#app')
