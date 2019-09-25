import { formatDate } from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
     id:this.$route.query.id,
     arr:[],
     count:0,
     widthData:'',
     msg:'',
    }
  },
  methods: {
    handelList(){
      this.$http.post(api.getContent('/activity/model/voter '),{activityId:this.id}).then(res=>{

        if (res.data.status==200) {
          for(var i=0;i<res.data.data.length;i++) {
     
          for (var j =0;j<res.data.data[i].option.length;j++) {
          
            res.data.data[i].option[j]['num']=  res.data.data[i].option[j].count
            res.data.data[i].option[j].count = res.data.data[i].option[j].count/res.data.data[i].sumCount*100+'px'
           
      
          }

          }
      
          this.arr= res.data.data
        }
      })
    }
    
  },
  mounted() {
this.handelList()

  }
}
