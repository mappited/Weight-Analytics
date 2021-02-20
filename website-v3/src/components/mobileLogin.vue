<template>
  <div class="mobileLogin">
  <h2 class="mobileHeaderText">Добро<br>Пожаловать</h2>
    <loginForm :mobile='true'></loginForm>
  </div>
</template>

<script>
import loginForm from './loginForm.vue'

export default {
  name: 'mobileLogin',
  components:{
    loginForm
  }
}
</script>
