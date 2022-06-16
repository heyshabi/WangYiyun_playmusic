<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-arrow-left-copy-copy"></use>
    </svg>
    <input type="text" placeholder="请输入搜索" v-model="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span>历史记录</span>
    <span v-for="item in keywordList" :key="item" class="spanSearch" @click="searchHistory(item)">
      {{ item }}</span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="item">
    <div class="itemList" v-for="(item,index) in searchList" :key="index">
      <div class="itemleft" @click="playSearch(item)">
        <span class="item_number">{{ index+1 }}</span>
        <div>
          <p>{{ item.name }}</p>
          <!-- 有时候歌手不止一个 -->
          <span v-for="(item1,index1) in item.artists" :key="index1">{{ item1.name+' ' }}</span>
        </div>
      </div>
      <div class="itemright">
        <svg class="icon" aria-hidden="true" v-show='item.mvid !=0'>
          <use xlink:href="#icon-mv"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sangediandian"></use>
        </svg>
      </div>
    </div>
  </div>

</template>

<script>
import { getSearchMusic } from '@/requests/api/home.js'
export default {
  data() {
    return {
      keywordList: [],
      searchKey: '',
      searchList: [],
    }
  },
  mounted() {
    //页面刷新获取本地的历史记录,如果有值就显示，没有就为空
    this.keywordList = JSON.parse(localStorage.getItem('keywordList')) ? JSON.parse(localStorage.getItem('keywordList')) : []
  },
  methods: {
    //搜索回车
    async enterKey() {
      if (this.searchKey != '') {
        this.keywordList.unshift(this.searchKey)
        this.keywordList = [...new Set(this.keywordList)] //去重

        //历史记录限制长度
        if (this.keywordList.length > 10) {
          this.keywordList.splice(this.keywordList.length - 1, 1)
        }
        localStorage.setItem('keywordList', JSON.stringify(this.keywordList)) //历史记录保存到本地存储
        //获取搜索列表
        let res = await getSearchMusic(this.searchKey)
        // console.log(res);
        this.searchList = res.data.result.songs
        this.searchKey = ''
      }
    },
    delHistory() {
      this.keywordList = []
      localStorage.removeItem('keywordList')
    },
    async searchHistory(item) {
      let res = await getSearchMusic(item)
      console.log(res)
      this.searchList = res.data.result.songs
    },
    playSearch(item) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit('addplayList', item)
      this.$store.commit('updateplayListIndex', this.$store.state.playList.length - 1)
    },
  },
}
</script>

<style scoped lang="less">
.searchTop {
  width: 100%;
  height: 1rem;
  align-items: center;
  padding: 0.2rem;
  display: flex;
  input {
    width: 90%;
    // height: 50%;
    border: none;
    border-bottom: 0.02rem solid rgb(163, 162, 162);
    margin-left: 0.2rem;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  span:first-child {
    font-weight: 700;
  }
  .spanSearch {
    padding: 0.1rem 0.2rem;
    background-color: rgb(134, 132, 132);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon {
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    right: 0.2rem;
    top: 0.3rem;
  }
}
.item {
  width: 100%;
  padding: 0.2rem;
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
</style>