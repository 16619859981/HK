
import {
  formatDate
} from '../../../date'
export default {
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      ruleForm: {

      },

      programData:[],
      uploadData:[],


      duration:'',
      dialogVisible: false,
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      id: this.$route.query.id,
      imageUrl:'',
      coverId:'',
      fileList:[],

      index:0,
      Url:'',
      dialogVisiblePlay:false,
      total:5,
      pageSize:10,
      pageNum:1,
      currentPage:0,
      dialogVisibleSubmit:false,
      

      from: {
        "materials":[
          {
            "albumId":this.$route.query.id,
            "fileId":1222,//文件路径
            "type":2,
            "coverId":'',//封面
            "name":"",
            "author":"",
            "sort":2,
            "publisher":111//发布者
          }
          
          ]
        
      }


    };


  },
  created() {

  },
  methods: {
    
    setindex(idx){
      this.index = idx;
      
      console.log(this.index);
    },
    //上传文件的方法
    handleAvatarSuccess(res, file ,fileList) {

      this.coverId=res.data.fileId
      
      this.uploadData[this.index].coverId = this.coverId;
      this.uploadData[this.index].imageUrl = res.data.realUrl;

    },
    fn(res,file,fileList){

      
      res.data['albumId']=this.id
      res.data['coverId']=''
      res.data['imageUrl']=''
      res.data['name']=''
      res.data['author']=window.sessionStorage.getItem('orgName')
      res.data['sort']=''
      res.data['publisher']='1'
      res.data['type']=2
      res.data['fileId']=res.data.fileId
      res.data['coverId']=this.coverId
      // console.log('--------------')
      console.log(res.data.fileName)
      if (res.data.fileName.length>20) {
        // console.log(2222222222)
        res.data.fileName = res.data.fileName.substring(0,20)
        console.log(res.data.fileName)
      }
    


      
      this.uploadData.push(res.data)
      console.log(fileList)
      for (var i = 0 ; i< fileList.length;i++) {
        console.log(fileList[i].name.split("."))
 
      }
    

    
    },
    beforeAvatarUpload(file) {

      console.log(file.name.split("."))
      const type = file.name.split(".")
      console.log(type[type.length-1])
      if(type[type.length-1] == 'bmp' || type[type.length-1] == 'dib' || type[type.length-1] == 'jpg' || type[type.length-1] == 'tif' || type[type.length-1] == 'png' || type[type.length-1] == 'tga' || type[type.length-1] == 'pic'|| type[type.length - 1] == 'jpeg') {
       
      } else {
        this.$message.error('上传封面只能是图片格式!');
        return false
      }
      if(file.length>=10 ) {
        this.$message.error('最多上传10个文件');
        return false
      }
  
    },
    beforeImageUpload(file) {

      console.log(file.name.split("."))
      const type = file.name.split(".")
      console.log(type[type.length-1])
  
      if( type[type.length-1] == 'wmv' || type[type.length-1] == 'mp4') {
       
      } else {
        this.$message.error('上传视频只能是视频格式!');
        return false
      }
      if(file.length>=10 ) {
        this.$message.error('最多上传10个文件');
        return false
      }

    },
    upload() {
      this.dialogVisible = true
    },
    //分页
    handleCurrentChange(page) {
      // console.log(`当前页: ${val}`);
      this.pageNum=page
      this.currentPage = page
      this.renderProgram()
    },
    //弹框提交
    submit() {
  
      if (this.from.materials.length == 0 ) {
        this.$message({
          message:'请添加节目',
          type:'error'
        })
        return false
      }
      this.dialogVisible = false
    },

    //渲染专辑信息
    renderList() {


      this.$http.post('hongka-content/album/query', { id: this.id ,sliceParams:{
        pageSize:this.pageSize,
        pageNum:this.pageNum
      }}).then(res => {


        if (res.data.status == 200) {

          for (var i = 0; i < res.data.data.data.length; i++) {
            // this.total = res.data.data[0].total
          this.total = res.data.data.total

            //类型的判断
            if (res.data.data.data[i].albumType == 2) {
              // res.data.data.data
              res.data.data.data[i].albumType = '视频'
            } else if (res.data.data[i].albumType == 1) {
              res.data.data[i].albumType = '音频'
            } else {
              res.data.data[i].albumType = '图文'
            };
            //身份类型的判断
            if (res.data.data.data[i].albumPersonType == 1) {

              res.data.data.data[i].albumPersonType = '中少红卡'
            }
            else if (res.data.data[i].albumType == 2) {
              res.data.data.data[i].albumPersonType = '学校'
            }
            else if (res.data.data[i].albumType == 3) {
              res.data.data.data[i].albumPersonType = '教师'
            }
            else if (res.data.data[i].albumType == 4) {
              res.data.data.data[i].albumPersonType = '家长'
            }
            else if (res.data.data[i].albumType == 5) {
              res.data.data.data[i].albumPersonType = '名师'
            }
            else if (res.data.data[i].albumType == 6) {
              res.data.data.data[i].albumPersonType = '公司'
            }
            else if (res.data.data[i].albumType == 7) {
              res.data.data.data[i].albumPersonType = '大V'
            }
            else {
              res.data.data.data[i].albumPersonType = '主播'
            };
            //状态
            if (res.data.data.data[i].albumIsup == 1) {

              res.data.data.data[i].albumIsup = '上架'
            } else {
              res.data.data.data[i].albumIsup = '下架'
            };
            res.data.data.data[i].materialDuration= Math.floor(res.data.data.data[i].materialDuration/60)+":"+(res.data.data.data[i].materialDuration%60/100).toFixed(2).slice(-2)
            // res.data.data[i].albumCtime=formatDate(new Date(res.data.data[i].albumCtime), 'yyyy-MM-dd hh:mm');
            // res.data.data[i].albumUtime=formatDate(new Date(res.data.data[i].albumUtime), 'yyyy-MM-dd hh:mm');




          };

          this.ruleForm = res.data.data.data[0];



        }

      })
    },
    //渲染专辑已上传的节目信息
    renderProgram(){
      
      this.$http.post('hongka-content/material', {albumId:this.id,isCheck:-1,sliceParams:{pageSize:this.pageSize,pageNum:this.pageNum}}).then(res => {
  
    console.log(res.data.data)
        if(res.data.status==200) {
          // this.total = res.data.total
          this.total = res.data.data.total

          for(var i=0;i<res.data.data.data.length;i++){
            if(res.data.data.data[i].materialType==1) {
              res.data.data.data[i].materialType="音频"
            }else {
              res.data.data.data[i].materialType="视频"
            }
            if(res.data.data.data[i].materialStatus==1){
              res.data.data.data[i].materialStatus="审核成功"

            }else {
              res.data.data.data[i].materialStatus="审核中"
            }
            if(res.data.data.data[i].materialIscheck==0) {
              res.data.data.data[i].materialIscheck="审核中"
              
            }else {
              res.data.data.data[i].materialIscheck="审核成功"
            }
            res.data.data.data[i].materialDuration= Math.floor(res.data.data.data[i].materialDuration/60)+":"+(res.data.data.data[i].materialDuration%60/100).toFixed(2).slice(-2)
            res.data.data.data[i].materialCtime=formatDate(new Date(res.data.data.data[i].materialCtime), 'yyyy-MM-dd hh:mm');
            res.data.data.data[i].Bool=false

          }

          this.programData=res.data.data.data
          console.log(this.programData)
        }
   
        
      })
    },
    //删除节目
    del(val){
      // alert(val)
      this.uploadData.splice(val,1)
    },
    tj(){
      // alert(2)
      this.uploadData.coverId=this.coverId
    
 
      for (var i= 0;i<this.uploadData.length;i++) { 
      this.uploadData[i].name=this.uploadData[i].fileName
      console.log(this.uploadData[i].name)
      }
  
      this.from.materials = this.uploadData
     

      for (var i = 0 ; i< this.from.materials.length;i++) {
        
        if(this.from.materials[i].author==undefined){
          // alert(2)
          this.$message({
            message: '作者不能为空',
            type: 'error'
          })     
          this.dialogVisibleSubmit = false
          return false
        }   
        if(this.from.materials[i].author.trim().length==0){
          // alert(2)
          this.$message({
            message: '作者不能为空',
            type: 'error'
          })     
          this.dialogVisibleSubmit = false
          return false
        }  
        if(this.from.materials[i].name.length>20||this.from.materials[i].name.length<1) {
          this.$message({
            message: "节目名称为1-20 字符",
            type: 'error'
          })
          this.from.materials[i].name= ''
          this.dialogVisibleSubmit = false
          return false
        }    
        if (this.from.materials[i].author.length>10||this.from.materials[i].author.length<2 ) {
          this.$message({
            message: "作者名为2-10 字符",
            type: 'error'
          })
          this.from.materials[i].author= ''
          this.dialogVisibleSubmit = false
          return false 
        }
       

        if (this.from.materials[i]. coverId == '') {
          this.$message({
            message: "请上传专辑封面",
            type: 'error'
          })
      
          this.dialogVisibleSubmit = false
          return false 
        }
        // console.log(this.from.materials )
  
      }     
     
      if (this.from.materials.length == 0 ) {
        // alert(12)
        this.$message({
          message:'请添加节目',
          type:'error'
        }) 
    //  return false
    }else {
      this.dialogVisibleSubmit=true
    }
  
    

    },
    //提交节目信息的表单
    submitData(){    
      // alert(2)
      this.$http.post('hongka-content/material/add',this.from).then(res => {
        if(res.data.status == 200) {
          this.$message({
            message:'创建成功',
            type:'success'
          })
          this.renderProgram()
          this.uploadData=[]
          this.fileList=[]
          this.dialogVisibleSubmit=false
        }else {
          this.$message({
            message:'添加节目失败',
            type:'error'
          })
        }
      })
    },
    fnn() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频") {
       
          return true
        }else {
          return false
        }
      }

    },
    //播放
    play(val){
      this.dialogVisiblePlay=true
      this.Url= val
    },

    tabH() {
      return 'height: 30px'
    },

    tabP() {
      return 'padding: 10px 0px'
    },

    a() {
      this.$router.push('/albumManagement')
    },

    cancel() {
      this.$router.push('/albumManagement')
    },

    closeDialog() {
      document.getElementById("media").pause();
      this.audio_outerVisible = false
     },
     cancel2() {
       this.$refs.upload.clearFiles()
       this.dialogVisible = false
     }

   





  },
  mounted() {
    this.renderList();
    this.renderProgram()
  }
}