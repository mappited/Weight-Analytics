<template>
  <div :style="appearPasswMod ? showMod : hideMod" class="modalWin modalWin-forgotten-password" @click="hidePasswMod()">
      <div class="modalWindow-forgotten-password modalWindow" @click="outside = false">

        <div class="modalHeader">
            <h2 class="modalHeader__text-forgot-password">Забыли пароль?</h2>
        </div>
        <div class="modalBody">
            <h3 class="modalBody-forgot-password">Обратитесь к системному администратору</h3>
            <h3 class="modalBody-forgot-password">support@weightcalendar.ru</h3>
        </div>
      </div>
</div>
</template>

<script>
export default {
  name: 'appearPasswMod',
  data: function () {
    return{
      showMod: "display: block",
      hideMod: "display: none",
      appearPasswMod: false,
      outside: true
    }
  },
  methods: {
    hidePasswMod(){
      if (this.outside) {
        this.appearPasswMod = false
      }
      this.outside = true;
    },
    showPasswMod(){
      this.appearPasswMod = true
    }
  }
}
</script>
