import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article.vue'
import PostList from '../components/PostList.vue'
import Userinfo from '../components/Userinfo.vue'
import SlideBar from '../components/SlideBar.vue'
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
    path:'/topic/:id&name=:name',
    components: {
      main:Article,
      slidebar: SlideBar
    }
  },{
    name:'userinfo',  //路由名字
    path:'/user/:name',
    components: {
      main:Userinfo
    }
  }
  ]
})
