
import api from '../../api/index'
export default {
    data() {
      return {
    
        total: 12,
        searchText: '',
        currentPage: 0,
        searchInp:'',
        dialogVisible:false,
        loading: true,
        loading1: true,
        loading2: true,
        loading3: true,
        loading4: true,
        form:{
          type:'',
          name:'',
          model:'',
          // id:window.sessionStorage.getItem('id')

        },
        modelDatas:[
      ],
        seachItem:{
          sliceParams:{
            pageSize:9,
            pageNum:1
          },
        },
        
        options:[],
        dialogVisibleModel:false,
        dialogVisibleHideSchool:false,
        hiddenText:"隐藏",
        dialogVisibleDelModel:false,
        //左边的列表
        leftData:[],
        //左边模板的移除
        delLeftDataId:"",
        //隐藏学校
        schoolId:'',
        schoolText:'',
        //左边列表的长度
        arrLeftLength:0,
        empty:'',
        //判断有没有编辑模板

        bool: 0
      

      }
    },
    methods: {
     // 分页改变的时候
     handleCurrentChange(page) {
      this.loading1 = true
      
      this.currentPage=page
      this.seachItem.sliceParams.pageNum=page
      this.handelList()

    },
    appActive(){
        this.$router.push('/appActive')
    },
    thematicActive(){
      this.$router.push('/thematicActive')
    },
    select1() {
      document.getElementById('span2').style.border = "1px solid #ccc"
      document.getElementById('span3').style.border = "1px solid #ccc"

      document.getElementById('span1').style.border = "1px solid #409eff"
      this.form.ind=1
    },
    select2() {
      document.getElementById('span1').style.border = "1px solid #ccc"
      document.getElementById('span3').style.border = "1px solid #ccc"
      document.getElementById('span2').style.border = "1px solid #409eff"

      this.form.ind=2
    },
    select3() {
      document.getElementById('span1').style.border = "1px solid #ccc"
      document.getElementById('span2').style.border = "1px solid #ccc"
      document.getElementById('span3').style.border = "1px solid #409eff"

      this.form.ind=3
    },
    submitModel() {
      if(this.form.name.length<1&&this.form.name.length>6) {
        this.$message.error('标题名称在1-6个字符')
        return false
      }
      if (String(this.form.name).trim().length==0) {
        this.$message.error('标题名称在1-6个字符')
        return false
      }
      if(this.form.ind=="") {
        this.$message.error('请点击选择模板类型')
        return false
      }
      if(this.form.type=="") {
        this.$message.error('请选择内容类型')
        return false
      }
     
     
      
      this.dialogVisibleModel = true
    },
    //创建模板
    modelsData() {
      this.form.model = this.form.ind
      this.$http.post(api.getOperate('/addHomeModule'),this.form).then(res=>{
  
        
        if (res.data.status==200) {
          this.$message.success('创建模板成功')
          this.dialogVisibleModel = false
        }
     
        this.dialogVisible = false
        this.handelList()

      })

    },
    //可配置模板
    handelList() {
      this.$http.post(api.getOperate('/getHomeModuleList'),this.seachItem).then(res=>{
      
        
        if (res.data.status==200) {
          this.loading1 = false
          this.loading2 = false
          this.loading3 = false
          this.loading4 = false
          this.total = res.data.data.total
       
          
          for(var i = 0 ;i < res.data.data.data.length;i++) 
          {
            if ( res.data.data.data[i].homeModuleIsup=="1"||res.data.data.data[i].homeModuleIsup=="2") {

              res.data.data.data[i].homeModuleIsup="已添加"
            }else {
              res.data.data.data[i].homeModuleIsup="添加"
            }
           
          }
          

          this.modelDatas = res.data.data.data
      //  for (var i = 0 ; i < this.modelDatas.length;i++) {
      //  if ( this.modelDatas[i].modelData.length==0) {
      //   this.empty =1
      //  }else {
      //   this.empty =2
      //  }

      //  }
        }
      })
    },
    //内容模板
    bannerType() {
      this.$http.post(api.getOperate('/findHomeModelType')).then(res => {
     
        
        if (res.data.status == 200) {
          this.options = res.data.data

        }
      })
    },
    //隐藏学校
    hideSchool(id,text) {
  
      
      this.schoolId = id,
      this.schoolText = text
 
      
      this.dialogVisibleHideSchool = true
    },
    HideSchool() {
      if (this.schoolText==2) {
    
        this.$http.post(api.getOperate('/updateHomeModule'),{isup:1,id:this.schoolId}).then(res=>{
       
          
          if (res.data.status==200) { 
            this.$message.success('显示成功')
            this.handelLeftList()

          }
        })
      }else if  (this.schoolText==1) {
        this.$http.post(api.getOperate('/updateHomeModule'),{isup:2,id:this.schoolId}).then(res=>{
          if (res.data.status==200) { 
            this.$message.success('隐藏成功')
            this.handelLeftList()

          }
        })
      }
      this.dialogVisibleHideSchool = false
      
    },
    //移除模板
    delModels(id) {
      // alert(id)
      this.delLeftDataId = id
      // alert(2)
      this.dialogVisibleDelModel = true
    },
    //弹窗确认移除
    DEL() {
      // alert(2)
      // alert(this.delLeftDataId)
      this.$http.post(api.getOperate('/updateHomeModule'),{id:this.delLeftDataId,isup:0}).then(res=>{
  
        
        if (res.data.status==200) {
          this.$message.success('移除模板成功')
          this.dialogVisibleDelModel = false
          this.handelList()
          this.handelLeftList()

        }else {
          this.$message.error('移除模板失败')
          this.dialogVisibleDelModel = false
          this.handelList()
          this.handelLeftList()
        }
      })

    },
    //编辑右边的模板
    edit(item1,item2) {
      
   
      
      this.$router.push({ path: '/editModel', query: { id:item1,type:item2 } });
      // this.$router.push({ path: '/editModel'});

    },
    //右边到左边添加模板
    addModel(model,name,id,type,isup){
      if (isup=="添加") {
        this.$http.post(api.getOperate('/updateHomeModule'),{id:id,model:model,type:type,name:name,isup:1}).then(res=>{
 
          
          if (res.data.status==200) {
            this.$message.success('添加模板成功')
            this.handelList()
            this.handelLeftList()
  
          }
        })

      } else {
        this.$message.error('已添加')
      }


    },
    //右边的添加判断
    addError() {
      this.$message.error('请先编辑模板')
      return false
    },

    //右边的删除
    delModel(id) {
      this.$http.post(api.getOperate('/deleteHomeModule'),{id:id}).then(res=>{

        
        if (res.data.status==200) {
          this.$message.success('删除模板成功')
          this.handelList()

        }
      })
    },
    //app左边展示列表
    handelLeftList() {
      this.$http.post(api.getOperate('/getHomeModuleAppList'),this.seachItem).then(res=> {
      
        
        if (res.data.status==200) {
          this.loading = false
          this.arrLeftLength = res.data.data.data.length
          this.leftData =res.data.data.data
          this.bool = 0

        }
      })
    },
    //左边列表的上移
    orderUp(id,sort) {
        if (this.bool == 0) {
          this.bool++
      
          
        if  (sort==1) {
          this.$message.error('已经是第一个')
          this.bool = 0
          return false
        } else  {
          this.$http.post(api.getOperate('/sortHomeModule'),{objId:id,sort:sort-1}).then(res=>{
            if (res.data.status==200) {
              this.$message.success('上移成功')
              this.handelLeftList()
            }

          })
        }
        }
        
    },
    //左边列表的下移
    orderDown(id,sort) {
      if (this.bool == 0) {
        this.bool++
        if  (sort==this.arrLeftLength) {
          this.$message.error('已经是最后一个')
          this.bool = 0
          return false
        } else  {
          this.$http.post(api.getOperate('/sortHomeModule'),{objId:id,sort:sort+1}).then(res=>{
            if (res.data.status==200) {
              this.$message.success('下移成功')
              this.handelLeftList()
            }
  
          })
        }
      }
      

    },

    lad() {
        this.loading= true
        this.loading1= true
        this.loading2= true
        this.loading3= true
        this.loading4= true
    },
    //刷新
     fresh() {
       console.log(1)
      this.$http.post(api.getOperate('/clearAppHomePageCache')).then(res=>{
        if (res.data.status==200) {
          this.$message.success('刷新成功')
          this.handelLeftList()
        }else {
          this.$message.error(res.msg)
        }

      })
    }
    },
    mounted() {
      this.bannerType()
      this.handelList()
      this.handelLeftList()
 
      // this.handelListData()
    },
    created () {
      this.lad()
    }
  }