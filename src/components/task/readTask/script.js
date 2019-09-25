// var str="12345678901";
// var strr=str.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");

import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'

export default {

  data() {
    return {
      tableData: [{
        xm: '阿拉蕾',
        id: 24324334423,
        sjh: '176****3983',
        mc: '北京市第一小学',
        nj: '一年级',
        bj: '1班',
        zt: '完成',
        sj: '2018-09-25 11:05'
      }],
      total: 1,
      searchText: '',
      currentPage: 0,
      loading: true,
      // 搜索框数据
      deviceForm: {
        taskId: this.$route.query.id,
        child: '',
        key: '',
        grade: '',
        aClass: '',
        status: '',
        overTime: '',
        overTime2: '',
        sliceParams: {
          pageSize: 10,
          pageNum: 1
        }
      },
      //弹框
      deviceVisible: false,
      //弹框的设备号
      deviceNumber2: '',

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
    }
  },
  methods: {

    // 分页改变的时候
    handleCurrentChange(page) {
      // console.log(`当前页: ${val}`);
      this.loading = true
      this.currentPage = page
      this.deviceForm.sliceParams.pageNum = page
      this.handleList()

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
    handleList2() {
      this.currentPage = 1
      this.deviceForm.sliceParams.pageNum = 1
      if (this.deviceForm.overTime != null && this.deviceForm.overTime2 == null) {
        this.deviceForm.overTime2 = new Date().getTime()
      }

      if (this.deviceForm.overTime < this.deviceForm.overTime2) {
        this.$message.error('请选择正确日期')
        return false
      }
      if (this.deviceForm.grade == 0) {
        this.deviceForm.grade = ''
      }
      if (this.deviceForm.status == 0) {
        this.deviceForm.status == ""

      }
      this.handleList()

    },

    handleList() {
      // this.deviceForm.taskId = this.$route.query.id
      this.$http.post(api.getContent('/medal/data/read'), this.deviceForm).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.loading = false
          this.total = res.data.data.total
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].Medalstatus == 1) {
              res.data.data.data[i].Medalstatus = "完成"

            } else if (res.data.data.data[i].Medalstatus == 3) {
              res.data.data.data[i].Medalstatus = "未完成"
            }
            res.data.data.data[i].parentPhone = String(res.data.data.data[i].parentPhone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
            res.data.data.data[i].endTime = formatDate(new Date(Number(res.data.data.data[i].endTime)), 'yyyy-MM-dd hh:mm');
          }
          this.tableData = res.data.data.data

        }
      })
    },

    fushu () {
      if (this.deviceForm.child < 0) {
        this.deviceForm.child = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    lad () {
      this.loading = true
    },
        //导出数据
        download() {
    
   
      
          console.log(qs.stringify(this.deviceForm))
          const params = qs.stringify(this.deviceForm)
        
          window.open(`/content/task/read/export?${params}`,"_self")
    
        
          
    
        },
    




  },
  mounted() {
    // this.hardwareList()
    this.areaList()
    this.handleList()


  },
  created () {
    this.lad()
  }
}
