import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      tableData: {
        albumName: "我的任务",
        albumLabel: '任务',
        albumIntro: "简介"
      },
    
      formInline: {
        sliceParams: {
          pageNum: 1,
          pageSize: 10
        },
        feedBackId:this.$route.query.id,
        category:[],
        date:"",
        date2:"",
  
      },
    


    };


  },
  created() {
    // console.log(this.id)
  },
  methods: {
    //任务
    handleList() {
      this.$http.post(api.getPlatform('/package/feedBack'), this.formInline).then(res => {
        console.log(res)
        if (res.data.status == 200) {

        
          res.data.data.data[0].feedbackCtime = formatDate(new Date(res.data.data.data[0].feedbackCtime), 'yyyy-MM-dd hh:mm');

          this.tableData = res.data.data.data[0]
          for (var i = 0 ; i< this.tableData.feedbackFileUrl.length;i++) {
   
            this.tableData.feedbackFileUrl[i]=api.getUpload(this.tableData.feedbackFileUrl[i])
          }
       
  
        }
      })
    },





  },
  mounted() {
    this.handleList()


  },

}
