import { createWebHistory, createRouter } from "vue-router"
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import Home from '../views/Home.vue'
import CreateTodo from '../views/todo/Create.vue'
import TodoDetails from '../views/TodoDetails.vue'
//import EditTodo from '../views/todo/Edit.vue'
import Tag from '../views/Tag.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        props: true
    },
    {
        path: '/todo/create',
        name: 'CreateTodo',
        component: CreateTodo,
        props: true
    },
    {
        path: '/todo/:id',
        name: 'TodoDetails',
        component: TodoDetails,
        props: true
    },
    {
        path: '/tags/:tag',
        name: 'Tag',
        component: Tag,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
export default router

