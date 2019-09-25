export default {
    data() {
      return {
        tableData: [{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },{
          school: '实验小学',
          class: 11,
          teacher: 13,
          album: 14,
          students: 15,
          parents: 16,
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        },],
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
        dialogVisible: false,
        
      }
    },
    methods: {
      // 查看按钮
      handleLook(row) {
        // console.log('点击查看')
        // console.log(row);
        this.$router.push('/companyAdminLook')
      },
      handleEdit(row){
        this.$router.push('/companyAdminEdit')
      },

      contentAdmin () {
        this.$router.push('/contentAdmin')
      },

      schoolAdmin () {
        this.$router.push('/schoolAdmin')
      },

      companyAdminCreat () {
        this.$router.push('/companyAdminCreat')
      },

      // 分页改变的时候
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      
    },
    mounted() {

    },

    
  }