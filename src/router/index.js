import { createWebHistory, createRouter } from "vue-router"
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import Userlist from '../views/auth/Userlist.vue'
import UserDetails from '../views/auth/UserDetails.vue'
import Home from '../views/Home.vue'
import TodoList from '../views/todo/Todolist.vue'
import CreateTodo from '../views/todo/Create.vue'
import TodoDetails from '../views/TodoDetails.vue'
import Edit from '../views/todo/Edit.vue'
import Tag from '../views/Tag.vue'
import Notfound from '../views/Notfound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
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
        path: '/userlist',
        name: 'Userlist',
        component: Userlist,
        props: true
    },
    {
        path: '/user/:id',
        name: 'UserDetails',
        component: UserDetails,
        props: true
    },
    {
        path: '/todo',
        name: 'TodoList',
        component: TodoList,
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
        path: '/todo/:id/edit',
        name: 'Edit',
        component: Edit,
        props: true
    },
    {
        path: '/tags/:tag',
        name: 'Tag',
        component: Tag,
        props: true
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
        component: Notfound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
export default router

