import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'

export default {
  data() {
    return {
      active:false,
      styleTextBool:  true,
      styleText:"更多条件",
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
        reportId: '',
        contentId: '',
        reportType: '',
        reportContent: '',
        reportTime: '',
        reportTime2: '',
        resultType: ''
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
      this.$router.push('/reportHistory')
    },

    //渲染列表
    albumReview2() {
      this.currentPage = 1

      if (this.formInline.reportType == 0) {
        this.formInline.type = ''
      }

      if (this.formInline.reportContent == 0) {
        this.formInline.type = ''
      }

      if (this.formInline.resultType == 0) {
        this.formInline.resultType = ''
      }

      if (this.formInline.reportTime != null && this.formInline.reportTime2 == null) {
        this.formInline.reportTime2 = new Date().getTime()
      }
      if (this.formInline.reportTime2 < this.formInline.reportTime) {
        this.$message.error('请选择正确日期')
      }


      if (this.formInline) {

        this.formInline.sliceParams.pageNum = 1
      }
      this.albumReview()

    },

    //渲染列表
    albumReview() {


      this.$http.post(api.getPlatform('/report/yetList'), this.formInline).then(res => {
         console.log(res)

        if (res.data.status == 200) {
          this.loading = false
          this.total = res.data.data.total

          for (var i = 0; i < res.data.data.data.length; i++) {

            this.total = res.data.data.total
            if (res.data.data.data[i].reportType == 2) {
              res.data.data.data[i].reportType = "活动"
            } else if (res.data.data.data[i].reportType == 1) {
              res.data.data.data[i].reportType = "评论"
            }

            if (res.data.data.data[i].reHandle == 1) {
              res.data.data.data[i].reHandle = "下架"
            } else if (res.data.data.data[i].reHandle == 2) {
              res.data.data.data[i].reHandle = "忽略"
            } else if (res.data.data.data[i].reHandle == 3) {
              res.data.data.data[i].reHandle = "禁用"
            }

            if (res.data.data.data[i].reportReason == 1) {
              res.data.data.data[i].reportReason = "涉嫌营销"
            } else if (res.data.data.data[i].reportReason == 2) {
              res.data.data.data[i].reportReason = "暴力信息"
            } else if (res.data.data.data[i].reportReason == 3) {
              res.data.data.data[i].reportReason = "淫秽色情"
            } else if (res.data.data.data[i].reportReason == 4) {
              res.data.data.data[i].reportReason = "有害信息"
            } else if (res.data.data.data[i].reportReason == 5) {
              res.data.data.data[i].reportReason = "不实信息"
            } else if (res.data.data.data[i].reportReason == 6) {
              res.data.data.data[i].reportReason = "抄袭信息"
            }
            res.data.data.data[i].reportTime = formatDate(new Date(res.data.data.data[i].reportTime), 'yyyy-MM-dd hh:mm');
          }



          this.tableData = res.data.data.data
        }
      })
    },
   

    tabH() {
      return 'height: 65px'
    },
    tabP() {
      return 'padding: 0; width:100px; color: #606266;'
    },
    getRowClass() {
      return 'background:#F5F7FA; color: #909399; font-weight: 400; height: 50px;'
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

    check (id, type) {
      if (type == '评论') {
        type = 1
      } else {
        type = 2
      }
      this.$router.push({
        path: '/lookHistory',
        query: {
          id: id,
          type: type
        }
      })    
    }

  },
  mounted() {
    this.albumReview()
  },

  created () {
    this.lad()
  }
}
