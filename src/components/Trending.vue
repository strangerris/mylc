<script setup lang="ts">
import * as echarts from "echarts";
import axios from "@/utils/request";

import {useSystemStore} from "@/stores/system";
import {Icon} from '@iconify/vue'
const system = useSystemStore()
const {locale, theme} = storeToRefs(system)


let echart = echarts;

// x轴，仅标题，[[单周中文列表]，[单周英文列表],[双周中文列表]，[双周英文列表]]
let xContest = [[],[],[],[]]

// 当前页面，0是单周，1是双周
let curContest = 0

// 数据，Q3，Q4信息
let singleQ3 = []
let singleQ4 = []
let biQ3 = []
let biQ4 = []
axios.get('/single.json')
    .then(function (res) {
      const data = res.data
      data.forEach((item) => {
        let obj = {
          value: item.Rating,
          url: item.TitleSlug
        }
        if (item.ProblemIndex === 'Q3') {
          singleQ3.push(obj)
          xContest[0].push(item.Contest)
          xContest[1].push(item.ContestEN)
        }else if (item.ProblemIndex === 'Q4'){
          singleQ4.push(obj)
        }
      })
      initChart();
    })

axios.get('/bi.json')
    .then(function (res) {
      const data = res.data
      data.forEach((item) => {
        let obj = {
          value: item.Rating,
          url: item.TitleSlug
        }
        if (item.ProblemIndex === 'Q3') {
          biQ3.push(obj)
          xContest[2].push(item.Contest)
          xContest[3].push(item.ContestEN)
        }else if (item.ProblemIndex === 'Q4'){
          biQ4.push(obj)
        }
      })
    })


let chart = null

function initChart() {
  chart = echart.init(document.getElementById("myEcharts"));
  // 把配置和数据放这里
  chart.setOption({
    legend: {
      // 根据主题颜色设置文字配色
      textStyle: {
        color: theme.value === 'dark' ? '#D6D6D6' : 'black'
      }
    },
    // 鼠标划过时显示列的具体数据
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    // 横轴，根据中英文选择相应的列表，根据主题更改文字颜色
    xAxis: {
        type: 'category',
        data: locale.value === 'ZH' ? xContest[0] : xContest[1],
        axisLabel : {
          color: theme.value === 'dark' ? '#D6D6D6' : 'black'
      }
    },
    // y轴分数
    yAxis: {
      type:'value',
      min: 1000,
      axisLabel : {
        color: theme.value === 'dark' ? '#D6D6D6' : 'black'
      }
    },
    // 线性图
    series: [
      {
        name:'Q3',
        type: 'line',
        smooth: true,
        lineStyle:{color:'#ffc01e'},
        data: singleQ3
      },
      {
        name:'Q4',
        type: 'line',
        smooth: true,
        lineStyle:{color:'#ff375f'},
        data: singleQ4
      },
    ],
  });

// 根据中英文切换显示文字
watch(locale,(newValue, oldValue)=>{
    chart.setOption({
      xAxis: {
        type: 'category',
        data: locale.value === 'ZH' ? xContest[0+curContest*2] : xContest[1+curContest*2]
      },
    })
})

watch(theme,(newValue, oldValue)=>{
    chart.setOption({
      xAxis: {
        axisLabel : {
          color: theme.value === 'dark' ? '#D6D6D6' : 'black'
        }
      },
      yAxis: {
        axisLabel : {
          color: theme.value === 'dark' ? '#D6D6D6' : 'black'
        }
      },
    })
  })
  // 为每个数据添加超链接，跳转到响应的页面
  chart.on('click', function (e) {
    if (locale.value === 'ZH')
      window.open('https://www.leetcode.cn/problems/' + e.data.url);
    else
      window.open('https://www.leetcode.com/problems/' + e.data.url);
  });
}
// 单双周切换
const changeContest = () => {
  curContest = (curContest + 1) % 2
  chart.setOption({
    legend:{},
    xAxis: {
      type: 'category',
      data: locale.value === 'ZH' ? xContest[0+curContest*2] : xContest[1+curContest*2],
    },
    yAxis: {
      type:'value',
      min: 1000,
    },
    series: [
      {
        name:'Q3',
        type: 'line',
        smooth: true,
        lineStyle:{color:'#ffc01e'},
        data: curContest === 0 ? singleQ3 : biQ3
      },
      {
        name:'Q4',
        type: 'line',
        smooth: true,
        lineStyle:{color:'#ff375f'},
        data: curContest === 0 ? singleQ4 : biQ4
      },
    ],
  });
}
</script>

<template>
  <div class="echarts-wrapper">
    <div id="myEcharts"></div>
    <a-button @click="changeContest" class="btn">
      <template #icon>
        <Icon icon="ps:switch" />
      </template>
    </a-button>
  </div>

</template>

<style scoped>
  .echarts-wrapper {
    margin: 40px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #myEcharts {
    width: 100%;
    height: 750px;
  }
  .btn{
    width: 50px;
  }
</style>