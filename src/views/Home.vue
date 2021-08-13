<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="posts" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { VueCookieNext } from 'vue-cookie-next'
import getTodos from '../composables/getTodos.js'
// component imports
import PostList from '../components/todo/PostList.vue'
import Spinner from '../components/ui/Spinner.vue'
import TagCloud from '../components/TagCloud.vue'
export default {
  name: 'Home',
  components: { PostList, Spinner, TagCloud },
  setup() {
    const emitter = inject("emitter")
    const router = useRouter()
    const token = VueCookieNext.getCookie('token')
   
    const { posts, error, load } = getTodos( token ) 

    load()

     emitter.on("postdelete", (value) => {
       // *Listen* for event
        if(value){
          router.go(0)
        }
   })


    return { posts, error }
  },
}
</script>

<style>
  .home {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }
</style>

<style>

</style>