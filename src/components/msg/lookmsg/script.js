import api from '../../api/index'
// import VueUeditorWrap from 'vue-ueditor-wrap';
import {
  formatDate
} from '../../../date'
export default {
  // components: { VueUeditorWrap },
  data() {
    return {
      ruleForm: {

        messageTitle: '',

        uploadArr: [{
          type: 'text',
          areaText: 'wqeqeqeqeqeasddsaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddw'
        }, {
          type: 'mp3',
          mp3Url: './吉尔吉特的交通概况.mp3',
          mp3Id: ''
        }, {
          type: 'text',
          areaText: 'wqeqeqeqsadddddsaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeqew'
        }, {
          type: 'mp4',
          mp4Url: './哆啦A梦香甜美梦_高清.mp4',
          mp4Id: ''
        }, {
          type: 'img',
          imgSrc: './Snipaste_2018-08-27_05-22-21.jpg',
          imgId: ''
        }],
        area: [],

      },



    };


  },
  methods: {


    handleMsg() {
      this.$http.post(api.getPlatform('/message/message/noticeView'), {
        messageId: this.$route.query.id
      }).then(res => {

        if (res.data.status == 200) {

          this.ruleForm['messageTitle'] = res.data.data.messageTitle

          this.ruleForm.uploadArr = res.data.data.customizeContents
          this.ruleForm.area = res.data.data.recordList


        }
      })
    },
    //阻止同时播放
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
    }




  },
  mounted() {
    this.handleMsg()

  }
}
