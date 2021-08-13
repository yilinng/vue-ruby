<template>
  <div class="Login">
    <div v-if="error">{{ error }}</div>
    <form @submit.prevent="handleSubmit">
      <label>Email:</label>
      <input v-model="email" type="email" required>
      <label>Password:</label>
      <input v-model="password" type="password" required>
      <button>Log in</button>
    </form>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { VueCookieNext } from 'vue-cookie-next'
export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')
    
    const emitter = inject("emitter")
    const router = useRouter()
    const store = useStore()
    //console.log(router)
    //router.go(1)
    //router.go(-1)

    const handleSubmit = async () => {
      const user = {
        email: email.value,
        password: password.value
      }
      await fetch('http://localhost:3001/login', {
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
    return { email, error, password, handleSubmit }
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
    background: yellowgreen;
    position: absolute;
    z-index: -1;
    padding-right: 40px;
    left: -30px;
    transform: rotateZ( 3.5deg);
  }
  button {
    display: block;
    margin-top: 30px;
    background: #ff9844;
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
