import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article.vue'
import PostList from '../components/PostList.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',  //路由名字
      path:'/',
      components: {
         main:PostList
      }
    },{
    name:'post_content',  //路由名字
    path:'/topic/:id',
    components: {
      main:Article
    }
  }
  ]
})
