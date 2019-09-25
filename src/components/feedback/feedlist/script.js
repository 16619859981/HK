import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'

export default {
  data() {
    return {
      active: false,
      styleTextBool: true,
      styleText: "更多条件",
      tableData: [

      ],
      total: 0,
      searchText: '',
      currentPage: 1,
      loading: true,
    
      // 搜索框数据
      formInline: {
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
        feedBackId:"",
        category:[],
        date:"",
        date2:"",
      },
      // 请求头
      headerss: {
        useid: window.sessionStorage.getItem('id'),
        orgid: window.sessionStorage.getItem('orgid'),
        orgType: window.sessionStorage.getItem('orgType'),
        token: window.sessionStorage.getItem('token'),


      },
      optionProps: {
        value: 'sid',
        label: 'name',
        children: 'data'
      },
      options:[],


  

    }
  },
  methods: {
    //搜索展开关闭按钮
    style() {
      if (this.styleText == '更多条件') {
        this.styleText = "关闭"
        this.active = true
        this.styleTextBool = false
      } else {
        this.styleText = "展开"
        this.active = false
      }

    },
    // 查看按钮
    handleLook(row) {
      this.$router.push({
        path: '/lookfeed',
        query: {
          id: row,
         
        }
      })
    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.formInline.sliceParams.pageNum = page
      this.currentPage = page
      this.albumReview()
    },
 

    //渲染列表
    albumReview2() {
      this.currentPage = 1


      if (this.formInline.date != null && this.formInline.date2 == null) {
        this.formInline.date2 = new Date().getTime()
      }
      if (this.formInline.date2 < this.formInline.date) {
        this.$message.error('请选择正确日期')
      }


      if (this.formInline) {

        this.formInline.sliceParams.pageNum = 1
      }
      this.albumReview()

    },

    //渲染列表
    albumReview() {


      this.$http.post(api.getPlatform('/package/feedBack'), this.formInline).then(res => {
        // console.log(res)

        if (res.data.status == 200) {
          this.loading = false
          this.total = res.data.data.total

          for (var i = 0; i < res.data.data.data.length; i++) {

           
            // if (res.data.data.data[i].reportType == 2) {
            //   res.data.data.data[i].reportType = "活动"
            // } else if (res.data.data.data[i].reportType == 1) {
            //   res.data.data.data[i].reportType = "评论"
            // }

            // if (res.data.data.data[i].reportReason == 1) {
            //   res.data.data.data[i].reportReason = "涉嫌营销"
            // } else if (res.data.data.data[i].reportReason == 2) {
            //   res.data.data.data[i].reportReason = "暴力信息"
            // } else if (res.data.data.data[i].reportReason == 3) {
            //   res.data.data.data[i].reportReason = "淫秽色情"
            // } else if (res.data.data.data[i].reportReason == 4) {
            //   res.data.data.data[i].reportReason = "有害信息"
            // } else if (res.data.data.data[i].reportReason == 5) {
            //   res.data.data.data[i].reportReason = "不实信息"
            // } else if (res.data.data.data[i].reportReason == 6) {
            //   res.data.data.data[i].reportReason = "抄袭信息"
            // }
            res.data.data.data[i].feedbackCtime = formatDate(new Date(res.data.data.data[i].feedbackCtime), 'yyyy-MM-dd hh:mm');
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
    fushu() {
      console.log(1)
      if (this.formInline.id < 0) {
        this.formInline.id = ''
        this.$message.error('不可以输入负数')
        return
      }
    },

    lad() {
      this.loading = true
    },
    category() {
      this.$http.post(api.getPlatform('/package/feedBack/category')).then(res => {

        if (res.data.status == 200) {
          this.options = res.data.data
          // console.log(this.options)
        }
      })
    },




  },
  mounted() {
    this.albumReview()
  },

  created() {
    this.category()
    this.lad()
  }
}
