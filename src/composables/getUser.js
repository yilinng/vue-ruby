import { ref } from 'vue'

const getUser = (id, token) => {

    const user = ref(null)
    const error = ref(null)

    const load = async () => {
      try {
    let data = await fetch(process.env.VUE_APP_BACKEND_API + '/userlist/' + id,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      })
        if(!data.ok) {
        throw Error('this user does not exist')
        }
        user.value = await data.json()
      }
      catch(err) {
        error.value = err.message
      }
    }

    return { user, error, load }
}

export default getUser
