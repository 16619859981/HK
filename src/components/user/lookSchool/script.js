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
      this.$http.post(api.getPlatform('/schoo'), {schoolId : this.$route.query.id }).then(res => {
        if (res.data.status === 200) {
          console.log(res)
          res.data.data.cTime = formatDate(new Date(Number(res.data.data.cTime)), 'yyyy-MM-dd hh:mm');
          res.data.data.schoolUrl = api.getUpload(res.data.data.schoolUrl)
          res.data.data.positionFileUrl = api.getUpload(res.data.data.positionFileUrl)
          this.form = res.data.data
          console.log(this.form)
        }
      })
    },
    goSchoolManagement () {
      this.$router.push('/schoolManagement')
    }
  },
  created () {
    this.handlueList()
  }
}