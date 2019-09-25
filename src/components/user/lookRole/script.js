export default {
  data() {
    return {
      tableData: [{
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, {
        school: '实验小学',
        region: '北京市朝阳区',
        founder: '吴文雅',
        time: '2019-08-13',
        state: '启用',
        name: '赵大宝',
        gender: '男',
        operation: '宇闪闪',
        operationTime: '2019-07-14 10:00',
        phone: 13333333333
      }, ],
      total: 12,
      searchText: '',
      currentPage: 0,
      // 搜索框数据
      searchItem: {
        // 查询编号
        serialNumber: '',
        // 关键字
        keyword: '',
        // 身份
        identity: '',
        // 地区
        region: '',
        // 状态
        state: '',
        // 类型
        type: '',
        // 创建时间
        operationTime: '',
        // 操作时间
        creatTime: '',
        // 审核时间
        auditTime: '',
        // 设备号
        deviceNumber: '',
        // 手机号
        phone: '',
        // 使用状态
        useState: '',
      },

    }
  },
  methods: {
    // 查看按钮
    handleLook(row) {
      // console.log('点击查看')
      // console.log(row);
      this.$router.push('/lookParentsLP')
    },
    handleEdit(row) {
      this.$router.push('/creatClassEditorClass')
    },

    // 分页改变的时候
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    //点击创建学校按钮进行子组件的跳转
    createSchool() {
      this.$router.push('/creatSchool')
    },

    open7() {
      this.$confirm('此操作将改变教师状态', '警告', {
        cancelButtonText: '启用',
        cancelButtonText: '禁用',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '启用成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '禁用成功'
        });
      });
    },

    handleLookClass(item) {
      // alert(1)
      this.$router.push('/lookClass')
    },

    schoolManagement() {
      this.$router.push('/schoolManagement')
    },

    lookTeacher() {
      this.$router.push('/lookTeacher')
    },

    lookStudents() {
      this.$router.push('/lookStudents')
    },

    lookParents() {
      this.$router.push('/lookParents')
    }

  },
  mounted() {

  },


}
