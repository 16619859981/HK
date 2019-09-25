import axios from 'axios'
import  {formatDate} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      // tableData:{},

      programData:[],
      dialogVisiblePlay: false,
      id: this.$route.query.id,
      type:this.$route.query.type,
      Url:'',
    
      onselectstart:'',
      // Bool:false
 


    };


  },
  created() {

  },
  methods: {
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {

    },
    // 分页改变的时候
    handleCurrentChange(val) {

    },

    //渲染专辑的节目信息
    renderProgram(){

      axios.post(api.getContent('/audit/query/detail'), {id:this.id}).then(res => {
          console.log(res)

        if(res.data.status==200) {
       
            if(res.data.data.auditProgramType==1) {
              res.data.data.auditProgramType="音频"
            }else {
              res.data.data.auditProgramType="视频"
            }
            if(res.data.data.auditStatus==1){
              res.data.data.auditStatus="审核成功"

            }else {
              res.data.data.auditStatus="审核失败"
            }
            res.data.data.auditCtime=formatDate(new Date(res.data.data.auditCtime), 'yyyy-MM-dd hh:mm');
            res.data.data.auditDuration = Math.floor(res.data.data.auditDuration / 60) + "分" + (res.data.data.auditDuration % 60 / 100).toFixed(2).slice(-2) + "秒"

            // res.data.data[0].Bool=false
          
     
            // console.log(res.data.data.auditDuration)
          this.programData=res.data.data
          console.log(this.programData)

        }
   
        
      })
    },
    fnn() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频") {
          return true
        }else {
          return false
        }
      }

    },
    fnn2() {
      for (var i = 0; i < this.programData.length; i++) {
        if (this.programData[i].materialType == "视频") {
          return false
        }else {
          return true
        }
      }

    },
    //视屏播放

    play(val){
      this.dialogVisiblePlay=true
      this.Url= val
    },

    //音频bofang 
    audioPlay(row,e) {
      // alert(row.Bool)

      var el = e.currentTarget

      
      row.Bool = true
      for (var i = 0 ;i < this.programData.length;i++) {
        if(this.programData[i].Bool != true) {

          this.programData[i].fileUrl1 =''
        }
      }

    


    },
    audioEnd (row,e) {
      // row.Bool = false 
        axios.post(api.getContent('/material'), {albumId:this.id,isCheck:2}).then(res => {
  

        if(res.data.status==200) {
          for(var i=0;i<res.data.data.length;i++){
            if(res.data.data[i].materialType==1) {
              res.data.data[i].materialType="音频"
            }else {
              res.data.data[i].materialType="视频"
            }
            if(res.data.data[i].materialStatus==1){
              res.data.data[i].materialStatus="审核通过"

            }else {
              res.data.data[i].materialStatus="不通过"
            }
            
            res.data.data[i].materialCtime=formatDate(new Date(res.data.data[i].materialCtime), 'yyyy-MM-dd hh:mm');
            res.data.data[i].Bool=false

          }

          this.programData=res.data.data

        }
   
        
      })
    
    },

    tabH () {
      return 'height: 32px'
    },

    tabP () {
      return 'padding: 10px 0px'
    },

    a() {
      this.$route.push('/VAReview')
    },

    b() {
      this.$router.push('/checkHistoryProgram')
    },

    closeDialog() {
      document.getElementById("media").pause();
      this.audio_outerVisible = false
     },
    
 





  },
  mounted() {
  
    //渲染节目信息
    this.renderProgram();


  }
}