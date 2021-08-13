<template>
  <header>
    <h1>Ruby on rails with vue3</h1>
    <nav class="navList">
      <div v-if="error">{{ error }}</div>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      <div v-if="token" class="list"> 
    
       <router-link :to="{ name: 'CreateTodo' }">Create Post</router-link>
       <span class="logout" @click="handleLogout">log out</span>
    
      </div>
      <div v-else class="list">
        <router-link :to="{ name: 'Signup' }">Sign up</router-link>
        <router-link :to="{ name: 'Login' }">Login in</router-link>  
      </div>        
    </nav>
    <div class="sideMenu" @click="handleShow">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
    </div>    
  </header>

    <div class="sidebar">

      <transition name="slide">
          <div v-if="showSide" class="sidebar-panel">
          <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
          <nav class="navlist">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          <div v-if="token" class="list"> 
        
          <router-link :to="{ name: 'CreateTodo' }">Create Post</router-link>
          <span class="logout" @click="handleLogout">log out</span>
        
          </div>
          <div v-else class="list">
            <router-link :to="{ name: 'Signup' }">Sign up</router-link>
            <router-link :to="{ name: 'Login' }">Login in</router-link>  
          </div>        
        </nav>
       </div>
        </transition>
    </div>

</template>

<script>
import { ref, inject, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { VueCookieNext } from 'vue-cookie-next'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const token = ref('')
    const error = ref('')
    const showSide = ref(false)
    const widowWidth = ref(window.innerWidth)

    const emitter = inject("emitter")
    const store = useStore()
    const router = useRouter()

      token.value = VueCookieNext.getCookie('token') 
     
        emitter.on("cookieSet", (value) => {   
        // *Listen* for event
        token.value = value
        console.log("cookieSet received!", `value: ${value}`);

      });

     watch(token, (token, prevToken) => {
       console.log("watch...", token, prevToken)
     })

     watch(widowWidth, (widowWidth) => {
        if(widowWidth > 600 && showSide.value === true){
          showSide.value = false
        }
     })

     onMounted(() => {
        window.onresize = () => {
          widowWidth.value = window.innerWidth
        }
     })

     const handleShow = () => {
       showSide.value = true
     }

     const closeNav = () => {
       showSide.value = false
     }

      const handleLogout = async () => {
          await fetch('http://localhost:3001/logout', {
          method: 'Delete',
          headers: { 
          'Content-Type': 'application/json',
          Authorization: "Bearer " + token.value
          }     
      })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        throw new Error('Something went wrong.');
      })
      .then(res => {
          VueCookieNext.removeCookie('token')
          console.log(res)
          store.commit('IsAuth', false)
          router.go(0)
      })
      .catch(err => {
       error.value = err
       })
      }

    return { token, handleLogout, error, showSide, handleShow, closeNav }
  }
}
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  header h1 {
    color: #dfdfdf;
    font-size: 48px;
  }
  header a {
    color: #bbb;
    text-decoration: none;
    margin-left: 20px;
  }
  header a.router-link-active {
    color: #444;
    font-weight: bold;
  }

  .logout{
    margin-left: 5px;
    cursor: pointer;
    color: #bbb;
  }
  .navList{
    display: flex;
    justify-content: space-around;
  }

  .navList .list {
    display: flex;
    justify-content: space-around;
  }

  @media screen and (max-width: 600px) {
  header h1{
    font-size: 35px;
  }
  .navList{
    display: none;
  }

   .navList .list {
    display: flex;
    flex-direction: column;
  }

  .sideMenu {
    position: absolute;
    top: 20px;
    right: 15px;
    width: 20px;
    height: 20px;
  }

    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }

    .slide-enter,
    .slide-leave-to {
        transform: translateX(-100%);
        transition: all 150ms ease-in 0s
    }

.sidebar-panel{
    height: 100%;
    width: 250px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: all 1.5s ease;
    padding-top: 60px;
}

  .sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

  .sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

.sidebar a:hover {
  color: #f1f1f1;
}

}
</style>
