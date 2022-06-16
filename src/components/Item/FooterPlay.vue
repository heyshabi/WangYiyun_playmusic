<template>
  <div class="footerMusic">
    <div class="footerleft" @click="updateplayMuiscShow">
      <img :src="playList[playlistIndex].al.picUrl" alt="">
      <div>
        <p>{{ playList[playlistIndex].name }}</p>
        <p>滑动可切换哦</p>
      </div>
    </div>
    <div class="footerright" >
      <svg class="icon" aria-hidden="true" @click="play" v-if="playBtnShow">
        <use xlink:href="#icon-24gl-play"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-bofangzanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-category"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playlistIndex].id}.mp3`"></audio>
    <van-popup v-model:show="playMuiscShow" position="right" :style="{ height: '100%',width:'100%' }">
    <MusicItemDetail 
    :detailList="playList[playlistIndex]" 
    :play="play" 
    :playBtnShow="playBtnShow"
    :addDuration="addDuration"
    ></MusicItemDetail>
    </van-popup>
  </div>

</template>

<script>
import MusicItemDetail from '@/components/Item/MusicItemDetail.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  data(){
    return {
      interval:0
    }
  },
  computed: {
    ...mapState(['playList', 'playlistIndex', 'playBtnShow','playMuiscShow']),
  },
  mounted() {
    // console.log(this.$refs);
    this.$store.dispatch("getLyric",this.playList[this.playlistIndex].id)
  },
  updated(){
    this.$store.dispatch("getLyric",this.playList[this.playlistIndex].id);
    this.addDuration()
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        //播放状态
        this.$refs.audio.play()
        this.playMusicBtn(false)
        this.updateTime()
      } else {
        //暂停状态
        this.$refs.audio.pause()
        this.playMusicBtn(true)
        clearInterval(this.interval)//播放暂停时清除定时器
      }
    },
    //歌词更新
    updateTime(){
      this.interval=setInterval(()=>{
        this.updatecurrentTime(this.$refs.audio.currentTime)
      },1000)
    },
    //播放进度条更新
    addDuration(){
      this.updateDuration(this.$refs.audio.duration)
    },
    ...mapMutations(['playMusicBtn','updateplayMuiscShow','updatecurrentTime','updateDuration']),
  },
  watch:{
    playlistIndex(){
      //当点击歌曲自动播放
      this.$refs.audio.autoplay=true  
      if(this.$refs.audio.paused){
        this.playMusicBtn(false)
      }
    },
    playList(){
      this.$refs.audio.autoplay=true;
      this.playMusicBtn(false)
    }
  },
  components:{
    MusicItemDetail
  }
}
</script>

<style scoped lang="less">
.footerMusic {
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 0.02rem solid #ccc;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .footerleft {
    width: 6rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    p {
      width: 4.4rem;
      font-size: 0.36rem;
      padding-right: 0.5rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    div p:last-child {
      font-size: 0.2rem;
    }
  }
  .footerright {
    width: 24%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>