<template>
  <header class="header">
      <div class="header-div-second-page">
          <div class="logoName">WeightCalendar</div>


          <div class="left-side-menu-mobile left-side-menu">
                  <a class="menu-acc-circle-mobile menu-acc-circle menu-acc" href="#" id=""><div class="acc-circle "></div></a>
                  
                  <router-link to="/" class="signOut-div-mobile signOut-div"><a class="signout-a-image"><img src="./assets/sign_out1.png" class="signout"></a></router-link>
          </div>



      </div>
  </header>

  <middleAccDiv/>

  <div class="userName"><p class="userName-text-mobile userName-text">Райн Гослинг</p></div>


  <div class="chart-flexbox">
    <div class="add-weight-button-container"> <div class="add-weight-button" @click="showWeight()" style="cursor:pointer">+ Добавить Вес</div> </div>

    <div class="chart-container">
      <div class="flex-container-name-n-choseDate">
        <div class="chart-name">График изменения веса</div>
        <div class="switchDate-button-container left-margin-container-chart"><div class="switchDate-button" @click="showDataSwitch()" style="cursor:pointer">Выбрать дату</div></div>
      </div>
      <demoChart/>
    </div>

  </div>

  <modalWeight ref="mWeight"/>
  <modalDate ref="mDate"/>

</template>


<script>
import middleAccDiv from './components/middleAccDiv.vue'
import demoChart from './charts/demochart.vue'
import modalWeight from './components/modalWeight.vue'
import modalDate from './components/modalDate.vue'

export default {
  name: 'secondPage',
  components:{
    middleAccDiv,
    demoChart,
    modalWeight,
    modalDate
  },
  methods:{
    showWeight(){
      this.$refs.mWeight.showWeight();
    },
    showDataSwitch(){
      this.$refs.mDate.showDate()
    }
  }
}
</script>

<style scoped>
@import "./css/usermobile.css";

</style>
