

export default {
    data() {
      return {
        tableData:[
          {
            imgUrl:'/static/logo.png',
            title:'专辑名称',
            pages:'广播',
            linkType:'H5',
            link:'http://www.baidu.com',
            identity:'赵大宝',
            time:'2019-09-09',
            soldOut:'赵大宝',
            soldOutTime:'2019-10-10'
            

          }
        ],
        total: 12,
        searchText: '',
        currentPage: 0,
        searchItem: {
     
          // 关键字
          keyword: '',
          //页面
          pages:'',
          //链接类型
          linkType:'',
  
          // 创建时间
          operationTime: '',
    
        },
      }
    },
    methods: {
   

      // 分页改变的时候
      handleCurrentChange(val) {
 
      },
      //点击创建专辑按钮进行子组件的跳转
      createAlbum() {
        // alert('创建专辑')
        this.$router.push('/createAlbum')
      },

    },
    mounted() {

    }
  }