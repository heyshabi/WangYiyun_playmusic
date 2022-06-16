<template>
  <ItemMusicTop :playlists="state.playlists"></ItemMusicTop>
  <ItemMusicList :musiclist="state.musiclist" :subscribedCount="state.playlists.subscribedCount"></ItemMusicList>
</template>

<script>
import ItemMusicTop from '@/components/Item/ItemMusicTop.vue'
import ItemMusicList from '@/components/Item/ItemMusicList.vue'
import { getMusicItemList,getMusicList } from '@/requests/api/item.js'
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      playlists: {},
      musiclist:[]
    })
    onMounted(async () => {
      let id = useRoute().query.id
      //歌曲详情页头部
      let res = await getMusicItemList(id)
      console.log(res)
      state.playlists = res.data.playlist
      //歌曲详情页歌单
      let result=await getMusicList(id)
      console.log(result);
      state.musiclist=result.data.songs


      //防止页面刷新 数据丢失 所以先存在本地
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    })

    return { state }
  },
  components: {
    ItemMusicTop,
    ItemMusicList
  },
}
</script>

<style>
</style>