<template>
  <div class="modalWin" id="modalid" :style="appearDate ? showMod : hideMod" @click="hideDate()">
        <div class="modalWindow" @click="outside = false">

          <div class="modalHeader" style="display:flex; justify-content: space-between;">

                <a href="#"  @click="openbox('box1')" class="fixationDate-button-link active-link-delStyles">Заданные интервалы</a>



                <a href="#" @click="openbox('box2')" class="chooseDate-button-link active-link-delStyles">Ввести дату</a>
          </div>
          <div class="modalBody">
            <div class="content-body">
                <div class="chooseContent-block" id="box1" style="display: none;">
                  <div class="show-chosenBlock1"></div>

                  <div class="contentOf-Blocks" >
                    <h2 class="Blocks-Text">Выберите предустановленные<br>периоды</h2>
                    <div class="BlockFixation-div">
                      <div action="/profile" name="date">
                        <div class="fixationList">
                            <select name="name" id="" class="fixationSelect">
                              <option value="1" class="Select-OP" selected>1 неделя</option>
                              <option value="2" class="Select-OP">2 недели</option>
                              <option value="1" class="Select-OP">1 месяц</option>
                              <option value="6" class="Select-OP">6 месяцев</option>
                              <option value="1" class="Select-OP">1 год</option>
                            </select>
                            <button type="submit" value="Выбрать" class="fixationSubmit-button outline-off" @click="this.$parent.weightFetch();">Выбрать</button>
                          </div>
                      </div>
                    </div>
                  </div>

                </div>






                <div class="chooseContent-block" id="box2" style="display: none;">
                  <div class="show-chosenBlock2"></div>
                    <div class="contentOf-Blocks" >
                    <h2 class="Blocks-Text">Выберите даты начала<br>и конца периода</h2>
                    <div class="BlockFixation-div">
                      <div action="/profile" name="date">
                        <div class="fixationList">
                          <div class="calendars-block">
                              <div class="flexCalendars-block"><label for="start" class="labelForm-date">Начало измерений<input type="date" name="date" id="start" required class="styleDate-input"></label></div>

                              <div class="flexCalendars-block"><label for="end" class="labelForm-date">Конец измерений<input type="date" name="date" id="end" required class="styleDate-input"></label></div>
                          </div>
                          <button type="submit" value="Выбрать" class="fixationSubmit-button outline-off" @click="this.$parent.weightFetch();">Выбрать</button>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
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
    hideDateForce(){
      this.appearDate = false
    },
    showDate(){
      this.appearDate = true
    },
    openbox(id){
    let all = document.querySelectorAll(".chooseContent-block");
    for (let i = 0; i < all.length; i++) {
      if (all[i].id == id) {
        all[i].style.display = (all[i].style.display == 'none')? 'block' : 'none';

      } else {
        all[i].style.display = 'none';

      }
    }


    },
  }
}
</script>
