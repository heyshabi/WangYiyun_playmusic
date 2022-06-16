//vant组件
import { Swipe, SwipeItem,Popup } from 'vant';

const plugins=[
  Swipe, SwipeItem,Popup
]


export default function getVant(app){
  plugins.forEach((item)=>{
    return app.use(item)
  })
}