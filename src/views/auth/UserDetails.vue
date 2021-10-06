<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="user" class="post">
    <h3>{{ user.username }}</h3>
    <h3>{{ user.email }}</h3>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>

<script>

import { VueCookieNext } from 'vue-cookie-next'
import { useRoute } from 'vue-router'
import getUser from '../../composables/getUser'
import Spinner from '../../components/ui/Spinner.vue'

export default {
  name: "TodoDetails",
  inheritAttrs: false,
  components: { Spinner }, 
  setup() {

    const route = useRoute()
    const token = VueCookieNext.getCookie('token')

    const { user, error, load } = getUser(route.params.id, token)
   
    load()
   
    return { error, user }
  },
}
</script>

<style>
  .tags a {
    margin-right: 10px;
  }
  .post {
    max-width: 1200px;
    margin: 0 auto;
  }

  .post h3 {
    font-size: 25px;
  }
  .post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
  }
  .pre {
    white-space: pre-wrap;
  }
</style>
