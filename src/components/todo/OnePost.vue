<template>
  <div class="post" v-if="!itemDelete">
    <div class="titleLine">
      
      <router-link :to="{name: 'TodoDetails', params: { id: post.id}}">
          <h3>{{ post.title }}</h3>
      </router-link>

      <div v-if="auth">
        <span class="deletePost" @click="handeleDelete">delete</span>
        <router-link :to="{name: 'Edit', params: { id: post.id}}">edit</router-link>
      </div>

    </div>
  
    <p class="cotent">{{ snippet }}</p>
    <li v-for="tag of tagsSplit" :key="tag" class="taglist">
        #{{ tag }}
    </li>
    <hr/>
  </div>

</template>

<script>
import { computed, ref, inject, onMounted } from 'vue'
import { VueCookieNext } from 'vue-cookie-next'

export default {
  props: ['post'],

  setup(props, { emit }) {

    const emitter = inject("emitter")
    const itemDelete = ref(false)
    const auth = ref(false)
         // Emit Events (Method)
    const getToken = VueCookieNext.getCookie('token')

    onMounted(() => {
      
    emitter.on("checkcertainpost", (value) => {
       // *Listen* for event
      if(value){
        console.log(value, 'have emit...from todolist')
        auth.value = value
      }
   })
    })

    const handeleDelete = () => {

     const deleteOK = confirm("Want to delete?"); 
     
     if(deleteOK){
     
      itemDelete.value = true
      emit('clickItem', itemDelete)

    return fetch('http://localhost:3001/notes/' + props.post.id, {
        method: 'DELETE',
         headers: { 
          'Content-Type': 'application/json',
          Authorization: "Bearer " + getToken
          }
      })
      .then(response => response.text())
      .catch(error => console.log(error))
      .finally( emitter.emit('postdelete', true))
     }
    }
 
    //content 
    const snippet = computed(() => {
      return props.post.content.substring(0, 100) + '...'
    })

    
    const tagsSplit = computed(() => {
      return props.post.tags
    })
   
    return { snippet, tagsSplit, handeleDelete, itemDelete, auth}
  }
}
</script>

<style scoped>
  .post {
    display: block;
    width: auto;
    height: auto;
  }

  .titleLine {
    display: inline-block;
   
  }

  .titleLine a:last-child{
    margin-left: 10px;
    font-size: 17px;
    padding: 5px;
    border-radius: 10px;
    text-decoration: none;
  }
  h3 {
    display: inline-block;
    font-size: 30px;
    margin-right: 30px;
    color: #3CB371;
  }
  .deletePost {
    cursor: pointer;
    color: white;
    background-color: orange;
    border-radius: 10px;
    padding: 5px;
    font-size: 18px;
  }
  .content {
    font-size: 15px;
  }

  .taglist{
    display: inline;
    margin: 0 5px;
  }

  hr {
    border-top: 1px solid #eee;
  }

  @media screen and (max-width: 600px) {
 .post {
    display: block;
    width: 240px;
    height: auto;
    /*The word-break CSS property sets whether line breaks appear wherever the text would otherwise overflow its content box.*/
    word-break: break-word;
  }

  h3 {
    font-size: 25px;
  }
}
</style>
