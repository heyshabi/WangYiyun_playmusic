<template>
  <div class="home">
  <TopNav></TopNav>
  <SwiperTop></SwiperTop>
  <IconList></IconList>
  <MusicList></MusicList>
  </div>
</template>

<script>
import TopNav from "@/components/Home/TopNav.vue"//头条
import SwiperTop from "@/components/Home/SwiperTop.vue"//首页轮播
import IconList from "@/components/Home/IconList.vue"//四个图标
import MusicList from "@/components/Home/MusicList.vue"  //发现好歌单

export default {
  name: 'Home',
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicList
  }
}
</script>

<style scoped lang="less">



</style>
