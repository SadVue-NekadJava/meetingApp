<template>
<div>

      <div class="calendar">
          <div class="calendar-header">
            <div class="text-center">

              <span>
              <i class="fa fa-fw fa-chevron-left pr-5" @click="subtractMonth"></i>
              <h4>{{month + ' - ' + year}}</h4>
              <i class="fa fa-fw fa-chevron-right pl-5" @click="addMonth"></i></span>
                </div>
          </div>
          <tr class="weekdays">
              <td v-for="day in days"><span>{{day}}</span></td>
          </tr>
          <tr class="dates">
              <td v-for="blank in firstDayOfMonth">&nbsp;</td>
              <div class="dates" v-for="date in daysInMonth">
              <div class="broj" >{{date}}
             </div>
              <br v-show="date%7==0">
             </div>
          </tr>
      </div>

  <footer-meeting></footer-meeting>
</div>
</template>

<script>


import FooterMeeting from '../components/footerMeeting.vue'
import moment from 'moment'
export default {
  name:'probavam',
  components: {
    "footer-meeting": FooterMeeting
  },
  data(){
      return{
          today: moment(),
          dateContext: moment(),
          days: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
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
    addMonth: function () {
      console.log(this.currentDate);
        var t = this;
        t.dateContext = moment(t.dateContext).add(1, 'month');
    },
    subtractMonth: function () {
        var t = this;
        t.dateContext = moment(t.dateContext).subtract(1, 'month');
    }
}


}
</script>

<style>

.calendar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  min-width: 50vw;
  min-height: 50vh;

}

.weekdays {
  display: flex;
  justify-content: space-between;
}
.calendar-header span {
  display: flex;
  align-items: center;
 justify-content: center;

}
.dates {
  display: flex;
   justify-content: space-between;
 flex-wrap: wrap;


}
.dates .broj{
 width: calc( 50vw /100 *14.1);

}

</style>
