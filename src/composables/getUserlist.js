import { ref } from 'vue'

const getUserlist = (token) => {

    const users = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        let data = await fetch(process.env.VUE_APP_BACKEND_API + '/userlist',{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      })
        if(!data.ok) {
        throw Error('no available data')
        }
        users.value = await data.json()
        users.value = users.value.user
      }
      catch(err) {
        error.value = err.message
      }
    }

    return {users, error, load}
}

export default getUserlist
