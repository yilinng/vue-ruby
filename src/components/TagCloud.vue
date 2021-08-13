<template>
  <div class="tag-cloud">
    <h3>Tags</h3>
    <div v-for="tag in tags" :key="tag">
      <router-link :to="{ name: 'Tag', params: { tag }}">
        #{{tag}}
      </router-link>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'
import { useStore } from 'vuex'
import useTags from '../composables/useTags'
export default {
  setup(props) {

    const store = useStore()
    const emitter = inject("emitter")
    const { tags, tagCollect } = useTags(props.posts)
    //store from vuex
    store.commit('havePosts', props.posts)
    store.commit('haveTags', tagCollect)
    //from eventBus vue
    emitter.emit('postlist', [props.posts, tagCollect])

    return { tags }
  },
  props: ['posts']
}
</script>

<style scoped>
  .tag-cloud {
    display: block;
    width: 84px;
    height: auto;
  }
  .tag-cloud h3 {
    border-bottom: 1px solid #eee;
    padding: 16px 8px;
    color: #444;
  }
  .tag-cloud div {
    display: inline-block;
    padding: 10px;
  }
  .tag-cloud a {
    color: #ccc;
    text-decoration: none;
  }
  .tag-cloud a.router-link-active {
    color: #ff8800;
    font-weight: bold;
  }

  @media screen and (max-width: 600px) {
   .tag-cloud {
    display: block;
    width: 84px;
    height: auto;
    /*The word-break CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box.*/
    word-break: break-word;
  }
}
</style>
