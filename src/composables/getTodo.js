import { ref } from 'vue'

const getTodo = (id) => {

    const post = ref(null)
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch(process.env.VUE_APP_BACKEND_API + '/notes/' + id,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })
        if(!data.ok) {
        throw Error('this post does not exist')
        }
        post.value = await data.json()
      }
      catch(err) {
        error.value = err.message
      }
    }

    return { post, error, load }
}

export default getTodo
