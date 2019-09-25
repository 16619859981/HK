import axios from 'axios'
import api from '../../api/index'
import {
  formatDate
} from '../../../date'

export default {

  data() {
    return {
      pickerOptions0: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      listType:this.$route.query.type,
      textTile:"",
      maxLength:0,
     
      ruleForm: {
        name: '',
        location:"",
        modelType: this.$route.query.type,
        upTime:"",
        downTime:"",
      },
      AddData:[ {
        name:"",
      
      }],
      AddDataLength:1,
      activeName: '1',
      dialogVisibleMsg:false,
      dialogVisibleFeed:false,
      uploadImgIndex :0,
      //弹窗信息的index
      Msgindex:0,
      search:{
        id:"",
        modelType:"",
      },
      MsgData:{
        name:""

      },
      bool:0,
      //上传图片的index
   
      rules: {
        name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 6 个字符',
            trigger: 'blur'
          }



        ],
        location: [{
            required: true,
            message: '请输入专辑feed位置',
            trigger: 'blur',
           
          },
        
        ],

      },
      imageUrl: '',
      dialogVisible: false,
      dialogVisibleDel:false,
      categoryId: '',
      label: '',
      dialogVisibleImg: false,
      // 裁剪组件的基础配置option
      option: {
     img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [5, 2], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组
      name: "",
      feedData:[],
    };


  },
  created() {
    if (this.listType=="3") {
      this.textTile = "添加图片"
      this.ruleForm.name=""
      this.maxLength=5  
      this.activeName = "1"
    }else if (this.listType=="1") {
      this.textTile = "添加音频" 
      this.ruleForm.name="每日必听"  
      this.maxLength=3   
      this.activeName = "2"
    }else {
      this.textTile = "添加红广号"
      this.maxLength=5
      this.activeName = "4"
    }

  },

  methods: {    
    //图片上传前判断格式
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const type = file.name.split(".")
      if (
        type[type.length - 1] == 'jpg' || 
        type[type.length - 1] == 'jpeg'||
        type[type.length - 1] == 'JPG' || 
        type[type.length - 1] == 'JPEG'
      ) {
      } else {
        this.$message.error('上传封面只能是图片格式!');
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
        return false
      }
      var _this = this;
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var image = new Image();
          image.onload = function () {
            var width = this.width;
            var height = this.height;
            if (width != height) {
              _this.$message.error('图片宽高必须相等')
              reject();
            }
            resolve();
          };
          image.src = event.target.result;
        }
        reader.readAsDataURL(file);
      });

    },
    // 显示裁剪框
    changeUpload(file, fileList) {
      // console.log(index)
      const isLt300K = file.size / 1024 / 1024 < 0.3;
      const type = file.name.split(".")

      if (
        type[type.length - 1] == 'jpg' || 
        type[type.length - 1] == 'jpeg'||
        type[type.length - 1] == 'JPG' || 
        type[type.length - 1] == 'JPEG'|| 
        type[type.length - 1] == 'png'|| 
        type[type.length - 1] == 'PNG'
      ) {
      } else {
        this.$message.error('上传封面只能是图片格式!');
        return false
      }
      if (!isLt300K) {
        this.$message.error('上传图片大小不能超过 300k!');
        return false
      }   
      var _this = this;
      var event = event || window.event;
      console.log(event)
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) { 
        _this.option.img = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
      _this.dialogVisibleImg = true;
      this.name = file.name;
    },
   // 点击裁剪,上传
    finish() {
      this.$refs.cropper.getCropBlob(data => {
        let fd = new FormData();
        fd.append("file", data, this.name);
        console.log(fd);
        axios.post(api.getUpload("/file/ihongka_files/upload"),fd)
          .then(
            res => {      
              this.dialogVisibleImg = false;        
              this.AddData[this.uploadImgIndex].headFileUrl = api.getUpload(res.data.data.realUrl)
              // this.AddData[this.uploadImgIndex].fileId = res.data.data.fileId;
            },
            res => {
              console.log(res);
            }
          );
        return false;
      });
    },
    //获取上传图片的index
    getuploadImgIndex(index) {
      this.uploadImgIndex=index
    },  
    //取消按钮
    cancel() {
      this.$router.push({
        path: '/APPoperatingLists',
        query: { 
          type: this.listType,
        }
      })
      // this.$router.push('/APPoperatingLists')
    },
    //添加
    add () {
        if (this.listType==3) {
          if(this.AddData.length>4) {
            this.$message.error('最多添加5个图片运营位')
            return false
          }else {
            this.AddData.push({name:"",upTime:"",downTime:""})
            this.AddDataLength = this.AddData.length
          }
        }else if (this.listType==1) {
          if(this.AddData.length>2) {
            this.$message.error('最多添加3个音频节目')
            return false
          }else {
            this.AddData.push({name:"",id:"",duration:""})
            this.AddDataLength = this.AddData.length
          }
        }else if (this.listType==2) {
          if(this.AddData.length>4) {
            this.$message.error('最多添加5个音频节目')
            return false
          }else {
            this.AddData.push({name:"",upTime:"",downTime:""})
            this.AddDataLength = this.AddData.length
          }
        }
    },
    //删除节目名字
    delName(ind) {
      this.AddData[ind].name = ""
    },
    //删除模块
    divDel(index) {
      if (this.AddData.length == 1) {
        this.$message.error('最少要有一个有效元素！');
        return false
      }
      this.AddData.splice(index, 1)
      this.AddDataLength = this.AddData.length
    },
    divTop(index) {
      if (index == 0) {
        this.$message.error('已经是第一位了！');
        return false
      }
      this.AddData[index] = this.AddData.splice(index - 1, 1, this.AddData[index])[0]
    },
    divBottom(index) {
      console.log(index)
      if (index == this.AddData.length - 1) {
        this.$message.error('已经是最后一位了！');
        return false
      }
      this.AddData[index] = this.AddData.splice(index + 1, 1, this.AddData[index])[0]
    },
    //

    //弹窗信息
    checkMsg(index) {
      console.log(index)
      this.Msgindex = index
      this.search.id = ""
      this.bool = 0
      this.dialogVisibleMsg = true

    },
    //查询信息
    searchData(type) {
      if (this.search.id.trim().length<1) {
        this.$message.error('请输入正确的id')
        return false
      }
      this.search.modelType = type
      if(this.listType==1&&this.search.modelType==2) {
        this.search.modelType=6
      }
      this.$http.post(api.getPlatform('/home/recommend/business/info'),this.search).then(res => {
        console.log(res)
        if (res.data.status == 200) {
          console.log(res)
          this.MsgData = res.data.data
     
            if (this.MsgData.materialCtime) {
              this.MsgData.materialCtime=formatDate(new Date(this.MsgData.materialCtime), 'yyyy-MM-dd hh:mm');
            }
            if(this.MsgData.activityStime) {
              this.MsgData.activityStime= formatDate(new Date(Number(this.MsgData.activityStime)), 'yyyy-MM-dd hh:mm');
              this.MsgData.activityEtime= formatDate(new Date(this.MsgData.activityEtime), 'yyyy-MM-dd hh:mm');

            }
            if (this.MsgData.albumCtime) {
              this.MsgData.albumCtime= formatDate(new Date(this.MsgData.albumCtime), 'yyyy-MM-dd hh:mm');

            }
            if (this.MsgData.fileUrl1) {
              this.MsgData.fileUrl1 = api.getUpload(this.MsgData.fileUrl1)
            }
            if (this.MsgData.fileUrl) {
              this.MsgData.fileUrl= api.getUpload(this.MsgData.fileUrl)
            }
            if (this.MsgData.logo) {
              this.MsgData.logo= api.getUpload(this.MsgData.logo)
            }
            if (this.MsgData.activityCover) {
              this.MsgData.activityCover = api.getUpload(this.MsgData.activityCover)
            }
            if(this.listType==1) {
              this.AddData[this.Msgindex].id = this.search.id
              this.AddData[this.Msgindex].url= this.MsgData.fileUrl1
              // this.AddData[this.Msgindex].fileUrl= this.MsgData.fileUrl

            }else if (this.listType==2) {
              this.AddData[this.Msgindex].id = this.search.id
              this.AddData[this.Msgindex].orgType = res.data.data.orgType
            }else if (this.listType==3) {
              this.AddData[this.Msgindex].id = this.search.id
              console.log(this.search.modelType)
              this.AddData[this.Msgindex].modelType = this.search.modelType
              if (this.search.modelType==4) {
                this.AddData[this.Msgindex].orgType = res.data.data.orgType

              }
              if (this.search.modelType==2) {
                this.AddData[this.Msgindex].materialType = res.data.data.materialType

              }
            }
          // console.log(this.MsgData)
          this.bool = 1
        }else  if (res.data.status == 100091 ){
          this.bool = 2
        }
      })
    },
    confirmMsg() {
      // console.log(this.activeName)
      // console.log
      if (this.listType==3&& this.bool == 1 &&  this.search.modelType == 1) {
        this.AddData[this.Msgindex].name =  this.MsgData.albumName 
        this.AddData[this.Msgindex].modelType =  this.activeName

      }else if (this.listType==3&& this.bool == 1 &&  this.search.modelType == 2) {
        this.AddData[this.Msgindex].name =  this.MsgData.materialName 
        this.AddData[this.Msgindex].id=this.MsgData.materialId
        this.AddData[this.Msgindex].duration=this.MsgData.materialDuration
        // this.AddData[this.Msgindex].modelType =  this.activeName

      }else if (this.listType==3&& this.bool == 1 &&  this.search.modelType == 3) {
        this.AddData[this.Msgindex].name =  this.MsgData.activityName 
        this.AddData[this.Msgindex].modelType =  this.activeName

 
      }else if (this.listType==3&& this.bool == 1 &&  this.search.modelType == 4) {
        this.AddData[this.Msgindex].name =  this.MsgData.name 
        // this.AddData[this.Msgindex].name =  this.MsgData.logo 
        this.AddData[this.Msgindex].modelType =  this.activeName

 
      }else if (this.listType==3 &&  this.activeName == 5) {
        console.log(this.search.id)
        this.AddData[this.Msgindex].name =  this.search.id
        this.AddData[this.Msgindex].modelType = this.activeName

 
      }
   
      if(this.listType==1&& this.bool == 1) {
        this.AddData[this.Msgindex].name =  this.MsgData.materialName 
        this.AddData[this.Msgindex].id=this.MsgData.materialId
        this.AddData[this.Msgindex].duration=this.MsgData.materialDuration
      }
      if(this.listType==2&& this.bool == 1) {
        this.AddData[this.Msgindex].name =  this.MsgData.name
        this.AddData[this.Msgindex].headFileUrl =  this.MsgData.logo

      }
     
      this.dialogVisibleMsg = false
    },
    handleClick(tab, event) {
      // console.log('/')
     this.search.id = ""
    },
   
    submitData() {
      // console.log(this.AddData)
      if (this.ruleForm.name.trim().length>6||this.ruleForm.name.trim().length<1) {
        this.$message.error('请输入1-6位名称')
        return false
      }
      if (!this.ruleForm.location) {
        this.$message.error('请输入首页feed流位置')
        return false
      }
      if(this.listType==3) {
      console.log(this.AddData)
        for(var i = 0 ; i < this.AddData.length;i++) {

          if(this.AddData[i].headFileUrl=="" || !this.AddData[i].headFileUrl) {
            this.$message.error('请上传图片运营位的封面')
            return false
          }
          if(this.AddData[i].upTime==""||this.AddData[i].downTime=="" ||!this.AddData[i].upTime||!this.AddData[i].downTime||this.AddData[i].downTime<this.AddData[i].upTime) {
            this.$message.error('请上传图片运营位合理的上下架时间')
            return false
          }
          // if (i!=this.AddData.length-1) {
       
          //   this.ruleForm.upTime= this.AddData[i].upTime<this.AddData[i+1].upTime?this.AddData[i].upTime:this.AddData[i+1].upTime
          // }else if (i==this.AddData.length-1){
          //   if (this.ruleForm.upTime!="") {
          //     this.ruleForm.upTime=this.ruleForm.upTime<this.AddData[length-1].upTime?this.ruleForm.upTime:this.AddData[length-1].upTime
          //   }else {
          //     this.ruleForm.upTime=this.AddData[i].upTime
          //   }
          // }
          // Math.min.apply(Math, this.AddData.map(function(o) {return o.upTime}))
          this.AddData[i].downTime = this.timestampToTime(this.AddData[i].downTime)
          //转成日期得时间戳
          this.AddData[i].downTime = new Date(this.AddData[i].downTime).getTime();  
          this.AddData[i].downTime= this.AddData[i].downTime+86400000-1  
        //   if (i!=this.AddData.length-1) {
        //     this.ruleForm.downTime= this.AddData[i].downTime>this.AddData[i+1].downTime?this.AddData[i].downTime:this.AddData[i+1].downTime
        //  }else if (i==this.AddData.length-1){
        //   if (this.ruleForm.downTime!="") {
        //     this.ruleForm.downTime=this.ruleForm.downTime>this.AddData[length-1].downTime?this.ruleForm.downTime:this.AddData[length-1].downTime
        //   }else {
        //     this.ruleForm.downTime=this.AddData[i].downTime
        //   }
        //   }
        Math.max.apply(Math, this.AddData.map(function(o) {return o.downTime}))
          
        }
      }
      if(this.listType==1) {        
          if(this.ruleForm.upTime==""||this.ruleForm.downTime=="" || this.ruleForm.downTime<this.ruleForm.upTime) {
            this.$message.error('请上传音频运营位合理的上下架时间')
            return false
          }
          this.ruleForm.downTime= this.ruleForm.downTime+86400000-1  
       

          for(var i = 0 ; i < this.AddData.length;i++) {      
           
            if (this.AddData[i].name.trim().length<1) {
              this.$message.error('请选择音频节目')
              return false
            }
          }  
          var timestamp2 = this.timestampToTime(this.ruleForm.downTime)
          // 转成日期得时间戳
        this.ruleForm.downTime = new Date(timestamp2).getTime();  
          this.ruleForm.downTime = this.ruleForm.downTime+86400000-1         
      }
      if(this.listType==2) {  
        for(var i = 0 ; i < this.AddData.length;i++) {      
        if(this.AddData[i].upTime==""||this.AddData[i].downTime=="" ||!this.AddData[i].downTime||!this.AddData[i].upTime||this.AddData[i].downTime<this.AddData[i].upTime) {
          this.$message.error('请上传红广号运营位合理的上下架时间')
          return false
        }
        if (this.AddData[i].name.trim().length<1) {
          this.$message.error('请选择红广号')
          return false
        }
        // if (i!=this.AddData.length-1) {
       
        //   this.ruleForm.upTime= this.AddData[i].upTime<this.AddData[i+1].upTime?this.AddData[i].upTime:this.AddData[i+1].upTime
        // }else if (i==this.AddData.length-1){
        //   if (this.ruleForm.upTime!="") {
        //     this.ruleForm.upTime=this.ruleForm.upTime<this.AddData[length-1].upTime?this.ruleForm.upTime:this.AddData[length-1].upTime
        //   }else {
        //     this.ruleForm.upTime=this.AddData[i].upTime
        //   }
        // }
        this.AddData[i].downTime = this.timestampToTime(this.AddData[i].downTime)
  

        // 转成日期得时间戳
        this.AddData[i].downTime = new Date(this.AddData[i].downTime).getTime();  
        this.AddData[i].downTime= this.AddData[i].downTime+86400000-1  
      //   if (i!=this.AddData.length-1) {
      //     this.ruleForm.downTime= this.AddData[i].downTime>this.AddData[i+1].downTime?this.AddData[i].downTime:this.AddData[i+1].downTime
      //  }else if (i==this.AddData.length-1){
      //   if (this.ruleForm.downTime!="") {
      //     this.ruleForm.downTime=this.ruleForm.downTime>this.AddData[length-1].downTime?this.ruleForm.downTime:this.AddData[length-1].downTime
      //   }else {
      //     this.ruleForm.downTime=this.AddData[i].downTime
      //   }
      //   }
      
      }
      
      
    }
      // console.log(this.ruleForm)
      // console.log(this.AddData)

      this.dialogVisible = true
    },
    submitData2() {
 
      
      this.ruleForm.dataArr = this.AddData
  
      this.$http.post(api.getPlatform('/home/recommend/add'),this.ruleForm).then(res => {
        // console.log(res)
        if(res.data.status==200) {
          // this.$message.error="创建成功"
          this.$message.success("创建成功")
          this.$router.push({
            path: '/APPoperatingLists',
            query: {
              type: this.listType
            }
          })
        
        }else {
          // this.$message.error="创建失败"
          this.$message.error("创建失败")
        }
       
      })
    },
    checkNumber(number) {
      var re = /^[0-9]+.?[0-9]*$/
      if (!re.test(number)) {
        this.$message.error('请输入数字')
        this.ruleForm.location = ""
      }else if(number>100||number<1){
        this.$message.error('请输入1-100')
        this.ruleForm.location = ""
      }
      this.$http.post(api.getPlatform('/home/recommend/check/location'),{location:number}).then(res => {
        console.log(res)
        if (res.data.status==200) {
          // this.ruleForm.location+=1
          // this.$message.

        }else if(res.data.status==100003){
          this.ruleForm.location=""
          this.$message.error(res.data.msg)
        }
      })
    },
    getFeed1(){
   
      if (this.ruleForm.location=="") {
        this.$message.error('请填写必要信息')
        return false
      }
      this.dialogVisibleFeed = true
      this.ruleForm.dataArr = this.AddData
     
      console.log(this.ruleForm)
      this.feedData[0] = this.ruleForm
      // this.getFeed()
    },
    getFeed() {
    
      this.$http.post(api.getPlatform('/home/recommend/feed')).then(res => {

        if (res.data.status == 200) {
      
          
          this.feedData = res.data.data
          console.log(this.ruleForm.location)
          if (this.ruleForm.location==''||this.ruleForm.location==undefined) {
            // return 
          }else {
            this.feedData.push(this.ruleForm)
          }
   
          console.log( this.feedData)
    
            for(var i = 0 ;i<this.feedData.length;i++){
              this.feedData.sort(this.getSort("location"));
              //对数组的中的咯action为1 的处理
              if (this.feedData[i].location-1==0) {
                var frontNumber = this.feedData[i].location+1
                var nextNumber = this.feedData[i+1].location
                this.feedData[i]["frontText"] = ""
                this.feedData[i]["nextText"] =""
              }else {
                // 没有location为1的时候
                if (i-1<0) {
                  //对第1位的处理
                  var frontNumber = 0
                  var frontNumber2 = this.feedData[i].location-1
                  var nextNumber = this.feedData[i].location+1
                  var nextNumber2 = this.feedData[i+1].location-1
                  this.feedData[i]["frontText"] = frontNumber+`-`+frontNumber2+`fedd流`
                  this.feedData[i]["nextText"] =""
                }else 
                 if (this.feedData[i].location!=100){
                   //对location不是1或者100的处理
                  var frontNumber = this.feedData[i-1].location+1
                  var frontNumber2 = this.feedData[i].location-1
                  var nextNumber = this.feedData[i].location+1
                  //如果是数组的最后一位拿不到i+1
                  if(i==this.feedData.length-1) {
                
                    var nextNumber2 = 100
                    this.feedData[i]["frontText"] = frontNumber+`-`+frontNumber2+`fedd流`
                    this.feedData[i]["nextText"] = nextNumber+`-100feed流`
                  }else {
                    var nextNumber2 = this.feedData[i+1].location-1
                    this.feedData[i]["frontText"] = frontNumber+`-`+frontNumber2+`fedd流`
                    this.feedData[i]["nextText"] = ""
                  }            
                }else if (this.feedData[i].location==100) {
                //loacion位100的处理
                  var frontNumber = this.feedData[i-1].location+1
                  var nextNumber = this.feedData[i].location-1


                  this.feedData[i]["frontText"] = frontNumber+`-`+nextNumber+`fedd流`
                  this.feedData[i]["nextText"] =""
               
                }

              }
              
            }
            console.log(this.feedData)
        }
      })
    },
    //排序函数
    getSort(name){
      return function(o, p){
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
          a = o[name];
          b = p[name];
          if (a === b) {
            return 0;
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1;
          }
          return typeof a < typeof b ? -1 : 1;
        }
        else {
          throw ("error");
        }
      }
     },
     //时间转换
     timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D;
  }


   




  },
  mounted() {
    // this.getFeed()
    console.log(new Date() )

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }

}
