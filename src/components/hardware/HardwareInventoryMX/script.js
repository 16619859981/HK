
import api from '../../api/index'
import qs from 'qs'
import { formatDate } from '../../../date'
export default {
    data() {
      return {
        tableData: [{
          shebeihao: '74629815390251',
          daoruren: '赵大宝',
          daorushijian: '2018-07-14 10:00',
        }],
        total: 1,
        searchText: '',
        loading: true,
        currentPage: 0,
        // 搜索框数据
        deviceForm: {
          number: '',
          inputrecordid:this.$route.query.id,
          sliceParams:{
            pageSize:10,
            pageNum:1

          }

     


        },
        //弹框
        dialogVisibleStatus:false,
        reason: '数据格式不正确',
        //弹框的设备号
        // form:{
        //   Imei:'1',
        //   userid:'1',
        //   nickname:'1'
        // }
      }
    },
    methods: {
   

      // 分页改变的时候
      handleCurrentChange(page) {
   
        this.loading = true
        this.currentPage = page
        this.deviceForm.sliceParams.pageNum = page
        this.handleList()
      },
      handleList2(){
        this.currentPage = 1
        this.deviceForm.sliceParams.pageNum = 1
        this.handleList()
      },
      handleList(){
        this.$http.post(api.getPlatform('/hardware/lookNumber'),this.deviceForm).then(res=>{
          if (res.data.status==200) {
            this.loading = false
            this.total = res.data.data.total
            for (var i= 0 ; i< res.data.data.data.length;i++) {              
              res.data.data.data[i].deviceCtime = formatDate(new Date(res.data.data.data[i].deviceCtime), 'yyyy-MM-dd hh:mm');
            }           
            this.tableData = res.data.data.data

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
      download() {
    
   
      
        console.log(qs.stringify(this.deviceForm))
        const params = qs.stringify(this.deviceForm)
      
        window.open(`/hardware/lookNumberExport?${params}`,"_self")
  
      
        
  
      },

      fushu () {
        if (this.deviceForm.number < 0) {
          this.deviceForm.number = ''
          this.$message.error('不可以输入负数')
          return
        }
      },
      lad () {
        this.loading = true
      },
      HardwareInventory() {
        this.$router.push('/HardwareInventory')
      }

  
    
    },
    mounted() {
      this.handleList()

    },
    created () {
      this.lad()
    }
  }