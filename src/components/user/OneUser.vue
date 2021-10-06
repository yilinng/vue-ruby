<template>
    <router-link :to="{ name: 'UserDetails', params: { id: user.id }}">    
      <td>{{ user.username }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.role }}</td>
    </router-link>
      
      
    <div v-if="auth">
        <router-link :to="{ name: 'Edit', params: { id: user.id}}">
          edit
        </router-link>
    </div>

  

</template>

<script>
import { ref, inject, onMounted } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'
import { useRouter } from 'vue-router'

export default {
  props: ['user'],

  setup(props) {

    const emitter = inject("emitter")
    const auth = ref(false)
         // Emit Events (Method)
    const token = VueCookieNext.getCookie('token')

    onMounted(() => {
    
    if(!token){
        router.push({name: 'Home'})
    }
      
    emitter.on("checkcertainpost", (value) => {
       // *Listen* for event
      if(value){
        console.log(value, 'have emit...from todolist')
        auth.value = value
      }
   })
})

    return { auth }
  }
}
</script>

<style scoped>

</style>
