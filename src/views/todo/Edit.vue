<template>
<div v-if="error">{{ error }}</div>
  <div class="edit" v-if="post">
    <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <input v-model="title" type="text" required>
      <label>Content:</label>
      <textarea v-model="content" required></textarea>
      <label>Tags (hit enter to add a tag):</label>
       <input
        @keydown.enter.prevent="handleKeydown"
        v-model="tag"
        type="text"
      >
      <div v-for="tag in tags" :key="tag" class="pill" @click="handleClickTag(tag)">
        #{{ tag }}
      </div>
      <button>Update Post</button>
    </form>
    </div>
    <div v-else>
      <Spinner/>
    </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
//import { useStore } from 'vuex'
import getTodo from '../../composables/getTodo'
import { VueCookieNext } from 'vue-cookie-next'
import Spinner from '../../components/ui/Spinner.vue'

export default {
  props: ['id'],
  components: { Spinner },

  setup(props) {

    const emitter = inject("emitter")
    const title = ref('')
    const content = ref('')
    const tags = ref([])
    const tag = ref('')

    //const store = useStore()
    const router = useRouter()

    const token = VueCookieNext.getCookie('token')

    const { post, error, load } = getTodo( props.id )

    onMounted(async() => {

      await load()       

      if(error.value){

      VueCookieNext.removeCookie('token')
      //emit to navbar.vue
      emitter.emit('cookieClean', null);
      //emit to onePost.vue
      emitter.emit('checkcertainpost', false)
      //push back home page
      router.push({ name: 'Home' })
      }

      //emit to onePost.vue
      emitter.emit('checkcertainpost', true)

      console.log(post.value, error.value)

      title.value = post.value.title
      
      content.value = post.value.content

      tags.value = post.value.tags     
   })


   const handleKeydown = () => {
   
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g,'') // remove all whitespace
        tags.value.push(tag.value)
      }
      tag.value = ''    
    }

    const handleClickTag = (tag) => {

        const filteredTags = tags.value.filter(element => element !== tag)
        tags.value = filteredTags
        //console.log('work...', filteredTags, tag)
    }  

    const handleSubmit = async () => {

      const todo = {
        id: props.id,
        title: title.value,
        content: content.value,
        tags: tags.value
      }


      await fetch(process.env.VUE_APP_BACKEND_API + '/notes/' + props.id, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(todo)
        }).then(res => {
        if(res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong.');
      })
      .then(res => {
          console.log(res)
          router.push({name: 'Home'})
      })
      .catch(err => {
       error.value = err
       })
     
    }

    return { post, title, content, tag, tags, error, 
    handleSubmit, handleKeydown, handleClickTag}
  },
}
</script>
<style scoped>
  form {
    max-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
  input, textarea {
    display: block;
    margin: 10px 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #eee;
  }
  textarea {
    height: 160px;
  }
  label {
    display: inline-block;
    margin-top: 30px;
    position: relative;
    font-size: 20px;
    color: white;
    margin-bottom: 10px;
  }
  label::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background: #ff8800;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ(-1.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff8800;
    color: white;
    border: none;
    padding: 8px 16px;
    font-size: 18px
  }
  .pill {
    display: inline-block;
    margin: 10px 10px 0 0;
    color: #444;
    background: #ddd;
    padding: 8px;
    border-radius: 20px;
    font-size: 14px;
  }
</style>

