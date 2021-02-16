<template>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport'
       content='width=device-width, initial-scale=1.0, maximum-scale=1.0,
       user-scalable=0' >

  </head>

  <body>

    <div class="mobileLogin">
      <h2 class="mobileHeaderText">Регистрация</h2>


          <form action="" class="registrationForm">
              <div class="name-surname-quter">
                  <p class="mobile-fields fields m-b-forms">
                      <label class="name-label" for="signup-name"></label>
                      <input class="mobile-input name-input-mobile regForm-fonts label-quter-form outline-off" id="signup-name" type="text" placeholder="Имя">
                  </p>
                  <p class="mobile-fields fields m-b-forms">
                      <label class="surname-label" for="signup-surname"></label>
                      <input class="mobile-input surname-input-mobile regForm-fonts label-quter-form outline-off" id="signup-surname" type="text" placeholder="Фамилия">
                  </p>
              </div>
              <div class="Reg-column-forms">
                  <p class="mobile-fields fields label-font m-b-forms">
                      <label class="email-label" for="signin-email"></label>
                      <input class="mobile-input email-input label-form outline-off" id="signin-email" type="email" placeholder="Почта">

                  </p>
                  <p class="mobile-fields fields label-font m-b-forms">
                      <label class="password-label " for="signin-password"></label>
                      <input class="mobile-input password-input label-form outline-off" id="signin-password" type="password" placeholder="Пароль">
                  </p>
                  <p class="mobile-fields fields label-font m-b-forms">
                      <label class="password-label " for="signin-password"></label>
                      <input class="mobile-input password-input label-form outline-off" id="signin-password" type="password" placeholder="Повторите пароль">
                  </p>

                  <input class="mobile-button-scale registration-submit outline-off label-form " type="submit" value="Зарегистрироваться">
              </div>
          </form>


    </div>


  </body>
</template>

<script>
export default {
  name: 'MobileReg',
  components: {},
  title: 'WeightCalendar'
}
</script>


<style>
@import "./css/forms.css";
@import "./css/mobilesupport.css";
@import "./css/modal.css";
@import "./css/reset.css";
@import "./css/style.css";
@import "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap";
@import "./fonts/SFPro/stylesheet.css";
/*@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js";*/
</style>
