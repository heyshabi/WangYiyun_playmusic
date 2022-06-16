<template>
  <!-- 头部 -->
  <div class="itemMusicTop">
    <img :src="playlists.coverImgUrl" alt="" class="bgimg">
    <div class="itemleft">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-arrow-left-copy"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemright">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-category-copy"></use>
      </svg>
    </div>
  </div>
  <!-- 介绍 -->
  <div class="itemTopContent">
    <div class="contentLeft">
      <img :src="playlists.coverImgUrl" alt="">
    </div>
    <div class="contentRight">
      <p class="right_one">{{ playlists.name }}</p>
      <div class="right_img">
        <img :src="playlists.creator.backgroundUrl" alt="">
        <span>{{playlists.creator.nickname}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-arrow-right-copy"></use>
        </svg>
      </div>
      <p class="right_two">
        <span>{{playlists.description}}</span>
      </p>
    </div>
  </div>
  <!-- 底部 -->
  <div class="itemTopFooter">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun2"></use>
      </svg>
      <span>{{playlists.commentCount}}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{playlists.shareCount}}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dianzan"></use>
      </svg>
      <span @click="dianzan">
      <p v-show="state.dian">点赞</p>
      <p v-show="!state.dian">{{Changnum(playlists.subscribedCount)}}</p>
      </span>
    </div>

  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
  setup(props) {
    const state=reactive({
      dian:true,
    })
    props.playlists.creator = ''
    console.log(props)
    function dianzan(){
      state.dian=!state.dian
    }
    function Changnum(num) {
      if (num >= 10000000) {
        return (num / 10000000).toFixed(1) + '千万'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }else{
        return num
      }
    }
    return {dianzan,state,Changnum}
  },
  props: ['playlists'],
}
</script>

<style scoped lang="less">

.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .itemleft,
  .itemright {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 0.2rem;
    align-items: center;
    span {
      font-size: 0.4rem;
      margin-right: 0.3rem;
      color: #fff;
    }
  }
  .bgimg {
    position: fixed;
    width: 100%;
    height: 11rem;
    z-index: -1;
    filter: blur(0.4rem); //背景虚化
  }
}
.itemTopContent {
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 36%;
    height: 3.6rem;
    position: relative;
    img {
      height: 2.6rem;
      width: 2.6rem;
      z-index: -1;
      position: absolute;
      border-radius: 0.2rem;
    }
  }
  .contentRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right_one {
      color: #fff;
      font-size: 0.3rem;
      font-weight: 900;
      font-family: 'Courier New', Courier, monospace;
    }
    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.1rem;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
      }
    }
    .right_two {
      width: 100%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: -webkit-box;
        width: 95%;
        height: 100%;
        line-height: 0.3rem;
        color: #ccc;
        font-size: 0.24rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        // span:hover {
        //   height: 3rem;
        //   background-color: black;
        //   white-space: normal;
        // }
      }
    }
  }
}
.itemTopFooter {
  display: flex;
  width: 100%;
  height: 1.4rem;
  justify-content:space-around;
  margin-top:0.3rem;
  .footerItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    span {
      margin-top: .1rem;
    }
  }
}
</style>