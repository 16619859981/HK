// var str="12345678901";
// var strr=str.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
// alert(strr);
import api from '../../api/index'
import {
  formatDate
} from '../../../date'

import qs from 'qs'

export default {

  data() {
    return {
      tableData1: [],
      total: 1,
      searchText: '',
      currentPage: 0,
      loading: true,
      // 搜索框数据
      deviceForm: {
        child: '',
        key: '',
        status: '',
        taskId: this.$route.query.id,
        endTime: null,
        endTime2: null,
        sliceParams: {
          pageSize: 10,
          pageNum: 1,

        }


      },
      //判断的类型
      // type: this.$route.query.type,
      //tongguo 
      dialogVisiblePass: false,
      outerVisible: false,
      innerVisible: false,
      dialogVisiblePer: false,
      //弹框的设备号
      deviceNumber2: '',
      URL: '',

      // 修改状态
      statusForm: {
        id: '',
        status: '',
        taskId: '',
        //拒绝的理由
        comment: '',
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
    // 查看按钮
    handleLook(actionId, taskId) {

    },
    handleEdit(row) {
      if (row == '阅读任务') {
        // console.log('跳转阅读任务列表')
        this.$router.push('/readTask')
      } else if (row == '完成任务') {
        // console.log('跳转完成任务列表')
        this.$router.push('/taskOver')
      }
    },

    look(actionId, taskId) {
      this.$router.push({
        path: '/lookaudioO',
        query: {
          actionId,
          taskId
        }
      });
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


    // 分页改变的时候
    handleCurrentChange(page) {
      // console.log(`当前页: ${val}`);
      this.loading = true
      this.currentPage = page
      this.deviceForm.sliceParams.pageNum = page
      this.handleList()
    },

    // 创建任务
    cTask() {
      this.$router.push('/creatTask')
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

    // 四级联动
    areaList() {
      // alert(2)
      this.$http.post(api.getContent('/area'), {
        areaCode: 1
      }).then(res => {
        // console.log(res.data.data)
        if (res.data.status == 200) {
          this.options1 = res.data.data

          // console.log(this.options1)
        }
      })
    },

    valu1(areaNumber) {
      this.areaArr.push(areaNumber)
      this.deviceForm.areaid = this.areaArr
      // console.log(this.from)
      this.$http.post(api.getContent('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options2 = res.data.data

        }
      })
    },
    valu2(areaNumber) {
      this.areaArr.push(areaNumber)
      this.deviceForm.areaid = this.areaArr
    },
    handleList() {
      this.$http.post(api.getContent('/medal/data/done'), this.deviceForm).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          this.loading = false
          this.total = res.data.data.total

          for (var i = 0; i < res.data.data.data.length; i++) {
            res.data.data.data[i].parentPhone = String(res.data.data.data[i].parentPhone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
            res.data.data.data[i].endTime = formatDate(new Date(Number(res.data.data.data[i].endTime)), 'yyyy-MM-dd hh:mm');
            if (res.data.data.data[i].Medalstatus == 1) {
              res.data.data.data[i].Medalstatus = '完成'
            }
            if (res.data.data.data[i].Medalstatus == 2) {
              res.data.data.data[i].Medalstatus = '未完成'
            }
            if (res.data.data.data[i].Medalstatus == 3) {
              res.data.data.data[i].Medalstatus = '等待审批'
            }
            if (res.data.data.data[i].Medalstatus == 4) {
              res.data.data.data[i].Medalstatus = '等待审批'
            }
          }


          this.tableData1 = res.data.data.data





        }
      })

    },


    //搜索
    handleList2() {
      // alert(678)
      this.currentPage = 1
      this.deviceForm.sliceParams.pageNum = 1
      if (this.deviceForm.status == 0) {
        this.deviceForm.status = ''
      }

      if (this.deviceForm.endTime != null && this.deviceForm.endTime2 == null) {
        this.deviceForm.endTime = new Date().getTime()
        // console.log(this.deviceForm.endTime)
      }

      if (this.deviceForm.endTime2 < this.deviceForm.endTime) {
        this.$message.error('请选择正确的时间')

        return false
      }
      this.handleList()
    },



    statusTrue(medalId, taskId) {
      // console.log(row)
      this.statusForm.id = medalId
      this.statusForm.taskId = taskId

      this.statusForm.status = 1
      this.dialogVisiblePass = true
    },

    statusFalse(medalId, taskId) {
      // console.log(row)
      this.statusForm.id = medalId
      this.statusForm.taskId = taskId

      this.statusForm.status = 3
      this.outerVisible = true

    },

    editStatUs() {
      console.log(this.statusForm.status)
      console.log(String(this.statusForm.comment).trim().length )
      if (this.statusForm.status == 3 &&  String(this.statusForm.comment).trim().length == 0) {
        this.$message({
          message: '原因不能为空',
          type: "error"
        })
        return false
      }
      this.$http.post(api.getContent('/medal/student/audit'), this.statusForm).then(res => {
        if (res.data.status == 200) {
          this.$message.success('修改成功')
          this.dialogVisiblePass = false
          this.outerVisible = false
          this.innerVisible = false
          this.statusForm.comment=""

          this.handleList()
        }
      })
    },



    lad() {
      this.loading = true
    },
    fushu() {
      if (this.deviceForm.child < 0) {
        this.deviceForm.child = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    //导出数据
    download() {



      console.log(qs.stringify(this.deviceForm))
      const params = qs.stringify(this.deviceForm)

      window.open(`/content/task/done/export?${params}`, "_self")




    },





  },
  mounted() {
    // this.hardwareList()
    this.areaList()
    this.handleList()


  },
  created() {
    this.lad()
  }
}
