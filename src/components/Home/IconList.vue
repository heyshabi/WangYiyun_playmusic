<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-a-06-01"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>


<style scoped lang="less">
.iconList {
  width: 100%;
  height: 2rem;
  margin-top: .3rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .iconItem {
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 100%;
    align-items: center;
    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>