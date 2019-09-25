import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      tableData: {},

      programData: [],
      dialogVisiblePlay: false,
      dialogVisiblePlayAudio: false,
      id: this.$route.query.id,
      Url: '',
      UrlAudio: '',
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

      //点击播放的type和url
      type: "",
      url: "",
      dialogVisiblePlay: false,
      albumType:this.$route.query.type,

    };


  },
  created() {

  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(getUpload(file.raw));
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'png' || 'PNG' || 'JPEG';
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

      this.pageNum = page
      this.currentPage = page
      this.renderProgram()

    },
    //渲染专辑信息
    renderList() {

      this.$http.post(api.getPlatform('/album/query/id'), {
        albumId: this.id
      }).then(res => {


        if (res.data.status == 200) {
      
          if (res.data.data.albumLabel!="") {
            res.data.data.albumLabel = res.data.data.albumLabel.split(',')
          }
            //组织类型
            if (res.data.data.albumAuthorType == 1) {
              res.data.data.albumAuthorType = "平台/中少红卡"
            } else if (res.data.data.albumAuthorType == 2) {
              res.data.data.albumAuthorType = "学校"
            } else
            if (res.data.data.albumAuthorType == 3) {
              res.data.data.albumAuthorType = "班级  "
            } else if (res.data.data.albumAuthorType == 7) {
              res.data.data.albumAuthorType = "红广号/大咖"
            } else
            if (res.data.data.albumAuthorType == 10) {
              res.data.data.albumAuthorType = "基地/少年宫"
            }
          console.log(res.data.data.albumLabel)
          res.data.data.albumCtime = formatDate(new Date(res.data.data.albumCtime), 'yyyy-MM-dd hh:mm');
          this.tableData = res.data.data
          // this.tableData.fileUrl = api.getUpload(this.tableData.fileUrl)
          this.tableData.fileUrl = api.getUpload(this.tableData.fileUrl)
          




        }

      })
    },
    //渲染专辑的节目信息
    renderProgram() {

      this.$http.post(api.getPlatform('/material'), {
        albumId: this.id,
        isCheck: 2,
        sliceParams: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        },
        materialRecycleStatus: 1
      }).then(res => {



        if (res.data.status == 200) {
          // this.total = res.data.total
          this.total = res.data.data.total

          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].materialType == 1) {
              res.data.data.data[i].materialType = "音频"
            } else {
              res.data.data.data[i].materialType = "视频"
            }
            if (res.data.data.data[i].materialIscheck == 0) {
              res.data.data.data[i].materialIscheck = "审核中"

            } else if (res.data.data.data[i].materialIscheck == 1) {
              res.data.data.data[i].materialIscheck = "审核成功"

            }
            res.data.data.data[i].fileUrl = api.getUpload(res.data.data.data[i].fileUrl)
            res.data.data.data[i].fileUrl1 = api.getUpload(res.data.data.data[i].fileUrl1)

            res.data.data.data[i].materialSort = i + 1
            res.data.data.data[i].materialDuration = Math.floor(res.data.data.data[i].materialDuration / 60) + "分" + (res.data.data.data[i].materialDuration % 60 / 100).toFixed(2).slice(-2) + "秒"
            res.data.data.data[i].materialCtime = formatDate(new Date(res.data.data.data[i].materialCtime), 'yyyy-MM-dd hh:mm');
            res.data.data.data[i].Bool = false


          }

          this.programData = res.data.data.data

        }


      })
    },
    fnn() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频" && this.programData[i].materialTranscodingStatus == 1) {
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
    fnn3() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频") {
          return true
        } else {
          return false
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
      return 'height: 65px'
    },

    tabP() {
      return 'padding: 0; width:100px; color: #606266;'
    },

    a() {
      this.$router.push('/albumManagement')
    },

    // 查看节目
    play(url, type) {
      console.log(url)
      console.log(type)

      this.url = url
      this.type = type
      this.dialogVisiblePlay = true

    },
    //弹窗关闭
    closeDialog() {
      document.getElementById("media").pause();
      this.dialogVisiblePlay = false
    },
    getRowClass() {
      return 'background:#F5F7FA; color: #909399; font-weight: 400; height: 50px'
    },








  },
  mounted() {
    //渲染专辑信息
    this.renderList();
    //渲染节目信息
    this.renderProgram();


  },

}
