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
          <regForm :mobile='true'></regForm>
    </div>


  </body>
</template>

<script>
import regForm from './components/regForm.vue'

export default {
  name: 'MobileReg',
  components: {
    regForm
  },
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
