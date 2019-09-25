import {
  formatDate
} from '../../../date'
import api from '../../api/index'
export default {
  data() {
    return {
      tableData: [],
      total: 12,
      searchText: '',
      currentPage: 0,
      // 搜索框数据
      searchItem: {
        // 查询编号
        serialNumber: '',
        // 关键字
        keyword: '',
        // 身份
        identity: '',
        // 地区
        region: '',
        // 状态
        state: '',
        // 类型
        type: '',
        // 创建时间
        operationTime: '',
        // 操作时间
        creatTime: '',
        // 审核时间
        auditTime: '',
        // 设备号
        deviceNumber: '',
        // 手机号
        phone: '',
        // 使用状态
        useState: '',
      },
      dialogVisibleStatus: false,
      from: {
        studentPersonId: this.$route.query.id,
        keyvalue: '',
        commentisup: '',
        startTime: '',
        endTime: '',
        sliceParams: {
          pageNum: 1,
          pageSize: 10,
        }
      },

      editStatus: {
        commentId: '',
        commentisup: '',
      },

      //地区
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      options1: [

      ],
      options2: [

      ],
      options3: [

      ],
      options4: [

      ],
      areaArr: [],
      player: '',

    }
  },
  methods: {

    // 分页改变的时候
    handleCurrentChange(page) {
      this.from.sliceParams.pageNum = page
      this.currentPage = page
      this.handleList()
    },

    //搜索
    handleList2() {
      // alert(678)
      this.currentPage = 1
      this.from.sliceParams.pageNum = 1
      if (this.from.status == 0) {
        this.from.status = ''
      }

      if (this.from.startTime != '' && this.from.endTime == '') {
        this.from.endTime = new Date().getTime()
        // console.log(this.from.endTime)
      }

      if (this.from.endTime < this.from.startTime) {
        this.$message.error('请选择正确的时间')
        // console.log(this.from.startTime)
        // console.log(this.from.endTime)

        return false
      }
      this.handleList()
    },
    // 渲染列表
    handleList() {
      this.$http.post(api.getSchool('/student/studentshow'), this.from).then(res => {
        // console.log(res)
        // console.log( formatDate(new Date(Number(1533795949000)), 'yyyy-MM-dd hh:mm'))
        if (res.data.status === 200) {
          this.total = Number(res.data.data.total)
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].commentisup == "1") {
              res.data.data.data[i].commentisup = "上架"
            } else {
              res.data.data.data[i].commentisup = "下架"
            }
            res.data.data.data[i].ctime = formatDate(new Date(Number(res.data.data.data[i].ctime)), 'yyyy-MM-dd hh:mm');
          }

        }



        this.tableData = res.data.data.data
      })
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

    // 修改状态
    editStatUs() {

      this.$http.post(api.getSchool('/student/updatestudentshow'), this.editStatus).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '修改状态成功',
            type: 'success'
          });
          this.handleList()
        }
      })

      this.dialogVisibleStatus = false

    },

    statueTrue(row) {
      // console.log(row)
      // alert(1)
      this.editStatus.commentId = row.commentId
      if (row.commentisup == '上架') {
        this.editStatus.commentisup = 2
      } else if (row.commentisup == '下架') {
        this.editStatus.commentisup = 1
      }
      // console.log(this.editStatus)
      // console.log(this.editStatus)
      this.dialogVisibleStatus = true
    },

    tabH() {
      return 'height: 0'
    },

    tabP() {
      return 'padding: 10px 0px'
    },

    getRowClass() {
      return 'background:rgb(248, 248, 248); color: #000'
    },



  },
  mounted() {

  },
  created() {
    this.handleList()

  }


}
