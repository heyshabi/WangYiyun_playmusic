import serve from "@/requests"

//歌单详情
export function getMusicItemList(id){
  return serve({
    method:"get",
    url:`/playlist/detail?id=${id}`
  })
}


//歌单列表
export function getMusicList(id){
  return serve({
    method:"get",
    url:`/playlist/track/all?id=${id}&limit=20&offset=0`
  })
}

//获取歌词
export function getMusicLyric(value) {
  return serve({
    method:"get",
    url:`/lyric?id=${value}`
  })
}
