// import axios from 'axios'
import api from '../../api/index'

import { formatDate } from '../../../date'


export default {
  data() {
    return {
      tableData: {
        albumName: "我的任务",
        albumLabel: '任务',
        albumIntro: "简介"
      },

      programData: [{
        materialSort:1,
        fileUrl:'',
        materialName:'名称',
        materialPublisherName:"123"


      }],

      
      dialogVisiblePlay: false,
      id: this.$route.query.id,
      Url: '',
      Bool: false,
      onselectstart: '',
      total: 5,
      currentPage: 0,

      pageNum: 1,
      pageSize: 10,

      // Bool:false
      player: '',
      obj: {},
      tubImg: [],
      common: [],
      pageIndex: 1,
      dialogVisiblePer: false,
      //播放
      playId:'',
      playType:'',
      palyUrl:'',




    };


  },
  created() {
    // console.log(this.id)
  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||'png' || 'jpg' || 'JPG' || 'JPEG' || 'PNG';
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt1M;
    },
    // 分页改变的时候
    handleCurrentChange(page) {
      // console.log(`当前页: ${val}`);
      this.pageNum = page
      this.currentPage = page
      this.renderProgram()

    },

    //阅读任务查看
    handleList () {
      this.$http.post(api.getContent('/medal/'),{ id: this.$route.query.id ,sliceParams:{pageSize:this.pageSize,pageNum:this.pageNum}}).then( res => {
        // console.log(res)
        if (res.data.status == 200) {
          // this.total = Number(res.data.data.total)
          if ( res.data.data.data[0].medalType == 1 ) {
            res.data.data.data[0].medalType = '音频'
          } else if ( res.data.data.data[0].medalType == 2 ) {
            res.data.data.data[0].medalType = '视频'            
          } else if ( res.data.data.data[0].medalType == 3 ) {
            res.data.data.data[0].medalType = '图文'            
          }


          if ( res.data.data.data[0].medalUsetype == 1 ) {
            res.data.data.data[0].medalUsetype = '阅读任务'
          } else if ( res.data.data.data[0].medalUsetype == 2 ) {
            res.data.data.data[0].medalUsetype = '完成任务'
          }

          res.data.data.data[0].medalPublishtime = formatDate(new Date(Number(res.data.data.data[0].medalPublishtime)), 'yyyy-MM-dd hh:mm');

          var span = document.getElementById('span')
          span.innerHTML = res.data.data.data[0].medalIntro

          this.tableData = res.data.data.data[0]

        }
      } )
    },

    // 任务信息
    handleMsg(){
      this.$http.post(api.getContent('/medal/read'),{id: this.$route.query.id,sliceParams:{
        pageSize:10,pageNum:1
      }}).then(res=>{
        // console.log(res)
        if (res.data.status==200) {
          this.total = res.data.data.total
          this.programData = res.data.data.data
        }
       })

    },
    //播放按钮
    playing(row) {
      // alert(2)
      this.palyUrl = row.medalTaskFileUrl1
      this.palyId = row.medalTaskId
   
      // console.log(this.palyUrl)
      // console.log(row.medalTaskFileUrl1.split("."))
      const type = row.medalTaskFileUrl1.split(".")

      this.playType =  type[1]
      // console.log(this.playType[1])
      this.dialogVisiblePer = true

    },
    //弹框的播放关闭
    closeDialog() {
      document.getElementById("media").pause();
   
     this.dialogVisiblePer= false

    }, 
    close() {
      document.getElementById("media").pause();
   
      this.dialogVisiblePer= false
 

    },
    

    
    fnn() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频") {
          return true
        } else {
          return false
        }
      }

    },
    fnn2() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频") {
          return false
        } else {
          return true
        }
      }

    },
    btn(e) {
      var el = e.target
      if (this.player == el) {
        return
      }
      if (this.player != '') {
        this.player.pause()
      }
      this.player = e.target
    },


    tabH() {
      return 'height: 50px'
    },

    tabP() {
      return 'padding: 10px 0px'
    },

    a() {
      this.$router.push('/albumManagement')
    },

    play(val) {
      this.dialogVisiblePlay = true
      this.Url = val
    },

    closeDialog() {
      document.getElementById("media").pause();
      this.audio_outerVisible = false
    },
    getRowClass() {
      return 'background:rgb(248, 248, 248); color: #000'
    }








  },
  mounted() {
    //渲染专辑信息
    this.handleList()
    this.handleMsg()


  },

}
