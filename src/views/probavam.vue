<template>
<div>
  <nav-bar></nav-bar>
  <div class="calendar" style="z-index:200;">
    <div class="dates text-center calendar-header mb-3">
      <!-- <i class="fa fa-fw fa-chevron-left mr-5 my-auto" @click="subtractMonth"></i> -->
      <h4 class="d-inline my-auto pb-2">{{month + ' - ' + year}}</h4>
      <!-- <i class="fa fa-fw fa-chevron-right ml-5 my-auto" @click="addMonth"></i> -->
    </div>
    <div class="dates dayNames" style="border-bottom: 2px solid lightgray">
      <div class="omot omot2 text-center my-auto" v-for="day in days">
        {{day}}
      </div>
    </div>
    <div class="dates">
      <div class="omot " v-for="blank in firstDayOfMonth"></div>
      <template  v-for="date in daysInMonth">

        <div v-if="currentDate>date" class="omot text-center prosloVreme" style="cursor:not-allowed">
          <div class="datum">{{date}}

          </div>
        </div>

        <div v-else-if="currentDate==date" class="omot text-center danas" data-target="#nesto" @click="checkDate(date,year)" data-toggle="modal" >
          <div class="datum">{{date}}

          </div>
        </div>

      <div v-else class="omot text-center"  data-target="#nesto" @click="checkDate(date,year)" data-toggle="modal">
        <div class="datum">{{date}}

        </div>
        <div v-for="(meetingHtml, index) in meetingsHtml[date]">
          <div v-if="index<3">
            <div v-if="meetingHtml.inv_id==1" class="klasaBlinka" :class="{klasa1: meetingHtml.priority==1,klasa2: meetingHtml.priority==2, klasa0: meetingHtml.priority==3}">
              {{meetingHtml.text}} </div>
            <div v-else-if="meetingHtml.inv_id==2||meetingHtml.inv_id==null " :class="{klasa1: meetingHtml.priority==1,klasa2: meetingHtml.priority==2, klasa0: meetingHtml.priority==3}">
              {{meetingHtml.text}} </div>
          </div>
          <div v-if="index==3" class="lead kolikoJos"><em>and {{duzina(meetingsHtml[date])-3}} more</em></div>
        </div>
      </div>
    </template>
    </div>
  </div>

  <footer-meeting></footer-meeting>

  <!-- *************MODALI************ -->

  <div class="modal fade text-center text-center" id="nesto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

    <div class="modal-dialog" role="document">
      <div v-if="meetingsByDate.length==0" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body form-group ">

          <h4>You have no meeting for this day!</h4>
          <button @click="createNewMeeting" class="btn btn-outline-primary" data-dismiss="modal">Create New Meeting</button>
        </div>
      </div>
      <div v-else class="modal-content">
        <div class="modal-header">
          <h5>Daily meetings</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body form-group ">
          <div v-for="meetingByDate in meetingsByDate">
            <div :data-target="'#met_id'+meetingByDate.met_id" data-toggle="modal" class="row sastanak2 mb-3  mx-auto " style="cursor:pointer" :class="{klasa1: meetingByDate.met_priority==1,klasa2: meetingByDate.met_priority==2, klasa0: meetingByDate.met_priority==3}">
              {{meetingByDate.met_title}} - {{meetingByDate.met_time_start|dateFormater}}
            </div>
          </div>
          <div class="modal-footer">
            <div class="mx-auto"> <button @click="createNewMeeting" class="btn btn-outline-primary" data-dismiss="modal">Add New Meeting</button></div>
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
          <div v-if="meeting.inv_id==1" class="modal-body ">
            <div class="text-center">
              <h5>Accept this meeting</h5>
              <i class=" acceptMeeting fas fa-check text-success" data-dismiss="modal" @click="acceptedMeeting(meeting.met_id, response=1)"></i><i data-dismiss="modal" @click="acceptedMeeting(meeting.met_id, response=0)" class=" acceptMeeting text-danger fas fa-times ml-5"></i>
            </div>
            <hr>

            <p class="text-center"><b>Description:</b> <br> {{ meeting.met_description }}</p>
            <hr>
            <div class="row">
              <div class="col-lg-6" style="border-right:1px solid lightgrey;">
                <p><b>Organiser: </b> {{meeting.organisator.fullname}} </p>
                <p><b>Meeting starts: </b>{{ meeting.met_time_start|dateFormater }}</p>
                <p v-if="meeting.met_priority<3"><b>Meeting ends: </b>{{ meeting.met_time_end|dateFormater }}</p>

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
                <button href="#collapse1" data-toggle="collapse" class="btn btn-outline-primary buttonWidth  ">
                  <h5 class="my-auto text-center">
                    <i id="okreni" class="fa fa-arrow-down"></i> {{ meeting.met_location }}
                  </h5>
                </button>
                <div id="collapse1" class="collapse">
                  <div class="card-body text-dark">
                    <div class="text-center">
                      <GmapMap :center="{lat:Number(meeting.met_latitude), lng:Number(meeting.met_longitude)}" :zoom="12" style="width: 100%; height: 400px">
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
          <div v-else class="modal-body ">
            <h4 class="text-center">Meeting description: </h4>
            <p class="text-center">{{ meeting.met_description }}</p>
            <hr>
            <div class="row">
              <div class="col-lg-6 pl-5" style="border-right:1px solid lightgrey;">
                <h4 class="pb-2">Meeting details:</h4>
                <p><b>Organiser: </b> {{meeting.organisator.fullname}} </p>
                <p><b>Meeting starts: </b>{{ meeting.met_time_start|dateFormater }}</p>
                <p v-if="meeting.met_priority<3"><b>Meeting ends: </b>{{ meeting.met_time_end|dateFormater }}</p>
              </div>
              <div class="col-lg-6 pl-5">
                <h4>Participants:</h4>
                <ul v-for="participant in meeting.participants">
                  <li>{{ participant.fullname }}</li>
                </ul>
              </div>
            </div>
            <hr>
            <div>
              <div class="card  text-white" style="border:none">
                <button href="#collapse1" data-toggle="collapse" class="btn btn-outline-primary buttonWidth  ">
                  <h5 class="my-auto text-center">
                    <i id="okreni" class="fa fa-arrow-down"></i> {{ meeting.met_location }}
                  </h5>
                </button>
                <div id="collapse1" class="collapse">
                  <div class="card-body text-dark">
                    <div class="text-center">
                      <GmapMap :center="{lat:Number(meeting.met_latitude), lng:Number(meeting.met_longitude)}" :zoom="12" style="width: 100%; height: 400px">
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
  <div class="row" style="z-index:-200;">
    <div class="col-lg-10"></div>
    <div class="col-lg-2 text-right pr-5">
      <router-link to="/mainPage"> <img class="slika" src="../assets/lista.png" alt="" width="100" height="100"></router-link>
    </div>

  </div>
  <div class="container">
    <div class="legenda">
      <div></div><span>Business-Important</span>
      <div></div><span>Business-Regular</span>
      <div></div><span>Entertainment</span>

    </div>
  </div>
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
      meetingsHtml: {},
      int: 0,
      allMeetingsResults: [],
      meetingsByDate: [],
      izbaci: [],
      currentTime:''

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
    createNewMeeting() {
      this.$router.push('/createMeeting');
    },
    acceptedMeeting(met_id, response) {
      axios.post("http://800q121.mars-t.mars-hosting.com/meetingResponse", {

        sid: window.localStorage.getItem("sessionid"),
        met_id,
        response
      }).then(response => {});
      location.reload();
    },
    meetingsCalendar() {
      axios.get("http://800q121.mars-t.mars-hosting.com/getMeetings", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
          current_time: moment.utc().format('YYYY-MM-DD')
        },
      }).then(response => {
        console.log(response.data.status);
        if (response.data.status) {
        this.meetingsHtml = response.data.format;
        this.allMeetingsResults = response.data.result;
        for (var i = 0; i < this.allMeetingsResults.length; i++) {
          if (this.allMeetingsResults[i].inv_id == 3) this.izbaci.push(i);
        }
        for (var i = this.izbaci.length - 1; i >= 0; i--) {
          this.allMeetingsResults.splice(this.izbaci[i], 1);
        }}
      });
    },
    checkDate(date, year) {
      this.meetingsByDate = [];
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




.acceptMeeting {
  font-size: 25px;
  cursor: pointer;

}

.acceptMeeting:hover {
  transform: scale(1.3);

}

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
  color: #fff;
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
  margin: auto;
  transition: 0.2s all;
}

