<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="checkMusic">发现好歌单</div>
      <div class="musicMore">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" :width="150" :show-indicators="false">
        <van-swipe-item v-for="item in MusicState.musicList" :key="item">
        <router-link :to="{path:'/musicItem',query:{id:item.id}}">
          <img :src="item.picUrl" alt="">
          <span class="playicon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gl-play"></use>
            </svg>
            {{Changnum(item.playCount)}}
          </span>
          <span class="musicname">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/requests/api/home'
import { onMounted, reactive} from 'vue'
export default {
  setup() {
    const MusicState = reactive({
      musicList: [],
    })
    onMounted(async () => {
      let res = await getMusicList()
      MusicState.musicList = res.data.result
    })
    function Changnum(num) {
      if (num >= 10000000) {
        return (num / 10000000).toFixed(1) + '千万'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }

    return { MusicState, Changnum}
  },
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .checkMusic {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .musicMore {
      border: 1px solid #ccc;
      margin-right: 0.3rem;
      padding: 0 0.2rem;
      text-align: center;
      line-height: 0.6rem;
      border-radius: 0.2rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 3.6rem;
    .van-swipe-item {
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      .playicon {
        color: white;
        position: absolute;
        margin-top: 0.06rem;
        z-index: 100;
        right: 0.3rem;
        .icon {
          width: .3rem;
          height: .3rem; 
          // vertical-align:middle;
        }
      }
      img {
        width: 100%;
        height: 2.8rem;
        border-radius: 0.2rem;
      }
      .musicname {
        bottom:0px;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>