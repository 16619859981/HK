import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'
export default {
  data() {
    return {
      text:"",
      listType:this.$route.query.type,
      active: false,
      styleTextBool: true,
      styleText: "更多条件",
      tableData: [],
 
      total: 0,
      currentPage: 1,
  
      // 搜索框数据
      searchItem: {
        name: '', 
        upDate: null, 
        downDate: null, //专辑编号
        modelType: this.$route.query.type, //专辑名称
        upStatus: null, //类型

        sliceParams: { //分页
          pageNum: 1,
          pageSize: 10
        },

      },
  

     
      //通过和不通过的id
      dialogVisible:false,
      editId:'',
      bool:0,
   
    }
  },
 
  methods: {
    //搜索展开关闭按钮
    style() {

      if (this.styleText == '更多条件') {
        this.styleText = "关闭"
        this.active = true
        this.styleTextBool = false
        console.log('123')
      } else {
        this.styleText = "展开"
        this.active = false
      }

    },
    create() {
      this.$router.push({
        path: '/createOperating',
        query: {
          type: this.listType
        }
      })
    },
    historyApp() {
      this.$router.push({
        path: '/historyApp',
        query: {
          type: this.listType
        }
      })
    },
  
    // 查看节目
    handleLook(id) {
      this.$router.push({
        path: '/lookApp',
        query: {
          id: id,
          type: this.listType,
          isEdit:0,
        }
      })
    },
        // 编辑节目
        handleEdit(id) {
          this.$router.push({
            path: '/lookApp',
            query: {
              id: id,
              type: this.listType,
              isEdit:1,
            }
          })
        },
 
    // 分页改变的时候
    handleCurrentChange(page) {
      this.loading = true
      this.searchItem.sliceParams.pageNum = page
      this.currentPage = page
      this.renderList()
    },

    renderList2() {

     
      if (this.searchItem.resourceType == 0) {
        this.searchItem.resourceType = null
      }
      console.log(this.searchItem.upDate)
      console.log(this.searchItem.downDate)

      if (this.searchItem.upDate != null && this.searchItem.downDate == null) {

        this.searchItem.downDate = (new Date()).getTime()
        // console.log(new Date())
      }
      if (this.searchItem.downDate < this.searchItem.upDate) {
        this.$message.error('请选择正确日期')
        return false
      }
      if (this.searchItem) {
        this.searchItem.sliceParams.pageNum = 1
      }
      if(this.searchItem.upStatus==0) {
        this.searchItem.upStatus=null
      }

      this.renderList()
    },
    // 渲染列表
    renderList() {
      this.$http.post(api.getPlatform('/home/recommend/all'), this.searchItem).then(res => {
        var nowDate = Date.now()
        console.log(nowDate)
        if (res.data.status == 200) {
          this.total = res.data.data.total
            this.tableData = res.data.data.data    
            for (var i = 0 ;i<this.tableData.length;i++) {
             
              // if(this.tableData[i].upStatus==1){
              //   this.tableData[i].upStatus="上架"
              // }else if(this.tableData[i].upStatus==2) {
              //   this.tableData[i].upStatus="下架"
              // }else
              // if(this.tableData[i].upStatus==3) {
              //   this.tableData[i].upStatus="未开始"
              // }
              if(this.tableData[i].upTime>nowDate) {
              
                  this.tableData[i].upStatus="未开始"
            
              }else {
                if(this.tableData[i].upStatus==1){
                    this.tableData[i].upStatus="上线"
                  }else if(this.tableData[i].upStatus==2) {
                    this.tableData[i].upStatus="下线"
                  }
              }

              this.tableData[i].upTime = formatDate(new Date(this.tableData[i].upTime), 'yyyy/MM/dd');
              this.tableData[i].downTime=formatDate(new Date(this.tableData[i].downTime), 'yyyy/MM/dd');
            }
        }
      })
    },
    //下架
    editStatus(id) {
      this.editId=id,
      this.bool=1,
      this.dialogVisible = true
      
    },
    pass() {
      if (this.bool==1){
        this.$http.post(api.getPlatform('/home/recommend/down'), {id:this.editId}).then(res => {
          if (res.data.status == 200) {
              this.$message.success('修改成功')
              this.renderList();
          }else {
            this.$message.error('修改失败')
            this.renderList();
          }
          this.dialogVisible = false
        })
      }else if (this.bool==2) {
        this.$http.post(api.getPlatform('/home/recommend/del'), {id:this.editId}).then(res => {
          if (res.data.status == 200) {
              this.$message.success('删除成功')
              this.renderList();
          }else {
            this.$message.error('删除失败')
            this.renderList();
          }
          this.dialogVisible = false
        })
      }
     
    },
    //删除
    delStatus(id) {
      this.editId=id,
      this.bool=2,
      this.dialogVisible = true
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
  
  
  },

  mounted() {
    this.renderList();


  },
  created() {
    // console.log(this.listType)
    // if (this.listType=="3") {
    //   this.text = "板块名称"
    // }else if (this.listType=="1") {
    //   this.text = "红广号名称"      
    // }else if (this.listType=="1"){
    //   this.text = "运营位名称"
    // }
  }
}
