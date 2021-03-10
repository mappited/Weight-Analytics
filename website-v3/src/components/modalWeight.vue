<template>
  <div class="modalWin modalWin-enter-weight" id="modalid" :style="appearWeight ? showMod : hideMod" @click="hideWeight()">
        <div class="modalWindow-enter-weight modalWindow" @click="outside = false">

          <div class="modalHeader">
              <h2 class="modalHeader__text">Итак...<br>Ваш вес за сегодня?</h2>
          </div>
          <div class="modalBody">

          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'modalWeight',
  data: function () {
    return{
      showMod: "display: block",
      hideMod: "display: none",
      appearWeight: false,
      outside: true
    }
  },
  methods: {
    hideWeight(){
      if (this.outside) {
        this.appearWeight = false
      }
      this.outside = true;
    },
    showWeight(){
      this.appearWeight = true
    }
  }
}
</script>
