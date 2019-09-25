import echarts from 'echarts'


// import { formatDate } from '../../../date'
import api from '../api/index'


export default {
  data() {
    return {
      switchValue: true,
      
   
    
      //内容指标参数类型
      type: 'd',
      switchValue1: true,
      //关键指标参数类型
      contentType: 'd',
      //图标
      echarts: 'second',
      //关键指标echarts数据
      echartsData: {
        albumTimes: [],
        albumNum: [],
        programTimes: [],
        programNum: [],
        pushTimes: [],
        pushNum: [],
        collectNum: [],
      },





      //关联的表格数据
      tableData: [{
        date: '11:00-11:59',
        PV: 66,
        UV: 25,
        VV: 23,
        IP: 25,
        bounceRate: '25%',
        average: '00:23'

      }, {
        date: '11:00-11:59',
        PV: 66,
        UV: 25,
        VV: 23,
        IP: 25,
        bounceRate: '25%',
        average: '00:23'

      }, {
        date: '11:00-11:59',
        PV: 66,
        UV: 25,
        VV: 23,
        IP: 25,
        bounceRate: '25%',
        average: '00:23'

      }, {
        date: '11:00-11:59',
        PV: 66,
        UV: 25,
        VV: 23,
        IP: 25,
        bounceRate: '25%',
        average: '00:23'

      }],

 
      tabName: 'second',
      datas: [],
      //横坐标
      date: [],

  
     //地区渲染数组
      options1: [

      ],
      options2: [

      ],
      options3: [

      ],
    //用户指标的参数
      areaArr: [],
      times: '',
      startDate:"",
      endDate:"",
      UserP: '',
      UserC: '',
      UserCounty:"",
      userData: {},
    //内容指标渲染参数
    ContentP:"",
    ContentC:"",
    ContentCounty:"",
    ContentTimes:[],
    contentData: {},
    //活动指标
    activeP:"",
    activeC:"",
    activeCounty:"",
    activeTimes:[],
    activeData:{},
    //总数
    name:"",
   

    }
  },
  methods: {
    //获取日期、
    getDate() {
      // console.log(this.times)
      this.startDate = this.times[0]
      this.endDate = this.times[1]
      this.handleTime()

    },
    getDate2() {
      // console.log(this.ContentTimes)

      this.handleContent()

    },
    getDate3() {
      // console.log(this.activeTimes)
      this.handleActive()
    },
    handleClick(tab) {

      this.tabName = tab.name
      // console.log(tab.index)
      if (tab.index == 0) {
        this.datas = this.echartsData.albumTimes
   
      } else if (tab.index == 2) {
        this.datas = this.echartsData.albumNum
    
      } else if (tab.index == 3) {
        this.datas = this.echartsData.programTimes

      } else if (tab.index == 4) {
        this.datas = this.echartsData.programNum

      } else if (tab.index == 5) {
        this.datas = this.echartsData.collectNum
      
      } else if (tab.index == 6) {
        this.datas = this.echartsData.pushTimes
 
      } else if (tab.index == 7) {
        this.datas = this.echartsData.pushNum
      
      } else if (tab.index == 1) {
        this.datas = this.echartsData.albumTimes
    
      }


      this.initChart(this.tabName, this.datas, this.contentType)
    },

    //渲染用户指标
    handleUser() {
      this.$http.post(api.getPlatform('/report/home/user'),{areaCode:this.areaArr}).then(res => {
        if (res.data.status == 200) {
          this.userData = res.data.data
        }
      })
    },
    //注册用户的日期查找
    handleTime() {
      this.$http.post(api.getPlatform('/report/home/dateuser'),{areaCode:this.areaArr,startDate:this.times[0],endDate:this.times[1]}).then(res => {
        if (res.data.status == 200) {    
          this.userData.signin = res.data.data.signin
        }
      })
    },
    //渲染内容指标
    handleContent() {
     
      this.$http.post(api.getPlatform('/report/home/content'), {
        areaCode:this.areaArr,
        startDate:this.ContentTimes[0],
        endDate:this.ContentTimes[1]
      }).then(res => {
        if (res.data.status == 200) {
          this.contentData = res.data.data


        }
      })
    },
    //活动指标
    handleActive() {
     
      this.$http.post(api.getPlatform('/report/home/activity'), {
        areaCode:this.areaArr,
        startDate:this.activeTimes[0],
        endDate:this.activeTimes[1]
      }).then(res => {
        if (res.data.status == 200) {
          this.activeData = res.data.data


        }
      })
    },
    // 关键指标的开关
    changeStatus1(data) {

      if (data == "m") {
        this.contentType = "m"
        this.$http.post(api.getPlatform('/report/home/key'), {
          type: this.contentType,
        
        }).then(res => {
          if (res.data.status == 200) {
            this.echartsData = res.data.data.chart
            this.tableData = res.data.data.table
            this.date = res.data.data.date
            this.initChart(this.tabName, this.echartsData.albumTimes, this.contentType)
          }
        })
      } else if (data == "d") {
        this.contentType = "d"
        this.handleContentData()
      }

    },
    // 图表渲染 关键指标
    handleContentData() {
      this.$http.post(api.getPlatform('/report/home/key'), {
        type: this.contentType,
      }).then(res => {
        if (res.data.status == 200) {
          this.echartsData = res.data.data.chart
          this.tableData = res.data.data.table
          this.date = res.data.data.date
          this.initChart(this.tabName, this.echartsData.albumTimes, this.contentType)
        }
      })
    },
    tabH() {
      return 'height: 65px'
    },
    tabP() {
      return 'padding: 0; width:100px; color: #606266;'
    },
    getRowClass() {
      return 'background:#F5F7FA; color: #909399; font-weight: 400; height: 50px;'
    },
    //图表加载
    initChart(name, data, type) {


      document.getElementById(name).style.width =800 + 'px'
      var myChart = echarts.init(document.getElementById(name));
      if (type == "d") {
        var time = this.date

      } else if (type == "m") {
        var time = this.date

      }
      // 绘制图表
      myChart.setOption({
        title: {
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: time,
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              var start = value.substring(0, 3);
              var end = value.substring(3, 15);
              var value = start + "\n" + end;
              return value;
            }
          }



        },

        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisPointer: {
            snap: true
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c}"
        },

        series: [{
          name: '',
          type: 'line',
          smooth: true,
          data: data,
          color: ['#409eff']

        }]

      });

    },
     // 四级联动
     areaList() {
      // alert(2)
      this.$http.post(api.getPlatform('/area'), {
        areaCode: 1
      }).then(res => {
        // console.log(res.data.data)
        if (res.data.status == 200) {
          this.options1 = res.data.data
          this.handleUser()
          // console.log(this.options1)
        }
      })
    },

    valu1(areaNumber) {
      this.areaArr = []
      this.areaArr.push(areaNumber)
      this.UserC = ""
      this.UserCounty = ""


      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options2 = res.data.data
          this.handleUser()

        }
      })
    },

    valu2(areaNumber) {
      if (this.areaArr.length == 2) {
        this.areaArr.pop()
      }
      
      this.areaArr.push(areaNumber)
      this.UserCounty = ""
   
 
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options3 = res.data.data
          this.handleUser()
        }
      })
    },

    valu3(areaNumber) {
      if (this.areaArr.length == 3) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber) 
      this.handleUser()
    },
    valu4(areaNumber) {
      this.areaArr = []
      this.areaArr.push(areaNumber)
      this.ContentC = ""
this.ContentCounty = ""
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options2 = res.data.data
          this.handleContent()

        }
      })
    },

    valu5(areaNumber) {
      if (this.areaArr.length == 2) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber)
      this.ContentCounty = ""
 
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options3 = res.data.data
          this.handleContent()
        }
      })
    },

    valu6(areaNumber) {
      if (this.areaArr.length == 3) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber) 
      this.handleContent()
    },
    valu7(areaNumber) {
      this.areaArr = []
      this.areaArr.push(areaNumber)
      this.activeC = ""
      this.activeCounty = ""
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options2 = []
          this.value2 = ''
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options2 = res.data.data
          this.handleActive()

        }
      })
    },

    valu8(areaNumber) {
      if (this.areaArr.length == 2) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber)
   
      this.activeCounty = ""
      this.$http.post(api.getPlatform('/area'), {
        areaCode: areaNumber
      }).then(res => {
        if (res.data.status == 200) {
          this.options3 = []
          this.value3 = ''
          this.options4 = []
          this.value4 = ''
          this.options3 = res.data.data
          this.handleActive()
        }
      })
    },

    valu9(areaNumber) {
      if (this.areaArr.length == 3) {
        this.areaArr.pop()
      }
      this.areaArr.push(areaNumber) 
      this.handleActive()
    },

  




  },
  mounted() {
    this.handleUser()

    this.handleContent()
    this.handleActive()
    this.handleContentData()
    this.areaList()









  }
}
