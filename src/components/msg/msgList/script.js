import api from '../../api/index'

import {
  formatDate
} from '../../../date'
export default {

  data() {

    return {
      tableData: [

      ],
      total: 0,
      searchText: '',
      currentPage: 0,
      loading: true,
      searchItem: {

        title: null,


        // createTime: null,
        // createTime2: null,

        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },



      },


      options: [],
      //发布对象
      //发布对象
      per: [{
        value: '1',
        label: '学校管理员'
      }, {
        value: '2',
        label: '教师'
      }, {
        value: '3',
        label: '企业'
      }, {
        value: '4',
        label: '基地风采'
      }, {
        value: '5',
        label: '大咖'
      }, {
        value: '6',
        label: '名师'
      }, {
        value: '7',
        label: '主播'
      }],
      value: '',

      dialogVisible: false

    }

  },
  methods: {

    handelCreate() {
      // alert(2)
      this.$router.push('/createmsg')
    },

    // },


    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.currentPage = page
      this.searchItem.sliceParams.pageNum = page
      this.handleList()
    },






    //搜索按钮
    handleList2() {
      this.currentPage = 1
      this.searchItem.sliceParams.pageNum = 1
      if (this.searchItem.status == 0) {
        this.searchItem.status = ''

      }
      if (this.searchItem.createTime != null && this.searchItem.createTime2 == null) {
        this.searchItem.createTime2 = new Date().getTime()
      }
      if (this.searchItem.pubTime != null && this.searchItem.pubTime2 == null) {
        this.searchItem.pubTime2 = new Date().getTime()
      }

      if (this.searchItem.pubTime > this.searchItem.pubTime2) {
        this.$message.error('请选择正确日期')
        return false
      }

      if (this.searchItem.createTime > this.searchItem.createTime2) {
        this.$message.error('请选择正确日期')
        return false
      }
      if (this.searchItem.status == 0) {
        this.searchItem.status = null
      }

      this.handleList()
    },
    //搜索的列表
    //渲染列表数据
    handleList() {
      this.$http.post(api.getPlatform('/message/message/noticeList'), this.searchItem).then(res => {

        if (res.data.status == 200) {
          this.loading = false;
          this.total = res.data.data.total
          for (var i = 0 ; i <res.data.data.data.length;i++) {
            res.data.data.data[i].messagePtime = formatDate(new Date(res.data.data.data[i].messagePtime ), 'yyyy-MM-dd hh:mm'); 
          }
          this.tableData = res.data.data.data
          
        }

      })
    },
    //取消发布
    cancelPub(row) {
      this.cancelId = row

      this.dialogVisible = true
    },
    cancelPubSuccess() {
      this.$http.post(api.getPlatform('/message/message/noticeUpdate'), {
        messageId: this.cancelId
      }).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.$message.success('删除成功')
          this.handleList()
          this.dialogVisible = false

        } else {
          this.$message.error(res.data.msg)
          this.handleList()
          this.dialogVisible = false
        }
      })
    },
    //查看数据
    lookData(row) {
      // this.$router.push('/lookMsgData')

      this.$router.push({
        path: '/lookMsgData',
        query: {
          id: row.messageId,

        }
      });
    },
    //查看
    lookmsg(row) {
      // this.$router.push('/lookMsgData')

      this.$router.push({
        path: '/lookmsg',
        query: {
          id: row,

        }
      });

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

    lad() {
      this.loading = true
    }



  },
  mounted() {
    this.handleList()

  },
  created() {
    this.lad()
  }
}
