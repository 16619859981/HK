

import echarts from 'echarts'
import api from '../../api/index'
import { formatDate } from '../../../date'
export default {
    data() {
      return {
        tableData: [{
          date: '送达',
          name: '3500',
          address: '98.5%'
        }, {
          date: '送达',
          name: '3500',
          address: '98.5%'
        }],
        tableData2: [{
          date: '送达',
          name: '3500',
          address: '98.5%'
        }, {
          date: '送达',
          name: '3500',
          address: '98.5%'
        }, {
          date: '送达',
          name: '3500',
          address: '98.5%'
        }]
      
      }
      
    },
    methods: {
    

        tabH () {
          return 'height: 0'
        },
    
        tabP () {
          return 'padding: 10px 0px'
        },
    
        getRowClass () {
          return 'background:rgb(248, 248, 248); color: #000'
        },

        lad() {
          this.loading = true
        },
        //绘制饼状图
        initPie1() {
          
          var myChart = echarts.init(document.getElementById('echarts'));
          myChart.setOption({
            tooltip : {
              trigger: 'item',
              formatter: "{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['打开','未打开']
          },
            series: {
                type: 'pie',
            
                data: [
                    {name: '打开', value: 5212},
                    {name: '未打开', value: 2323},
                   
                ],
                color:['rgb(0, 102, 255)','#ccc']
            }
        });
        },
            
    
    

    },
    mounted() {
      this.initPie1()


    },
    created () {
      this.lad()
      
    }
  }