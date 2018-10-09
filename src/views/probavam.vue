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
      <div class="omot " v-for="blank in firstDayOfMonth"></div>
      <div class="omot text-center" v-for="date in daysInMonth" data-target="#nesto" @click="checkDate(date,year)" data-toggle="modal">
        <div class="datum">{{date}}

        </div>
        <div v-for="(meetingHtml, index) in meetingsHtml[date]">
          <div v-if="index<3">
            <div v-if="meetingHtml.inv_id==null" class="bg-primary">
              {{meetingHtml.text}} </div>
            <div v-else :class="{klasa1: meetingHtml.priority==1,klasa2: meetingHtml.priority==2, klasa0: meetingHtml.priority==3}">
              {{meetingHtml.text}} </div>
          </div>
          <div v-if="index==3" class="lead kolikoJos"><em>and {{duzina(meetingsHtml[date])-3}} more</em></div>
        </div>
      </div>
    </div>
  </div>

  <footer-meeting></footer-meeting>

  <!-- *************MODALI************ -->



  <div class="modal fade text-center text-center" id="nesto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

    <div class="modal-dialog" role="document">

      <div class="modal-content">
        <div class="modal-header">

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body form-group ">
            <div v-for="meetingByDate in meetingsByDate"  >


  <div :data-target="'#met_id'+meetingByDate.met_id" data-toggle="modal"
   class="row sastanak2 mb-3" style="cursor:pointer"
   :class="{klasa1: meetingByDate.met_priority==1,klasa2: meetingByDate.met_priority==2, klasa0: meetingByDate.met_priority==3}">
    {{meetingByDate.met_title}} - {{meetingByDate.met_time_start|dateFormater}}
  </div>
        </div>
        <div class="modal-footer">
          <button @click="createNewMeeting" class="btn dugme" data-dismiss="modal">Add New Meeting</button>
        </div>

    </div>
  </div>
</div>
</div>

<div v-for="meeting in meetingsByDate">
  <div class="modal fade bd-example-modal-lg " :id="'met_id'+ meeting.met_id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg " role="document">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <div class="velikaSlova">
              <h3>{{ meeting.met_title }}</h3>
            </div>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body ">
          <p class="text-center">{{ meeting.met_description }}</p>
          <hr>
          <div class="row">
            <div class="col-lg-6 gde my-auto">
              <p class=""><i class="fas fa-building "></i> ENON </p>
              <p class="my-auto"><i class="fas fa-clock"></i>{{ meeting.met_time_start|dateFormater }}</p>
            </div>
            <div class="col-lg-6">
              <h4>Participants:</h4>
              <ul v-for="participant in meeting.participants">
                <li>{{ participant.fullname }}</li>
              </ul>
            </div>
          </div>
          <hr>
          <div>
            <div class="card  text-white" style="border:none">
              <button href="#collapse1" data-toggle="collapse" class="btn btn-outline-primary buttonWidth  " >
                <h5 class="my-auto text-center">
                  <i id="okreni" class="fa fa-arrow-down"></i> {{ meeting.met_location }}
                </h5>
              </button>
              <div id="collapse1" class="collapse">
                <div class="card-body text-dark">
                  <div class="text-center">
                    <GmapMap
                      :center="{lat:Number(meeting.met_latitude), lng:Number(meeting.met_longitude)}"
                      :zoom="12"
                      style="width: 100%; height: 400px"
                    >
                    <GmapMarker label="★" :position="{
                          lat: Number(meeting.met_latitude),
                          lng: Number(meeting.met_longitude)
                        }" />
                    </GmapMap>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

</div>

  <!-- *************MODALI KRAJ************ -->
</div>
</template>

<script>
import Navbar from '../components/navbar.vue'
import FooterMeeting from '../components/footerMeeting.vue'
import moment from 'moment'


