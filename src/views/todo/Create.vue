<template>
  <div class="create">
    <div v-if="error">{{ error }}</div>
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
      <span class="tagText">click tag can delete!!</span>
      <div v-for="tag in tags" :key="tag" class="pill" @click="handleClickTag(tag)">
        #{{ tag }}
      </div>
      <button>Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter} from 'vue-router'
import Cookies from 'js-cookie'
export default {
  setup() {
    const title = ref('')
    const content = ref('')
    const tags = ref([])
    const tag = ref('')
    const error = ref('')

    const router = useRouter()
    //console.log(router)
    //router.go(1)
    //router.go(-1)
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
        console.log('work...', filteredTags, tag)
    }

    const handleSubmit = async () => {
      const tagString = tags.value.join()
      
      const todo = {
        title: title.value,
        content: content.value,
        tag: tagString
      }
    
      const getToken = Cookies.get('token')

      await fetch('http://localhost:3001/notes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + getToken
          },
        body: JSON.stringify(todo)
      })
       .then(res => {
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
    return { content, title, tags, tag, error, handleKeydown, handleSubmit, handleClickTag }
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
  .tagText {
    display: block;
    color: #A9A9A9;
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
