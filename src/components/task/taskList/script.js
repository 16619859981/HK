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
      tableData: [],
      total: 4,
      searchText: '',
      currentPage: 1,
      loading: true,
      // 搜索框数据
      deviceForm: {
        id: '',
        key: '',
        rangeType: [],
        type: '',
        type1: '',
        status: '',
        pubTime: '',
        pubTime2: '',
        sliceParams: {
          pageNum: 1,
          pageSize: 10,
        }



      },
      //弹框
      dialogVisibleStatus: false,
      //弹框的设备号
      deviceNumber2: '',

      editForm: {
        id: '',
        status: ''
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
    handleLook(row) {
      var id = row.medalId
      var type = row.medalType
      var row = row.medalType + row.medalUsetype
      if (row == '音频阅读任务' || row == '视频阅读任务') {

        this.$router.push({
          path: '/lookaudioR',
          query: {
            id: id,
            type
          }
        });



      } else if (row == '图文完成任务' || row == '视频完成任务') {

        this.$router.push({
          path: '/lookPicO',
          query: {
            id: id,
            type
          }
        });


      }
      //   else if (row == '音频完成任务') {

      // this.$router.push({ path: '/lookaudioO', query: { id: id } });


      //   }
    },
    handleEdit(row) {
      var id = row.medalId
      // var type = row.medalType
      var row = row.medalType + row.medalUsetype
      if (row == '音频阅读任务' || row == '视频阅读任务') {

        this.$router.push({
          path: '/readTask',
          query: {
            id: id
          }
        });

      } else if (row == '图文完成任务' || row == '视频完成任务') {

        this.$router.push({
          path: '/taskOver',
          query: {
            id: id,
          }
        });

      }
    },
    handleEditPic(row) {
      var id = row.medalId
      
      this.$router.push({ path: '/editO', query: { id: id } });
    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.deviceForm.sliceParams.pageNum = page
      this.currentPage = page
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
      this.areaArr = []
      this.areaArr.push(areaNumber)
      this.deviceForm.rangeType = this.areaArr
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
      if (this.areaArr.length == 2) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber)
      this.deviceForm.rangeType = this.areaArr
    },


    // 渲染列表数据
    handleList() {
      this.$http.post(api.getContent('/medal/'), this.deviceForm).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.loading = false
          this.total = res.data.data.total
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].medalType == 1) {
              res.data.data.data[i].medalType = '音频'
            } else if (res.data.data.data[i].medalType == 2) {
              res.data.data.data[i].medalType = '视频'
            } else if (res.data.data.data[i].medalType == 3) {
              res.data.data.data[i].medalType = '图文'
            }

            if (res.data.data.data[i].medalUsetype == 1) {
              res.data.data.data[i].medalUsetype = '阅读任务'
            } else if (res.data.data.data[i].medalUsetype == 2) {
              res.data.data.data[i].medalUsetype = '完成任务'
            }

            if (res.data.data.data[i].medalPublishtime > new Date().getTime()) {
              res.data.data.data[i].medalStatus = '待上架'
            }

            if (res.data.data.data[i].medalStatus == 1) {
              res.data.data.data[i].medalStatus = '上架'
            } else if (res.data.data.data[i].medalStatus == 2) {
              res.data.data.data[i].medalStatus = '下架'
            }

            res.data.data.data[i].medalPublishtime = formatDate(new Date(Number(res.data.data.data[i].medalPublishtime)), 'yyyy-MM-dd hh:mm');
          }

          this.tableData = res.data.data.data
          //  console.log(this.tableData)
        }
      })
    },

    //搜索
    handleList2() {
      // alert(678)
      this.currentPage = 1
      this.deviceForm.sliceParams.pageNum = 1
      // console.log(this.deviceForm)
      if (this.deviceForm.status == 0) {
        this.deviceForm.status = ''
      }

      if (this.deviceForm.pubTime != '' && this.deviceForm.pubTime2 == '') {
        this.deviceForm.endTime = new Date().getTime()
        // console.log(this.deviceForm.endTime)
      }


      this.handleList()
    },


    statueTrue(row) {
      // console.log(row.medalId)
      // console.log(row.medalStatus)
      this.editForm.id = row.medalId
      if (row.medalStatus == '上架') {
        this.editForm.status = 2
      } else if (row.medalStatus == '待上架') {
        this.editForm.status = 1
      }
      this.dialogVisibleStatus = true
      // console.log(this.editForm)
    },


    editStatUs() {
      this.$http.post(api.getContent('/medal/down_medal'), this.editForm).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.$message.success('修改成功')
          this.dialogVisibleStatus = false
          this.handleList()
        }
      })
    },
    fushu() {
      if (this.deviceForm.id < 0) {
        this.deviceForm.id = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    lad() {
      this.loading = true
    },
    //导出数据
    download() {



      console.log(qs.stringify(this.deviceForm))
      const params = qs.stringify(this.deviceForm)
      const heade = qs.stringify(this.headerss)


      window.open(`/content/task/export?${params}&${heade}`,'_self')




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
