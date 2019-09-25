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
  
        if (res.data.status == 200) {
          console.log(res.data.data)
          if (res.data.data.reportType == 2) {
            res.data.data.reportType = "活动"
          } else if (res.data.data.reportType == 1) {
            res.data.data.reportType = "评论"
          }

          if (res.data.data.reHandle == 1) {
            res.data.data.reHandle = "下架"
          } else if (res.data.data.reHandle == 2) {
            res.data.data.reHandle = "忽略"
          } else if (res.data.data.reHandle == 3) {
            res.data.data.reHandle = "禁用"
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
          res.data.data.reportTime = formatDate(new Date(res.data.data.reportTime), 'yyyy-MM-dd hh:mm');

      
console.log(res.data.data.files)
          for(var i = 0 ;i<res.data.data.files.length;i++) {
            if (res.data.data.files[i].url) {
              res.data.data.files[i].url = api.getUpload(res.data.data.files[i].url)
            }
  
          }
          this.tableData = res.data.data
          console.log(this.tableData)
        }
      })
    },







  },
  mounted() {
    this.handleList()


  },

}
