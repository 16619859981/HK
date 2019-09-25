import api from '../../api/index'

import {
  formatDate
} from '../../../date'
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
      currentPage: 0,
      loading: true,
      searchItem: {

        title: null,
        jump: null,

        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },



      },

      area: {},
      cityCode: [],


      //地区
      value1: "",
      value2: '',
      options1: [{
        // areaNumber: "11000000",
        // areaName: "北京市"
      }, ],
      options2: [{
        // areaNumber: "11000000",
        // areaName: "北京市"
      }, ],

      options: [],
      //发布对象
      per: [{
        value: '2',
        label: '全部'
      }, {
        value: '4',
        label: '教师'
      }, {
        value: '5',
        label: '用户'
      }],
      value: '',

      dialogVisible: false,
      //取消发布的id
      cancelId: '',
      // cancelStatus:'',


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
    //创建Banner
    handelCreate() {
      // alert(2)
      this.$router.push('/createPush')
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
      // alert(2)
      this.currentPage = 1
      this.searchItem.sliceParams.pageNum = 1
      if (this.searchItem.jump == 0) {
        this.searchItem.jump = null
      }

      this.handleList()
    },

    //渲染列表数据
    handleList() {
      this.$http.post(api.getPlatform('/message/message/pushList'), this.searchItem).then(res => {
        var date = new Date().getTime();
        if (res.data.status == 200) {
          this.loading = false;
          this.total = res.data.data.total
          this.tableData = res.data.data.data
        }

      })
    },
    //查看数据
    lookData() {
      this.$router.push('/lookPush')
    },
    //取消发布
    cancelPub(row) {
      // this.cancelStatus = row.messageStatus
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
