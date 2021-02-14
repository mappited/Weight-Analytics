<template>
  <div class="mobileLogin">
  <h2 class="mobileHeaderText">Добро<br>Пожаловать</h2>
  <form action="" class="login-form" >

      <div class="login-form-centered">

          <p class="mobile-fields fields label-font m-b-forms">
              <label class="email-label" for="signin-email"></label>
              <input class="mobile-input email-input label-form outline-off" id="signin-email" type="email" placeholder="Почта">

          </p>

          <p class="mobile-fields fields label-font m-b-forms">
              <label class="password-label " for="signin-password"></label>
              <input class="mobile-input password-input label-form outline-off" id="signin-password" type="password" placeholder="Пароль">
          </p>
      </div>
      <div class="log-in-forgotten">
          <p class="mobile-fields fields label-font -margin-not">
              <input class="login-submit outline-off " type="submit" value="Войти">
          </p>
          <a href="#" class="forgotten label-font">Забыли пароль?</a>
      </div>
      <div class="mobile-switch registration-switch">
          <p href="#" class="mobile-notification-wide notation-h label-font">Если у вас нет аккаунта, тогда Вам нужно</p>
          <p href="#" class="mobile-notification-thin notation-h label-font">Если у вас нет аккаунта,<br>тогда Вам нужно</p>
          <a class="mobile-button-scale switch-button" href="#"><div class="mobile-button-scale registration-switch-div" ><p class="mobile-button-scale registration-switch-text">Зарегистрироваться</p></div></a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'mobileLogin',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
