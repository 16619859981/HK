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



    };


  },
  created() {

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

      this.pageNum = page
      this.currentPage = page
      this.renderProgram()

    },
    //渲染专辑信息
    renderList() {

      axios.post(api.getContent('/album/query'), {
        id: this.id
      }).then(res => {


        if (res.data.status == 200) {

          for (var i = 0; i < res.data.data.data.length; i++) {
            this.total = res.data.data.total
            //类型的判断
            if (res.data.data.data[i].albumType == 2) {

              res.data.data.data[i].albumType = '视频'
            } else if (res.data.data.data[i].albumType == 1) {
              res.data.data.data[i].albumType = '音频'
            } else {
              res.data.data.data[i].albumType = '图文'
            };
            //身份类型的判断
            if (res.data.data.data[i].albumPersonType == 1) {

              res.data.data.data[i].albumPersonType = '中少红卡'
            } else if (res.data.data.data[i].albumType == 2) {
              res.data.data.data[i].albumPersonType = '学校'
            } else if (res.data.data.data[i].albumType == 3) {
              res.data.data.data[i].albumPersonType = '教师'
            } else if (res.data.data.data[i].albumType == 4) {
              res.data.data.data[i].albumPersonType = '家长'
            } else if (res.data.data.data[i].albumType == 5) {
              res.data.data.data[i].albumPersonType = '名师'
            } else if (res.data.data.data[i].albumType == 6) {
              res.data.data.data[i].albumPersonType = '公司'
            } else if (res.data.data.data[i].albumType == 7) {
              res.data.data.data[i].albumPersonType = '大V'
            } else {
              res.data.data.data[i].albumPersonType = '主播'
            };
            //状态
            if (res.data.data.data[i].albumIsup == 1) {

              res.data.data.data[i].albumIsup = '上架'
            } else {
              res.data.data.data[i].albumIsup = '下架'
            };

            res.data.data.data[i].materialDuration = Math.floor(res.data.data.data[i].materialDuration / 60) + ":" + (res.data.data.data[i].materialDuration % 60 / 100).toFixed(2).slice(-2)

            res.data.data.data[i].albumCtime = formatDate(new Date(res.data.data.data[i].albumCtime), 'yyyy-MM-dd hh:mm');
            res.data.data.data[i].albumUtime = formatDate(new Date(res.data.data.data[i].albumUtime), 'yyyy-MM-dd hh:mm');




          };

          this.tableData = res.data.data.data[0];




        }

      })
    },
    //渲染专辑的节目信息
    renderProgram() {

      axios.post(api.getContent('/material'), {
        albumId: this.id,
        isCheck: 2,
        sliceParams: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
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
    this.renderList();
    //渲染节目信息
    this.renderProgram();


  },

}
