import { createStore } from 'vuex'
import { getMusicLyric } from '@/requests/api/item.js'
import { getPhoneMsg } from '@/requests/api/home.js'
 
export default createStore({
  state: {
    playList: [
      {
        // name:"Nocturne No. 2 in E Flat Major, Op. 9, No. 2",
        al: {
          //默认播放歌曲
          id: 110646,
          name: 'The Chopin Collection: The Nocturnes',
          pic: 1419469524716144,
          picUrl: 'https://p1.music.126.net/Dvhon4mH7qimTtE7q3omTw==/1419469524716144.jpg',
        },
        name: 'The Chopin Collection: The Nocturnes',
        id: 1060910,
      },
    ],
    playlistIndex: 0,
    playBtnShow: true, //播放按钮切换
    playMuiscShow: false,
    playLyricList:{},//歌词
    currentTime:0,//歌词时间
    duration:0,//歌词总时长
    isLogin:false, //登录判断
    isFooterShow:true,
    token:''
  },
  getters: {},
  mutations: {
    playMusicBtn(state, value) {
      state.playBtnShow = value
    },
    updateplayList(state, value) {
      state.playList = value
    },
    updateplayListIndex(state, value) {
      state.playlistIndex = value
    },
    updateplayMuiscShow(state) {
      state.playMuiscShow = !state.playMuiscShow
    },
    updateplayLyricList(state,value) {
      state.playLyricList=value
    },
    updatecurrentTime(state,value) {
      state.currentTime=value
    },
    updateDuration(state,value) {
      state.duration=value
    },
    addplayList(state,value) {
      state.playList.push(value)
    },
    updateIslogin(state){
      state.isLogin=true
    },
    updateToken(state,value) {
      state.token=value
      localStorage.setItem('token',value)
    }
    },
  actions: {
    async getLyric(content, value) {
      let res = await getMusicLyric(value);
      content.commit('updateplayLyricList',res.data.lrc)
    },
    //获取登录信息
    async getLogin(content,value) {
      let res=await getPhoneMsg(value)
      return res
    }
  },
  modules: {},
})
