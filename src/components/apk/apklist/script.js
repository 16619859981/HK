import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'
export default {
  data() {
    return {
      tableData: [],
      loading: true,
      total: 5,
 
      currentPage: 1,
     
      // 搜索框数据
      searchItem: {
        environment:1,
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        }
      },


     
    
   //删除
      dialogVisibleDel: false,
      delId:'',


      // 请求头
      headers: {
        id: window.sessionStorage.getItem('id'),
        orgid: window.sessionStorage.getItem('orgid'),
        orgType: window.sessionStorage.getItem('orgType'),
        token: window.sessionStorage.getItem('token'),
      },
     
    }
  },
  created() {},
  methods: {
    //
    lookios() {
      this.$router.push({
        path: '/iosapklist',
        
      
      });
    },
 
    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.renderList()
    },
    //点击创建专辑按钮进行子组件的跳转
    createAlbum() {
      // alert('创建专辑')
      this.$router.push({
        path: '/addapk',
        query: {
          environment: 1
        }
      })
    },
  
    // 渲染列表
    renderList() {
      this.$http.post(api.getPlatform('/package/query'), this.searchItem).then(res => {
        if (res.data.status == 200) {
          this.loading = false
          this.total = Number(res.data.data.total)
          for (var i = 0; i < res.data.data.data.length; i++) {
            // res.data.data.data[i].albumCategoryName = res.data.data.data[i].albumCategoryName.split('/')
            //类型的判断
            if (res.data.data.data[i].packageType == 1) {
              res.data.data.data[i].packageType = '红卡少年'
            }
            if (res.data.data.data[i].packageUtype == 1) {
              res.data.data.data[i].packageUtype ='普通更新'
            }
            if (res.data.data.data[i].packageUtype == 2) {
              res.data.data.data[i].packageUtype = '推荐更新'
            }
            if (res.data.data.data[i].packageUtype == 3) {
              res.data.data.data[i].packageUtype = '强制更新'
            }
            
         
           
            // res.data.data.data[i].albumCtime = formatDate(new Date(res.data.data.data[i].albumCtime), 'yyyy-MM-dd hh:mm');
            res.data.data.data[i].packageDate = formatDate(new Date(res.data.data.data[i].packageDate), 'yyyy-MM-dd hh:mm');
          };
          this.tableData = res.data.data.data;
        }
      })
    },
       // 查看按钮
       handleLook(row) {
        this.$router.push({
          path: '/lookapk',
          query: {
            id: row
          }
        });
      },
      //删除
      handleEdit(row) {
        this.delId = row
        this.dialogVisibleDel = true
      
      },
      delData() {
        this.$http.post(api.getPlatform('/package/del'), {id:this.delId}).then(res => {
          console.log(res)
          if (res.data.status==200) {
            this.$message.success('删除成功')
            this.dialogVisibleDel = false
            this.renderList()
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
    },
   
    
  },
  mounted() {
    this.renderList();
  
  },
  created() {
    this.lad()
  }
}
