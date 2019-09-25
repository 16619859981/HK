import api from '../../api/index'
import qs from 'qs'

import FileSaver from 'file-saver'
import { formatDate } from '../../../date';
import XLSX from 'xlsx';

export default {
  data() {
    return {
      tableData: [{
        shebeihao: 38365204642816,
        xueshengid: 587291,
        xueshengxingming: '阿拉蕾',
        xuexiaomingcheng: '北京市实验小学',
        jiazhangxingming: '赵大宝',
        jiazhangshoujihao: '176****3983'
      }],
      total: 1,
      searchText: '',
      currentPage: 0,
      loading: true,
      // 搜索框数据
      deviceForm: {
        Imei: '',
        studentId: '',
        value: '',
        grade:'',
        ParentPhone:'',
        deviceltime:'',
        schoolId:'',

        sliceParams: {
          pageSize: 10,
          pageNum: 1
        }



      },
      //弹框
      dialogVisibleStatus: false,
      jiebangForm: {
        Imei: '',
        userid: window.sessionStorage.getItem('id')

      }


    }
  },
  methods: {
    // 查看按钮
    handleLook(row) {

      this.$router.push('/albumLook')
    },
    handleEdit(row) {
      this.$router.push('/albumEdit')
    },

    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.currentPage = page
      this.deviceForm.sliceParams.pageNum = page
      this.handleList()
    },
    handleList2() {
      this.currentPage = 1
      this.deviceForm.sliceParams.pageNum = 1
      this.handleList()
    },



    handleList() {
      this.$http.post(api.getPlatform('/hardware/HardwaretUnbindList'), this.deviceForm).then(res => {

        if (res.data.status == 200) {
          this.loading = false
          this.total = res.data.data.total
          for (var i = 0; i < res.data.data.data.length; i++) {
            res.data.data.data[i].parentPhone = String(res.data.data.data[i].parentPhone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
            if (res.data.data.data[i].parentPhone == "null") {
              res.data.data.data[i].parentPhone = ""
            }
            if (res.data.data.data[i].deviceStatus == 0) {
              res.data.data.data[i].deviceStatus = "未绑定"
            } else if (res.data.data.data[i].deviceStatus == 1) {
              res.data.data.data[i].deviceStatus = "绑定"
            }

          }
          this.tableData = res.data.data.data

        }
      })
    },






    details(row) {
      this.jiebangForm.Imei = row
      this.dialogVisibleStatus = true

    },

    fn() {
      this.$http.post(api.getPlatform('/hardware/UnbundleHardware'), this.jiebangForm).then(res => {
        if (res.data.status == 200) {
          this.$message({
            message: '解绑成功',
            type: 'success'
          })
          this.handleList()

          this.dialogVisibleStatus = false
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
    //导出    // var wb = XLSX.utils.table_to_book(document.getElementById('div'))
      // console.log(wb)
      // /* get binary string as output */
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      // try {
      //   FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '硬件出库列表.xlsx')
      // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      // return wbout
      //参数是this.deviceForm    139.199.132.174:8086/hardware/lookNumberExport
        // this.$http({
      //   url: '/api/hardware/lookNumberExport',
      //   params: this.deviceForm // 这就是参数
      
      // }).then(res => {
      //   // console.log换个输入法搜狗ss。。。这
      //   console.log(111)
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
    download() {
    
   
      
      console.log(qs.stringify(this.deviceForm))
      const params = qs.stringify(this.deviceForm)
    
      window.open(`/hardware/HardwaretUnbindExport?${params}`,"_self")

    
      

    },

    fushu () {
      if (this.deviceForm.Imei < 0) {
        this.deviceForm.Imei = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    lad () {
      this.loading = true
    }



  },


  mounted() {
    this.handleList()

  },

  created () {
    this.lad()
  }
}