<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listleft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang-copy"></use>
        </svg>
        <span>播放全部<span>({{musiclist.length}})</span></span>
      </div>
      <div class="listright" @click="shoucan">
        <span v-show="state.shou">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shoucang-jiahao"></use>
          </svg>收藏
        </span>
        <span v-show="!state.shou">收藏成功</span>
      </div>
    </div>
    <!-- 歌单 -->
    <div class="item">
      <div class="itemList" v-for="(item,index) in musiclist" :key="index">
        <div class="itemleft" @click="playmusic(index)">
          <span class="item_number">{{ index+1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <!-- 有时候歌手不止一个 -->
            <span v-for="(item1,index1) in item.ar" :key="index1">{{ item1.name+' ' }}</span>
          </div>
        </div>
        <div class="itemright">
          <svg class="icon" aria-hidden="true" v-show='item.mv !=0'>
            <use xlink:href="#icon-mv"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sangediandian"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import {  useStore } from 'vuex'

export default {
  setup(props) {
    const state = reactive({
      shou: true,
    })
    function shoucan() {
      state.shou = !state.shou
    }
    //V3点击音乐切换到底部组件
    const store=useStore();
    const playmusic=(index)=>{
      store.commit('updateplayList',props.musiclist)
      store.commit('updateplayListIndex',index)
    }
    return {state,shoucan,playmusic}
  },
   props: ['musiclist', 'subscribedCount'],
  // methods:{
  //   //V2点击音乐切换到底部组件
  //   playmusic(index){
  //     this.updateplayList(this.musiclist)
  //     this.updateplayListIndex(index)
  //   },
  //   ...mapMutations(['updateplayList','updateplayListIndex']),
  // },
}
</script>
<style scoped lang="less">
.itemMusicList {
  padding:0 .2rem 1.2rem .2rem;
  height: 100%;
  width: 100%;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  // padding: 0 0.2rem;
  margin-top: 0.2rem;
  background-color: #fff;
  .itemListTop {
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-between;
    align-items: center;
    .listleft {
      display: flex;
      width: 3rem;
      height: 100%;
      align-items: center;
      span {
        font-weight: 700;
        padding: 0 0.2rem;
        span {
          font-weight: 400;
          font-size: 0.26rem;
          color: #999;
        }
      }
    }
    .listright {
      display: flex;
      align-items: center;
      padding: 0.1rem 0.2rem;
      color: #fff;
      background-color: red;
      border-radius: 0.4rem;
      span {
        .icon {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.1rem;
          vertical-align: -0.02rem;
        }
      }
    }
  }
  .item {
    width: 100%;
    .itemList {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemleft {
        display: flex;
        align-items: center;
        width: 85%;
        height: 100%;
        .item_number {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          margin-left: 0.28rem;
          p {
            width: 4rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span {
            font-size: 0.24rem;
            font-weight: 400;
            color: #999;
          }
        }
      }
      .itemright {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .icon {
          //修改图标颜色
          fill: #999;
        }
        .icon:last-child {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>