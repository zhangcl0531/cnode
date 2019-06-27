<template>
    <div class="autherinfo">
        <div class="authersummay">
            <div class="autherinfo_topbar_1">作者</div>
            <div class="autherinfo_content">
                <router-link :to="{name:'userinfo',params:{name:userinfo.loginname}}">
                    <img :src="userinfo.avatar_url" :title="userinfo.loginname">
                </router-link>
                <span>{{userinfo.loginname}}</span>
                <div>{{userinfo.score}}积分</div>
            </div>
            
        </div>
        <div class="recent_replies">
            <div class="autherinfo_topbar">作者最近主题</div>
            <div class="recent" v-for="(item, index) in gettopicstop5" :key="index">
                <router-link :to="{name:'post_content',params:{id:item.id,name:item.author.loginname}}">
                    {{item.title}}
                </router-link>
                
            </div>
        </div>
        <div class="recent_topics">
            <div class="autherinfo_topbar">作者最近回复</div>
            <div class="recent" v-for="(item, index) in getrepliestop5" :key="index">
                <router-link :to="{name:'post_content',params:{id:item.id,name:item.author.loginname}}">
                    {{item.title}}
                </router-link>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:'SlideBar',
    data() {
        return {
            userinfo:{}
        }
    },
    methods: {
        getDate(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then((result) => {
                    if(result.data.success == true){
                        this.userinfo = result.data.data
                    }
                    
                }).catch((err) => {
                    console.log(err)
                });
        },
    },
    computed: {
        gettopicstop5(){
            if(this.userinfo.recent_topics){
                return this.userinfo.recent_topics.slice(0,5)
            }
        },
        getrepliestop5(){
            if(this.userinfo.recent_replies){
                return this.userinfo.recent_replies.slice(0,5)
            }
        }
    },
    beforeMount() {
        this.getDate()
    },
}
</script>

<style scoped>
  .autherinfo {
      float: left;
      margin-left: 15px;
      width:calc(23%);
  }
  .autherinfo_topbar {
    background-color: #f6f6f6;
    padding: 10px;
    margin-top: 15px;
    border-radius: 3px 3px 0 0;
    font-size: 14px;
    color: #444;
  }

  .autherinfo_topbar_1{
    background-color: #f6f6f6;
    padding: 10px;
    border-radius: 3px 3px 0 0;
    font-size: 14px;
    color: #444;
  }
  .autherinfo_content {
    background-color: #fff;
    border-radius: 0 0 3px 3px;
    border-bottom: 1px solid #f0f0f0;
    color:  #778087;
    font-size: 14px;
    padding: 5px 10px;
  }

  .autherinfo_content img{
    height: 40px;
    width: 40px;
    vertical-align: middle;
    border-radius:3px;
    margin: 0 10px 10px 0
  }
  .recent {
    background-color: #fff;
    color:  #778087;
    font-size: 12px;
    padding: 5px 10px;
  }
  .recent a {
      color:  #778087;
  }
</style>
