export default {
  data() {
    return {

    }
  },
  methods: {
    createAudio() {
      // alert('跳转到音频')
      this.$router.push('/createAudioChapter')
    },
    createVideo() {
      // alert('跳转到视频')
      this.$router.push('/createVideoChapter')
    }
  }
}
