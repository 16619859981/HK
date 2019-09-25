export default {
  data() {
    return {
      active: 1
    }
  },
  methods: {
    card () {
      this.$router.push('/creatEnterprise')
    },
    emigrated () {
      this.$router.push('/creatSchool')
    },
    emigrated1 () {
      this.$router.push('/creatClass')
    }
  }
}
