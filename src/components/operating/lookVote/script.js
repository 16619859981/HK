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

      },
      audioSrc: '',
      time1: '',
      time2: '',
      time3: '',
      time4: '',
      val1: '',
      val2: '',
      id: '',
      from1: {

      }
    };
  },
  methods: {
    handleList() {
      this.$http.post(api.getPlatform('/activity/common'), {
        activityId: this.$route.query.id
      }).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          res.data.data.activityCover = api.getUpload(res.data.data.activityCover)
          this.time1 = formatDate(new Date(Number(res.data.data.activityCtime)), 'yyyy-MM-dd');
          this.time2 = formatDate(new Date(Number(res.data.data.activityEtime)), 'yyyy-MM-dd');
          // console.log(res.data.data.activityTaskSubJoins[0])
          if(res.data.data.activityTaskSubJoins.length>0) {
            this.time3 = formatDate(new Date(Number(res.data.data.activityTaskSubJoins[0].dayStartTime)), 'hh:mm');
            this.time4 = formatDate(new Date(Number(res.data.data.activityTaskSubJoins[0].dayEndTime)), 'hh:mm');
            this.val1 = res.data.data.activityTaskSubJoins[0].continuousDay
            if (res.data.data.activityTaskSubJoins[0].restrictionType == 0) {
              this.val2 = '不限'
            } else if (res.data.data.activityTaskSubJoins[0].restrictionType == 1) {
              this.val2 = '纯文字'
            } else if (res.data.data.activityTaskSubJoins[0].restrictionType == 2) {
              this.val2 = '必须包含图片'
            } else if (res.data.data.activityTaskSubJoins[0].restrictionType == 3) {
              this.val2 = '必须包含音频'
            } else if (res.data.data.activityTaskSubJoins[0].restrictionType == 4) {
              this.val2 = '必须包含视频'
            }
           
          }
     
          if (res.data.data.activityType == 1) {
            res.data.data.activityType = '打卡'
          } else if (res.data.data.activityType == 2) {
            res.data.data.activityType = '闯关'
          }

        

          if (res.data.data.activityAuthorType == 1) {
            res.data.data.activityAuthorType = '红广平台'
          } else if (res.data.data.activityAuthorType == 2) {
            res.data.data.activityAuthorType = '学校'
          } else if (res.data.data.activityAuthorType == 3) {
            res.data.data.activityAuthorType = '班级'
          } else if (res.data.data.activityAuthorType == 7) {
            res.data.data.activityAuthorType = '红广号'
          } else if (res.data.data.activityAuthorType == 10) {
            res.data.data.activityAuthorType = '基地'
          }


          if (res.data.data.category == 0) {
            res.data.data.category = '实践'
          } else if (res.data.data.category == 1) {
            res.data.data.category = '体育'
          } else if (res.data.data.category == 2) {
            res.data.data.category = '公益'
          } else if (res.data.data.category == 3) {
            res.data.data.category = '亲子'
          } else if (res.data.data.category == 4) {
            res.data.data.category = '周末'
          } else if (res.data.data.category == 5) {
            res.data.data.category = '户外'
          } else if (res.data.data.category == 6) {
            res.data.data.category = '环保'
          } else if (res.data.data.category == 7) {
            res.data.data.category = '科技'
          } else if (res.data.data.category == 8) {
            res.data.data.category = '体验'
          } else if (res.data.data.category == 9) {
            res.data.data.category = '探究'
          } else if (res.data.data.category == 10) {
            res.data.data.category = '动手'
          } else if (res.data.data.category == 11) {
            res.data.data.category = '文化'
          } else if (res.data.data.category == 12) {
            res.data.data.category = '才艺\技能'
          } else if (res.data.data.category == 13) {
            res.data.data.category = '读书'
          } else if (res.data.data.category == 14) {
            res.data.data.category = '传统文化'
          } else if (res.data.data.category == 15) {
            res.data.data.category = '安全'
          } else if (res.data.data.category == 16) {
            res.data.data.category = '成长'
          } else if (res.data.data.category == 17) {
            res.data.data.category = '展览\戏剧演出'
          } else if (res.data.data.category == 18) {
            res.data.data.category = '益智'
          } else if (res.data.data.category == 19) {
            res.data.data.category = '心理'
          } else if (res.data.data.category == 20) {
            res.data.data.category = '课程'
          }
          
          for (var i = 0; i < res.data.data.activityTaskSubJoins.length; i++) {
            if (res.data.data.activityTaskSubJoins[i].restrictionType == 0) {
              res.data.data.activityTaskSubJoins[i].restrictionType = '不限'
            } else if (res.data.data.activityTaskSubJoins[i].restrictionType == 1) {
              res.data.data.activityTaskSubJoins[i].restrictionType = '纯文字'
            } else if (res.data.data.activityTaskSubJoins[i].restrictionType == 2) {
              res.data.data.activityTaskSubJoins[i].restrictionType = '必须包含图片'
            } else if (res.data.data.activityTaskSubJoins[i].restrictionType == 3) {
              res.data.data.activityTaskSubJoins[i].restrictionType = '必须包含音频'
            } else if (res.data.data.activityTaskSubJoins[i].restrictionType == 4) {
              res.data.data.activityTaskSubJoins[i].restrictionType = '必须包含视频'
            }

            if (res.data.data.activityTaskSubJoins[i].extraRestrictionType == 0) {
              res.data.data.activityTaskSubJoins[i].extraRestrictionType = '无'
            } else if (res.data.data.activityTaskSubJoins[i].extraRestrictionType == 1) {
              res.data.data.activityTaskSubJoins[i].extraRestrictionType = '转发数'
            } else if (res.data.data.activityTaskSubJoins[i].extraRestrictionType == 2) {
              res.data.data.activityTaskSubJoins[i].extraRestrictionType = '点赞数'
            } else if (res.data.data.activityTaskSubJoins[i].extraRestrictionType == 3) {
              res.data.data.activityTaskSubJoins[i].extraRestrictionType = '答题百分比'
            } else if (res.data.data.activityTaskSubJoins[i].extraRestrictionType == 4) {
              res.data.data.activityTaskSubJoins[i].extraRestrictionType = '连续天数'
            }

        }

          this.id = res.data.data.medalId
          this.from = res.data.data
          console.log(this.id)
          this.handleMedal()

        }
      })
    },

    playaudio(src) {
      let audioAll = document.getElementsByTagName('audio')
      let videoAll = document.getElementsByTagName('video')

      for(var i = 0 ; i < audioAll.length;i++) {
        if (src != audioAll[i].src) {
          audioAll[i].pause()
        }
      }
      for(var i = 0 ; i < videoAll.length;i++) {
        videoAll[i].pause()      
      }
    },

    playvideo(src) {
      let audioAll = document.getElementsByTagName('audio')
      let videoAll = document.getElementsByTagName('video')

      for(var i = 0 ; i < videoAll.length;i++) {
        if (src != videoAll[i].src) {
          videoAll[i].pause()
        }
      }
      for(var i = 0 ; i < audioAll.length;i++) {
        audioAll[i].pause()      
      }
    },

    goActiveManagement () {
      this.$router.push('/activeManagement')
    },

    handleMedal () {
      this.$http.post(api.getPlatform('/medal/meMedal/selectMedal'), {
        medalId: this.id
      }).then(res => {
        if (res.data.status == 200) {
          console.log(res)
          res.data.data.fileUrl = api.getUpload(res.data.data.fileUrl)
          this.from1 = res.data.data
        }
      })
    },

    goActiveDataVote () {
      this.$router.push({
        path: '/activeDataVote',
        query: {
          id: this.$route.query.id,
        }
      });
    }
  },
  mounted() {},
  created() {
    this.handleList()
  }
}
