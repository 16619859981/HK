import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      action:api.getUpload("/file/ihongka_files/upload"),
      player: 0,
      player2: 0,
      upBool: false,
      downBool: false,
      tableData: {

      },

      programData: [],
      uploadData: [],


      duration: '',
      dialogVisible: false,
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      id: this.$route.query.id,
      imageUrl: '',
      coverId: '',
      fileList: [],

      index: 0,
      Url: '',
      dialogVisiblePlay: false,
      total: 5,
      pageSize: 10,
      pageNum: 1,
      currentPage: 0,
      dialogVisibleSubmit: false,


      from: {
        "materials": [{
            "albumId": this.$route.query.id,
            "fileId": 1222, //文件路径
            "type": 2,
            "coverId": '', //封面
            "name": "",
            "author": "",
            "sort": 2,
            orgId:window.sessionStorage.getItem('orgid'),
            "publisher": 111 //发布者
          }

        ],
        orgId:window.sessionStorage.getItem('orgid'),

      },
      //图片裁剪
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
        fixedNumber: [8, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], //页面显示的数组

      name: "",
      commitAble: false,
      commitNum: 0,

      Bool:false,//判断是否有上传任务


    };
  


  },
  created() {

  },
  methods: {


    setindex(idx) {
      this.index = idx;


    },


    //封面上传前
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const type = file.name.split(".")
      if (
        type[type.length - 1] == 'jpg' ||
        type[type.length - 1] == 'jpeg' ||
        type[type.length - 1] == 'JPG' ||
        type[type.length - 1] == 'JPEG'
      ) {} else {
        this.$message.error('上传封面只能是图片格式!');
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
        return false
      }
      // var _this = this;
      // return new Promise(function (resolve, reject) {
      //   var reader = new FileReader();
      //   reader.onload = function (event) {
      //     var image = new Image();
      //     image.onload = function () {
      //       var width = this.width;
      //       var height = this.height;
      //       if (width != Number(height) * (400 / 250)) {
      //         _this.$message.error('图片宽高必须是8:5')
      //         reject();
      //       }
      //       resolve();
      //     };
      //     image.src = event.target.result;
      //   }
      //   reader.readAsDataURL(file);
      // });

    },
    // 显示裁剪框
    changeUpload(file, fileList) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const type = file.name.split(".")
      if (
        type[type.length - 1] == 'jpg' ||
        type[type.length - 1] == 'jpeg' ||
        type[type.length - 1] == 'JPG' ||
        type[type.length - 1] == 'JPEG'
      ) {} else {
        this.$message.error('上传封面只能是图片格式!');
        return false
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
        return false
      }
      var _this = this;
      var event = event || window.event;
      console.log(event)
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function (e) {
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
        this.$http.post(api.getUpload("/file/ihongka_files/upload"), fd)
          .then(
            res => {
              console.log(res);
              this.dialogVisibleImg = false;

              this.coverId = res.data.data.fileId;

              this.uploadData[this.index].coverId = this.coverId;
              this.uploadData[this.index].imageUrl = api.getUpload(res.data.data.realUrl);

            },
            res => {
              console.log(res);
            }
          );
        return false;

      });
    },
    // //上传文件的方法
    // handleAvatarSuccess(res, file, fileList) {

    //   this.coverId = res.data.fileId

    //   this.uploadData[this.index].coverId = this.coverId;
    //   this.uploadData[this.index].imageUrl = api.getUpload(res.data.realUrl);
    //   // this.uploadData[this.index].realUrl = api.getUpload(res.data.realUrl);


    // },
    //视频上传前
    beforeVideoUpload(file) {
      this.Bool=false
      // console.log(file)
      // console.log(file.duration)
      var video = file
      var url = URL.createObjectURL(video);
      // console.log(url);
      document.getElementById("vid").src = url;
      setTimeout(() => {
        let time = document.getElementById("vid").duration
        console.log(time)
        if (time > 2400) {
          this.$message.error('上传视频大小不能超过 40分钟!');
          this.fileList = []
          return false
        }
      }, 500)
      const isLt1G = file.size / 1024 / 1024 < 1024;
      if (!isLt1G) {
        this.$message.error('上传视频大小不能超过 1G!');


        return false

      }
      const type = file.name.split(".")


      if (type[type.length - 1] == 'mp4') {

      } else {
        this.$message.error('上传视频只能是视频格式!');
        return false
      }
      if (file.length >= 10) {
        this.$message.error('最多上传10个文件');
        return false
      }

    },
    //视频上传成功
    fn(res, file, fileList) {
      if (res.data.duration > 2400) {
        this.$message.error('上传视频大小不能超过 40分钟!');
        this.fileList = []
        return false
      }


      res.data['albumId'] = this.id
      res.data['coverId'] = ''
      res.data['imageUrl'] = ''
      res.data['name'] = ''
      // res.data['author'] = window.sessionStorage.getItem('orgName')
      res.data['sort'] = ''
      res.data['publisher'] = '1'
      res.data['type'] = 2
      res.data['fileId'] = res.data.fileId
      res.data['coverId'] = this.coverId
      res.data['realUrl'] = api.getUpload(res.data.realUrl);

      res.data["orgId"]= window.sessionStorage.getItem('orgid')
      if (res.data.fileName.length > 20) {

        res.data.fileName = res.data.fileName.substring(0, 20)

      }
      res.data.fileName = res.data.fileName.split(".mp4")[0]





      this.uploadData.push(res.data)
      console.log(this.uploadData)

      this.Bool=true



    },
    upload() {
      this.dialogVisible = true
    },
    //分页
    handleCurrentChange(page) {

      this.pageNum = page
      this.currentPage = page
      this.renderProgram()
    },
    //弹框提交
    submit() {

      if (this.from.materials.length == 0) {
        this.$message({
          message: '请添加节目',
          type: 'error'
        })
        return false
      }
      this.dialogVisible = false
    },

    //渲染专辑信息
    renderList() {

      this.$http.post(api.getPlatform('/album/query/id'), {
        albumId: this.id
      }).then(res => {


        if (res.data.status == 200) {

          if (res.data.data.albumLabel != "") {
            res.data.data.albumLabel = res.data.data.albumLabel.split(',')
          }
          //组织类型
          if (res.data.data.albumAuthorType == 1) {
            res.data.data.albumAuthorType = "平台/中少红卡"
          } else if (res.data.data.albumAuthorType == 2) {
            res.data.data.albumAuthorType = "学校"
          } else
          if (res.data.data.albumAuthorType == 3) {
            res.data.data.albumAuthorType = "班级  "
          } else if (res.data.data.albumAuthorType == 7) {
            res.data.data.albumAuthorType = "红广号/大咖"
          } else
          if (res.data.data.albumAuthorType == 10) {
            res.data.data.albumAuthorType = "基地/少年宫"
          }
          // console.log(res.data.data.albumLabel)
          res.data.data.albumCtime = formatDate(new Date(res.data.data.albumCtime), 'yyyy-MM-dd hh:mm');
          this.tableData = res.data.data
          this.tableData.fileUrl = api.getUpload(this.tableData.fileUrl)



        }

      })
    },
    //渲染专辑已上传的节目信息
    renderProgram() {

      this.$http.post(api.getPlatform('/material'), {
        albumId: this.id,
        isCheck: -1,
        sliceParams: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        },
        materialRecycleStatus: 1
      }).then(res => {


        if (res.data.status == 200) {
          // this.total = res.data.total
          this.total = res.data.data.total

          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].materialType == 1) {
              res.data.data.data[i].materialType = "音频"
            } else {
              res.data.data.data[i].materialType = "视频"
            }
            // if(res.data.data.data[i].materialStatus==1){
            //   res.data.data.data[i].materialStatus="审核成功"

            // }else {
            //   res.data.data.data[i].materialStatus="审核中"
            // }
            if (res.data.data.data[i].materialIscheck == 0) {
              res.data.data.data[i].materialIscheck = "审核中"

            } else if (res.data.data.data[i].materialIscheck == 1) {
              res.data.data.data[i].materialIscheck = "审核成功"

            }
            res.data.data.data[i].fileUrl1 = api.getUpload(res.data.data.data[i].fileUrl1)
            res.data.data.data[i].fileUrl = api.getUpload(res.data.data.data[i].fileUrl)
            res.data.data.data[i].materialSort = i + 1
            res.data.data.data[i].materialDuration = Math.floor(res.data.data.data[i].materialDuration / 60) + ":" + (res.data.data.data[i].materialDuration % 60 / 100).toFixed(2).slice(-2)
            res.data.data.data[i].materialCtime = formatDate(new Date(res.data.data.data[i].materialCtime), 'yyyy-MM-dd hh:mm');
            res.data.data.data[i].Bool = false


          }

          this.programData = res.data.data.data

        }


      })
    },
    //删除节目
    del(val) {
      // alert(val)
      this.uploadData.splice(val, 1)
    },
    tj() {
     
      // alert(2)
      this.commitNum = 0
      for (var i = 0; i < this.uploadData.length; i++) {
        this.uploadData[i].name = this.uploadData[i].fileName

        if (this.uploadData[i].coverId == '') {
          this.$message({
            message: "请上传视频封面",
            type: 'error'
          })
          this.dialogVisibleSubmit = false
          return false
        }


      }

      this.from.materials = this.uploadData
      if(this.from.materials.length<1) {
        this.$message({
          message: "请添加节目！",
          type: 'error'
        })
        return false
      }

      for (var i = 0; i < this.from.materials.length; i++) {


        if (this.from.materials[i].name.length > 20 || this.from.materials[i].name.length < 1) {
          this.$message({
            message: "节目名称为1-20 字符",
            type: 'error'
          })
          this.from.materials[i].name = ''
          this.dialogVisibleSubmit = false
          return false
        }


      }
      if ( this.Bool==false) {
        this.$message.error('上传任务正在进行,请耐心等待');
        return false
      }
      this.dialogVisibleSubmit = true







    },
    //提交节目信息的表单
    submitData() {
      // alert(2)
      this.commitNum++
      if (this.commitNum > 1) {
        return false
      }
      this.commitAble = true;

      this.$http.post(api.getPlatform('/material/add'), this.from).then(res => {
        if (res.data.status == 200) {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.renderProgram()
          this.uploadData = []
          this.fileList = []
          this.dialogVisibleSubmit = false
          this.commitAble = false;
        } else {
          this.$message({
            message: '添加节目失败',
            type: 'error'
          })
          this.dialogVisibleSubmit = false
          this.commitAble = false;
        }
      })
    },
    fnn() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频") {

          return true
        } else {
          return false
        }
      }

    },
    //播放
    play(val) {
      this.upBool = true
      if (this.downBool == true) {
        console.log('下边的播放过，downbool==true')
        if (this.player2 == 0) {
          var add = document.getElementById('add')
          var audioper = add.getElementsByClassName('video')[0]
          audioper.pause()
        } else {
          var add = document.getElementById('add')
          var audioper = add.getElementsByClassName('video')[this.player2]
          audioper.pause()
        }

      }
      this.dialogVisiblePlay = true
      this.Url = val
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
    a() {
      this.$router.push('/albumManagement')
    },

    cancel() {
      this.$router.push('/albumManagement')
    },

    //弹窗关闭
    closeDialog() {
      document.getElementById("media").pause();
      this.dialogVisiblePlay = false
    },
    cancel2() {
      this.$refs.upload.clearFiles()
      this.dialogVisible = false
    },
    //播放,暂停所有播放节目。

    play2(val) {
      this.UrlAudio = ""
      this.UrlAudio = val



      // console.log(this.UrlAudio)



    },
    //上传音频节目时候的去除重复播放
    btn2(e) {
      this.downBool = true
      var add = document.getElementById('add')

      if (e == this.player2) {
        this.player2 = e
        return
      } else if (e != this.player2 && this.player2 == 0) {
        var audioper = add.getElementsByClassName('video')[0]
        audioper.pause()
      } else if (this.player2 != 0) {
        var audioper = add.getElementsByClassName('video')[this.player2]
        audioper.pause()
      }
      this.player2 = e
    },








  },
  mounted() {
    this.renderList();
    this.renderProgram()
  }
}
