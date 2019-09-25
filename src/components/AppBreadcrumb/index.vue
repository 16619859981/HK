<template>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <template v-for="(item, index) in list">
    <template v-if="item.path">
      <el-breadcrumb-item
        :to="{ path: item.path }" :key="index">{{ item.label }}</el-breadcrumb-item>
    </template>
    <template v-else>
      <el-breadcrumb-item :key="index">{{ item.label }}</el-breadcrumb-item>
    </template>
  </template>
</el-breadcrumb>
</template>

<script>
export default {
  name: 'AppBreadcrumb',

  props: { // 
    list: {
      type: Array,
      required: true
      // default: function () {
      //   return [{ label: '首页', path: '/' }]
      // }
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>