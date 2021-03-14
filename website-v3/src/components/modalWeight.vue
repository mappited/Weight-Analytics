<template>
  <div class="modalWin modalWin-enter-weight" id="modalid" :style="appearWeight ? showMod : hideMod" @click="hideWeight()">
        <div class="modalWindow-enter-weight modalWindow" @click="outside = false">

          <div class="modalHeader">
              <h2 class="modalHeader__text-input-weight-form">Итак...<br>Ваш вес на сегодня?</h2>
          </div>
          <div class="modalBody">
              <form action="/api" name="weight-submit" method="POST">
                <div class="weight-submit-div" style="display:flex; padding-bottom:20px">
                  <input type="number" min="20" max ="120" placeholder="" step="0.1" value="23" class="weight-input-text">
                  <input type="submit" value="Готово" class="weight-input-submit-button">
                </div>
              </form>
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
