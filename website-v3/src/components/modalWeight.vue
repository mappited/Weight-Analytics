<template>
  <div class="modalWin modalWin-enter-weight" id="modalid" :style="appearWeight ? showMod : hideMod" @click="hideWeight()">
        <div class="modalWindow-enter-weight modalWindow" @click="outside = false">

          <div class="modalHeader">
              <h2 class="modalHeader__text-input-weight-form">Итак...<br>Ваш вес на сегодня?</h2>
          </div>
          <div class="modalBody">
              <div name="weight-submit">
                <div class="weight-submit-div" style="display:flex; padding-bottom:20px">
                  <input type="number" min="20" max ="120" placeholder="" step="0.1" value="23" id="mass-input" class="weight-input-text">
                  <button type="submit" value="Готово" class="weight-input-submit-button" @click="addWeight()">Готово</button>
                </div>
              </div>
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
    },
    hideWeightForce(){
      this.appearWeight = false
    },
    addWeight(){
      var wadd = document.getElementById('mass-input').value;
      this.$parent.weightAddFetch(wadd);
    }
  }
}
</script>
