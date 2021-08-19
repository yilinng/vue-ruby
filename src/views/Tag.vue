<template>
  <div class="tag">
    <div v-if="posts.length" class="layout">
      <PostList :posts="postsWithTag" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import TagCloud from '../components/TagCloud.vue'
import Spinner from '../components/ui/Spinner.vue'
import PostList from '../components/todo/PostList.vue'
export default {
  components: { PostList, Spinner, TagCloud },
  setup() {
    const posts = ref([])
    const tagList = ref([])

    const store = useStore()
    //const emitter = inject("emitter")
    const route = useRoute()

   posts.value = store.state.posts 
   tagList.value = store.state.tagList

  /*
   emitter.on("postlist", (value) => {
       // *Listen* for event
        posts.value = JSON.stringify(value[0])
        tagList.value = JSON.stringify(value[1])
        console.log("tagvue postlist received!", `value: ${posts.value}`, tagList.value);
   })
*/

    const postsWithTag = computed(() => {
     
      const keyTag = route.params.tag

      const tagFiltered = tagList.value
      // have index of key
      const postListbyIndex =  Object.fromEntries(Object.entries(posts.value))
      //all index
     const allIndex = Object.keys(postListbyIndex)
      //filter object
      const filteredAlready = Object.fromEntries(Object.entries(tagFiltered).filter(([key]) => keyTag.includes(key)))
      //--->{'vue':[0, 2]}
      const toArray = filteredAlready[keyTag]
      // find match index -->['0', '2']
      const matchIndexPosts = allIndex.filter(po => toArray.includes(Number(po)))
      // use index find postListbyIndex[index]
      return matchIndexPosts.map(po => postListbyIndex[po])
        
    })
    //show computed value
    //console.log(postsWithTag.value)

    return { posts, postsWithTag }
  }
}
</script>

<style>
  .tag {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
</style>
