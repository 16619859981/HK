
import api from '../../api/index'
import qs from 'qs'


export default {

    data() {
      return {
        active:false,
        styleTextBool:  true,
        styleText:"更多条件",
        tableData: [{
          shebeihao: 38365204642816,
          xueshengid: 567892,
          xueshengxingming: '赵大宝',
          hongkashoujihao: '176****3983',
          xuexiaomingcheng: '朝阳区实验一小',
          shiyongzhuangtai: '1天前'
        }],
        total: 1,
        searchText: '',
        currentPage: 0,
        // 搜索框数据
        deviceForm: {
          deviceNumber: '',
          studentPersonId: '',
          value:'',
          deviceltime:'',
          loading: true,
          sliceParams:{
            pageSize:10,
            pageNum:1
          }
     


        },
        //弹框
        deviceVisible:false,
        //弹框的设备号
        deviceNumber2:''
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
      handleEdit(row){
        this.$router.push('/albumEdit')
      },

      // 分页改变的时候
      handleCurrentChange(page) {
        this.loading = true
        this.currentPage = page
        this.deviceForm.sliceParams.pageNum = page
        this.hardwareList()
      },
      hardwareList2() {
        this.currentPage=1
        this.deviceForm.sliceParams.pageNum=1
        if(this.deviceForm.deviceltimetype==0) {
          this.deviceForm.deviceltimetype=""

        }

        this.hardwareList()

      },
      // 渲染硬件列表
      hardwareList(){
        this.$http.post(api.getPlatform('/hardware/SelectHardwareList'),this.deviceForm).then(res=>{
          console.log(res)
          if(res.data.status==200) {
            this.loading = false
            this.total = res.data.data.total
            for(var i = 0; i< res.data.data.data.length;i++){


     
              res.data.data.data[i].studentPhone=String(res.data.data.data[i].studentPhone).replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")
              if(res.data.data.data[i].studentPhone=="null") {
                res.data.data.data[i].studentPhone=""
              }
              res.data.data.data[i].parentPhone=String(res.data.data.data[i].parentPhone).replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3")
              if(res.data.data.data[i].parentPhone=="null") {
                res.data.data.data[i].parentPhone=""
              }

            }
            this.tableData=res.data.data.data
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
      //导出
//       download() {

//         var wb = XLSX.utils.table_to_book(document.getElementById('div'))
// console.log(wb)
//         /* get binary string as output */
//         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
//         try {
//             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '硬件数据.xlsx')
//         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
//         return wbout
 
 
  
//      },
     download() {
    
   
      
      // console.log(qs.stringify(this.deviceForm))
      const params = qs.stringify(this.deviceForm)
    
      window.open(`/hardware/ExportList?${params}`,"_self")

    
      

    },
    fushu () {
      if (this.deviceForm.deviceNumber < 0) {
        this.deviceForm.deviceNumber = ''
        this.$message.error('不可以输入负数')
        return
      }
    },
    lad () {
      this.loading = true
    }


  
    
    },
    mounted() {
      this.hardwareList()

    },
    created () {
      this.lad()
    }
  }