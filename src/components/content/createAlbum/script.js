export default {
  data() {
    return {

    }
  },
  methods: {
    createAudio() {

      this.$router.push({
        path: '/createAudio',
        query: {
          type: 1
        }
      });


    },
    createVideo() {

      this.$router.push({
        path: '/createVideo',
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
