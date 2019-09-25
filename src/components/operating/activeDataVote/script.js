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
        activityId: this.$route.query.id,
        sortBy: '1',
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
      },
      commentsFrom: {
        score: 0,
        commentContentId: '',
        scoreContent: '',
      },
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
      delCommentsId: '',
      total: '',
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

    handleScroll() {

      if ((this.from.sliceParams.pageSize*this.from.sliceParams.pageNum) > this.total) {
        return false
      }

      if (document.documentElement.scrollTop + document.body.offsetHeight >= document.body.scrollHeight) {
        this.from.sliceParams.pageNum += 1
        this.handleList1()
      }
      // this.handleList1()
    },

    handleList1() {
      this.$http.post(api.getPlatform('/activity/comment'), this.from).then(res => {
        if (res.data.status == 200) {
          this.total += res.data.data.total
          for (var i = 0; i < res.data.data.data.length; i++) {
            res.data.data.data[i].personFileId = api.getUpload(res.data.data.data[i].personFileId)
            res.data.data.data[i].ctime = formatDate(new Date(Number(res.data.data.data[i].ctime)), 'yyyy-MM-dd hh:mm')
            res.data.data.data[i].scoreTime = formatDate(new Date(Number(res.data.data.data[i].scoreTime)), 'yyyy-MM-dd hh:mm')
           if ( res.data.data.data[i].clockCount==null) {
            res.data.data.data[i].clockCount=0
           }
            for (var j = 0; j < res.data.data.data[i].fileUrl.length; j++) {
              res.data.data.data[i].fileUrl[j].url = api.getUpload(res.data.data.data[i].fileUrl[j].url)
            }
          
            // this.tableData.push(res.data.data.data[i])
            if( res.data.data.data.length!=0) {
              console.log(res.data.data.data[i])
              this.tableData.push(res.data.data.data[i])
              // this.tableData =res.data.data.data
            }
          }
       
        
          console.log(this.tableData)
        }
   
      })
    },

    handleList2() {
      this.from.sliceParams.pageNum = 1
      this.from.sliceParams.pageSize = 10
      // this.tableData = []
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
      this.$router.push({
        path: '/activeHistory',
        query: {
          id: id
        }
      })
    },

    CommentsBtn() {
      this.$http.post(api.getPlatform('/activity/comment/del'), { commentId: this.delCommentsId }).then(res => {
        if (res.data.status == 200) {
          this.from.sliceParams.pageNum = 1
          this.from.sliceParams.pageSize = 10
          this.$message.success('删除成功')
          this.dialogVisibleComments = false
          this.tableData = []
          this.handleList1()
    
        }
      })
    },

    delComments(id) {
      this.delCommentsId = id
      this.dialogVisibleComments = true

    },

    goActiveHistory(id) {
      this.$router.push({
        path: '/activeHistory',
        query: {
          id: id
        }
      })
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);

  },
  created() {
    this.handleList1()
  }
}
