<template>
  <div class="modalWin" id="modalid" :style="appearDate ? showMod : hideMod" @click="hideDate()">
        <div class="modalWindow" @click="outside = false">

          <div class="modalHeader" style="display:flex;">
              <div class="fixationDate-button">
                    <a href="#"  onclick="openbox('box1'); return false" class="fixationDate-button-link active-link-delStyles">Заданные интервалы</a>
                </div>

                <div class="chooseDate-onCalendar">
                    <a href="#" onclick="openbox('box2'); return false" class="chooseDate-buyyon-link active-link-delStyles">Ввести дату</a>
                </div>
          </div>
          <div class="modalBody" >
            <div class="content-body">
                <div class="chooseContent-block" id="box1" style="display: none;">1</div>
                <div class="chooseContent-block" id="box2" style="display: none;">2</div>
            </div>
    
            
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
