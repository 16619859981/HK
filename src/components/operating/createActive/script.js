export default {
  data() {
    return {
      active: 2
    }
  },
  methods: {
    card () {
      this.$router.push('/createVote')
    },
    emigrated() {
      this.$router.push('/createPic')
    }
  }
}
