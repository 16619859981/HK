import {
  formatDate
} from '../../../date'
import api from '../../api/index'
export default {
  data() {
    return {
      action: api.getUpload("/file/ihongka_files/upload"),
      albumType: this.$route.query.type,
      orgId: window.sessionStorage.getItem('orgid'),
      nowBelongId: "",
      tableData: {
        status: 0
      },
      UrlAudio: '',
      dialogVisiblePlayAudio: false,
      //添加音频节目
      dialogVisibleAdd: false,
      dialogVisibleSubmit: false,
      uploadData: [],
      commitNum: 0,
      commitAble: false,
      downBool: false,
      player: 0,
      player2: 0,
      fileList: [],
      dialogVisibleImgVideo:false,
      from: {
        "materials": [{
          "albumId": this.$route.query.id,
          "coverId": '',
          "fileId": 1222, //文件路径
          "type": 1,
          "coverId": '', //封面
          "name": "",
          // "author": "",
          "sort": 2,
          "publisher": 111 ,//发布者，
          orgId: window.sessionStorage.getItem('orgid')
        }],
        orgId:window.sessionStorage.getItem('orgid'),
      },
      //添加视频节目
      dialogVisibleVideo: false,
      dialogVisibleVideoImg: false,
      uploadDataVideo: [],
      nameVideo: "",
      coverId: "",
      programData: [],
      arr: [],
      dynamicTags: [],
      rules: {
        albumName: [{
            required: true,
            message: '请输入专辑名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        albumLabel: [{
            required: true,
            message: '请输入专辑标签',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 4,
            message: '长度在 2 到 4个字符',
            trigger: 'blur'
          }
        ],
        albumIntro: [{
            required: true,
            message: '请填写专辑简介',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 600,
            message: '长度在 3 到 500 个字符',
            trigger: 'blur'
          }
        ],
        img: [{
          required: true,
          message: '请上传封面',
          trigger: 'blur'
        }],
        materialName: [{
            required: true,
            message: '请输入节目名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        materialSort: [{
            required: false,
            message: '请填顺序',
            trigger: 'blur'
          },

        ]
      },
      dialogVisible: false,
      id: this.$route.query.id,
      imageUrl: '',
      materialId: '',
      materialStatus: '',
      inpText: '',
      //修改得弹框
      dialogVisibleEdit: false,
      materialName: '',
      materialAuthor: '',
      materialSort: '',
      selectedStatus: "",
      //编辑视频封面
      VideoimageUrl: '',
      fileId:"",
      fileUrl1: "",
      dialogVisiblePlay: false,
      Url: '',
      dialogVisibleEditAlbum: false,
      dialogVisibleEditAlbum2: false,
      index: "",
      inputVisible: false,
      inputValue: '',
      player: '',
      pageSize: 0,
      total: 0,
      pageNum: 1,
      currentpage: '',
      bool: false,
      labels: '',
      //删除
      dialogVisibleDel: false,
      materialRecycleStatus: '',
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
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      optionVideo: {
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
    };
  },
  created() {
    if (this.dynamicTags.length < 5) {
      this.bool = true
    }
  },
  methods: {
    //图片上传
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

              this.tableData.albumFileId = res.data.data.fileId;

              this.imageUrl = api.getUpload(res.data.data.realUrl);
              console.log(this.imageUrl)

            },
            res => {
              console.log(res);
            }
          );
        return false;

      });
    },
    // handleAvatarSuccess(res, file) {
    //   this.tableData.albumFileId = res.data.fileId
    //   this.imageUrl = api.getUpload(res.data.realUrl);
    // },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      const type = file.name.split(".")
      if (
        type[type.length - 1] == 'bmp' ||
        type[type.length - 1] == 'dib' ||
        type[type.length - 1] == 'jpg' ||
        type[type.length - 1] == 'tif' ||
        type[type.length - 1] == 'png' ||
        type[type.length - 1] == 'tga' ||
        type[type.length - 1] == 'pic' ||
        type[type.length - 1] == 'jpeg' ||
        type[type.length - 1] == 'BMP' ||
        type[type.length - 1] == 'DIP' ||
        type[type.length - 1] == 'JPG' ||
        type[type.length - 1] == 'TIF' ||
        type[type.length - 1] == 'PNG' ||
        type[type.length - 1] == 'TGA' ||
        type[type.length - 1] == 'PIC' ||
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
    handleCurrentChange(page) {
      this.pageNum = page
      this.currentpage = page
      this.renderProgram()
    },
    renderList() {
      this.$http.post(api.getPlatform('/album/query/id'), {
        albumId: this.id

      }).then(res => {

        if (res.data.status == 200) {

          if (res.data.data.albumLabel != "") {
            res.data.data.albumLabel = res.data.data.albumLabel.split(',')
          } else if (res.data.data.albumLabel == "") {
            res.data.data.albumLabel = []
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
          console.log(res.data.data.albumLabel)
          this.dynamicTags = res.data.data.albumLabel
          if (this.dynamicTags.length == 5 || this.dynamicTags.length > 5) {
            this.bool = false
          }
          this.imageUrl = api.getUpload(res.data.data.fileUrl)
          res.data.data.albumCtime = formatDate(new Date(res.data.data.albumCtime), 'yyyy-MM-dd hh:mm');
          this.tableData = res.data.data




        }
      })
    },

    //渲染专辑的节目信息
    renderProgram() {
      this.$http.post(api.getPlatform('/material'), {
        albumId: this.id,
        isCheck: -1,
        sliceParams: {
          pageNum: this.pageNum,
          pageSize: 10
        },
        materialRecycleStatus: 1
      }).then(res => {
        if (res.data.status == 200) {
          this.total = res.data.data.total
          for (var i = 0; i < res.data.data.data.length; i++) {
            if (res.data.data.data[i].fileUrl != null) {
              res.data.data.data[i].fileUrl = res.data.data.data[i].fileUrl.split('.')[0] + '_thumbs.' + res.data.data.data[i].fileUrl.split('.')[1]
            }
            if (res.data.data.data[i].materialType == 1) {
              res.data.data.data[i].materialType = "音频"
            } else {
              res.data.data.data[i].materialType = "视频"
            }
            if (res.data.data.data[i].materialIscheck == 0) {
              res.data.data.data[i].materialIscheck = "审核中"
            } else if (res.data.data.data[i].materialIscheck == 1) {
              res.data.data.data[i].materialIscheck = "审核成功"
            }
            if (res.data.data.data[i].materialStatus == 1) {
              res.data.data.data[i].materialStatus = '上架'
            } else if (res.data.data.data[i].materialStatus == 2) {
              res.data.data.data[i].materialStatus = '下架'
            }
            res.data.data.data[i].fileUrl = api.getUpload(res.data.data.data[i].fileUrl)
            res.data.data.data[i].fileUrl1 = api.getUpload(res.data.data.data[i].fileUrl1)

            res.data.data.data[i].materialSort = i + 1
            res.data.data.data[i].materialDuration = Math.floor(res.data.data.data[i].materialDuration / 60) + "分" + (res.data.data.data[i].materialDuration % 60 / 100).toFixed(2).slice(-2) + "秒"
            res.data.data.data[i].materialCtime = formatDate(new Date(res.data.data.data[i].materialCtime), 'yyyy-MM-dd hh:mm');
            // res.data.data.data[i].Bool = false
          }
          this.programData = res.data.data.data
        }
      })
    },
    //标签的渲染
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if (this.dynamicTags.length < 5) {
        this.bool = true
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue.length == 0) {
        return false
      }
      var hash = {}
      for (var i = 0; i < inputValue.length; i++) {
        if (inputValue.charCodeAt(i) > 255) {} else {
          this.$message.error('标签为纯中文')
          return false
        }
      }
      for (var i = 0; i < this.dynamicTags.length; i++) {
        if (this.dynamicTags[i] == inputValue) {
          this.$message.error('标签不能重复')
          this.inputValue = ''
          return false
        }
      }
      if (inputValue.length > 1 && inputValue.length < 5) {
        this.dynamicTags.push(inputValue);
        if (this.dynamicTags.length == 5) {
          this.$message.error('只能输入5个标签')
          // alert(2)
          // this.dynamicTags.length = 5
          this.bool = false
          // this.inputVisible = false;
          // this.inputValue = '';
          return false
        }
      } else {
        this.$message.error('标签的长度只能为2-4位，请重新输入')
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    keyupEnt() {
      let inputValue = this.inputValue;
      if (inputValue.length < 0) {
        return false
      }
      for (var i = 0; i < inputValue.length; i++) {
        if (inputValue.charCodeAt(i) > 255) {
          // this.dynamicTags.push(inputValue);
        } else {
          this.$message.error('标签为纯中文')
          return false
        }
      }
      for (var i = 0; i < this.dynamicTags.length; i++) {
        if (this.dynamicTags[i] == inputValue) {
          this.$message.error('标签不能重复')
          this.inputValue = '';
          return false
        }
      }
      if (inputValue.length > 1 && inputValue.length < 5) {
        this.dynamicTags.push(inputValue);
      } else {
        this.$message.error('标签的长度只能为2-4位，请重新输入')
        // this.inputVisible = false;
        this.inputValue = '';
      }

      if (this.dynamicTags.length > 4) {
        this.$message.error('只能输入5个标签')
        this.dynamicTags.length = 5
        this.bool = false
        this.inputVisible = false;
        this.inputValue = '';
        return false
      }
      // this.inputVisible = false;
      this.inputValue = '';
    },
    //编辑的弹框
    editProgram(row) {
      this.materialId = row.materialId
      this.materialName = row.materialName,
        this.nowBelongId = row.nowBelongId
      this.materialAuthor = row.materialAuthor,
        this.materialAuthor = row.materialAuthor,
        this.VideoimageUrl = row.fileUrl,
      this.materialSort = row.materialSort,
      this.fileId = row.materialFileId,
    
      this.fileId = row.materialFileId
      this.dialogVisibleEdit = true

    },
    //专辑编辑提交
    submit() {

      if (this.tableData.albumName.length >= 20) {
        this.$message({
          message: "专辑名称超过20个字符，请重新输入",
          type: "error"
        })
        this.dialogVisibleEditAlbum = false
        return false
      }

      if (this.tableData.albumName.trim().length == 0) {
        this.$message({
          message: "修改专辑名称不能为空",
          type: "error"
        })
        this.dialogVisibleEditAlbum = false
        return false
      }
      if (this.tableData.albumIntro.trim().length == 0) {
        this.$message({
          message: "修改专辑简介不能为空",
          type: "error"
        })
        this.dialogVisibleEditAlbum = false
        return false
      }
      console.log(this.dynamicTags)
      this.labels = this.dynamicTags.join(',')
      this.tableData.albumLabel = this.labels
      this.$http.post(api.getPlatform('/album/update'), this.tableData).then(res => {
        if (res.data.status == 200) {
          this.$message({
            message: "修改专辑信息成功",
            type: "success"
          })
          this.dialogVisibleEditAlbum = false
        } else if (res.data.status == 100003) {
          this.$message({
            message: "专辑名称已存在，请重新输入",
            type: "error"
          })
          this.tableData.albumName = '',
            this.dialogVisibleEditAlbum = false
        }
      })
    },
    //编辑节目提交  
    editSubmit() {
      if (this.materialName.length > 20 || this.materialName < 1 || this.materialName.trim().length == 0) {
        this.$message({
          message: "节目名称为1-20 字符",
          type: 'error'
        })
        this.materialName = ''
        return false
      }
      // if (this.fileId=="")  {

      // }


      this.$http.post(api.getPlatform('/material_update'), {
        albumId: this.id,
        materialId: this.materialId,
        materialName: this.materialName,
        fileId:this.fileId,
        materialAuthor: this.materialAuthor,
        materialSort: this.materialSort
      }).then(res => {
        if (res.data.status == 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else if (res.data.status == 402) {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: "修改失败",
            type: 'error'
          })
        }
        this.dialogVisibleEdit = false
        this.renderProgram()
      })
    },
    //上下架的弹框
    fn(row, status) {
      this.materialId = row
      if (status == '上架') {
        this.materialStatus = 2
      } else if (status == '下架') {
        this.materialStatus = 1
      }
      // this.materialStatus = status

      this.dialogVisible = true
    },
    //上下架
    del() {
      this.$http.post(api.getPlatform('/material_del'), {
        materialId: this.materialId,
        materialStatus: this.materialStatus
      }).then(res => {

        if (res.data.status == 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: "修改失败",
            type: 'error'
          })
        }
        this.renderProgram()
      })
      this.dialogVisible = false
    },

    fn2(row, status) {
      this.materialId = row
      this.materialRecycleStatus = 2
      this.dialogVisibleDel = true

    },
    //删除
    del2() {
      this.$http.post(api.getPlatform('/material_del'), {
        materialId: this.materialId,
        materialRecycleStatus: this.materialRecycleStatus
      }).then(res => {

        if (res.data.status == 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: "删除失败",
            type: 'error'
          })
        }
        this.renderProgram()
      })
      this.dialogVisibleDel = false
    },
    // changeIndex(materialId) {
    //   this.materialId = materialId
    // },
    fnn() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频" && this.programData[i].materialTranscodingStatus == 1) {
          return true
        } else {
          return false
        }
      }
    },
    fnn2() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频") {
          return false
        } else {
          return true
        }
      }
    },

    btn(e) {
      var el = e.target
      if (this.player == el) {
        return
      }
      if (this.player != '') {
        this.player.pause()
      }
      this.player = e.target
    },
    tabH() {
      return 'height: 65px'
    },
    tabP() {
      return 'padding: 0; width:100px; color: #606266;'

    },

    a() {
      this.$router.push('/albumManagement')
    },
    getRowClass() {
      return 'background:#F5F7FA; color: #909399; font-weight: 400; height: 50px'
    },
    play(val) {
      this.Url = ""
      this.Url = val
      this.dialogVisiblePlay = true
      this.getdiv()
    },

    playAudio(val) {
      this.UrlAudio = ''
      this.UrlAudio = val
      this.dialogVisiblePlayAudio = true
    },
    getdiv() {
      console.log(document.getElementsByClassName('div'))
      // console.log(document.getElementsByClassName('el-dialog__body'))


      console.log(document.getElementsByClassName('div')[0].innerHTML)
      var str = "<video  id='example_video_1' class='video-js vjs-default-skin' autoplay style='width:100%;height:100%;' controls preload='none' data-setup='{}'><source src=" + this.Url + " type='video/mp4'> </video>"
      document.getElementsByClassName('div')[0].innerHTML = str
    },
    closeDialog() {
      document.getElementById("example_video_1").pause();
      // document.getElementsByClassName('div')[0].innerHTML = ""
      // this.audio_outerVisible = false
    },
    cancel() {
      this.$router.push('/albumManagement')
    },
    //添加节目
    upload() {
      if (this.albumType == '音频') {
        this.dialogVisibleAdd = true
      } else if (this.albumType == '视频') {
        this.dialogVisibleVideo = true
      }

    },
    //删除节目
    del(val) {
      // alert(val)
      if (this.albumType == '音频') {
        this.uploadData.splice(val, 1)
      } else if (this.albumType == '视频') {
        this.uploadDataVideo.splice(val, 1)
      }


    },

    //上传音频
    beforeAudioUpload(file) {
      this.Bool = false
      var video = file
      var url = URL.createObjectURL(video);
      // console.log(url);
      document.getElementById("vid").src = url;
      setTimeout(() => {
        let time = document.getElementById("vid").duration
        console.log(time)
        if (time > 1800) {
          this.$message.error('上传音频大小不能超过 30分钟!');
          this.fileList = []
          return false
        }
      }, 500)
      const isLt50M = file.size / 1024 / 1024 < 50;
      console.log(isLt50M)
      if (!isLt50M) {
        this.$message.error('上传音频大小不能超过 50MB!');
        return false
      }
      const type = file.name.split(".")
      if (type[type.length - 1] == 'mp3' || type[type.length - 1] == 'm4a') {} else {
        this.$message.error('上传文件只能是音频格式!');
        return false
      }
      if (file.length >= 10) {
        this.$message.error('最多上传10个文件');
        return false
      }
    },
    successAudio(res, file, fileList) {
      // console.log(res.data.duration)
      if (res.data.duration > 1800) {
        this.$message.error('上传音频大小不能超过 30分钟!');
        this.fileList = []
        return false
      }
      res.data['albumId'] = this.id
      res.data['coverId'] = ""
      res.data['imageUrl'] = ''
      res.data['name'] = ''
      // res.data['author'] = window.sessionStorage.getItem('orgName')
      res.data['sort'] = ''
      res.data['publisher'] = '1'
      res.data['type'] = 1
      res.data['fileId'] = res.data.fileId
      res.data["orgId"]= window.sessionStorage.getItem('orgid')
      if (String(res.data.fileName).length > 20) {
        res.data.fileName = res.data.fileName.substring(0, 20)
      }
      if(res.data.fileName.indexOf(".mp3")!=-1) {
        res.data.fileName = res.data.fileName.split(".mp3")[0]
      }else if(res.data.fileName.indexOf(".m4a")!=-1){
        res.data.fileName = res.data.fileName.split(".m4a")[0]
      }
  
      res.data['realUrl'] = api.getUpload(res.data.realUrl);
      this.uploadData.push(res.data)
      this.Bool = true
      console.log(this.uploadData)
    },

    //上传音频节目时候的去除重复播放
    btn2(e) {
      if (this.albumType == '音频') {
        this.downBool = true
        var add = document.getElementById('add')

        if (e == this.player2) {
          this.player2 = e
          return
        } else if (e != this.player2 && this.player2 == 0) {
          var audioper = add.getElementsByClassName('audio')[0]
          audioper.pause()
        } else if (this.player2 != 0) {
          var audioper = add.getElementsByClassName('audio')[this.player2]
          audioper.pause()
        }
        this.player2 = e
      } else if (this.albumType == '视频') {
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
      }


    },
    tj() {

      // alert(2)
      this.commitNum = 0


      if (this.albumType == '音频') {
        for (var i = 0; i < this.uploadData.length; i++) {
          this.uploadData[i].name = this.uploadData[i].fileName
        }
        this.from.materials = this.uploadData
      } else if (this.albumType == '视频') {
        for (var i = 0; i < this.uploadDataVideo.length; i++) {
          this.uploadDataVideo[i].name = this.uploadDataVideo[i].fileName
        }
        this.from.materials = this.uploadDataVideo
      }


      if (this.from.materials.length < 1) {
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
      if (this.Bool == false) {
        this.$message.error('上传任务正在进行,请耐心等待');
        return false
      }
      this.dialogVisibleSubmit = true
    },
    //提交节目信息的表单
    submitData() {
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
          this.uploadDataVideo = []

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
    //添加视频节目
    uploadVideo() {
      this.dialogVisibleVideo = true
    },
    //视频上传前
    beforeVideoUpload(file) {
      this.Bool = false
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
      if (type[type.length - 1] == 'mp4') {} else {
        this.$message.error('上传视频只能是视频格式!');
        return false
      }
      if (file.length >= 10) {
        this.$message.error('最多上传10个文件');
        return false
      }

    },
    //视频上传成功
    successVideo(res, file, fileList) {
      if (res.data.duration > 2400) {
        this.$message.error('上传视频大小不能超过 40分钟!');
        this.fileList = []
        return false
      }
      res.data['albumId'] = this.id
      res.data['coverId'] = ''
      res.data['imageUrl'] = ''
      res.data['name'] = ''
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
      this.uploadDataVideo.push(res.data)
      console.log(this.uploadDataVideo)

      this.Bool = true
    },
    //封面上传前
    beforeAvatarUploadVideo(file) {
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
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var image = new Image();
          image.onload = function () {
            var width = this.width;
            var height = this.height;
            if (width != Number(height) * (400 / 250)) {
              _this.$message.error('图片宽高必须是8:5')
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
    changeUploadVideo(file, fileList) {
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
        _this.optionVideo.img = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
      _this.dialogVisibleVideoImg = true;
      this.nameVideo = file.name;
    },
    setindex(idx) {
      this.index = idx;
    },
    // 点击裁剪,上传
    finishVideo() {
      this.$refs.cropperVideo.getCropBlob(data => {
        let fd = new FormData();
        fd.append("file", data, this.nameVideo);
        console.log(fd);
        this.$http.post(api.getUpload("/file/ihongka_files/upload"), fd)
          .then(
            res => {
              console.log(res);
              this.dialogVisibleVideoImg = false;

              this.coverId = res.data.data.fileId;

              this.uploadDataVideo[this.index].coverId = this.coverId;
              this.uploadDataVideo[this.index].imageUrl = api.getUpload(res.data.data.realUrl);

            },
            res => {
              console.log(res);
            }
          );
        return false;

      });
    },
    //编辑视频图片
      // 显示裁剪框
      changeUploadEdit(file, fileList) {
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
        _this.dialogVisibleImgVideo = true;
        this.name = file.name;
      },
      // 点击裁剪,上传
      finishImgVideo() {
        this.$refs.cropper.getCropBlob(data => {
          let fd = new FormData();
          fd.append("file", data, this.name);
          console.log(fd);
          this.$http.post(api.getUpload("/file/ihongka_files/upload"), fd)
            .then(
              res => {
                console.log(res);
                this.dialogVisibleImgVideo = false;
  
                this.fileId = res.data.data.fileId;
  
                this.VideoimageUrl = api.getUpload(res.data.data.realUrl);
  
              },
              res => {
                console.log(res);
              }
            );
          return false;
  
        });
      },
   
  },
  mounted() {
    this.renderList();
    this.renderProgram();
  }
}
