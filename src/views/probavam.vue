<template>
<div>
  <nav-bar></nav-bar>
      <div class="calendar">
          <div class="dates text-center calendar-header mb-3">
              <i class="fa fa-fw fa-chevron-left mr-5 my-auto" @click="subtractMonth"></i>
              <h4 class="d-inline my-auto pb-2">{{month + ' - ' + year}}</h4>
              <i class="fa fa-fw fa-chevron-right ml-5 my-auto" @click="addMonth"></i>
          </div>
          <div class="dates dayNames" style="border-bottom: 2px solid lightgray">
            <div class="omot omot2 text-center my-auto" v-for="day in days">
              {{day}}
            </div>
          </div>
          <div class="dates">
              <div class="omot "  v-for="blank in firstDayOfMonth"></div>
              <div class="omot text-center" v-for="date in daysInMonth" @click="checkDate(date,year)">
                <div class="datum" >{{date}}

                </div>
                  <div v-for="(meetingHtml, index) in meetingsHtml[date]">
                    <div v-if="index<3">
                      <div :class="{klasa1: meetingHtml.priority==1,klasa2: meetingHtml.priority==2, klasa0: meetingHtml.priority==0}">{{meetingHtml.text}} - {{meetingHtml.vreme}}</div>
                    </div>
                    <div v-if="index==2" class="lead"><em>and {{duzina(meetingsHtml[date])-3}} more</em></div>
                  </div>
               </div>
             </div>
      </div>

  <footer-meeting></footer-meeting>
</div>
</template>

<script>

import Navbar from '../components/navbar.vue'
import FooterMeeting from '../components/footerMeeting.vue'
import moment from 'moment'


export default {
  name:'probavam',
  components: {
    "footer-meeting": FooterMeeting,
      'nav-bar': Navbar
  },
  data(){
      return{
          today: moment(),
          dateContext: moment(),
          days: ['SUN', 'MON', 'TUD', 'WED', 'THU', 'FRI', 'SAT'],
          meetingsHtml: {
            15: {
              0: {text:'asd',vreme:14, priority: 1},
              1: {text:'asd',vreme:15, priority: 2},
              2: {text:'asd',vreme:16, priority: 1},
              3: {text:'asd',vreme:18, priority: 0}
            },
            16: {
              0: {text:'asd',vreme:14, priority: 1},
              1: {text:'asd',vreme:15, priority: 2},
              2: {text:'asd',vreme:16, priority: 1},
              3: {text:'asd',vreme:18, priority: 0}
            },
            19: {
              0: {text:'asd',vreme:14, priority: 1},
              1: {text:'asd',vreme:15, priority: 2},
              2: {text:'asd',vreme:16, priority: 1},
              3: {text:'asd',vreme:18, priority: 0},
              4: {text:'asd',vreme:18, priority: 0},
              5: {text:'asd',vreme:18, priority: 0},
              6: {text:'asd',vreme:18, priority: 0},
              7: {text:'asd',vreme:18, priority: 0},
              8: {text:'asd',vreme:18, priority: 0}
            },
            1: {
              0: {text:'asd',vreme:14, priority: 1},
              1: {text:'asd',vreme:15, priority: 2},
              2: {text:'asd',vreme:16, priority: 1},
              3: {text:'asd',vreme:18, priority: 0}
            }
          },
          int: 0
      }
  },

  computed: {
      year: function () {
          var t = this;
          return t.dateContext.format('Y');
      },
      month: function () {
          var t = this;
          return t.dateContext.format('MMMM');
      }, daysInMonth: function () {
        var t = this;
        return t.dateContext.daysInMonth();
    },
    currentDate: function () {
        var t = this;
        return t.dateContext.get('date');
    },
    firstDayOfMonth: function () {
        var t = this;
        var firstDay = moment(t.dateContext).subtract((t.currentDate - 1), 'days');
        return firstDay.weekday();
    },initialDate: function () {
        var t = this;
        return t.today.get('date');
    },
    initialMonth: function () {
        var t = this;
        return t.today.format('MMMM');
    },
    initialYear: function () {
        var t = this;
        return t.today.format('Y');
    }

    },

  methods: {

    checkDate(date,year){
    this.$store.state.dateClicked=year+'-'+ this.month +'-'+date;
    this.$store.state.dateClicked= moment(this.$store.state.dateClicked).format('YYYY-MM-DD');
      console.log(this.$store.state.dateClicked);
          this.$router.push('/createMeeting');

    },
    addMonth: function () {

        var t = this;
        t.dateContext = moment(t.dateContext).add(1, 'month');
          console.log(this.dateContext);
    },
    subtractMonth: function () {
        var t = this;
        t.dateContext = moment(t.dateContext).subtract(1, 'month');
    },
    duzina(obj){
      var size = 0,
        key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    }
}


}
</script>

<style scoped>
.klasa1{
  background: #f1f1f1;
}
.klasa2{
  background: #f1b1f1;
}
.klasa0{
  background: #f1f1b1;
}
.omot{
  height: 11vh;
  width: 10vw;
  border: 1px solid #f1f1f1;
  display: inline-block;
  position: relative;
  border-radius: 10px;
  transition: 0.2s background;



}
.omot:hover{
cursor: pointer;
background: #f1f1f1;

}
.omot2{
  border: 0px solid #f1f1f1;
  height: inherit;
}
.omot .datum{
  top:0;
  right: 0;
  height: 10px;
  text-align: right;

}
.calendar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
  width: 80%;
  padding: 10px 5vw;
  background: white;

}
.dates {
  width: 70vw;
    display: flex;
    flex-wrap: wrap;

}
.dayNames{
  text-align: center;
  line-height: 7vh;
  vertical-align: middle;
  font-size: 1.2rem;
  background-color: #f1f1f1;
  border-radius: 10px;
}
.tacka .datum{
  color:red;
}
.omot:nth-child(7n), .omot:nth-child(15),.omot:nth-child(22),.omot:nth-child(29), .omot:nth-child(1),.omot:nth-child(8),.omot:nth-child(36){
  color: red;
}
.calendar-header{
  height: 8vh;
  display: flex;
  justify-content: center;
}
.calendar-header h4{
  font-size: 50px;
  margin: 0;
}
.calendar-header i{
  line-height: 60px;
}
</style>
