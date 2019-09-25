import VueUeditorWrap from 'vue-ueditor-wrap';
import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  components: {
    VueUeditorWrap
  },
  data() {
    return {
      from: {
        commentId: this.$route.query.id,
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
      },
      total: '',
      dialogVisibleDel: false,
      commentsFrom: {
        score: 0,
        commentContentId: '',
        scoreContent: '',
      },
      moreCommentsBool: true,
      delCommentsId: '',
      dialogVisibleComments: false,
      value: [1, 2, 3, 4, 5],
      value5: '',
      audioSrc: '',
      num: 1,
      tableData: [],
      time1: '',
      time2: '',
      time3: '',
      time4: '',
      val1: '',
      val2: '',
      id: '',
      dialogVisiblePlay: false,
      from1: {

      }
    };
  },
  methods: {
    goActiveManagement() {
      this.$router.push('/activeManagement')
    },
    goActiveDataVote() {
      this.$router.push({
        path: '/lookVote',
        query: {
          id: this.$route.query.id,
        }
      });
    },

    playAudio(event) {
      var el = event.target
      var audio = el.parentNode.lastChild
      var audioAll = document.getElementsByClassName('audio')
      // for (var i = 0; i < audioAll.length; i++) {
      //   audioAll[i].pause()
      // }

      if (this.audioSrc == audio.src || this.audioSrc == '') {
        if (audio.paused) {
          audio.play()
          audio.parentNode.children[0].style.display = 'none'
          audio.parentNode.children[1].style.display = 'block'
          console.log(audio.parentNode.children[0])
          console.log(audio.parentNode.children[1])
          this.audioSrc = audio.src
        } else {
          audio.pause()
          audio.parentNode.children[0].style.display = 'block'
          audio.parentNode.children[1].style.display = 'none'
          console.log(audio.parentNode.children[0])
          console.log(audio.parentNode.children[1])
          this.audioSrc = audio.src

        }
      }

      if (this.audioSrc != audio.src) {
        for (var i = 0; i < audioAll.length; i++) {
          audioAll[i].pause()
          audioAll[i].parentNode.children[0].style.display = 'block'
          audioAll[i].parentNode.children[1].style.display = 'none'
        }
        audio.play()
        audio.parentNode.children[0].style.display = 'block'
        audio.parentNode.children[1].style.display = 'none'
        this.audioSrc = audio.src
      }
    },


    handleList() {
      this.$http.post(api.getPlatform('/activity/comment/id'), {
        contentId: this.$route.query.id
      }).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          res.data.data.personFileId = api.getUpload(res.data.data.personFileId)
          res.data.data.ctime = formatDate(new Date(Number(res.data.data.ctime)), 'yyyy-MM-dd hh:mm')
          res.data.data.scoreTime = formatDate(new Date(Number(res.data.data.scoreTime)), 'yyyy-MM-dd hh:mm')
          if ( res.data.data.clockCount==null) {
            res.data.data.clockCount=0
           }
          for (var i = 0; i < res.data.data.fileUrl.length; i++) {
            res.data.data.fileUrl[i].url = api.getUpload(res.data.data.fileUrl[i].url)
          }
          this.from1 = res.data.data

          console.log(this.from1)
          console.log(this.from1.ctime)

        }
      })
    },

    handleList1() {
      
      
      this.$http.post(api.getPlatform('/activity/comment/more'), this.from).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          this.total = res.data.data.total
          // for (var i = 0; i < res.data.data.data.length; i++) {
          //   res.data.data.data[i].personFileId = api.getUpload(res.data.data.data[i].personFileId)
          //   res.data.data.data[i].ctime = formatDate(new Date(Number(res.data.data.data[i].ctime)), 'yyyy-MM-dd hh:mm')
          //   res.data.data.data[i].scoreTime = formatDate(new Date(Number(res.data.data.data[i].scoreTime)), 'yyyy-MM-dd hh:mm')
          //   for (var j = 0; j < res.data.data.data[i].fileUrl.length; j++) {
          //     res.data.data.data[i].fileUrl[j].url = api.getUpload(res.data.data.data[i].fileUrl[j].url)
          //   }
          //   this.tableData.push(res.data.data.data[i])
          // }
          // console.log(res)
          this.tableData = res.data.data.data
          
        }
      })
    },

    moreComments() {
        if (this.from.sliceParams.pageSize > this.total) {
          console.log('没有更多数据了')
          this.$message.error('没有更多数据了')
          this.moreCommentsBool = false
          return false
        }
      this.from.sliceParams.pageSize += 10
      this.handleList()
    },

    handleList2() {
      this.from.sliceParams.pageNum = 1
      this.from.sliceParams.pageSize = 10
      this.tableData = []
      this.handleList1()
    },

    playVedio(src) {
      console.log(src)
      document.getElementById('media').src = src
      this.dialogVisiblePlay = true
    },
    closeDialog() {
      document.getElementById("media").pause();
      this.dialogVisiblePlay = false
    },

    comments(id) {
      this.commentsFrom.commentContentId = id
      this.dialogVisibleComments = true
    },

    CommentsBtn() {
      this.$http.post(api.getPlatform('/activity/comment/remark'), this.commentsFrom).then(res => {
        if (res.data.status == 200) {
          this.commentsFrom.score = 0
          this.commentsFrom.scoreContent = ''
          this.dialogVisibleComments = false
          this.handleList()
        }
      })
    },
    
    goActiveDataVote () {
      window.history.go(-1)
    },

    goActiveHistory(id) {
      this.$router.push({
        path: '/activeHistory',
        query: {
          id: id
        }
      })
    },

    delComments(id) {
      console.log(id)
      this.delCommentsId = id
      this.dialogVisibleDel = true
    },

    delBtn() {
      this.$http.post(api.getPlatform('/activity/comment/remark/del'), { replyId: this.delCommentsId ,commentId:this.from.commentId}).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          this.$message.success('删除成功！')
          this.dialogVisibleDel = false
          // this.tableData = []
          this.handleList1()
          this.handleList()

        }
      })
    }
  },
  mounted() {},
  created() {
    this.handleList()
    this.handleList1()
  }
}
