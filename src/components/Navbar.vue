<template>
  <header>
    <h1 class="topic">
      <router-link :to="{ name: 'Home' }">
        Ruby on rails 
        <span>with vue3</span>
      </router-link>  
    </h1>
    
    <nav class="navList">
      <div v-if="error">{{ error }}</div>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      <div v-if="token" class="list">
        <div v-if="auth !== 'null'">
          <router-link :to="{ name: 'Userlist' }">UserList</router-link>
        </div> 
       <router-link :to="{ name: 'TodoList' }">todolist</router-link>
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

            <div v-if="auth !== 'null'">
              <router-link :to="{ name: 'Userlist' }">UserList</router-link>
            </div>
          <router-link :to="{ name: 'TodoList' }">todolist</router-link>
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
//import { useStore } from 'vuex'
import { VueCookieNext } from 'vue-cookie-next'
import { useRouter } from 'vue-router'

export default {
  setup(){

    const token = ref('')
    const error = ref('')
    const auth = ref('')
    const showSide = ref(false)
    const widowWidth = ref(window.innerWidth)

    const emitter = inject("emitter")
    //const store = useStore()
    const router = useRouter()

      token.value = VueCookieNext.getCookie('token')
      auth.value = VueCookieNext.getCookie('admin')
      
      //if is admin can see userlist

      emitter.on("cookieSet", (value) => {   
        // *Listen* for event
        token.value = value
        //console.log("cookieSet received!", `value: ${value}`);
      });
      //when expired cookie clean,and let token null
      emitter.on("cookieClean", (value) => {
        token.value = value
      })
/*
     watch(token, (token, prevToken) => {
       console.log("watch from navbar...", token, prevToken)
     })
*/
//when widowwidth is more then 600 ,then hide sidenav
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
          await fetch(process.env.VUE_APP_BACKEND_API + '/logout', {
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
          VueCookieNext.removeCookie('admin')
          console.log(res)
          //store.commit('IsAuth', false)
          router.go(0)
      })
      .catch(err => {
       error.value = err
       })
      }

    return { token, auth, handleLogout, error, showSide, handleShow, closeNav }
  }
}
</script>

<style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }
  header .topic {
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
  header .topic{
    font-size: 35px;
  }

  header .topic span{
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

  .sidebar a, span {
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

.sidebar a:hover, span:hover {
  color: #f1f1f1;
}

}
</style>
