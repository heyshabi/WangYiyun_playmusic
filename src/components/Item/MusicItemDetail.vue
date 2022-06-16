<template>
  <img :src="detailList.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">
    <div class="detailTopleft">
      <svg class="icon" aria-hidden="true" @click="updateplayMuiscShow">
        <use xlink:href="#icon-arrow-left-copy"></use>
      </svg>
      <div class="leftlist">
        <Vue3Marquee style="color:#fff">{{ detailList.al.name }}</Vue3Marquee>
        <span v-for="item in detailList.ar" :key="item">
          {{ item.name }}</span>
      </div>
    </div>
    <div class="detailTopright">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="play_picture" v-show="!isLyricList">
    <!-- 动态class和控制播放按钮设置磁针旋转 -->
    <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!playBtnShow}">
    <img src="@/assets/cd.png" alt="" class="img_cd">
    <img :src="detailList.al.picUrl" alt="" class="img_pic" @click="isLyricList=true" :class="{img_pic_active:!playBtnShow ,img_pic_stop:playBtnShow}">
  </div>
  <div class="music_lyric" ref="musicLyric" v-show="isLyricList" @click="isLyricList=false">
    <p v-for="item in LyricList" :key="item" :class="{
      active:currentTime*1000 >= item.time && currentTime*1000< item.pre}">
      {{ item.lrc }}</p>
  </div>
  <div class="detailFooter">
    <div class="footerIcon">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guangdie"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun2"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-repeat2"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-hanhan-01-01"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="changeMusic(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-if="playBtnShow" @click="play">
        <use xlink:href="#icon-bofang1"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="changeMusic(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-category-copy"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isLyricList: false,
    }
  },
  mounted() {
    // console.log(this.detailList)
    this.addDuration();
  },
  computed: {
    ...mapState(['playLyricList', 'currentTime', 'playlistIndex', 'playList','duration']),
    LyricList() {
      let arr = ''
      if (this.playLyricList.lyric) {
        arr = this.playLyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let h = item.slice(1, 3)
          let f = item.slice(4, 6)
          let m = item.slice(7, 10)
          let lrc = item.slice(11, item.length)
          let time = parseInt(h) * 60 * 1000 + parseInt(f) * 1000 + parseInt(m) //当前时间

          //防止毫秒部分为Nan
          if (isNaN(Number(m))) {
            m = item.slice(7, 9)
            lrc = item.slice(10, item.length)
            time = parseInt(h) * 60 * 1000 + parseInt(f) * 1000 + parseInt(m)
          }
          return { h, f, m, lrc, time }
        })
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 100000 //自定义新属性
          } else {
            item.pre = arr[i + 1].time //下一句歌词时间
          }
        })
      }
      return arr
    },
  },
  watch: {
    //监听歌词滚动
    currentTime(newIndex) {
      let p = document.querySelector('p.active')
      if (p) {
        if (p.offsetTop > 300) {
          //当播放的歌词距离顶部距离超过300
          this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newIndex===this.duration){
        if(this.playlistIndex===this.playList.length-1){
          this.updateplayListIndex(0)//歌曲播放完 重新第一首
          this.play()
        }else {
          this.updateplayListIndex(this.playlistIndex+1)
        }
      }
    },
  },
  methods: {
    //切歌部分
    changeMusic(num) {
      let index = this.playlistIndex + num
      if (index < 0) {
        index = this.playList.length - 1
      } else if (index == this.playList.length) {
        index = 0
      }
      this.updateplayListIndex(index)
    },
    ...mapMutations(['updateplayMuiscShow', 'updateplayListIndex']),
  },
  components: {
    Vue3Marquee, //跑马灯效果
  },
  props: ['detailList', 'playBtnShow', 'play','addDuration'],
}
</script>

<style scoped lang="less">
.bgimg {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  filter: blur(1.4rem);
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  .detailTopleft {
    display: flex;
    align-items: center;
    .leftlist {
      width: 2.4rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        font-size: 0.25rem;
        color: #999;
      }
    }
  }
}
.play_picture {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    //磁针动画
    transform-origin: 0 0;
    transform: rotate(-14deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    //磁针动画
    transform-origin: 0 0;
    transform: rotate(1deg);
    transition: all 2s;
  }
  .img_cd {
    position: absolute;
    bottom: 2.3rem;
    width: 5rem;
    height: 5rem;
    z-index: -1;
  }
  .img_pic {
    width: 3.3rem;
    height: 3.3rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.15rem;
    animation: rotate 10s linear infinite;
  }
  .img_pic_active {
    animation-play-state: running;
  }
  .img_pic_stop {
    animation-play-state: paused;
  }
  @keyframes rotate {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: absolute;
  bottom: 0.2rem;
  .range {
    width: 100%;
    height: .04rem;
  }
  .footerIcon {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
.music_lyric {
  width: 100%;
  height: 8rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 0.2rem;
  overflow: scroll;
  p {
    color: rgb(180, 173, 173);
    margin-top: 0.3rem;
  }
  .active {
    color: #fff;
    font-size: 0.5rem;
  }
}
</style>