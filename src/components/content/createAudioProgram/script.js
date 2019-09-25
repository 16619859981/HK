import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      tableData: {

      },
      action:api.getUpload("/file/ihongka_files/upload"),
      player: 0,
      player2: 0,
      upBool: false,
      downBool: false,
      UrlAudio: '',
      dialogVisiblePlayAudio: false,
      programData: [],
      uploadData: [],
      commitAble: false,
      commitNum: 0,

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

      realUrl: '',

      from: {
        "materials": [{
            "albumId": this.$route.query.id,
            "fileId": 1222, //文件路径
            "type": 1,
            "coverId": '', //封面
            "name": "",
            // "author": "",
            "sort": 2,
            "publisher": 111,
            orgId:window.sessionStorage.getItem('orgid') //发布者
          }

        ],
        orgId:window.sessionStorage.getItem('orgid'),

      },
      Bool:false,//判断是否有上传任务



    };


  },
  created() {

  },
  methods: {
   

    setindex(idx) {
      this.index = idx;


    },
    //上传文件的方法
    handleAvatarSuccess(res, file, fileList) {


      this.coverId = res.data.fileId

      this.uploadData[this.index].coverId = this.coverId;
      this.uploadData[this.index].imageUrl = api.getUpload(res.data.realUrl);

    },
    fn(res, file, fileList) {
      // console.log(res.data.duration)
      if (res.data.duration > 1800) {
        this.$message.error('上传音频大小不能超过 30分钟!');
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
      res.data['type'] = 1
      res.data['fileId'] = res.data.fileId
      res.data['coverId'] = this.coverId
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





    },


    beforeImageUpload(file) {
      this.Bool = false
      // console.log(file)
      var video = file
      var url = URL.createObjectURL(video);
      // console.log(url);
      document.getElementById("vid").src = url;
      setTimeout(() => {
        let time = document.getElementById("vid").duration
        console.log(time)
        if (time>1800) {
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


      if (type[type.length - 1] == 'mp3' ||type[type.length - 1] == 'm4a') {

      } else {
        this.$message.error('上传文件只能是音频格式!');
        return false
      }
      if (file.length >= 10) {
        this.$message.error('最多上传10个文件');
        return false
      }

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
            if (res.data.data.data[i].materialStatus == 1) {
              res.data.data.data[i].materialStatus = "审核成功"

            } else {
              res.data.data.data[i].materialStatus = "审核中"
            }
            if (res.data.data.data[i].materialIscheck == 0) {
              res.data.data.data[i].materialIscheck = "审核中"

            } else if (res.data.data.data[i].materialIscheck == 1) {
              res.data.data.data[i].materialIscheck = "审核成功"

            }
            res.data.data.data[i].materialSort = i + 1
            res.data.data.data[i].fileUrl1 = api.getUpload(res.data.data.data[i].fileUrl1)
            res.data.data.data[i].materialDuration = Math.floor(res.data.data.data[i].materialDuration / 60) + "分" + (res.data.data.data[i].materialDuration % 60 / 100).toFixed(2).slice(-2) + "秒"
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
      this.uploadData.coverId = this.coverId


      for (var i = 0; i < this.uploadData.length; i++) {
        this.uploadData[i].name = this.uploadData[i].fileName

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
    getRowClass() {
      return 'background:#F5F7FA; color: #909399; font-weight: 400; height: 50px;'
    },

    a() {
      this.$router.push('/albumManagement')
    },

    cancel() {
      this.$router.push('/albumManagement')
    },

    //播放,暂停所有播放节目。

    play(val) {
      this.UrlAudio = ""
      this.UrlAudio = val
      this.upBool = true
      if (this.downBool == true) {
        console.log('下边的播放过，downbool==true')
        if (this.player2 == 0) {
          var add = document.getElementById('add')
          var audioper = add.getElementsByClassName('audio')[0]
          audioper.pause()
        } else {
          var add = document.getElementById('add')
          var audioper = add.getElementsByClassName('audio')[this.player2]
          audioper.pause()
        }

      }

      this.dialogVisiblePlayAudio = true
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
        var audioper = add.getElementsByClassName('audio')[0]
        audioper.pause()
      } else if (this.player2 != 0) {
        var audioper = add.getElementsByClassName('audio')[this.player2]
        audioper.pause()
      }
      this.player2 = e
    },

    //弹窗关闭
    closeDialog() {
      document.getElementById("media").pause();
      this.dialogVisiblePlayAudio = false
    },
    cancel2() {
      this.$refs.upload.clearFiles()
      this.dialogVisible = false
    },









  },
  mounted() {
    this.renderList();
    this.renderProgram()
  }
}
