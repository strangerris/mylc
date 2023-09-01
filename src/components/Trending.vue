<script setup lang="ts">
import * as echarts from "echarts";
import axios from "@/utils/request";

import {useSystemStore} from "@/stores/system";
import {Icon} from '@iconify/vue'
const system = useSystemStore()
const {locale, theme} = storeToRefs(system)


let echart = echarts;

// x轴，[[单周中文列表]，[单周英文列表],[双周中文列表]，[双周英文列表]]
let xContest = [[],[],[],[]]

// 当前页面，0是单周，1是双周
let curContest = 0

// y轴，Q3，Q4信息
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

// 基础配置一下Echarts
let chart = null

function initChart() {
  chart = echart.init(document.getElementById("myEcharts"));
  // 把配置和数据放这里
  chart.setOption({
    legend: {
      textStyle: {
        color: theme.value === 'dark' ? '#D6D6D6' : 'black'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' },
    },
    xAxis: {
        type: 'category',
        data: locale.value === 'ZH' ? xContest[0] : xContest[1],
        axisLabel : {
          color: theme.value === 'dark' ? '#D6D6D6' : 'black'
      }
    },
    yAxis: {
      type:'value',
      min: 1000,
      axisLabel : {
        color: theme.value === 'dark' ? '#D6D6D6' : 'black'
      }
    },
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
    width: 100%;
  }
  #myEcharts {
    width: 1800px;
    height: 750px;
  }
  .btn{
    width: 50px;
  }
</style>