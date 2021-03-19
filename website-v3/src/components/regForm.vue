<template>
  <div class="registrationForm">
      <!-- <div class="name-surname-quter">
          <p :class="isMobileField" class="fields m-b-forms">
              <label class="name-label" for="signup-name"></label>
              <input :class="isMobileInput" class="name-input regForm-fonts label-quter-form outline-off" id="signup-name" type="text" placeholder="Имя">
          </p>
          <p :class="isMobileField" class="fields m-b-forms">
              <label class="surname-label" for="signup-surname"></label>
              <input :class="isMobileInput" class="surname-input regForm-fonts label-quter-form outline-off" id="signup-surname" type="text" placeholder="Фамилия">
          </p>
      </div> -->
      <div class="Reg-column-forms">
          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="email-label" for="signup-email"></label>
              <input :class="isMobileInput" class="email-input label-form outline-off" id="signup-email" type="email" name="email" placeholder="Почта">

          </p>
          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="password-label " for="signup-password"></label>
              <input :class="isMobileInput" class="password-input label-form outline-off" id="signup-password" type="password" name="password" placeholder="Пароль">
          </p>
          <p :class="isMobileField" class="fields auth-fields label-font m-b-forms">
              <label class="password-label " for="signup-password-repeat"></label>
              <input :class="isMobileInput" class="password-input label-form outline-off" id="signup-password-retype" type="password" placeholder="Повторите пароль">
          </p>

          <button @click="registerFetch()" :disabled="isDisabled" :class="isMobileButton" class="gen-button registration-submit outline-off reg-form-submit-p">Зарегистрироваться</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'regForm',
  props:{
    mobile: Boolean
  },
  methods:{
    registerFetch(){
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
        return await response
      }
      if(document.getElementById("signup-password").value !== document.getElementById("signup-password-retype").value){
        alert("Введённые пароли не совпадают.")
      }else{
        this.regProcessing = true;

        postData('/api/account/sign-up', '{"email":"'+ document.getElementById("signup-email").value +'", "password":"'+ document.getElementById("signup-password").value +'"}')
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
                printError("Данная почта уже используется либо пароль короче 6 символов. Ошибка: ")
                break;

              case 201:
                alert("Аккаунт успешно создан!")
                document.getElementById("signup-email").value = ""
                document.getElementById("signup-password").value = ""
                document.getElementById("signup-password-retype").value = ""
                this.$parent.hideRegForce();
                break;

              default:
                printError("Произошла серверная ошибка. ")
            }
            this.regProcessing = false
          })
          .catch((err) => {
            console.log(err);
            alert("Произошла ошибка")
            this.regProcessing = false
          })

      }
    },
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
        return this.regProcessing;
    }
  },
  data: function () {
    return{
      regProcessing: false,
    }
  }
}
</script>
