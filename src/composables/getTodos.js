import { ref } from 'vue'

const getTodos = () => {

    const posts = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch(process.env.VUE_APP_BACKEND_API + '/notes',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })
        if(!data.ok) {
        throw Error('no available data')
        }
        posts.value = await data.json()
      }
      catch(err) {
        error.value = err.message
      }
    }

    return {posts, error, load}
}

export default getTodos
