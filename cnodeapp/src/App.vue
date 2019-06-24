<template>
  <div id="app">
     <Header></Header>
     <div class="main">
        <PostList></PostList>
     </div>
     
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
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

</style>
