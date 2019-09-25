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
      // rateNum: null,
      // text:['1分','2分','3分','4分','5分'],
      // tareText:"",
      // dialogVisibleRate:false,
      commentData:[],
      //下拉参数
      cursor:0,
    }
  },
  methods: {
   
  
    reply(row) {
      this.$router.push({
        path: '/reply',
        query: {
          id: row
        }
      });
    },
    detail(row) {
      this.$router.push({
        path: '/lookVote',
        query: {
          id: row
        }
      });
    },
   



    //获取高度
    handleScroll() {
  
   
      if (document.documentElement.scrollTop+document.body.offsetHeight>=document.body.scrollHeight) {
      //  console.log('页面到底部了')
       this.cursor += 10 
       this.handleNews()
      }
    },
    handleNews() {
      this.$http
      .post(api.getPlatform("/message/notice/returnMessage"),{
        cursor:this.cursor
      })
      .then(res => {
        if (res.data.status == 200) {
         for (var i = 0 ; i <res.data.data.length;i++) {    
          res.data.data[i].txtContent = JSON.parse(res.data.data[i].txtContent)
          res.data.data[i].txtContent.time = formatDate(new Date(res.data.data[i].txtContent.time), 'yyyy-MM-dd hh:mm');          
          this.commentData.push( res.data.data[i].txtContent)
         }        
        if (res.data.data.length==0) {
          // this.$message.info('数据全部加载完毕')
        } 
        }
      });
    },
    home() {
      this.$router.push({
        path: '/homePage',
       
      });
    }

    
   




  },
  mounted() {
   
      window.addEventListener("scroll", this.handleScroll, true);
  

  },
  created() {
    this.handleNews()
  }
}
