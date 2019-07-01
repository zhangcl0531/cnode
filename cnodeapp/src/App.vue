<template>
  <div id="app">
     <Header></Header>
     <div class="main clearfix">
       
       <router-view name="main"></router-view>
       <router-view name="slidebar"></router-view>
     </div>
     
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
window.onload = function() {
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault()
  })
}
export default {
  name: 'App',
  components:{
    Header,
    PostList
  }
}
</script>

<style>
    body {
      padding: 0;
      margin: 0;
      background-color: #e1e1e1;
    }
    .main {
        margin: 15px auto;
        max-width: 1400px;
    }
    .clearfix::after{
    content:'';
    display:block;
    clear:both;
}

</style>
