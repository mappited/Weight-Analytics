<template>
  <div class="right-menu-buttons">
          <a class="login-block transition" href="#" id="modalOpen" ><div class="login" @click="appearLog = true">Войти</div></a>
          <a class="registration-block transition" href="#" id="modalOpen-registration" @click="appearReg = true"><div class="register">Регистрация</div></a>
  </div>
  <div class="modalWin" id="modalid" :style="appearLog ? showMod : hideMod" @click="hideLogin()">
        <div class="modalWindow" @click="outside = false">

          <div class="modalHeader">
              <h2 class="modalHeader__text">Добро<br>Пожаловать</h2>
          </div>
          <div class="modalBody">
              <loginForm></loginForm>
          </div>
        </div>
  </div>
  <div class="modalWinReg" id="modalid-registration" :style="appearReg ? showMod : hideMod" @click="hideReg()">
      <div class="modalWindowReg" @click="outside = false">

          <div class="modalHeaderReg">
              <h2 class="modalHeader__textReg">Регистрация</h2>
          </div>
          <div class="modalBodyReg">
            <regForm></regForm>
          </div>
      </div>
  </div>
</template>

<script>
import loginForm from './loginForm.vue'
import regForm from './regForm.vue'

export default {
  name: 'rightMenuButtons',
  components:{
    loginForm,
    regForm
  },
  data: function () {
    return{
      showMod: "display: block",
      hideMod: "display: none",
      appearLog: false,
      appearReg: false,
      close: true
    }
  },
  methods: {
    hideLogin(){
      if (this.outside) {
        this.appearLog = false
      }
      this.outside = true;
    },
    hideReg(){
      if (this.outside) {
        this.appearReg = false
      }
      this.outside = true;
    },
    hideLoginForce(){
      this.appearLog = false
    },
    hideRegForce(){
      this.appearReg = false
    },
    showReg(){
      this.appearReg = true
    },
    showLogin(){
      this.appearLogin = true
    }
  }
}


</script>