.buttonWidth:hover {
  width: 100%;

}

.kolikoJos {

  font-size: 15px;
}

/* unconfirmed */
.klasaBlinka {

  animation: AnimationName 1s ease infinite;
}

@keyframes AnimationName {
  0% {
    color: black
  }

  100% {
    color: white
  }
}

.klasaBlinka:hover {

  -webkit-animation-play-state: paused;
  -moz-animation-play-state: paused;
  -o-animation-play-state: paused;
  animation-play-state: paused;

}

/* END  unconfirmed */

.legenda {
  display: flex;
  align-items: center;
  justify-content: center;
}

.legenda div:nth-of-type(1) {
  height: 20px;
  width: 20px;
  background: #d12727;
  border-radius: 50%;

}

.legenda div:nth-of-type(2) {
  height: 20px;
  width: 20px;
  background: #a56363;
  border-radius: 50%;

}

.legenda div:nth-of-type(3) {
  height: 20px;
  width: 20px;
  background: #55b3db;
  border-radius: 50%;

}

.legenda span {
  margin-right: 30px;
}


.klasa1 {
  cursor: pointer;
  margin-bottom: 2px;
  border-radius: 20px;
  background: #d12727;
  color: white;
  width: 90%;
}

.slika {
  transition: 0.3s all;
  margin-top: 72vh;

}

.slika:hover {
  cursor: pointer;
  transform: scale(1.2);
}

.klasa2 {
  cursor: pointer;
  margin-bottom: 2px;
  background: #a56363;
  border-radius: 20px;
  color: white;
  width: 90%;
}

.klasa2:hover {
  transform: scale(1.1);
}

.klasa1:hover {
  transform: scale(1.1);
}

.klasa0:hover {
  transform: scale(1.1);
}

.klasa0 {
  cursor: pointer;
  margin-bottom: 2px;
  background: #55b3db;
  border-radius: 20px;
  color: white;
  width: 90%;

}

.omot {
  height: 11vh;
  width: 10vw;
  border:1px solid #f1f1f1;
  display: inline-block;
  position: relative;
  border-radius: 10px;
  transition: 0.2s background;
  padding: 0 10px;
  overflow: auto;
  overflow-x: hidden;



}

.omot:hover {
  cursor: pointer;
  background: #fcfcfc;

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
  margin: 5px;

}
.prosloVreme{
  cursor: not-allowed;
  background-color: #f1f1f1;
  border: 1px solid white ;
}

.danas {
  border: 1px solid #6ab4d1;
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
