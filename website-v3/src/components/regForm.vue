<template>
  <form action="" class="registrationForm">
      <div class="name-surname-quter">
          <p :class="isMobileField" class="fields m-b-forms">
              <label class="name-label" for="signup-name"></label>
              <input :class="isMobileInput" class="name-input regForm-fonts label-quter-form outline-off" id="signup-name" type="text" placeholder="Имя">
          </p>
          <p :class="isMobileField" class="fields m-b-forms">
              <label class="surname-label" for="signup-surname"></label>
              <input :class="isMobileInput" class="surname-input regForm-fonts label-quter-form outline-off" id="signup-surname" type="text" placeholder="Фамилия">
          </p>
      </div>
      <div class="Reg-column-forms">
          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="email-label" for="signin-email"></label>
              <input :class="isMobileInput" class="email-input label-form outline-off" id="signin-email" type="email" placeholder="Почта">

          </p>
          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="password-label " for="signin-password"></label>
              <input :class="isMobileInput" class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Пароль">
          </p>
          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="password-label " for="signin-password"></label>
              <input :class="isMobileInput" class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Повторите пароль">
          </p>

          <router-link to="/" @click="this.$parent.hideRegForce();this.$parent.showLogin()" :class="isMobileButton" class="registration-submit outline-off" type="submit" value="Зарегистрироваться">Зарегистрироваться</router-link>
      </div>
  </form>
</template>

<script>
export default {
  name: 'regForm',
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
