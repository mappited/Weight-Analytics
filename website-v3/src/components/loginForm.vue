<template>
  <form action="" class="login-form" >

      <div class="login-form-centered">

          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="email-label" for="signin-email"></label>
              <input :class="isMobileInput" class="email-input label-form outline-off" id="signin-email" type="email" placeholder="Почта">
          </p>

          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="password-label " for="signin-password"></label>
              <input :class="isMobileInput" class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Пароль">
          </p>
      </div>
      <div class="log-in-forgotten">
          <p :class="isMobileField" class="fields label-font -margin-not">
              <input class="login-submit outline-off " type="submit" value="Войти">
          </p>
          <a href="#" class="forgotten label-font">Забыли пароль?</a>
      </div>
      <div :class="isMobileSwitch" class="registration-switch">
          <p href="#" v-if="!mobile" class="notation-h label-font">Если у вас нет аккаунта, тогда Вам нужно</p>
          <p href="#" v-if="mobile" class="mobile-notification-wide notation-h label-font">Если у вас нет аккаунта, тогда Вам нужно</p>
          <p href="#" v-if="mobile" class="mobile-notification-thin notation-h label-font">Если у вас нет аккаунта,<br>тогда Вам нужно</p>
          <a v-if="!mobile" class="switch-button" href="#"><div :class="isMobileButton" class="registration-switch-div" ><p :class="isMobileButton" class="registration-switch-text">Зарегистрироваться</p></div></a>
          <router-link to="/MobileReg" v-if="mobile" :class="isMobileSwitch"><a :class="isMobileSwitch" class="switch-button" href="#"><div :class="isMobileButton" class="registration-switch-div" ><p :class="isMobileButton" class="registration-switch-text">Зарегистрироваться</p></div></a></router-link>
      </div>
    </form>
</template>

<script>
export default {
  name: 'loginForm',
  props:{
    mobile: Boolean
  },
  computed:{
    isMobileField: function(){
      if(this.mobile){
        return ('mobile-fields')
      }else{
        return null;
      }
    },
    isMobileInput: function(){
      if(this.mobile){
        return ('mobile-input')
      }else{
        return null;
      }
    },
    isMobileButton: function(){
      if(this.mobile){
        return ('mobile-button-scale')
      }else{
        return null;
      }
    },
    isMobileSwitch: function(){
      if(this.mobile){
        return ('mobile-switch')
      }else{
        return null;
      }
    }
  }
}
</script>
