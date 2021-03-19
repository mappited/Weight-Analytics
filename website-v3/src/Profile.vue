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

  <!-- <div class="userName"><p class="userName-text-mobile userName-text">Райн Гослинг</p></div> -->


  <div class="chart-flexbox">
    <div class="add-weight-button-container"> <div class="add-weight-button" @click="showWeight()" style="cursor:pointer">+ Добавить Вес</div> </div>

    <div class="chart-container">
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
    weightAddFetch(wadd){
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

        this.weightProcessing = true;

        postData('/api/user/body-mass', '{ "action": "write", "mass": '+wadd+' }')
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
                this.$refs.mWeight.hideWeightForce();
                break;

              case 400:
                printError("Вы уже вносили свой вес сегодня. ")
                break;

              default:
                printError("Произошла серверная ошибка. ")
            }
            this.weightProcessing = false

          })
          .catch((err) => {
            console.log(err);
            alert("Произошла ошибка.");
            this.weightProcessing = false
          })

      },
    weightFetch(first, second = ""){
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

        this.weightProcessing = true;
        if(second!==""){
          second =', "second" : "'+second+'"'
        }

        postData('/api/user/body-mass', '{ "action": "pull", "first": "'+first+'" '+second+' }')
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
                  console.log(chartd);

                  var xAxisParse = [];
                  var yAxisParse = [];

                  var startp = new Date(chartd.first)
                  var endp = new Date(chartd.second);


                  var loop = new Date(startp);
                  var index = Object.keys(chartd.data).length;
                  console.log(index);
                  var newDate = loop.setDate(loop.getDate());
                  while(loop <= endp){

                    console.log(loop.toISOString().split('T')[0]);
                    console.log(new Date(chartd.data[index-1].date).toISOString().split('T')[0]);
                    if(loop.toISOString().split('T')[0] == new Date(chartd.data[index-1].date).toISOString().split('T')[0]){
                      xAxisParse.push(chartd.data[index-1].date.split("T")[0])
                      yAxisParse.push(chartd.data[index-1].mass)
                      index--;
                    }else{
                      xAxisParse.push(loop.toISOString().split('T')[0])
                      yAxisParse.push(null)
                    }

                     newDate = loop.setDate(loop.getDate() + 1);
                     loop = new Date(newDate);
                  }
                  this.xAxisData = xAxisParse
                  this.yAxisData = yAxisParse
                });
                this.$refs.mDate.hideDateForce();
                break;

              default:
                printError("Произошла серверная ошибка. ")
            }
            this.weightProcessing = false

          })
          .catch((err) => {
            console.log(err);
            alert("Произошла ошибка.");
            this.weightProcessing = false
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

        })
        .catch((err) => {
          console.log(err);
          alert("Произошла ошибка.");
        })

    }
  },
  data: function(){
    return{
      xAxisData: [1,2,3,4,5],
      yAxisData: [40,30,35,40,45]
    }
  },
}

</script>

<style scoped>
@import "./css/usermobile.css";

</style>
