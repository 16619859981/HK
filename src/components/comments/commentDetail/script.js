
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
   
    reply() {
      this.$router.push('/reply')
    },
    rate() {
      this.dialogVisibleRate=true
    }


    
   




  },
  mounted() {
 

  },
  created() {

  }
}
