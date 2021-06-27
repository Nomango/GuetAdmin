<template>
  <div class="home-container">
    <panel-group :list="panelData" />
    <div class="chart-wrapper">
      <pie-chart :list="pieChartData" />
    </div>
  </div>
</template>

<script>
import PanelGroup from './PanelGroup'
import PieChart from './PieChart'
import { getDashBoard } from '@/api/dashboard'

export default {
  name: 'Home',
  components: {
    PanelGroup,
    PieChart
  },
  data() {
    return {
      pieChartData: [],
      panelData: []
    }
  },

  created() {
    // 这里初始化的数据免监听
    this.defaultPanelKey = [
      { text: "浏览量（PV）", key: 'pv', icon: "peoples" },
      { text: "访客数（UV）", key: 'uv', icon: "uv" },
      { text: "总PV", key: 'total_pv', icon: "total_pv" },
      { text: "总UV", key: 'total_uv', icon: "total_uv" }
    ]
    this.getDashboardData()
  },

  methods: {
    async getDashboardData() {
      const res = await getDashBoard()
      const { workCount = {}, ...restProp } = res.data || {}
      const schools = workCount.school || {}

      this.panelData = this.defaultPanelKey.map(panelItem => {
        return {
          ...panelItem,
          value: restProp[panelItem.key] || 0
        }
      })

      this.pieChartData = Object.keys(schools).map(key => {
        return {
          name: key,
          value: schools[key] || 0
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgb(240, 242, 245);
  padding: 32px;
}

.chart-wrapper {
  margin-bottom: 32px;
  background: rgb(255, 255, 255);
  padding: 16px 16px 0px;
}
</style>
