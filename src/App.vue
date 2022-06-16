<template>
  <router-view/>
  <FooterPlay v-show="$store.state.isFooterShow"></FooterPlay>
</template>

<script>
import FooterPlay from "./components/Item/FooterPlay.vue";
export default {
  components:{
    FooterPlay
  }
}


</script>

<style lang="less">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  color:black
}
.icon{
  width: .5rem;
  height: .5rem;
}
</style>
