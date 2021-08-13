<template>
  <div v-if="propstitle" class="post">
        <h3>{{ propstitle }}</h3>
    <p class="pre">{{ propscontent }}</p>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Spinner from '../components/ui/Spinner.vue'

export default {
  props: ['id', 'title', 'content'],
  components: { Spinner},
  setup(props) {
    const propstitle = ref('')
    const propscontent = ref('')
    onMounted(() => {
      propstitle.value = props.title;
      propscontent.value = props.content;
    })
   
    return { propstitle, propscontent}
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
