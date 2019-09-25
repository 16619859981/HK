<template>
<div>

  <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
  <el-button @click='fn()'>sdf </el-button>
  <!-- <button>  sad</button> -->
</div>


</template>


<script>
import VueUeditorWrap from 'vue-ueditor-wrap';

export default {
   components: { VueUeditorWrap },

  data() {
    return {
      msg:
        '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue2.x + UEditor + v-model双向绑定</h2>',
      myConfig: {
            // 如果需要上传功能,找后端小伙伴要服务器接口地址
            // serverUrl: 'http://api.demo.com/ueditor/upload',
            // 你的UEditor资源存放的路径,相对于打包后的index.html
            UEDITOR_HOME_URL: '../../../static/utf8-jsp/',
            // 编辑器不自动被内容撑高
            autoHeightEnabled: false,
            // 初始容器高度
            initialFrameHeight: 240,
            // 初始容器宽度
            initialFrameWidth: '100%',
            // 关闭自动保存
            enableAutoSave: false
        }
    };
  }
  ,
  methods:{
    
    fn() {
      alert(this.msg)
    }
  }

};
</script>



