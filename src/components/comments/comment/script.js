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
      rateNum: null,
      text:['1分','2分','3分','4分','5分'],
      tareText:"",
      dialogVisibleRate:false,
    }
  },
  methods: {
   
    detail() {
      this.$router.push({
        path: '/commentDetail',
        // query: {
        //   id: row
        // }
      });
    },
    reply() {
      this.$router.push({
        path: '/reply',
        // query: {
        //   id: row
        // }
      });
    },
    rate() {
      this.dialogVisibleRate=true
    },



    //获取高度
    handleScroll() {
      //文档高度
      // console.log(document.body.scrollHeight);
      //卷去高度

      // console.log(document.documentElement.scrollTop);
      //可视区域的高度
      // console.log(document.body.offsetHeight);
   
      if (document.documentElement.scrollTop+document.body.offsetHeight>=document.body.scrollHeight) {
       console.log('页面到底部了')
      }
    }

    
   




  },
  mounted() {
   
      window.addEventListener("scroll", this.handleScroll, true);
  

  },
  created() {

  }
}
