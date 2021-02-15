<template>
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
          <p class="fields auth-fields label-font m-b-forms">
              <label class="email-label" for="signin-email"></label>
              <input class="email-input label-form outline-off" id="signin-email" type="email" placeholder="Почта">

          </p>
          <p class="fields auth-fields label-font m-b-forms">
              <label class="password-label " for="signin-password"></label>
              <input class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Пароль">
          </p>
          <p class="fields auth-fields label-font m-b-forms">
              <label class="password-label " for="signin-password"></label>
              <input class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Повторите пароль">
          </p>

          <input class="registration-submit outline-off label-form " type="submit" value="Зарегистрироваться">
      </div>
  </form>
</template>

<script>
export default {
  name: 'regForm',
  props:{
    mobile: Boolean
  }
}
</script>
