

import api from '../../api/index'
export default {
  data() {
    return {

      total: 12,
      searchText: '',
      currentPage: 0,
      loading: true,
      loading1: true,

      getAllList: '',
      getAppList: '',
      saveApp: '',
      delete: '',
      deleteAll: '',
      ok: '',
      sort: '',
      top: '',
      searchItem: {
        keyValue: '',
        sliceParams: {
          pageSize: 12,
          pageNum: 1,
        }
      },
      tableData: [],
      leftList:[],
      dialogVisibleDel:false,
      leftLength:0,
      dialogVisibleTop:false,
      topTitle:'',
      topId:0,
      topSort:0,
      dialogVisibleDelList:false,
      delTitle:'',
      delId:0,

    }
  },
  methods: {
    // 分页改变的时候
    handleCurrentChange(page) {
      // alert(page)
      this.currentPage = page,
        this.searchItem.sliceParams.pageNum = page,
        this.handelList()
    },
    appActive(){
      this.$router.push('/appActive')
  },
  thematicActive(){
    this.$router.push('/thematicActive')
  },
    //获取请求地址
    //获取全部列表的地址
    handelUrl() {
      this.$http.post(api.getOperate('/getUrl'), { type:10}).then(res => {

        if (res.data.status == 200) {
          // this.getAllList = res.data.data[0].url
          this.getAllList = "/" + res.data.data[0].url
    
          this.getAppList= "/" + res.data.data[1].url
          this.saveApp= "/" + res.data.data[2].url
          this.delete= "/" + res.data.data[3].url
          this.deleteAll= "/" + res.data.data[4].url
          this.ok= "/" + res.data.data[5].url
          this.sort= "/" + res.data.data[6].url
          this.top= "/" + res.data.data[7].url
       
          this.handelList()
          this.handelLeftList()
        }
      })
    },
    //搜索渲染列表
    handelList2() {
      this.currentPage = 1;
      this.searchItem.sliceParams.pageNum = 1;
      this.handelList()

    },
    //渲染列表
    handelList() {
      this.$http.post(api.getOperate(this.getAllList), this.searchItem).then(res => {

        if (res.data.status == 200) {
          this.loading1 = false
          this.total =res.data.data.total
          
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].isup == 1) {
              res.data.data.data[i].isup = "已添加"
            } else {
              res.data.data.data[i].isup = "添加"
            }

          }

          
          this.tableData = res.data.data.data

        }

    
      })
    },
    //渲染左边的列表
    handelLeftList() {
      this.$http.post(api.getOperate(this.getAppList)).then(res=>{

        if (res.data.status==200) {
          this.loading = false
          this.leftLength = res.data.data.length

          for (var i = 0 ;i <res.data.data.length;i++) {

            if (res.data.data[i].istop==1) {
              res.data.data[i].istop="取消置顶"

            } else {
              res.data.data[i].istop="置顶"
            }
          }
          this.leftList = res.data.data
        }
      })
    },
    //修改右边添加的状态
    changeStatus(status,id) {

      // if(this.leftLength==26) {
      //   this.$message.error('列表超出26个,请先移除APP展示列表')
      //   return false

      // }
      if (status=="已添加") {
        this.$message.error('已添加到App列表')

      }else if (status=="添加") {
        // alert(2)
        this.$http.post(api.getOperate(this.saveApp),{objId:id,isup:1}).then(res=>{
          // console.log(res)
          if (res.data.status==200) {
            this.$message.success('添加成功')
            this.handelList()
            this.handelLeftList()

          } 
        })
      } 
    },
    //delStatusList
    delStatusList(id,delTitle) {
      this.delId = id 
      this.delTitle = delTitle
      this.dialogVisibleDelList = true
    },
  //移除左边的列表模板
    delStatus() {
      this.$http.post(api.getOperate(this.saveApp),{objId:this.delId,isup:0}).then(res=>{

        if (res.data.status==200) {
          this.$message.success('移除成功')
          this.dialogVisibleDelList = false
          this.handelList()
          this.handelLeftList()

        } 
      })

    },
    //清除左边的列表
    delListStatus() {
      // alert(2)
      this.$http.post(api.getOperate(this.deleteAll)).then(res=>{

        if (res.data.status==200) {
          this.$message.success('清除列表成功')
          this.handelLeftList()
          this.handelList()

        }
        this.dialogVisibleDel = false
      })
    },
    //置顶操作
    changeTopList(id,sort,topTitle) {
      this.topTitle = topTitle
      this.topId=id
      this.topSort=sort
      if(this.topSort==1) {
        this.$message.error('已置顶')
        return false
      }

      this.dialogVisibleTop = true
    },
    changeTop() {
  
        this.$http.post(api.getOperate(this.sort),{objId:this.topId,sort:1}).then(res=>{
   
          if (res.data.status==200) {
                  this.$message.success('置顶成功')
                  this.handelLeftList()
                  this.dialogVisibleTop = false
          }
        })
 

    },
    //上移排序操作
    changeSortUp(id,sort) {

      if (sort == 1) {
        this.$message.error('已是第一个')
      }else {
        this.$http.post(api.getOperate(this.sort),{objId:id,sort:Number(sort)-1}).then(res=>{

          if (res.data.status==200) {
                  this.$message.success('上移成功')
                  this.handelLeftList()
              
                }
        })
      }


    },
    //下移
    changeSortDown(id,sort){

      if (sort == this.leftLength) {
        this.$message.error('已是最后一个')
      }else {
        // console.log(sort)
        this.$http.post(api.getOperate(this.sort),{objId:id,sort:Number(sort)+1}).then(res=>{

          if (res.data.status==200) {
                  this.$message.success('下移成功')
                  this.handelLeftList()
              
                }
        })
      }

    },

    lod () {
      this.loading = true
      this.loading1 = true
    }



  },
  mounted() {

    this.handelUrl()


  },

  created () {
    this.lod()
  }
}