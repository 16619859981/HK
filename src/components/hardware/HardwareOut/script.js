import api from '../../api/index'
import qs from 'qs'
import FileSaver from 'file-saver'
import { formatDate } from '../../../date';
import XLSX from 'xlsx';

export default {
    data() {
      return {
        importUrl:api.getPlatform("/hardware/importremoval"),
        tableData: [{
          shebeihao: 38365204642816,
          shiyongzhuangtai: '1天前'
        }],
        total: 1,
        searchText: '',
        currentPage: 0,
        loading: false,
        // 搜索框数据
        deviceForm: {
          deviceNumber: '',
          deviceltime: '',
        sliceParams:{
          pageSize:10,
          pageNum:1
        }
     


        },
        headers: {
          id: window.sessionStorage.getItem('id'),
          orgid: window.sessionStorage.getItem('orgid'),
          orgType: window.sessionStorage.getItem('orgType'),
          token: window.sessionStorage.getItem('token'), 
        },
        //弹框
        dialogVisibleStatus: false,
   
        //出库
        outId:'',
 
      }
    },
    methods: {
 

      // 分页改变的时候
      handleCurrentChange(page) {
        this.loading = true
        this.currentPage = page
        this.deviceForm.sliceParams.pageNum = page
        this.hardwareOut()
      },
   
      //
      handleList2() {
        this.currentPage = 1
        this.deviceForm.sliceParams.pageNum = 1 
        if ( this.deviceForm.deviceltime==0) {
          this.deviceForm.deviceltime=""
        }
        this.hardwareOut()

      },
      // 渲染列表
      hardwareOut(){
        this.$http.post(api.getPlatform('/hardware/removalList'),this.deviceForm).then(res=>{

          if(res.data.status==200) {
            this.loading = false
            this.total = res.data.data.total
            this.tableData=res.data.data.data
          }
        })
      },
      //出库
      out(row) {
        this.outId = row.deviceNumber

this.dialogVisibleStatus = true

      },
      outSubmit() {
        this.$http.post(api.getPlatform('/hardware/removal'),{Imei:this.outId}).then(res=>{

          if (res.data.status==200) {
            this.$message.success('出库成功')
            this.dialogVisibleStatus = false
            this.hardwareOut()

          }else {
            this.$message.error('出库失败')
            this.dialogVisibleStatus = false
          }
        })


        // this.dialogVisibleStatus = false
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
           //导出
        //    download() {

        //     var wb = XLSX.utils.table_to_book(document.getElementById('div'))

        //     /* get binary string as output */
        //     var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        //     try {
        //         FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '硬件出库列表.xlsx')
        //     } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        //     return wbout
     
     
      
        //  },
         //导入
         handleChange(res, file, fileList) {

        },
        handleAvatarSuccess(res, file, fileList) {
          if (res.status==402) {
            this.$message.error(res.msg)
    
          }else if (res.status==500) {
            this.$message.error('数据重复，请检查')
    
          }else if (res.status==200) {
            this.$message.success('导入成功')
            this.hardwareOut()
          }else {
            this.$message.error(res.msg)
          }
         
    
    
    
        },
        //导出
        download() {
    
   
      
          // console.log(qs.stringify(this.deviceForm))
          // const params = qs.stringify(this.deviceForm)
        
          // window.open(`/hardware/removalListExport?${params}`,"_self")
    
        
          
    
        },

        lad () {
          this.loading = true
        },

        fushu () {
          if (this.deviceForm.deviceNumber < 0) {
            this.deviceForm.deviceNumber = ''
            this.$message.error('不可以输入负数')
            return
          }
        },
        //下载模板
    downmodel() {
      window.open(api.getUpload('/s1/d1/hongkaFiles/model/硬件出库模板.xls'))
    }


    
    
    
    },
    mounted() {
      this.hardwareOut()

    },
    created () {
      this.lad()
    }
  }