<template>
  <header class="header">
      <div class="header-div">
          <div class="logoName">WeightCalendar</div>


          <div class="left-side-menu">
                  <a class="menu-acc-circle menu-acc" href="#" id=""><div class="acc-circle "></div></a>
                  <!-- acc-circle создает форму круга потом можно будет вместо него впихнуть пнг
                  menu-acc за стили только в меню-баре -->
                  <p class="signOut-div"><a class="signout-a-image" href="#" ><img src="./assets/sign_out1.png" class="signout"></a></p>
          </div>



      </div>
  </header>

  <div class="middle-acc-div">
      <hr class="line-acc-circle">
      <div class="acc-circle m-for-head-lines-circle"></div>
      <!-- m-for-head-lines-circle   ::: marginы для центрального кружка -->
      <hr class="line-acc-circle">
  </div>

  <div class="userName"><p class="userName-text">Райн Гослинг</p></div>
  <!-- Далее в user.css будет лежать класс со стилем для активной кнопки :: .active-switcher-style -->
  <div class="switcher">
      <div class="input-weight-statistic"><div class="active-switcher-style"><p class="input-weight-text">Ввести данные</p></div></div>  <!-- пока для наглядности стиль тут есть -->
      <!-- роуты сюда докрутить :)) -->
      <div class="statistics"><p class="statistics-text">Статистика</p></div>
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
</template>

<script>
export default {
  name: 'secondPage'
}
</script>

<style>
@import "./css/user.css";

</style>
