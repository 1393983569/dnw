<template>
  <div>
    <numberOfPeople style="margin-bottom: 20px"/>
    <barDiagram ref="barDiagram" style="margin-bottom: 20px"/>
    <sourceOfRevenue/>
    <projectPlan/>
    <channelClassification/>
    <statisticsClient/>
  </div>
</template>

<script>
import barDiagram from './components/barDiagram'
import numberOfPeople from './components/numberOfPeople'
import sourceOfRevenue from './components/sourceOfRevenue'
import projectPlan from './components/projectPlan'
import channelClassification from './components/channelClassification'
import statisticsClient from './components/statisticsClient'
export default {
  name: "statistics",
  components: {
    barDiagram,
    numberOfPeople,
    sourceOfRevenue,
    projectPlan,
    channelClassification,
    statisticsClient
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
