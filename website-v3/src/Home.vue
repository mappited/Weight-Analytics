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

        <header class="header">
            <div class="header-div">
                <!-- mobile proto -->
                <div class="mobile-logo-container"><div class="logoNameMobile">Weight<br>Calendar</div></div>
                <div class="logoName">WeightCalendar</div>
                <rightMenuButtons/>
            </div>
        </header>
        <h1 class="firstMotivateText">Отслеживайте свой вес!</h1>
        <h2 class="secondMotivateText">Соблюдаете диету или занимаетесь спортом? WeightCalendar идеально подойдет для вас!</h2>

        <!-- <div class="overlay" id="overlay-modal"></div> -->
        <mobileLogin/>

    </body>
    <footer>
      <img src="./img/sketchpngc.png" class="mainPng">
    </footer>

</template>

<script>
import mobileLogin from './components/mobileLogin.vue'
import rightMenuButtons from './components/rightMenuButtons.vue'

export default {
  name: 'App',
  components: {
    mobileLogin,
    rightMenuButtons
  },
  title: 'WeightCalendar',
  methods: {

  }
}

</script>


<style scoped>
@import "./css/forms.css";
@import "./css/mobilesupport.css";
@import "./css/modal.css";
@import "./css/reset.css";
@import "./css/style.css";
@import "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap";
@import "./fonts/SFPro/stylesheet.css";
</style>
