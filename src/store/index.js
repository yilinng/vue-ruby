import {createStore} from 'vuex'


export default createStore({
    state:{
        auth: null,
        posts: null,
        tagList: null
    },
    getters:{},
    mutations: {
        IsAuth(state, payload){
            state.auth = payload
        },
        havePosts(state, payload){
            state.posts = payload
        },
        haveTags(state, payload){
            state.tagList = payload
        }
    },
    actions:{}
})