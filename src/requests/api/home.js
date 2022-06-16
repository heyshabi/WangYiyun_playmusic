import serve from "@/requests"

//首页轮播图
export function getBanner(){
  return serve({
    method:"get",
    url:"/banner?type=2"
  })
}

//发现好歌单
export function getMusicList(){
  return serve({
    method:"get",
    url:"/personalized?limit=8"
  })
}

//搜索
export function getSearchMusic(data) {
  return serve({
    method:'get',
    url:`/search?keywords=${data}`
  })
}

//登录
export function getPhoneMsg(data) {
  return serve ({
    method:'get',
    url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}