<template>
  <div v-if="post.length" class="post">
        <h3>{{ title }}</h3>
    <p class="pre">{{ content }}</p>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import Spinner from '../components/ui/Spinner.vue'

export default {
  props: ['id'],
  components: { Spinner},
  
  setup(props) {
    const title = ref('')
    const content = ref('')
    const store = useStore();
   
  const post = computed(() => {
    return store.state.posts.filter(post => post.id === Number(props.id))
  })
  
  
    title.value = post.value[0].title
    content.value = post.value[0].content
   
    return { post, title, content}
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
  .post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
  }
  .pre {
    white-space: pre-wrap;
  }
</style>
