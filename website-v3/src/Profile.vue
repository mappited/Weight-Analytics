<template>
  <header class="header">
      <div class="header-div-second-page">
          <div class="logoName">WeightCalendar</div>


          <div class="left-side-menu-mobile left-side-menu">
                  <a class="menu-acc-circle-mobile menu-acc-circle menu-acc" href="#" id=""><div class="acc-circle "></div></a>
                  <!-- acc-circle создает форму круга потом можно будет вместо него впихнуть пнг
                  menu-acc за стили только в меню-баре -->
                  <router-link to="/" class="signOut-div-mobile signOut-div"><a class="signout-a-image"><img src="./assets/sign_out1.png" class="signout"></a></router-link>
          </div>



      </div>
  </header>

  <middleAccDiv/>

  <div class="userName"><p class="userName-text-mobile userName-text">Райн Гослинг</p></div>
  <!-- Далее в user.css будет лежать класс со стилем для активной кнопки :: .active-switcher-style -->


  <div class="chart-flexbox">
    <div class="add-weight-button-container"> <div class="add-weight-button" @click="showWeight()" style="cursor:pointer">+ Добавить Вес</div> </div>

    <div class="chart-container">
      <div class="chart-name">График изменения веса</div>
      <demoChart/>
    </div>

  </div>

  <modalWeight ref="mWeight"/>

</template>


<script>
import middleAccDiv from './components/middleAccDiv.vue'
import demoChart from './charts/demochart.vue'
import modalWeight from './components/modalWeight.vue'

export default {
  name: 'secondPage',
  components:{
    middleAccDiv,
    demoChart,
    modalWeight
  },
  methods:{
    showWeight(){
      this.$refs.mWeight.showWeight();
    }
  }
}
</script>

<style scoped>
@import "./css/usermobile.css";

</style>
