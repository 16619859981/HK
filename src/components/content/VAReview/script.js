import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'

export default {
  data() {
    return {
      tableData: [

      ],
      total: 0,
      searchText: '',
      currentPage: 1,
      loading: true,
      num: 0,
      num1: 0,
      // 搜索框数据
      formInline: {
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
        id: '',
        key: null,
        type: null,
        startTime: null,
        endTime: null,
      },
         // 请求头
         headerss: {
          useid: window.sessionStorage.getItem('id'),
          orgid: window.sessionStorage.getItem('orgid'),
          orgType: window.sessionStorage.getItem('orgType'),
          token: window.sessionStorage.getItem('token'),
  
  
        },

      audio_innerVisible: false,
      audio_outerVisible: false,
      albumName: '',

      //专辑审核
      checkMsg: {
        name: '专辑名称',
        tag: '标签',
        intro: '专辑的介绍，专辑的介绍',
        url: '/static/logo.png'
      },
      //不通过的理由
      reason: '',
      noPassId: '',
      dialogVisiblePass: false,
      dialogVisiblenoPass: false,
      id: '',
      name: ''


    }
  },
  methods: {
    // 查看按钮
    handleClick(row) {

    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.formInline.sliceParams.pageNum = page
      this.currentPage = page
      this.albumReview()
    },
    //审核历史记录
    handelHistory() {
      this.$router.push('/checkHistoryProgram')
    },
    //审核按钮
    check(item) {

      this.audio_outerVisible = true

      //查找对应id得信息。进行审核列表里面得渲染
      this.$http.post(api.getContent('/material/audit'), {
        id: item.materialId
      }).then(res => {

        if (res.data.status == 200) {
          // alert(8)
          res.data.data.data[0].materialDuration = Math.floor(res.data.data.data[0].materialDuration / 60) + "分" + (res.data.data.data[0].materialDuration % 60 / 100).toFixed(2).slice(-2) + "秒"

          this.checkMsg = res.data.data.data[0]

        }
      })
    },

    test() {

    },
    //渲染列表
    albumReview2() {
      this.currentPage = 1

      if (this.formInline.type == 0) {
        this.formInline.type = null
      }
      if (this.formInline.startTime != null && this.formInline.endTime == null) {
        this.formInline.endTime = new Date().getTime()
      }
      if (this.formInline.endTime < this.formInline.startTime) {
        this.$message.error('请选择正确日期')
      }


      if (this.formInline) {

        this.formInline.sliceParams.pageNum = 1
      }
      this.albumReview()

    },

    //渲染列表
    albumReview() {


      this.$http.post(api.getContent('/material/audit'), this.formInline).then(res => {


        if (res.data.status == 200) {
          this.loading = false
          this.total = res.data.data.total

          for (var i = 0; i < res.data.data.data.length; i++) {

            this.total = res.data.data.total
            if (res.data.data.data[i].materialType == 1) {
              res.data.data.data[i].materialType = "音频"
            } else if (res.data.data.data[i].materialType == 2) {
              res.data.data.data[i].materialType = "视频"
            } else {
              res.data.data.data[i].materialType = "专辑"
            }
            res.data.data.data[i].materialCtime = formatDate(new Date(res.data.data.data[i].materialCtime), 'yyyy-MM-dd hh:mm');
          }



          this.tableData = res.data.data.data
        }
      })
    },
    //通过按钮
    Pass(item, item1) {

      this.albumName = item1
      this.id = item
      this.dialogVisiblePass = true
      document.getElementById("media").pause();

    },
    pass(item) {
      this.num++
      if (this.num > 1) {
        return false
      }
      
      if (this.tableData.length == 1 && this.currentPage != 1) {
        this.formInline.sliceParams.pageNum = this.formInline.sliceParams.pageNum - 1
        this.num = 0
      }
      this.$http.post(api.getContent('/program/audit/status'), {
        id: this.id,
        status: 1,
        albumName: this.albumName
      }).then(res => {
        if (res.data.status == 200) {

          this.$message({
            message: '审核成功',
            type: "success"
          })
          this.num = 0
          this.dialogVisiblePass = false
          document.getElementById("media").pause();
          this.tableData = []
          this.albumReview()
        } else {
          this.$message({
            message: '审核失败',
            type: "error"
          })
          this.num = 0
        }
      })
      this.audio_outerVisible = false
      this.albumReview()
    },
    //不通过
    noPass(item, name) {
      this.noPassId = item
      this.name = name
      this.audio_innerVisible = true
      document.getElementById("media").pause();


    },
    noPassSubmit() {
      this.num1++
      if (this.num1 > 1) {
        return false
      }
      if (this.reason == "") {
        this.$message({
          message: "请填写原因",
          type: "error"
        })
        this.dialogVisiblenoPass = false
        this.num1 = 0
        return false
        
      }
      if (this.reason.trim().length == 0) {
        this.$message({
          message: '原因不能为空',
          type: "error"
        })
        this.num1 = 0
        return false
      } else {
        if (this.tableData.length == 1 && this.currentPage != 1) {
          this.formInline.sliceParams.pageNum = this.formInline.sliceParams.pageNum - 1
        }
        this.$http.post(api.getContent('/program/audit/status'), {
          id: this.noPassId,
          reason: this.reason,
          status: 2,
          albumName: this.name
        }).then(res => {
          if (res.data.status == 200) {

            this.$message({
              message: '审核成功',
              type: "success"
            })
            this.dialogVisiblenoPass = false
            document.getElementById("media").pause();
            this.tableData = []

            this.reason = ''
            this.num1 = 0
            this.albumReview()


          } else {
            this.$message({
              message: '审核失败',
              type: "error"
            })
          }
          this.num1 = 0
          document.getElementById("media").pause();
          this.audio_innerVisible = false
          this.audio_outerVisible = false
          this.albumReview()
        })
      }

    },
    closeDialog() {
      document.getElementById("media").pause();
      this.audio_outerVisible = false
    },

    tabH() {
      return 'height: 32px'
    },

    tabP() {
      return 'padding: 10px 0px'
    },

    getRowClass() {
      return 'background:rgb(248, 248, 248); color: #000'
    },

    fushu () {
      console.log(1)
      if (this.formInline.id < 0) {
        this.formInline.id = ''
        this.$message.error('不可以输入负数')
        return
      }
    },

    lad () {
      this.loading = true
    },
         //导出数据
         download() {
    
   
      
          console.log(qs.stringify(this.formInline))
          const params = qs.stringify(this.formInline)
          const heade = qs.stringify(this.headerss)

        
          window.open(`/content/program/audit/export?${params}&${heade}`,"_self")
    
        
          
    
        },
  },
  mounted() {
    // this.test()
    this.albumReview()
  },

  created () {
    this.lad()
  }
}
