<template>
    <div class="article">
        <!-- 如果正在加载显示此div -->
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="" srcset="">
        </div>

        <div v-else>
            <div class="main">
                <div class="topic_header">
                    
                    <div class="topic_title">
                        <span :class="[{post_good:(post.good === true),put_top:(post.top === true),'topiclist-tab':(post.good != true && post.top != true)}]">
                        {{post | tabFormatter }}
                        </span>
                        {{post.title}}
                    </div>
                    <div class="userinfo">
                        <ul>
                            <li>•发布于 {{post.create_at | formatDate}}</li>
                            <li>•作者 {{post.author.loginname}}</li>
                            <li>•{{post.visit_count}} 次浏览</li>
                            <li>•来自 {{post | tabFormatter}}</li>
                        </ul>
                    </div>
                </div>
                <div v-html="post.content" class="topic_content"></div>
                <div class="replies">
                    <div class="topbar">{{post.replies.length}} 回复</div>
                    <div v-for="(item, index) in post.replies" :key="index" class="replies_content_all">
                        <a href="">
                            <img :src="item.author.avatar_url" :title="item.author.loginname">
                        </a>
                        <span class="replies_userinfo">{{item.author.loginname}}</span>
                        <span class="reply_time">{{index + 1}}楼 •{{item.create_at | formatDate}}</span>
                        <span v-if="post.author.loginname == item.author.loginname" class="auth">作者</span>
                        <i v-if="item.ups.length > 0" class="iconfont icon-zan"> {{item.ups.length}}</i>
                        <div v-html="item.content" class="replies_content"></div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name:"Article",
    data() {
        return {
            isLoading:false,
            post:{} //代表当前文章页的所有内容
        }
    },
    methods: {
        getArticleData(){
            // es6方法拼接url
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
                .then(res=>{
                    if(res.data.success == true){
                        this.post = res.data.data
                    }
                })
                .catch(function(err){
                    console.log(err)
                })
            //一般方法拼接url
            // this.$http.get('https://cnodejs.org/api/v1/topic/'+this.$route.params.id)
        }
    },
    beforeMount() {
        this.isLoading = true
        this.getArticleData()
        this.isLoading = false
    },

}
</script>

<style>
    @import url('../assets/markdown.css');
    @import url('https://at.alicdn.com/t/font_1263352_81379bo065y.css');
    .main{
        width: 90%;
        margin: 15px auto;
        max-width: 1400px;
    }
    .topic_header {
        background-color: #fff;
        padding: 10px;
        border-radius: 3px 3px 0 0;
        border-bottom: 1px solid #f0f0f0;
    }
    .topic_header ul {
        list-style: none;
        margin: 0 auto;
        padding: 0
    }
    .topic_header ul>li{
        display: inline-block;
        font-size: 12px;
        color: #838383;
    }
    .topic_title {
        padding-top: 10px;
        font-size: 22px;
        font-weight: 700;
    }

    .put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }
  .userinfo {
      margin-top: 10px;
  }

  .topic_content{
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 0 0 3px 3px;
      border-bottom: 1px solid #f0f0f0;
  }
  .topbar{
      background-color: #f6f6f6;
      padding: 10px;
      margin-top: 15px;
      border-radius: 3px 3px 0 0;
      font-size: 14px;
      color: #444;
  }
  .replies img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
    border-radius:3px;
    margin: 5px;
  }
  .replies_content_all{
      padding: 10px;
      background-color: #fff;
      border-bottom: 1px solid #f0f0f0;
  }
  .replies_content{
      margin-left: 50px;
      margin-bottom: 10px;
  }
  .replies_userinfo{
      font-size: 12px;
      color: #666;
  }
  .reply_time{
      font-size: 12px;
      color: #08c;
  }
  .auth{
    color: #fff;
    background-color: #6ba44e;
    padding: 2px;
    font-size: 12px;
  }
  .icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
    }
    .icon-zan {
        font-size: 14px;
        color: #666;
        float:right
    }
</style>
