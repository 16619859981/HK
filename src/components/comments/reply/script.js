// var str="12345678901";
// var strr=str.replace(/(\d{3})(\d{4})(\d{4})/,"$1****$3");
// alert(strr);
import api from '../../api/index'
import {
  formatDate
} from '../../../date'
import qs from 'qs'

export default {

  data() {
    return {
      msgData:{},
      replyData:[],
      contentData:[],
      num:1,
      styleObj:{
        "width": "80px",
   "height":"80px",
 
      }
    }
  },
  methods: {
   
    detail() {
      this.$router.push('/commentDetail')
    },
    handleData() {
      this.$http
      .post(api.getPlatform("/message/notice/getCommentInfo"),{
        commentId:this.$route.query.id
      })
      .then(res => {
        if (res.data.status == 200) {
          console.log(res.data.data)
          this.msgData = res.data.data
          this.msgData.fileId = api.getUpload(this.msgData.fileId)
          this.replyData = res.data.data.replyBodyEntitys
          this.contentData = res.data.data.contentData
          for(var i = 0; i <this.contentData.length;i++ ) {
            this.contentData[i].url = api.getUpload(this.contentData[i].url)
          }
          // this.contentData = [{
          //   type:1,
          //   url:"https://filetest.hongkazhijia.com/45/4589ae111f5fa6d61a03318372eadc540193655dc03d6120e0b1fa9fe94259a7.mp3"
          // },{
          //   type:2,
          //   url:"https://filetest.hongkazhijia.com/e4/e45e0c8d8b68b5a6c0ade24b1c97b60fd968400b7bf355970e4cae6aeadcbcd9.mp4"
          // },{
         
          //     type:3,
          //     url:"https://filetest.hongkazhijia.com/10/10d0afd225a2bdbd17f98fae66325fb7ea7c9ca6d1b3eb63774d6befc7193331.jpg"
           
          // }]
          if (this.contentData.length==1) {
            this.styleObj = {"width": "145px",
            "height":"145px",
         }
          }else if (this.contentData.length==2||this.contentData.length==4) {
            this.styleObj = {"width": "120px",
            "height":"120px",
         }
          }else {
            this.styleObj={
              "width": "80px",
         "height":"80px",
      
            }
          }
          this.msgData.ctime = formatDate(new Date((Number(this.msgData.ctime))), 'yyyy-MM-dd hh:mm');  
          console.log( this.contentData )
        }
      });
    },
    playAudio() {
   
      var audioSrc = ''
      var bool = true
      var audio = document.getElementsByClassName('audio')[0]
      var audioAll = document.getElementsByClassName('audio')
      var videoAll = document.getElementsByClassName('video')
      for (var i = 0; i < videoAll.length; i++) {
        videoAll[i].pause()
   
    }
      if (audioSrc == audio.src || audioSrc == '') {
        bool = true
    } else if (audioSrc != audio.src) {
        bool = false
    }
    if (bool == true) {
        if (audio.paused) {
            audio.play()
            this.num=2
            console.log(this.num)
       
            audioSrc = audio.src
        } else {
            audio.pause()
            this.num=1
          
            audioSrc = audio.src
        }
    }
    if (bool == false) {
        for (var i = 0; i < audioAll.length; i++) {
            audioAll[i].pause()

        }
        audio.play()
        this.num=2
        audioSrc = audio.src
    }
    },
 

  
    home() {
      this.$router.push({
        path: '/homePage',
       
      });
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
          this.num==1  
        }
      }
    
   




  },
  mounted() {
 

  },
  created() {
   this.handleData()
  
  }
}
