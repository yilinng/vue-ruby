<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <p class="pre">{{ post.content }}</p>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import getTodo from '../composables/getTodo'
import Spinner from '../components/ui/Spinner.vue'

export default {
  name: "TodoDetails",
  inheritAttrs: false,
  components: { Spinner }, 
  setup() {

    const route = useRoute()

    const { post, error, load } = getTodo(route.params.id)
   
    load()
   
    return { error, post}
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
