<template>
  <div class="post-list">
      <div v-for="post in posts" :key="post.id">
          <!-- <h3>{{ post.title }}</h3> -->
          <OnePost :post="post" @clickItem="onClickChild"/>
      </div>
  </div>

</template>

<script>
import { ref } from 'vue'
// component imports
import OnePost from './OnePost.vue'

export default {
  props: ['posts'],
  components: { OnePost },
  setup() {
    const postChange = ref(null)

    const onClickChild = (val) => {

      postChange.value = val.value
      console.log(postChange.value)
    }

    return {onClickChild, postChange}
  }
}
</script>

<style>
</style>
