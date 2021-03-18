<template>
  <header class="header">
      <div class="header-div-second-page">
          <div class="logoName">WeightCalendar</div>


          <div class="left-side-menu-mobile left-side-menu">
                  <a class="menu-acc-circle-mobile menu-acc-circle menu-acc" href="#" id=""><div class="acc-circle "></div></a>

                  <div class="gen-button signOut-div-mobile signOut-div" @click="logoutFetch()"><a class="signout-a-image"><img src="./assets/sign_out1.png" class="signout"></a></div>
          </div>



      </div>
  </header>

  <middleAccDiv/>

  <div class="userName"><p class="userName-text-mobile userName-text">Райн Гослинг</p></div>


  <div class="chart-flexbox">
    <div class="add-weight-button-container"> <div class="add-weight-button" @click="showWeight()" style="cursor:pointer">+ Добавить Вес</div> </div>

    <div class="chart-container" @click="chartAddon()">
      <div class="flex-container-name-n-choseDate">
        <div class="chart-name" ref="chartWeight">График изменения веса</div>
        <div class="switchDate-button-container left-margin-container-chart"><div class="switchDate-button" @click="showDataSwitch()" style="cursor:pointer">Выбрать дату</div></div>
      </div>
      <demoChart :x-axis-data="xAxisData" :y-axis-data="yAxisData" />
    </div>

  </div>

  <modalWeight ref="mWeight"/>
  <modalDate ref="mDate"/>

</template>


<script>
import middleAccDiv from './components/middleAccDiv.vue'
import demoChart from './charts/demochart.vue'
import modalWeight from './components/modalWeight.vue'
import modalDate from './components/modalDate.vue'

export default {
  name: 'secondPage',
  components:{
    middleAccDiv,
    demoChart,
    modalWeight,
    modalDate
  },
  methods:{
    showWeight(){
      this.$refs.mWeight.showWeight();
    },
    showDataSwitch(){
      this.$refs.mDate.showDate()
    },
    chartAddon(){

    },
    weightFetch(){
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
          return await response // parses JSON response into native JavaScript objects
        }

        this.logProcessing = true;

        postData('/data')
          .then((res) => {
            var err_txt;

            async function printError(txt) {
              res.json().then((value) => {
                err_txt = value.message
                alert(txt + err_txt)
              });
            }

            switch (res.status) {
              case 200:
                var chartd;
                res.json().then((value) => {
                  chartd = value
                });
                console.log(chartd);
                this.$parent.hideDateForce();
                break;

              default:
                printError("Произошла серверная ошибка. ")
            }
            this.logProcessing = false

          })
          .catch((err) => {
            console.log(err);
            alert("Произошла ошибка.");
            this.logProcessing = false
          })

      },
    logoutFetch(){
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
        return await response // parses JSON response into native JavaScript objects
      }

      this.logProcessing = true;

      postData('/api/account/sign-out')
        .then((res) => {
          var err_txt;

          async function printError(txt) {
            res.json().then((value) => {
              err_txt = value.message
              alert(txt + err_txt)
            });
          }

          switch (res.status) {
            case 200:
              this.$router.push('/')
              break;

            default:
              printError("Произошла серверная ошибка. ")
          }
          this.logProcessing = false

        })
        .catch((err) => {
          console.log(err);
          alert("Произошла ошибка.");
          this.logProcessing = false
        })

    }
  },
  data: function(){
    return{
      xAxisData: [1,2,3,4,5],
      yAxisData: [10,20,30,40,50]
    }
  },
}

</script>

<style scoped>
@import "./css/usermobile.css";

</style>
