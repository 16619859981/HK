
import api from '../../api/index'
import {
  formatDate
} from '../../../date'

export default {
 
  data() {


    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      activityAreaNum:0,
      activityArea:[],
      loading: false,
      programData: [],
      imageUrl: '',
      options: [],
      rules: {
        medalName: [{
            required: true,
            message: '请输入任务名称',
            trigger: 'blur'
          },
          {

            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }

        ],
        sub: [{
            required: true,
            message: '请选择任务所属专题',
            trigger: 'blur'
          },

        ],
        time: [{
            required: true,
            message: '请选择任务时间',
            trigger: 'blur'
          },

        ],


        medalIntro: [{
          required: true,
          message: '请填写任务简介',
          trigger: 'blur'
        }],
        img: [{
          required: true,
          message: '请上传封面',
          trigger: 'blur'
        }],
        radio: [{
          required: true,
          message: '请选择发布时间',
          trigger: 'blur'
        }]

      },
      per: []

        ,
      ue: null,
      dialogVisible: false,
      dialogVisibleUp: false,
      dialogVisibleDel:false,
      URL: '',
      fileUrl: '',


      dialogVisibleUpImg: false,


      realUrl: '',
      // ],
      pickerOptions0: {
        disabledDate: (time) => {


          return time.getTime() < Date.now() - 8.64e7;


        }
      },



      imageUrl: '',
      dialogVisiblePer: false,




      form: {
        medalType: '',
        name: '',
        intro: '',
        fileId: '',
        range: '',
        time: '',
        downFileId: []

      },
      Form:{

      },

      type: '',
      type2:'',


      time: '2018-09-03 18:17',
      timeType: '',

      info: [

      ],

      lim: 9,
      urlArr: [],
      range:[],

      medalPublishtime2:'',


    };


  },
  methods: {

    handleList () {
      this.$http.post(api.getContent('/medal/'),{ id: this.$route.query.id }).then( res => {
        // console.log(res)
       var  time = new Date().getTime()

        if (res.data.status == 200) {

          if (res.data.data.data[0].medalType == 3) {

            if (res.data.data.data[0].downFileUrl != null) {
             res.data.data.data[0].downFileUrl = res.data.data.data[0].downFileUrl.split(',')
            }else {
             res.data.data.data[0].downFileUrl =[]
            }     
            if (res.data.data.data[0].downFileId != null) {
              res.data.data.data[0].downFileId = res.data.data.data[0].downFileId.split(',')
             }else {
              res.data.data.data[0].downFileId =[]
             }      
         
         }
         //如果是定时发布，并且定时发布的时间小于当前时间，那么就不能编辑，把type类型改为3，前端页面只显示不编辑
         if ( res.data.data.data[0].medalPublishtype==2) {
          console.log(time)
          console.log(res.data.data.data[0].medalPublishtime )
          if (res.data.data.data[0].medalPublishtime < time ) {
            res.data.data.data[0].medalPublishtype=3     
           }
  
         }
         //type为1和3 的时候是需要显示年月日的 ，type类型是2的时候就用时间戳，picker用时间戳显示
         //把时间戳存起来用于提交的时候用
         if (res.data.data.data[0].medalPublishtype==1) {
          this.medalPublishtime2 = res.data.data.data[0].medalPublishtime
          res.data.data.data[0].medalPublishtime = formatDate(new Date(Number(res.data.data.data[0].medalPublishtime)), 'yyyy-MM-dd hh:mm');

         }else if(res.data.data.data[0].medalPublishtype==3){
          this.medalPublishtime2 = res.data.data.data[0].medalPublishtime
          res.data.data.data[0].medalPublishtime = formatDate(new Date(Number(res.data.data.data[0].medalPublishtime)), 'yyyy-MM-dd hh:mm');

         } else {
          this.medalPublishtime2 = res.data.data.data[0].medalPublishtime 
          res.data.data.data[0].medalPublishtime =  res.data.data.data[0].medalPublishtime 
         }

          
          
  

          this.form = res.data.data.data[0]
      

          this.urlArr = this.form.downFileUrl
          this.fileUrl = this.form.medalFileUrl
          if (this.form.medalPublishtype==1) {
            this.type="1"
          }else  if (this.form.medalPublishtype==3){
            this.type="3"
            console.log(this.form.medalPublishtime)
          } else {
            this.type="2"
            this.type2 = "2"
            console.log(this.form.medalPublishtime)
          }
          console.log(this.form.downFileId)
          console.log(this.form.downFileUrl)


        }
      } )
    },  

    //图片上传
    handleAvatarSuccess(res, file, fileList) {
      // this.uploadData.imageUrl = URL.createObjectURL(file.raw);
      // this.form.fileUrl = res.data.realUrl;
      this.fileUrl = res.data.realUrl
      this.form.fileId = res.data.fileId;
      // console.log(fileList)
      // this.uploadData = fileList
      this.uploadData.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      // console.log(file)
      // console.log(file.name.split("."))

      const isLt1M = file.size / 1024 / 1024 < 1;



      const type = file.name.split(".")
      // console.log(type[type.length - 1])
      if (type[type.length - 1] == 'bmp' || type[type.length - 1] == 'dib' || type[type.length - 1] == 'jpg' || type[type.length - 1] == 'tif' || type[type.length - 1] == 'png' || type[type.length - 1] == 'tga' || type[type.length - 1] == 'pic' || type[type.length - 1] == 'jpeg' || type[type.length - 1] == 'BMP' || type[type.length - 1] == 'DIP' || type[type.length - 1] == 'JPG' || type[type.length - 1] == 'TIF' || type[type.length - 1] == 'PNG' || type[type.length - 1] == 'TGA' || type[type.length - 1] == 'PIC' || type[type.length - 1] == 'JPEG') {

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
            // if (height != 360) { 
            //     _this.$message.error('图片宽高必须是360*360')

            //     reject(); 
            // } 
            resolve();
          };
          image.src = event.target.result;
        }
        reader.readAsDataURL(file);
      });

    },

    changeType() {

      this.form.intro = ''

    },



    handleCurrentChange(page) {
      // console.log(page)
    },
    upload() {
      this.dialogVisibleUp = true
    },

    //获取时间   时间戳
    getTime(val) {


    },
    submit() {

      console.log(this.form)


      if (this.form.medalName.length > 20) {

        this.$message.error('任务名称在1-20个字符内')
        return false
      }


      if (String(this.form.medalName).trim().length == 0) {

        this.$message.error('任务名称在1-20个字符内')
        return false
      }
    

      if (this.form.medalType == 3 && this.form.medalIntro == "") {
        this.$message.error('请填写简介')
        return false
      }
      if (this.form.fileId == "") {
        this.$message.error('请上传任务封面')
        return false
      }
   
      
    
     
      if (this.range != null || this.range !="") {
        this.form.range =  this.range.join(",")
      }
      console.log(this.form.medalRange)
      console.log(   this.form.range)
      if (this.form.range!="") {
        this.form.medalRange = this.form.medalRange + ','+this.form.range
      }else {
        this.form.medalRange = this.form.medalRange
      }
    

      this.form.medalRange =  this.form.medalRange.split(',')
     
      this.dialogVisible = true
    },
    handleForm() {
      if (this.type == 2&&this.type2==1) {
        this.form.medalPublishtime = new Date().getTime()
        this.form.publishType = 1
        this.Form.time = this.form.medalPublishtime
      }
      if (this.type == 2&&this.type2==2) {
        this.Form.time = this.form.medalPublishtime
        this.form.publishType = 2
      }
      if (this.type == 3) {
        this.Form.time = this.medalPublishtime2
        this.form.publishType = 2
    
      }
      if (this.type == 1) {
        this.Form.time = this.medalPublishtime2
        this.form.publishType = 1
      }

    console.log(this.medalPublishtime2)
      console.log(this.form)
      this.Form.id = this.form.medalId
      this.Form.name = this.form.medalName
      this.Form.intro = this.form.medalIntro
      this.Form.downFileId  = this.form.downFileId
      this.Form.fileId  = this.form.medalFileId
      this.Form.range  = this.form.medalRange
      this.Form.taskId   = this.form.medalOrgId

      
      this.Form.publishType= this.form.publishType 

      console.log(this.Form)
      // return false
      this.loading = true
      this.$http.post(api.getContent('/medal/update'), this.Form).then(res => {
        this.loading = false
        if (res.data.status == 200) {
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.$router.push('/taskList')
        }
      })

    },




    //取消按钮
    cancel() {
      this.$router.push('/createActive')
    },
    fn(res, file, fileList) {



      // console.log(res)

      this.form.intro = res.data.realUrl
      this.realUrl = res.data.realUrl

    },

    fn1(res) {
      // console.log(res)
      if (this.form.downFileId.length < 9) {
        this.form.downFileId.push(res.data.fileId)

      }
      if (this.urlArr.length < 9) {
        this.urlArr.push(res.data.realUrl)
      }


      // console.log(this.form.downFileId)
      // console.log(this.urlArr)
    },
    beforeImageUpload(file) {
      // console.log(file)
      const type = file.name.split(".")
      // console.log(type[type.length-1])
      if (type[type.length - 1] != 'mp4') {
        this.$message.error('只能上传视频文件!');
        return false
      }




    },

    beforeImageUpload1(file) {
      // console.log(file)
      const type = file.name.split(".")
      // console.log(type[type.length-1])
      if (type[type.length - 1] != 'png' && type[type.length - 1] != 'jpg' && type[type.length - 1] != 'PNG' && type[type.length - 1] != 'JPG') {
        this.$message.error('图片不符合规则，只支持上传jpg或png!');
        return false
      }

      if (this.form.downFileId.length >= 9) {
        this.$message.error('最多上传9张图片!');
        return false
      }
      if (this.urlArr.length >= 9) {
        this.$message.error('最多上传9张图片!');
        return false
      }

    },



    shanchu() {
      this.realUrl = ''
      this.form.intro = ''
    },

    //渲染发布对象
    handelper() {
      this.$http.post(api.getContent('/activity/activity/pubObject')).then(res => {
        // console.log(res)
        if (res.data.status == 200) {
          this.per = res.data.data
        }
      })

    },
    val1(per) {
      // console.log(per)
    },


    uploadImg() {
      this.dialogVisibleUpImg = true
    },


    delImg() {
      this.form.downFileId.pop()
   
      this.urlArr.pop()

    },
    more () {
      this.activityAreaNum = 1
      if (this.form.medalRange.length > 21) {
        this.activityArea= this.form.medalRange.split(',')
        console.log(this.activityArea)
      }else {
        // this.activityArea = this.form.medalRange + ',' + this.form.medalRange
        // this.activityArea = this.form.medalRange.split(',')
        // this.activityArea = this.activityArea.pop()
        this.activityArea[0] = this.form.medalRange
      }
      console.log(this.activityArea )
      for (var i = 0; i < this.per.length; i++) {
      

        for (var j = 0; j < this.activityArea.length; j++) {
          // console.log(this.per[i].id)
          // console.log(this.form.medalRange)
          
           if (this.per[i].id == this.activityArea[j]) {
            // console.log(this.per[i].id)
            this.per.splice(i,1)
            i--
           }
        }
      }
      // console.log(this.per)
    },

    noMore () {
      this.activityAreaNum = 0
      this.activityArea = []      
    }

  },
  mounted() {

    this.handleList()
    this.handelper()

  },

}
