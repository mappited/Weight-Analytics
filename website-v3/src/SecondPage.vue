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
  <div class="switcher">
      <div class="input-weight-statistic"><div class="active-switcher-style"><p class="input-weight-text">Ввести данные</p></div></div>  <!-- пока для наглядности стиль тут есть -->
      <!-- роуты сюда докрутить :)) -->
      <div class="statistics"><div class="inactive-switcher-style"><p class="statistics-text">Статистика</p></div></div>
      <!-- и сюда тоже -->
  </div>

  <div class="centered-div-inputs">
      <div class="gradient-div">
          <p class="gradient-div-text">Введите<br>свой вес<br>за сегодня!</p>
          <form action="" class="input-weight-form">
              <label class="input-label" for="weight-label"></label>
              <input class="input-label-form outline-off" id="weight-label">
          </form>
      </div>
  </div>

  <demoChart/>
</template>


<script>
import middleAccDiv from './components/middleAccDiv.vue'
import demoChart from './charts/demochart.vue'

export default {
  name: 'secondPage',
  components:{
    middleAccDiv,
    demoChart
  }
}
</script>

<style scoped>
@import "./css/usermobile.css";

</style>
