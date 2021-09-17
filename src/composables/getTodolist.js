import { ref } from 'vue'

const getPosts = (token) => {

    const posts = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch('http://localhost:3001/notelist',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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

export default getPosts
