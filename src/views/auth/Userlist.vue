<template>
  <div class="homepage">
    <div v-if="error">{{ error }}</div>
    <div v-if="users.length" class="layout">
      <List :users="users" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { VueCookieNext } from 'vue-cookie-next'
import getUserlist from '../../composables/getUserlist'
// component imports
import Spinner from '../../components/ui/Spinner.vue'
import List from '../../components/user/List.vue'

export default {
  name: "Home",
 components: { List, Spinner },
  
  setup() {

    const emitter = inject("emitter")
    const router = useRouter()
    const token = VueCookieNext.getCookie('token')
    const auth = VueCookieNext.getCookie('admin')


    onMounted(() => {
      if(!token){
        router.push({name: 'Home'})
      }
    })
   
    const { users, error, load } = getUserlist(token)    
    
    load()

    return { users, error }
  },
}
</script>

<style>
  .homepage {
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
