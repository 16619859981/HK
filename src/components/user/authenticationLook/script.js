import {
  formatDate
} from '../../../date'
import api from '../../api/index'
import qs from 'qs'
export default {
  data() {
    return {
      form: {

      },
    }
  },
  methods: {
    handlueList () {
      this.$http.post(api.getPlatform('/person/seeperson'), {positionId : this.$route.query.id }).then(res => {
        if (res.data.status === 200) {
          // console.log(res)
          res.data.data.cTime = formatDate(new Date(Number(res.data.data.cTime)), 'yyyy-MM-dd hh:mm');
          res.data.data.positionUrl = api.getUpload(res.data.data.positionUrl)
          // console.log(res.data.data.positionUrl)
          for (var i = 0; i < res.data.data.lowerList.length; i++) {
            res.data.data.lowerList[i].schoolUrl = api.getUpload(res.data.data.lowerList[i].schoolUrl)
          }
          this.form = res.data.data
          // console.log(this.form)
        }
      })
    },
    goAuthentication () {
      this.$router.push('/authentication')
    }
  },
  created () {
    this.handlueList()
  }
}