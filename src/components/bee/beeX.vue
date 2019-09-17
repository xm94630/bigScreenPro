<template>
  <div class="beeX" :name="myConfig.id">
    <div @click="myFun" v-bind:class="{ 'canControl': isActive,'baseBox':true}" v-drag='{"changeData":changeData}'>
      <div class="wenzi">我是标题</div>
      <div class="miniDot dot1"></div>
      <div class="miniDot dot2"></div>
      <div class="miniDot dot3"></div>
      <div class="miniDot dot4"></div>
      <div class="miniDot dot6"></div>
      <div class="miniDot dot7"></div>
      <div class="miniDot dot8"></div>
      <div class="miniDot dot9"></div>
      <div class="showPosition">{{x}},{{y}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'xm',
  props: {
    msg: String
  },
  data(){
    return{
      x:0,
      y:0,
      isActive:false
    }
  },
  methods: {
    myFun(){
      this.isActive = !this.isActive;
      console.log(this.isActive)
    },
    changeData(x,y){
      this.x = x;
      this.y = y;
    }
  },
  directives: {
        drag: {
            update:function(el,binding,bl){
              console.log(el,binding,bl);
            },
            // 指令的定义
            bind: function (el,binding,bl) {

                let odiv = el;   //获取当前元素
                odiv.onmousedown = (e) => {
                  
                    //算出鼠标相对元素的位置
                    let disX = e.clientX - odiv.offsetLeft;
                    let disY = e.clientY - odiv.offsetTop;
                    
                    document.onmousemove = (e)=>{
                      
                      let isActive = bl.context.isActive

                      if(isActive){
                        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        let left = e.clientX - disX;    
                        let top = e.clientY - disY;
                      
                        //改变data中的数据
                        binding.value.changeData(top,left);
                
                        //移动当前元素
                        odiv.style.left = left + 'px';
                        odiv.style.top = top + 'px';
                      }

                    };
                    document.onmouseup = () => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            }
        }
    }
  
}
</script>

<style lang="scss">
.beeX{
  color:#fff;
}
.baseBox{
  width:100px;
  height:80px;
  border:dashed 1px #000;
  box-sizing:border-box;
  display:inline-block;
  user-select:none;
  cursor:pointer;
  position:absolute;
}
.canControl{
  border:dashed 1px red;
  cursor:move;
  .miniDot{
    width:5px;
    height:5px;
    background:red;
    position:absolute;
  }
  .dot1{
    top:0px;
    left:0px;
    cursor:nwse-resize;
  }
  .dot2{
    top:0px;
    left:50%;
    cursor:ns-resize;
  }
  .dot3{
    top:0px;
    right:0px;
    cursor:nesw-resize;
  }
  .dot4{
    top:50%;
    left:0;
    cursor:ew-resize;
  }
  .dot6{
    top:50%;
    right:0px;
    cursor:ew-resize;
  }
  .dot7{
    bottom:0px;
    left:0px;
    cursor:nesw-resize;
  }
  .dot8{
    bottom:0px;
    left:50%;
    cursor:ns-resize;
  }
  .dot9{
    bottom:0px;
    right:0px;
    cursor:nwse-resize;
  }

  .showPosition{
    display:block;
  }
}
.wenzi{
  text-align:center;
  position:relative;
}

.showPosition{
  position:absolute;
  left:-60px;
  top:-20px;
  width:60px;
  height:20px;
  display:none;
  border-right:dashed 1px red;
  border-bottom:dashed 1px red;
  text-align:right;
  box-sizing:border-box;
  padding:2px 5px;
}



</style>
