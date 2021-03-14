<template>
  <div class="modalWin" id="modalid" :style="appearDate ? showMod : hideMod" @click="hideDate()">
        <div class="modalWindow" @click="outside = false">

          <div class="modalHeader">
              <h2 class="modalHeader__text-input-weight-form">Итак...<br>дата?</h2>
          </div>
          <div class="modalBody">

          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'modalDate',
  data: function () {
    return{
      showMod: "display: block",
      hideMod: "display: none",
      appearDate: false,
      outside: true
    }
  },
  methods: {
    hideDate(){
      if (this.outside) {
        this.appearDate = false
      }
      this.outside = true;
    },
    showDate(){
      this.appearDate = true
    }
  }
}
</script>
