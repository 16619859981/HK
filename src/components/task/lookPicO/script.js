import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      tableData: {
        albumName: "我的任务",
        albumLabel: '任务',
        albumIntro: "简介"
      },


      dialogVisiblePlay: false,
      id: this.$route.query.id,
      Url: '',
      Bool: false,
      onselectstart: '',

      leixing: this.$route.query.type,


      // Bool:false
      player: '',
      obj: {},
      tubImg: [],
      common: [],
      pageIndex: 1,
      dialogVisiblePer: false,




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
    //任务
    handleList() {
      this.$http.post(api.getContent('/medal/'), {
        id: this.$route.query.id
      }).then(res => {
        console.log(res)
        if (res.data.status == 200) {

          if (res.data.data.data[0].medalType == 3) {

             if (res.data.data.data[0].downFileUrl != null) {
              res.data.data.data[0].downFileUrl = res.data.data.data[0].downFileUrl.split(',')
             }else {
              res.data.data.data[0].downFileUrl = res.data.data.data[0].downFileUrl
             }

 
            
          
          }

          if (res.data.data.data[0].medalType == 1) {
            res.data.data.data[0].medalType = '音频'
          } else if (res.data.data.data[0].medalType == 2) {
            res.data.data.data[0].medalType = '视频'
          } else if (res.data.data.data[0].medalType == 3) {
            res.data.data.data[0].medalType = '图文'
          }


          if (res.data.data.data[0].medalUsetype == 1) {
            res.data.data.data[0].medalUsetype = '阅读任务'
          } else if (res.data.data.data[0].medalUsetype == 2) {
            res.data.data.data[0].medalUsetype = '完成任务'
          }

          res.data.data.data[0].medalPublishtime = formatDate(new Date(Number(res.data.data.data[0].medalPublishtime)), 'yyyy-MM-dd hh:mm');

          if (this.leixing == '图文') {
            var span = document.getElementById('span')
            span.innerHTML = res.data.data.data[0].medalIntro
          }
          


          this.tableData = res.data.data.data[0]
          // console.log(this.tableData)

        }
      })
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
      document.getElementById("example_video_1").pause();
      this.audio_outerVisible = false
    },
    getRowClass() {
      return 'background:rgb(248, 248, 248); color: #000'
    }








  },
  mounted() {
    this.handleList()


  },

}
