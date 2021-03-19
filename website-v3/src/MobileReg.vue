<template>
  <body>
    <header class="header">
        <div class="header-div">
            <!-- mobile proto -->
            <div class="mobile-logo-container"><div class="logoNameMobile">Weight<br>Calendar</div></div>
            <div class="logoName">WeightCalendar</div>
        </div>
    </header>

    <div class="mobileLogin modeRegForm">
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
