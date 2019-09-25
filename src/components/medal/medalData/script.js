import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'
export default {
  data() {
    return {
      active: false,
      styleTextBool: true,
      styleText: "更多条件",
      tableData: [],
      loading: true,
      total: 0,
      currentPage: 1,
   
      // 搜索框数据
      searchItem: {
        activityId:"",
        activityName:"",
        medalId:"",
        medelName:"",
        medalNumDesc:"",
        sliceParams: { //分页
          pageNum: 1,
          pageSize: 10
        },
        id:this.$route.query.id,

      },

 
      //通过和不通过的id
      dialogVisiblePass:false,
      resourceId:'',
      auditStatus:"",
    }
  },
  created() {},
  methods: {
    //搜索展开关闭按钮
    style() {
      if (this.styleText == '更多条件') {
        this.styleText = "关闭"
        this.active = true
        this.styleTextBool = false
      } else {
        this.styleText = "展开"
        this.active = false
      }

    },
    
    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.renderList()
    },
       //排序
       sortChange(column, prop, order) {
        console.log(column.prop); //prop标签 => nickname
        console.log(column.order); //descending降序、ascending升序
        //调排序接口
        if (column.order == "ascending") {
          this.searchItem.medalNumDesc = "asc"
        } else if (column.order == "descending") {
          this.searchItem.medalNumDesc = "desc"
        }
  
        this.renderList2()
  
  
      },

    renderList2() {

 

      if (this.searchItem) {
        this.searchItem.sliceParams.pageNum = 1
      }

      this.renderList()
    },
    // 渲染列表
    renderList() {
      this.$http.post(api.getPlatform('/medal/MedalActivity/medalActivityList'), this.searchItem).then(res => {
        if (res.data.status == 200) {
          this.loading = false
          this.total = Number(res.data.data.total)
         
          this.tableData = res.data.data.list;
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
   
    fushu() {
      console.log(1)
      if (this.searchItem.id < 0) {
        this.searchItem.id = ''
        this.$message.error('不可以输入负数')
        return
      }
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
