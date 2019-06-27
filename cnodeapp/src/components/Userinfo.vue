<template>
    <div class="userinfo">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="" srcset="">
        </div>
        <div v-else class="main">
            <div class="userinfo_topbar">
                   <router-link :to="{name:'root'}">主页</router-link>  /
            </div>
            <div class="userinformation">
                <div class="info">
                    <img :src="info.avatar_url" :title="info.loginname">
                    <span>{{info.loginname}}</span>
                </div>
                <div class="integral">{{info.score}} 积分</div>
                <div class="collect_topic" v-if="topic.length > 0">{{topic.length}}个话题收藏</div>
                <div class="github" v-if="info.githubUsername">
                    <i class="iconfont icon-github"></i> @{{info.githubUsername}}</a>
                </div>
                <div class="create_time">注册时间 {{info.create_at | formatDate}}</div>
            </div>
            <div class="other_topbar">
                   最近创建的话题
            </div>
            <div v-for="(item, index) in info.recent_topics" :key="index">
                <div class="create_topic" v-if="index < 5">
                    <router-link :to="{name:'userinfo',params:{name:item.author.loginname}}">
                        <img :src="item.author.avatar_url" :title="item.author.loginname">
                    </router-link>
                    
                    <span class="create_topic_title">
                        <router-link :to="{name:'post_content',params:{id:item.id,name:item.author.loginname}}">
                        {{item.title}}
                        </router-link>
                    </span>
                    
                    <span style="float:right">{{item.last_reply_at | formatDate}}</span>
                </div>
            </div>
            <div class="other_topbar">
                   最近参与的话题
            </div>
            <div v-for="(item, index) in info.recent_replies" :key="index">
                <div class="reply_topic" v-if="index < 5">
                    <router-link :to="{name:'userinfo',params:{name:item.author.loginname}}">
                        <img :src="item.author.avatar_url" :title="item.author.loginname">
                    </router-link>
                    <span class="create_topic_title">
                        <router-link :to="{name:'post_content',params:{id:item.id,name:item.author.loginname}}">
                        {{item.title}}
                        </router-link>
                    </span>
                    
                    <span style="float:right">{{item.last_reply_at | formatDate}}</span>
                </div>
            </div>
            
        </div>
    </div>
</template>


<script>
export default {
    name:"Userinfo",
    data() {
        return {
            isLoading:false,
            info:[],
            topic:[]
        }
    },
    methods: {
        getDate(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then((result) => {
                    if(result.data.success == true){
                        this.info = result.data.data
                    }
                    
                }).catch((err) => {
                    console.log(err)
                });
        },
        getTopic(){
            this.$http.get(`https://cnodejs.org/api/v1/topic_collect/${this.$route.params.name}`)
                .then((result) => {
                    if(result.data.success == true){
                        this.topic = result.data.data
                    }
                    
                }).catch((err) => {
                    console.log(err)
                });
        }
    },
    beforeMount() {
        this.isLoading = true
        this.getDate()
        this.getTopic()
        this.isLoading = false
    },
}
</script>


<style>
@import url('https://at.alicdn.com/t/font_1263352_wcqguki3uy.css');
.main{
        width: 90%;
        margin: 15px auto;
        max-width: 1400px;
    }
.userinfo_topbar{
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    color: #ccc
}
.userinfo_topbar a {
    color: #80bd01;
    text-decoration: none;
}
.userinformation{
    background-color: #fff;
    border-radius: 0 0 3px 3px;
    border-bottom: 1px solid #f0f0f0;
    color:  #778087;
    font-size: 14px;
    padding: 5px 10px;
}
.userinformation img {
    height: 40px;
    width: 40px;
    vertical-align: middle;
    border-radius:3px;
    margin: 5px;
}
.info {
    
}
.integral {
    font-size: 12px;
    color: black
}

.integral,.collect_topic,.github,.create_time{
    padding: 5px;
}

.icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
  }

.create_time {
    color: #ababab;
}
.other_topbar{
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    margin-top: 15px;
}
.create_topic ,.reply_topic{
    background-color: #fff;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;
    padding: 10px;
    color:  #778087;
}
.create_topic a,.reply_topic a {
    color: #08c;
    text-decoration: none;
}

.create_topic img,.reply_topic img{
    height: 30px;
    width: 30px;
    vertical-align: middle;
    border-radius:3px;
    margin: 5px;
}
.create_topic_title {
    margin-left: 10px;
}
</style>
