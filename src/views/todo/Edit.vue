<template>
  <div class="edit">
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
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Spinner from '../components/ui/Spinner.vue'

export default {
  props: ['id', 'title', 'body', 'tags'],
  components: { Spinner },

  setup(props) {

    const title = ref(props.title)
    const content = ref(props.content)
    const tags = ref(props.tags)
    const tag = ref('')

    const router = useRouter()

      onMounted(() => {
        // the DOM element will be assigned to the ref after initial render
        console.log(props)
      })
      
    const handleClickTag = (tag) => {

        const filteredTags = tags.value.filter(element => element !== tag)
        tags.value = filteredTags
        console.log('work...', filteredTags, tag)
      }  

   const handleKeydown = () => {
   
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/g,'') // remove all whitespace
        tags.value.push(tag.value)
      }
      tag.value = ''
      
    }

    const handleSubmit = async () => {
      const post = {
        id: props.id,
        title: title.value,
        body: body.value,
        tags: tags.value
      }
      await fetch('http://localhost:3000/posts/' + props.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(post)
      })
      router.push({name: 'Home'})
    }

    return {title, contents, tag, tags, handleSubmit, handleKeydown, handleClickTag}
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

