<template>
    <div class="pagination">
        <span @click="changebtn" class="pagebtnstyle">首页</span>
        <span @click="changebtn" class="pagebtnstyle">上一页</span>
        <span v-if="jduge" class="pagebtnstyle">....</span>
        <span v-for="(btn, index) in pagebtns" :key="index" 
                :class="[{currentstyle:btn == currentpage},'pagebtnstyle']"
                @click="changebtn(btn)">
            {{btn}}
        </span>
        <span @click="changebtn" class="pagebtnstyle">下一页</span>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name:'Pagination',
    data() {
        return {
            pagebtns:[1,2,3,4,5,'....'],
            currentpage:1, //当前选中的页码
            jduge:false
        }
    },
    methods: {
        changebtn(btn){
            //点击上一页，下一页，首页
            if(typeof btn != 'number'){
                switch(btn.target.innerText){
                    case '上一页':
                        $('span.currentstyle').prev().click();
                        break
                    case '下一页':
                        $('span.currentstyle').next().click();
                        break
                    case '首页':
                        this.pagebtns = [1,2,3,4,5,'....']
                        this.changebtn(1)
                        break
                    default:
                        break
                }
                return
            }        
            this.currentpage = btn
            if(btn>4){
                this.jduge = true
            }else{
                this.jduge = false
            }

            if(btn == this.pagebtns[4]){  // 如果点击的是最后一个元素
                this.pagebtns.shift();  //移除第一个元素
                this.pagebtns.splice(4,0,this.pagebtns[3]+1) //添加最后一个元素
            }else if(btn == this.pagebtns[0] && btn !=1){
                this.pagebtns.unshift(this.pagebtns[0]-1) //在第一个位置之前加一个
                this.pagebtns.splice(5,1) //移除最后一个
            }
            this.$emit('handleList',this.currentpage)
        }
    },
}
</script>

<style scoped>
    .pagination{
        margin:10px  10px 10px 0;
    }
    .pagebtnstyle{
        margin: 5px;
        padding: 7px 14px 7px 14px;
        border: 1px solid #f0f0f0;
        border-radius: 5px;
        font-size: 12px;
        cursor: pointer;
    }
    .currentstyle {
        background-color: #80bd01;
        color: #fff
    }
    .pagebtnstyle:hover {
        color: #80bd01
    }

    .currentstyle:hover {
        color: #fff
    }
</style>
