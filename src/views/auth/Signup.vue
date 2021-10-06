<template>
  <div class="Login">
    <div v-if="error">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <label>userName:</label>
      <input v-model="username" type="text" required>
      <label>Email:</label>
      <input v-model="email" type="email" required>
      <label>Password:</label>
      <input v-model="password" type="password" required>
      <button>Sign up</button>
    </form>
  </div>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import { useRouter} from 'vue-router'
import { useStore } from 'vuex'
import { VueCookieNext } from 'vue-cookie-next'

export default {
  setup() {
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const error = ref('')

    const emitter = inject("emitter")
    const router = useRouter()
    const store = useStore()

  onMounted(() => {
      if(VueCookieNext.getCookie('token')){
        router.push({ name: 'Home' })
      }
  })

    const handleSubmit = async () => {
      const user = {
        username: username.value,
        email: email.value,
        password: password.value
      }
      await fetch(process.env.VUE_APP_BACKEND_API + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
       .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong.');
      })
      .then(res => {
          VueCookieNext.setCookie('token', res.token)
          emitter.emit('cookieSet', res.token)
          store.commit('IsAuth', res.token)
          router.push({ name: 'Home' })
      })
      .catch(err => {
       error.value = err
       })

    }
    return { username, email, password, error, handleSubmit }
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
