

export default {
    data() {
      return {
    
        total: 12,
        searchText: '',
        currentPage: 0,
        searchInp:'',
      }
    },
    methods: {
     // 分页改变的时候
     handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    hotSchool() {
      this.$router.push('/hotSchool')
    },
    appSchool() {
      this.$router.push('/appSchool')
    },
    VTeacher() {
      this.$router.push('/VTeacher')
    }

    },
    mounted() {

    }
  }