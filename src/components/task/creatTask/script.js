export default {
  data() {
    return {

    }
  },
  methods: {
    cR() {

      this.$router.push({
        path: '/creatR',
        query: {
          type: 1
        }
      });


    },
    cO() {

      this.$router.push({
        path: '/creatO',
        query: {
          type: 2
        }
      });

    },

    a() {
      this.$router.push('/albumManagement');
    }
  }
}
