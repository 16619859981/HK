import axios from 'axios'
import {
  formatDate
} from '../../../date'
import api from '../../api/index'

export default {
  data() {
    return {
      tableData: {},

      programData: [],
      dialogVisiblePlay: false,
      id: this.$route.query.id,
      Url: '',
      Bool: false,
      onselectstart: '',



    };


  },
  created() {
    // alert(this.id)
  },
  methods: {

    //渲染专辑信息
    renderList() {

      axios.post(api.getContent('/audit/query/detail'), {id:this.id}).then(res => {
  
        console.log(res.data.data)
        if(res.data.status==200) {

          this.tableData = res.data.data

        }


      })
    },


    a() {
      this.$router.push('/albumReview')
    },

    b() {
      this.$router.push('/checkHistory')
    }



  },
  mounted() {
    //渲染专辑信息
    this.renderList();



  }
}
