<template>
  <div class="login-form" >

      <div class="login-form-centered">

          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="email-label" for="signin-email"></label>
              <input :class="isMobileInput" class="email-input label-form outline-off" id="signin-email" type="email" placeholder="Почта" name="email">
          </p>

          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="password-label " for="signin-password"></label>
              <input :class="isMobileInput" class="password-input label-form outline-off" id="signin-password" type="password" placeholder="Пароль" name="password">
          </p>
      </div>
      <div class="log-in-forgotten">
          <p :class="isMobileField" class="fields label-font -margin-not">
              <button class="gen-button login-submit outline-off" @click="loginFetch()" :disabled="isDisabled">Войти</button>
          </p>
          <a href="#" class="forgotten label-font" @click="showfpass()">Забыли пароль?</a>
      </div>
      <div :class="isMobileSwitch" class="registration-switch">
          <p href="#" v-if="!mobile" class="notation-h label-font">Если у вас нет аккаунта, тогда Вам нужно</p>
          <p href="#" v-if="mobile" class="mobile-notification-wide notation-h label-font">Если у вас нет аккаунта, тогда Вам нужно</p>
          <p href="#" v-if="mobile" class="mobile-notification-thin notation-h label-font">Если у вас нет аккаунта,<br>тогда Вам нужно</p>
          <a v-if="!mobile" class="switch-button gen-button" href="#" @click="this.$parent.hideLoginForce(); this.$parent.showReg()"><div :class="isMobileButton" class="registration-switch-div" ><p :class="isMobileButton" class="registration-switch-text">Зарегистрироваться</p></div></a>
          <router-link to="/MobileReg" v-if="mobile" :class="isMobileSwitch"><a :class="isMobileSwitch" class="switch-button gen-button" href="#"><div :class="isMobileButton" class="registration-switch-div" ><p :class="isMobileButton" class="registration-switch-text">Зарегистрироваться</p></div></a></router-link>
      </div>
    </div>
    <forgotPassword ref="fpass"/>
</template>

<script>
import forgotPassword from './forgotPassword.vue'

export default {
  name: 'loginForm',
  methods:{
    showfpass(){
      this.$refs.fpass.showPasswMod();
    },
    loginFetch(){
      async function postData(url = '', t) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          headers: {
            'Content-Type': 'application/json'
          },
          body: t // body data type must match "Content-Type" header
        });
        return await response // parses JSON response into native JavaScript objects
      }

      this.logProcessing = true;

      postData('/api/account/sign-in', '{"email":"'+ document.getElementById("signin-email").value +'", "password":"'+ document.getElementById("signin-password").value +'"}')
        .then((res) => {
          var err_txt;

          async function printError(txt) {
            res.json().then((value) => {
              err_txt = value.message
              alert(txt + err_txt)
            });
          }

          switch (res.status) {
            case 400:
              printError("Неверно введена почта. Ошибка: ")
              break;

            case 401:
              printError("Данный пользователь не найден. Ошибка: ")
              break;

            case 200:
              this.$parent.hideLoginForce();
              this.$router.push('/Profile')
              break;

            default:
              printError("Произошла серверная ошибка. ")
          }
          this.logProcessing = false

        })
        .catch((err) => {
          console.log(err);
          alert("Произошла ошибка.");
          this.logProcessing = false
        })

    },
  },
  components:{
    forgotPassword
  },
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
    },
    isDisabled: function(){
        return this.logProcessing;
    }
  }
}
</script>
