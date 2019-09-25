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
      soldOutForm: {
        commentId: '',
        commentType: '',
        reportId: '',
        reHandle: ''
      },
      skipOverForm: {
        reportId: '',
        reHandle: '',
      },
      forbiddenForm: {
        userId: '',
        reportId: '',
        reHandle: ''
      },
      formInline: {
        reportId: this.$route.query.id,
        businessType: this.$route.query.type
      },
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

      dialogDown: false,
      dialogPass: false,
      dialogNo: false,


    };


  },
  created() {
    // console.log(this.id)
  },
  methods: {
    //任务
    handleList() {
      this.$http.post(api.getPlatform('/report/query/id'), this.formInline).then(res => {
        console.log(res)
        if (res.data.status == 200) {

          if (res.data.data.reportType == 2) {
            res.data.data.reportType = "活动"
          } else if (res.data.data.reportType == 1) {
            res.data.data.reportType = "评论"
          }
          if (res.data.data.reportReason == 1) {
            res.data.data.reportReason = "涉嫌营销"
          } else if (res.data.data.reportReason == 2) {
            res.data.data.reportReason = "暴力信息"
          } else if (res.data.data.reportReason == 3) {
            res.data.data.reportReason = "淫秽色情"
          } else if (res.data.data.reportReason == 4) {
            res.data.data.reportReason = "有害信息"
          } else if (res.data.data.reportReason == 5) {
            res.data.data.reportReason = "不实信息"
          } else if (res.data.data.reportReason == 6) {
            res.data.data.reportReason = "抄袭信息"
          }
          res.data.data.commentContent = decodeURI(res.data.data.commentContent)
          // console.log(res.data.data.commentContent )

          res.data.data.reportTime = formatDate(new Date(res.data.data.reportTime), 'yyyy-MM-dd hh:mm');
          for(var i = 0 ;i<res.data.data.files.length;i++) {
            if (res.data.data.files[i].url) {
              res.data.data.files[i].url = api.getUpload(res.data.data.files[i].url)
            }
  
          }
          this.tableData = res.data.data
     
          // console.log(this.tableData.commentContent)
        }
      })
    },

    soldOut() {
      this.dialogDown = true
      this.soldOutForm.commentId = this.tableData.businessId
    if(this.tableData.reportType=='活动') {
      this.soldOutForm.commentType = 1
      }else {
        this.soldOutForm.commentType = 2
      }
      // this.soldOutForm.commentType = this.tableData.reportType
      this.soldOutForm.reportId = this.tableData.reportId
      this.soldOutForm.reHandle = 1
    },
    skipOver() {
      this.dialogPass = true
      this.skipOverForm.reportId = this.tableData.reportId
      this.skipOverForm.reHandle = 2
    },
    forbidden() {
      this.dialogNo = true
      this.forbiddenForm.userId = this.tableData.reportedUserId
      this.forbiddenForm.reportId = this.tableData.reportId
      this.forbiddenForm.reHandle = 3
    },


    dialogdown() {
      this.$http.post(api.getPlatform('/report/downContent'), this.soldOutForm).then(res => {
        if (res.data.status == 200) {
          this.$message.success('下架成功!')
          this.$router.push('/reportList')
        } else {
          this.$message.error('下架失败')
          this.dialogDown = false
        }
      })

    },
    dialogpass() {
      this.$http.post(api.getPlatform('/report/update'), this.skipOverForm).then(res => {
        if (res.data.status == 200) {
          this.$message.success('忽略成功!')
          this.$router.push('/reportList')
        } else {
          this.$message.error('忽略失败')
          this.dialogPass = false
        }
      })

    },
    dialogno() {
      this.$http.post(api.getPlatform('/report/disableId'), this.forbiddenForm).then(res => {
        if (res.data.status == 200) {
          this.$message.success('禁用成功!')
          this.$router.push('/reportList')
        } else {
          this.$message.error('禁用失败')
          this.dialogNo = false
        }
      })
      
    }





  },
  mounted() {
    this.handleList()


  },

}
