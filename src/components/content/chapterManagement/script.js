

export default {
    data() {
      return {
        tableData: [{
          serialNumber: 'Z1234567890',
          name: '我是专辑名称',
          number: 12,
          type: '音频',
          creator: '中少红卡',
          identity: '中少红卡',
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        }, {
          serialNumber: 'Z1234567891',
          name: '我是专辑名称',
          number: 8,
          type: '视频',
          creator: '张假雨',
          identity: '北京市第一中学',
          region: '北京市朝阳区',
          author: '张佳玉',
          time: '2019-06-12',
          state: '下架中',
          operation: '-',
          operationTime: '2019-07-14 11:00'
        }, {
          serialNumber: 'Z1234567892',
          name: '我是专辑名称',
          number: 3,
          type: '音频',
          creator: '张贞雨',
          identity: '大V讲师',
          region: '河南省驻马店市混球区',
          author: '贞贞鱼',
          time: '2019-07-11',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:01'
        }, {
          serialNumber: 'Z1234567893',
          name: '我是专辑名称',
          number: 22,
          type: '视频',
          creator: '张贞雨',
          identity: '大V讲师',
          region: '河南省驻马店市混球区',
          author: '张贞雨',
          time: '2019-05-10',
          state: '下架中',
          operation: '-',
          operationTime: '2019-07-14 10:03'
        },{
          serialNumber: 'Z1234567890',
          name: '我是专辑名称',
          number: 12,
          type: '音频',
          creator: '中少红卡',
          identity: '中少红卡',
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        }, {
          serialNumber: 'Z1234567891',
          name: '我是专辑名称',
          number: 8,
          type: '视频',
          creator: '张假雨',
          identity: '北京市第一中学',
          region: '北京市朝阳区',
          author: '张佳玉',
          time: '2019-06-12',
          state: '下架中',
          operation: '-',
          operationTime: '2019-07-14 11:00'
        }, {
          serialNumber: 'Z1234567892',
          name: '我是专辑名称',
          number: 3,
          type: '音频',
          creator: '张贞雨',
          identity: '大V讲师',
          region: '河南省驻马店市混球区',
          author: '贞贞鱼',
          time: '2019-07-11',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:01'
        }, {
          serialNumber: 'Z1234567893',
          name: '我是专辑名称',
          number: 22,
          type: '视频',
          creator: '张贞雨',
          identity: '大V讲师',
          region: '河南省驻马店市混球区',
          author: '张贞雨',
          time: '2019-05-10',
          state: '下架中',
          operation: '-',
          operationTime: '2019-07-14 10:03'
        },{
          serialNumber: 'Z1234567890',
          name: '我是专辑名称',
          number: 12,
          type: '音频',
          creator: '中少红卡',
          identity: '中少红卡',
          region: '北京市朝阳区',
          author: '吴文雅',
          time: '2019-08-13',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:00'
        }, {
          serialNumber: 'Z1234567891',
          name: '我是专辑名称',
          number: 8,
          type: '视频',
          creator: '张假雨',
          identity: '北京市第一中学',
          region: '北京市朝阳区',
          author: '张佳玉',
          time: '2019-06-12',
          state: '下架中',
          operation: '-',
          operationTime: '2019-07-14 11:00'
        }, {
          serialNumber: 'Z1234567892',
          name: '我是专辑名称',
          number: 3,
          type: '音频',
          creator: '张贞雨',
          identity: '大V讲师',
          region: '河南省驻马店市混球区',
          author: '贞贞鱼',
          time: '2019-07-11',
          state: '上架中',
          operation: '赵大宝',
          operationTime: '2019-07-14 10:01'
        }, {
          serialNumber: 'Z1234567893',
          name: '我是专辑名称',
          number: 22,
          type: '视频',
          creator: '张贞雨',
          identity: '大V讲师',
          region: '河南省驻马店市混球区',
          author: '张贞雨',
          time: '2019-05-10',
          state: '下架中',
          operation: '-',
          operationTime: '2019-07-14 10:03'
        }],
        total: 12,
        searchText: '',
        currentPage: 0,
        // 搜索框数据
        formInline: {
          user: '',
          region: ''
        }
      }
    },
    methods: {

         // 查看按钮
         handleLook(row) {

          this.$router.push('/chapterLook')
        },
        handleEdit(row){
          this.$router.push('/chapterEdit')
        },
      // 分页改变的时候
      handleCurrentChange(val) {
      },
      //点击创建专辑按钮进行子组件的跳转
      createAlbum() {
        // alert('创建专辑')
        this.$router.push('/createChapter')
      },
      //添加节目
      creatProgram(item){
        if(item.type==='音频'){
          this.$router.push('/createAudioChapter')
          // alert(item.type);

        }else if(item.type==='视频'){
          this.$router.push('/createVideoChapter')
          // alert(item.type+"------");

        }else{
          this.$message({
          type:'error',
          message:"未审核专辑"

          })
        }
        
      },
      //获取人数
      getNumber(){
        this.$router.push('/getNumber')
      }
    },
    mounted() {

    }
  }