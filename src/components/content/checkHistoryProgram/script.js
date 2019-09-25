import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'

export default {
  data() {
    return {
      tableData: [],
      total: 5,
      searchText: '',
      currentPage: 0,
      loading: true,
      // 搜索框数据
      formInline: {
        id: '',
        key: null,
        type: null,
        status: null,
        startTime: null,
        endTime: null,
        checkStartTime: null,
        checkEndTime: null,
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
      },
      // 请求头
      headerss: {
        useid: window.sessionStorage.getItem('id'),
        orgid: window.sessionStorage.getItem('orgid'),
        orgType: window.sessionStorage.getItem('orgType'),
        token: window.sessionStorage.getItem('token'),


      },
    }
  },
  methods: {
    // 查看按钮
    handleClick(row) {

      this.$router.push({
        path: '/albumLookProgram',
        query: {
          id: row.auditId,
          type: row.auditType
        }
      });
    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.formInline.sliceParams.pageNum = page
      this.currentPage = page
      this.checkHistory()
    },
    //点击创建专辑按钮进行子组件的跳转
    createAlbum() {
      // alert('创建专辑')
      this.$router.push('/createAlbum')
    },
    //添加节目
    creatProgram(item) {
      if (item.type === '音频') {
        this.$router.push('/createAudioProgram')
        // alert(item.type);

      } else if (item.type === '视频') {
        this.$router.push('/createVideoProgram')
        // alert(item.type+"------");

      } else {
        this.$message({
          type: 'error',
          message: "未审核专辑"

        })
      }

    },
    checkHistory2() {
      this.currentPage = 1
      if (this.formInline.status == 0) {
        this.formInline.status = null
      }
      if (this.formInline.type == 0) {
        this.formInline.type = null
      }
      if (this.formInline.startTime != null && this.formInline.endTime == null) {
        this.formInline.endTime = new Date().getTime()
      }


      if (this.formInline.endTime < this.formInline.startTime) {
        this.$message.error('请选择正确日期')
      }
      if (this.formInline.checkStartTime != null && this.formInline.checkEndTime == null) {
        this.formInline.checkEndTime = new Date().getTime()
      }

      if (this.formInline.checkStartTime > this.formInline.checkEndTime) {
        this.$message.error('请选择正确日期')
      }
      if (this.formInline) {

        this.formInline.sliceParams.pageNum = 1
      }
      this.checkHistory()
    },
    //历史记录列表渲染
    checkHistory() {

      this.$http.post(api.getContent('/audit/query/material'), this.formInline).then(res => {

        if (res.data.status == 200) {
          this.loading = false
          for (var i = 0; i < res.data.data.data.length; i++) {
            // this.total = res.data.total
            this.total = res.data.data.total

            if (res.data.data.data[i].auditProgramType == 1) {
              res.data.data.data[i].auditProgramType = "音频"
            } else {
              res.data.data.data[i].auditProgramType = "视频"

            }
            if (res.data.data.data[i].auditStatus == 1) {
              res.data.data.data[i].auditStatus = "通过"
            } else {
              res.data.data.data[i].auditStatus = "不通过"
            }
            res.data.data.data[i].auditCtime = formatDate(new Date(res.data.data.data[i].auditCtime), 'yyyy-MM-dd hh:mm');
            res.data.data.data[i].auditTime = formatDate(new Date(res.data.data.data[i].auditTime), 'yyyy-MM-dd hh:mm');

          }
          this.tableData = res.data.data.data
        }

      })
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

    a() {
      this.$router.push('/VAReview')
    },

    b() {
      this.$router.push('/VAReview')
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

      
        window.open(`/content/program/record/export?${params}&${heade}`,"_self")
  
      
        
  
      },
  },
  mounted() {
    this.checkHistory()
  },
  created () {
    this.lad()
  }
}
