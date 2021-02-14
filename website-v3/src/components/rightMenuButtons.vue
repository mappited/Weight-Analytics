<template>
  <div class="right-menu-buttons">
          <a class="login-block transition" href="#" id="modalOpen" ><div class="login" @click="appearLog = true">Войти</div></a>
          <a class="registration-block transition" href="#" id="modalOpen-registration" ><div class="register" @click="appearReg = true">Регистрация</div></a>
  </div>
  <div class="modalWin" id="modalid" :style="appearLog ? showMod : hideMod" @click="hideLogin()">
        <div class="modalWindow" @click="outside = false">

          <div class="modalHeader">
              <h2 class="modalHeader__text">Добро<br>Пожаловать</h2>
          </div>
          <div class="modalBody">
              <form action="" class="login-form" >

                  <div class="login-form-centered">

                      <p class="fields label-font m-b-forms">
                          <label class="email-label" for="signin-email"></label>
                          <input class="email-input label-form outline-off" id="signin-email" type="email" placeholder="Почта">

                      </p>

                      <p class="fields label-font m-b-forms">
                          <label class="password-label " for="signin-password"></label>
                          <input class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Пароль">
                      </p>
                  </div>
                  <div class="log-in-forgotten">
                      <p class="fields label-font -margin-not">
                          <input class="login-submit outline-off " type="submit" value="Войти">
                      </p>
                      <a href="#" class="forgotten label-font">Забыли пароль?</a>
                  </div>
                  <div class="registration-switch">
                      <p href="#" class="notation-h label-font">Если у вас нет аккаунта, тогда Вам нужно</p>
                      <a class="switch-button" href="#"><div class="registration-switch-div" ><p class="registration-switch-text">Зарегистрироваться</p></div></a>
                  </div>
                </form>
          </div>
        </div>
  </div>
  <div class="modalWinReg" id="modalid-registration" :style="appearReg ? showMod : hideMod" @click="hideReg()">
      <div class="modalWindowReg" @click="outside = false">

          <div class="modalHeaderReg">
              <h2 class="modalHeader__textReg">Регистрация</h2>
          </div>
          <div class="modalBodyReg">
              <form action="" class="registrationForm">
                  <div class="name-surname-quter">
                      <p class="fields m-b-forms">
                          <label class="name-label" for="signup-name"></label>
                          <input class="name-input regForm-fonts label-quter-form outline-off" id="signup-name" type="text" placeholder="Имя">
                      </p>
                      <p class="fields m-b-forms">
                          <label class="surname-label" for="signup-surname"></label>
                          <input class="surname-input regForm-fonts label-quter-form outline-off" id="signup-surname" type="text" placeholder="Фамилия">
                      </p>
                  </div>
                  <div class="Reg-column-forms">
                      <p class="fields label-font m-b-forms">
                          <label class="email-label" for="signin-email"></label>
                          <input class="email-input label-form outline-off" id="signin-email" type="email" placeholder="Почта">

                      </p>
                      <p class="fields label-font m-b-forms">
                          <label class="password-label " for="signin-password"></label>
                          <input class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Пароль">
                      </p>
                      <p class="fields label-font m-b-forms">
                          <label class="password-label " for="signin-password"></label>
                          <input class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Повторите пароль">
                      </p>

                      <input class="registration-submit outline-off label-form " type="submit" value="Зарегистрироваться">
                  </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'rightMenuButtons',
  data: function () {
    return{
      showMod: "display: block",
      hideMod: "display: none",
      appearLog: false,
      appearReg: false,
      close: false
    }
  },
  methods: {
    hideLogin(){
      if (this.outside) {
        this.appearLog = false
      }
      this.outside = true;
    },
    hideReg(){
      if (this.outside) {
        this.appearReg = false
      }
      this.outside = true;
    }
  }
}


</script>
