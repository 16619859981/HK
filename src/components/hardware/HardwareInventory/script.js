 
import api from '../../api/index'
import qs from 'qs'
// import { FileSaver } from 'file-saver/FileSaver';
// import { saveAs } from 'file-saver/FileSaver';


import FileSaver from 'file-saver'
import { formatDate } from '../../../date';
import XLSX from 'xlsx';
// import 

export default {
  data() {
    return {
      importUrl:api.getPlatform("/hardware/importHardware"),
      active:false,
      styleTextBool:  true,
      styleText:"更多条件",
      tableData: [],
      total: 1,
      searchText: '',
      currentPage: 0,
      loading: true,
      // 搜索框数据
      deviceForm: {
        username: '',
        excelname: '',
        Status: '',
        startTime: '',
        overTime: '',
        sliceParams: {
          pageSize: 10,
          pageNum: 1

        }



      },
      //弹框
      dialogVisibleStatus: false,
      val:"",
      reasons:[],
      reasonId: "",
      headers: {
        id: window.sessionStorage.getItem('id'),
        orgid: window.sessionStorage.getItem('orgid'),
        orgType: window.sessionStorage.getItem('orgType'),
        token: window.sessionStorage.getItem('token'),


      }

    }
  },
  methods: {
                //搜索展开关闭按钮
                style(){
                  if(this.styleText=='更多条件') {
                  this.styleText="关闭"
                  this.active = true
                  this.styleTextBool = false
                  }else {
                    this.styleText="展开"
                    this.active= false
                  }
            
                },
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
      if (this.deviceForm.Status == 0) {
        this.deviceForm.Status = ""

      }
      if (this.deviceForm.startTime != null && this.deviceForm.overTime == null) {
        this.deviceForm.overTime = new Date().getTime()
      }

      if (this.deviceForm.overTime < this.deviceForm.startTime) {
        this.$message.error('请选择正确日期')
        return false
      }

      this.handleList()

    },
    handleList() {
      this.$http.post(api.getPlatform('/hardware/inventoryRecord'), this.deviceForm).then(res => {

        if (res.data.status == 200) {
          // console.log(res.data.data)
          this.loading = false
          this.total = res.data.data.total
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].deviceInputrecordStatus == 1) {
              res.data.data.data[i].deviceInputrecordStatus = "成功"
            } else if (res.data.data.data[i].deviceInputrecordStatus == 2) {
              res.data.data.data[i].deviceInputrecordStatus = "失败"
            }
            res.data.data.data[i].deviceInputrecordCtime = formatDate(new Date(res.data.data.data[i].deviceInputrecordCtime), 'yyyy-MM-dd hh:mm');
            this.tableData = res.data.data.data
 
          }
        }
      })
    },
    //查看原因
    reason(row) {
      this.reasonId = row.deviceInputrecordId
      this.val = row.deviceInputrecordReason
      // this.val.replace(",","<br>");
      // console.log(this.val)
      this.reasons=this.val.split('！,')
      // console.log(this.reasons)
      this.dialogVisibleStatus = true

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

    HardwareInventoryMX(row) {
      // console.log(row)
      // this.$router.push('/HardwareInventoryMX')
      this.$router.push({ path: '/HardwareInventoryMX', query: { id: row} });
    },
    handleChange(res, file, fileList) {
      // console.log(res.name)
      const type = res.name.split(".")

      if (type[type.length - 1] == 'xlsx' || type[type.length - 1] == 'xls' ){
      } else {
        this.$message.error('导入文件是xlsx和xls格式!');
        return false
      }

    },
    handleAvatarSuccess(res, file, fileList) {
      console.log(res)
      if (res.status==402) {
        this.$message.error(res.msg)
        this.handleList()

      }else if (res.status==500) {
        this.$message.error('数据重复，请检查')
        this.handleList()

      }else if (res.status==200) {
        this.$message.success('导入成功')
        this.handleList()
      }else {
        this.$message.error(res.msg)
      }
      //
  



    },

    // download() {

    //    var wb = XLSX.utils.table_to_book(document.getElementById('div'))
    //    console.log(wb)
    //    /* get binary string as output */
    //    var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    //    try {
    //        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '硬件入库.xlsx')
    //    } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    //    return wbout


 
    // },
    download() {
    
   
      
      console.log(qs.stringify(this.deviceForm))
      const params = qs.stringify(this.deviceForm)
    
      window.open(`/hardware/inventoryExport?${params}`,"_self")

    
      

    },
    lad () {
      this.loading = true
    },
    downmodel() {
      window.open(api.getUpload('/s1/d1/hongkaFiles/model/硬件导入模板.xls'))
    }



 



  },
  mounted() {
    this.handleList()
  },
  created () {
    this.lad()
  }
}