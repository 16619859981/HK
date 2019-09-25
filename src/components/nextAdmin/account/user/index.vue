<template>
  <iframe :src="url" frameborder="0"></iframe>
</template>

<script>
  import api from "../../../api"

  export default {
    data() {
      return {
        url: api.getNextUrl('/account/user')
      }
    }
  }
</script>

<style scoped>
 iframe {
   margin: 20px 20px 0 20px;
   width: calc(100% - 40px);
   min-height: calc(100vh - 100px);
 }
</style>