export default {
  name: 'probavam',
  components: {
    "footer-meeting": FooterMeeting,
    'nav-bar': Navbar
  },
  data() {
    return {
      today: moment(),
      dateContext: moment(),
      days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      meetingsHtml: {
        // 15: {
        //   0: {text:'asd',vreme:14, priority: 1},
        //   1: {text:'asd',vreme:15, priority: 2},
        //   2: {text:'asd',vreme:16, priority: 1},
        //   3: {text:'asd',vreme:18, priority: 0}
        // },
        // 16: {
        //   0: {text:'asd',vreme:14, priority: 1},
        //   1: {text:'asd',vreme:15, priority: 2},
        //   2: {text:'asd',vreme:16, priority: 1},
        //   3: {text:'asd',vreme:18, priority: 0}
        // },
        // 19: {
        //   0: {text:'asd',vreme:14, priority: 1},
        //   1: {text:'asd',vreme:15, priority: 2},
        //   2: {text:'asd',vreme:16, priority: 1},
        //   3: {text:'asd',vreme:18, priority: 0},
        //   4: {text:'asd',vreme:18, priority: 0},
        //   5: {text:'asd',vreme:18, priority: 0},
        //   6: {text:'asd',vreme:18, priority: 0},
        //   7: {text:'asd',vreme:18, priority: 0},
        //   8: {text:'asd',vreme:18, priority: 0}
        // },
        // 1: {
        //   0: {text:'asd',vreme:14, priority: 1},
        //   1: {text:'asd',vreme:15, priority: 2},
        //   2: {text:'asd',vreme:16, priority: 1},
        //   3: {text:'asd',vreme:18, priority: 0}
        // }
      },
      int: 0,
      allMeetingsResults: {},
      meetingsByDate: []

    }
  },
  mounted() {
    this.meetingsCalendar();

  },
  filters: {
    dateFormater: function(value) {
      value = moment(value).toDate();
      return moment(value).format(" Do MMM HH:mm");
    }

  },
  computed: {
    year: function() {
      var t = this;
      return t.dateContext.format('Y');
    },
    month: function() {
      var t = this;
      return t.dateContext.format('MMMM');
    },
    daysInMonth: function() {
      var t = this;
      return t.dateContext.daysInMonth();
    },
    currentDate: function() {
      var t = this;
      return t.dateContext.get('date');
    },
    firstDayOfMonth: function() {
      var t = this;
      var firstDay = moment(t.dateContext).subtract((t.currentDate - 1), 'days');
      return firstDay.weekday();
    },
    initialDate: function() {
      var t = this;
      return t.today.get('date');
    },
    initialMonth: function() {
      var t = this;
      return t.today.format('MMMM');
    },
    initialYear: function() {
      var t = this;
      return t.today.format('Y');
    }

  },

  methods: {
createNewMeeting(){
    console.log(this.$store.state.dateClicked);
      this.$router.push('/createMeeting');
},
    meetingsCalendar() {
      axios.get("http://800q121.mars-t.mars-hosting.com/getMeetings", {
        params: {
          sid: window.localStorage.getItem("sessionid")
        },
      }).then(response => {
        //console.log(response.data.result[0].met_longitude);
        console.log(response.data);
        this.meetingsHtml = response.data.format;
        this.allMeetingsResults = response.data.result;

      });
    },
    checkDate(date, year) {
      this.meetingsByDate=[];
      for (var i = 0; i < this.allMeetingsResults.length; i++) {
        if (this.allMeetingsResults[i].day == date) {
          this.meetingsByDate.push(this.allMeetingsResults[i]);
        }
      }

        this.$store.state.dateClicked = year + '-' + this.month + '-' + date;
        this.$store.state.dateClicked = moment(this.$store.state.dateClicked).format('YYYY-MM-DD');



    },
    addMonth: function() {

      var t = this;
      t.dateContext = moment(t.dateContext).add(1, 'month');
      console.log(this.dateContext);
    },
    subtractMonth: function() {
      var t = this;
      t.dateContext = moment(t.dateContext).subtract(1, 'month');
    },
    duzina(obj) {
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
.gde i {
  font-size: 40px;
}
.btn-outline-primary:hover #okreni {
  color: #FFF;
  visibility: visible;
}


.btn-outline-primary {
  margin-top: 20px;
  border: 1px solid #6ab4d1;
  color: black;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  transition: 2s padding ease;
    text-decoration: none;

}

.btn-outline-primary:focus {
  outline-style: none;
  box-shadow: none;
}

.btn-outline-primary::before {
  position: absolute;
  background: #6ab4d1;
  top: 50%;
  content: '';
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  transition: 1s all ease;
  z-index: -1;
  width: 100%;
  height: 0;
}

.btn-outline-primary:hover::before {
  height: 1500%;
  background: #6ab4d1;
  color: #fff;


}

.btn-outline-primary:hover {
  border-radius: 50px;
  transition: 0.5s all ease;
  text-decoration: none;
  color:#fff;
}
#okreni {
  visibility: hidden;
  font-size: 18px;

}
.klasaModal {
  position: absolute;
  text-align: center;
  font-size: 50px;
  width: 400px;
  background: gray;
}
.buttonWidth {
  width: 50%;
  margin:auto;
  transition: 0.2s all;
}
.buttonWidth:hover {
  width: 100%;

}
.kolikoJos{

  font-size: 15px;
}
.klasa1 {
    cursor: pointer;
  margin-bottom: 2px;
  background: red;
animation: blinking 0.6s infinite;

}

@keyframes blinking {
  from{
opacity: 1;
  }
    to{
      opacity: 0;
    }
}

.klasa2 {
  cursor: pointer;
    margin-bottom: 2px;
  background: #f1b1f1;
}

.klasa0 {
  cursor: pointer;
    margin-bottom: 2px;
  background: #f1f1b1;
}

.omot {
  height: 11vh;
  width: 10vw;
  border: 1px solid #f1f1f1;
  display: inline-block;
  position: relative;
  border-radius: 10px;
  transition: 0.2s background;



}

.omot:hover {
  cursor: pointer;
  background: #f1f1f1;

}

.omot2 {
  border: 0px solid #f1f1f1;
  height: inherit;
}

.omot .datum {
  top: 0;
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

.dayNames {
  text-align: center;
  line-height: 7vh;
  vertical-align: middle;
  font-size: 1.2rem;
  background-color: #f1f1f1;
  border-radius: 10px;
}

.tacka .datum {
  color: red;
}

.omot:nth-child(7n),
.omot:nth-child(15),
.omot:nth-child(22),
.omot:nth-child(29),
.omot:nth-child(1),
.omot:nth-child(8),
.omot:nth-child(36) {
  color: red;
}

.calendar-header {
  height: 8vh;
  display: flex;
  justify-content: center;
}

.calendar-header h4 {
  font-size: 50px;
  margin: 0;
}

.calendar-header i {
  line-height: 60px;
}
</style>
