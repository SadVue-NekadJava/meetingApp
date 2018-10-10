<template>
<div>
  <nav-bar></nav-bar>

  <h3 class=" text-center mt-3">Add new meeting</h3>
  <div class="omot">
    <div class="row mt-5">

      <div class="col-xl-4 " style="">
        <h3 class="text-center">Meeting details</h3>
        <div class="sirina mx-auto">
          <form class="form-group">
            <div class="promena mx-auto mt-3">
              <input type="radio" id="promena_levo" name="switch_2" v-model="radioToggle" value="1" />
              <label for="promena_levo" class="mr-2">Business</label>
              <input type="radio" id="promena_desno" name="switch_2" v-model="radioToggle" value="2" />
              <label for="promena_desno">Entertainment</label>
            </div>
            <label class="lead" for="title"><b>Title</b></label>
            <input id="title" type="text" v-model="meetingTitle" class="form-control" placeholder="Title">
            <div class="text-center">
              <select v-if="radioToggle==1" v-model="meetingTimeStart" id="time" class=" mt-3 form-control d-inline  vremeSirina" name="">
                <option   disabled selected value='0'>Time</option>
                <option  value="08:00">08:00</option>
                <option  value="08:30">08:30</option>
                <option  value="09:00">09:00</option>
                <option  value="09:30">09:30</option>
                <option  value="10:00">10:00</option>
                <option  value="10:30">10:30</option>
                <option  value="11:00">11:00</option>
                <option  value="11:30">11:30</option>
                <option  value="12:00">12:00</option>
                <option  value="12:30">12:30</option>
                <option  value="13:00">13:00</option>
                <option  value="13:30">13:30</option>
                <option  value="14:00">14:00</option>
                <option  value="14:30">14:30</option>
                <option  value="15:00">15:00</option>
                <option  value="15:30">15:30</option>
                <option  value="16:00">16:00</option>
                <option  value="16:30">16:30</option>
                <option  value="17:00">17:00</option>
                <option  value="17:30">17:30</option>
                <option  value="18:00">18:00</option>
              </select>
              <select v-if="radioToggle==2" v-model="meetingTimeStart" id="time" class=" mt-3 form-control d-inline  vremeSirina" name="">
                <option  disabled selected value='0'>Time</option>


                <option  value="08:00">08:00</option>
                <option  value="08:30">08:30</option>
                <option  value="09:00">09:00</option>
                <option  value="09:30">09:30</option>
                <option  value="10:00">10:00</option>
                <option  value="10:30">10:30</option>
                <option  value="11:00">11:00</option>
                <option  value="11:30">11:30</option>
                <option  value="12:00">12:00</option>
                <option  value="12:30">12:30</option>
                <option  value="13:00">13:00</option>
                <option  value="13:30">13:30</option>
                <option  value="14:00">14:00</option>
                <option  value="14:30">14:30</option>
                <option  value="15:00">15:00</option>
                <option  value="15:30">15:30</option>
                <option  value="16:00">16:00</option>
                <option  value="16:30">16:30</option>
                <option  value="17:00">17:00</option>
                <option  value="17:30">17:30</option>
                <option  value="18:00">18:00</option>
                <option  value="19:00">19:00</option>
                <option  value="19:30">19:30</option>
                <option  value="20:00">20:00</option>
                <option  value="20:30">20:30</option>
                <option  value="21:00">21:00</option>
                <option  value="21:30">21:30</option>
                <option  value="22:00">22:00</option>
                <option  value="22:30">22:30</option>
                <option  value="23:00">23:00</option>
                <option  value="23:30">23:30</option>
                <option  value="00:00">00:00</option>
              </select>
              <select v-if="radioToggle==1" name="" v-model="duration" id="duration" class=" mt-3 ml-5 form-control d-inline  vremeSirina">
                <option  disabled selected value=0>Duration</option>
                <option value=1>1 hour</option>
                <option value=2>2 hour</option>
                <option value=3>3 hour</option>
              </select><br>
            </div>
            <select v-if="radioToggle==1" v-model="selectPriority" id="priority" class="form-control  mt-3 ">
              <option disabled selected value='0'>Priority</option>
              <option  value="1">Important</option>
              <option value="2">Regular</option>
            </select>

            <label class="lead mt-3"><b>Add participants:</b></label>
            <input type="text" id="addParticipant" placeholder="Search" @keyup="searchUsers" v-model="keyUserSearch" autocomplete="off" class="form-control prviPutLista">
            <ul class="lista">
              <li class="pb-2 my-auto" v-for="user in foundUsers" @click="AddParticipant(user.usr_id,user.usr_username)"><span class="ime">{{user.usr_firstname}} {{user.usr_lastname}}</span>
                {{user.usr_email}} </li>
            </ul>


          </form>
          <div class="participants">
          </div>
        </div>
      </div>
      <div class="col-xl-4 ">
        <div class="visinaUcesnika sirina mx-auto">
          <div class="">
            <label v-if="participants.length==0" for="addParticipant" id="participants">Your participants</label>
            <ol class="mt-3 lista2 ucesnici">
              <li v-for="(participant,index) in participants">{{participant.username}} <i class="ml-3 fas fa-ban" style="cursor:pointer" @click="removeParticipant(index)"></i></li>
            </ol>
          </div>
        </div>
        <label class="lead mt-3" for="description"><b>Description:</b></label>
        <textarea id="description" type="text" rows="10%" cols="90%" v-model="description" placeholder="Your description here..."></textarea>
      </div>
      <div class="col-xl-4">
        <h3 class="text-center">Meeting place</h3>
        <div class="sirina mx-auto">
          <GmapAutocomplete @place_changed="setPlace" class="form-control">
          </GmapAutocomplete>
          <br />


          <GmapMap v-if="this.place" style="width:100%; height: 300px;" :zoom="16" :center="{lat: this.place.geometry.location.lat(),lng: this.place.geometry.location.lng()}">
            <GmapMarker v-for="(marker, index) in markers" :key="index" :position="marker.position" />
            <GmapMarker v-if="this.place" label="★" :position="{
                  lat: this.place.geometry.location.lat(),
                  lng: this.place.geometry.location.lng(),
                }" />
          </GmapMap>
          <div class="text-center"><button type="button" @click="addMeeting(place)" class="btn btn-outline-primary">Confirm meeting</button></div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
import moment from 'moment'

import Navbar from '../components/navbar.vue';
export default {
  name:'createMeeting',
  components: {
    'nav-bar': Navbar
  },
  data() {
    return {

      markers: [],
      place: null,
      keyUserSearch: '',
      foundUsers: [],
      participants: [],
      noMach: false,
      noUsers: false,
      radioToggle: '0',
      metPriority: '0',
      selectPriority: '0',
      meetingTitle:'',
      meetingTimeStart:'0',
      duration:0,
      description:'',
      participantsArray:[],
      met_location:''
    }
  },
  description: 'Autocomplete Example (#164)',
  methods: {

    addMeeting(place) {
      this.met_location = this.usePlace(place);
      this.usePlace(place);
      if (this.radioToggle == 1) {
        if (this.selectPriority == 1) {
          this.metPriority = 1;
        } else {
          this.metPriority = 2;
        }

      } else {
        this.metPriority = 3;
      }
        this.meetingTimeStart=moment(this.$store.state.dateClicked+' '+this.meetingTimeStart);
        this.meetingTimeStart=moment(  this.meetingTimeStart).utc().format('YYYY-MM-DD HH:mm:ss');
        moment().utc().format('YYYY-MM-DD HH:mm:ss');
          console.log(  this.meetingTitle);
            for(var i=0;i<this.participants.length;i++){
              this.participantsArray.push(this.participants[i].id);
            }


      axios.post("http://800q121.mars-t.mars-hosting.com/postMeeting", {

          sid: window.localStorage.getItem("sessionid"),
          met_priority: this.metPriority,
          met_title: this.meetingTitle,
          met_time_start:this.meetingTimeStart,
          met_time_end:moment(this.meetingTimeStart).add(this.duration,'hours').format('YYYY-MM-DD HH:mm:ss'),
          participants:this.participantsArray,
          met_longitude: this.markers[0].position.lng,
          met_latitude:this.markers[0].position.lat,
          description:this.description,
          met_location:this.met_location,
          current_time:  moment(new Date()).utc().format('YYYY-MM-DD HH:mm:ss')

      }).then(response => {
          console.log(response.data);
      });
      this.markers= [];
      this.meetingTitle='';
      this.duration=0;
      this.radioToggle= '0';
      this.meetingTimeStart='0';
      this.participantsArray=[];
      this.description='';
      this.keyUserSearch='';
      this.$router.push('/mainPage');
    },

    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place
    },
    usePlace(place) {

      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          }
        })
        return this.place.formatted_address;
        this.place = null;
      }
    },
    searchUsers() {
      if (this.keyUserSearch != '') {
        axios.get("http://800q121.mars-t.mars-hosting.com/search", {
          params: {
            sid: window.localStorage.getItem("sessionid"),
            search: this.keyUserSearch
          },
        }).then(response => {
          this.foundUsers = response.data.result;
        });
      } else {
        this.foundUsers = [];
      }
    },
    AddParticipant(id, username) {
      this.noUsers = false;
      this.noMach = true;
      if (this.participants.length > 0) {
        for (var i = 0; i < this.participants.length; i++) {
          if (this.participants[i].id == id) {
            this.noMach = false;
          } else {
            this.noUsers = true;
          }
        }
      } else {
        this.noUsers = true;
      }
      if (this.noMach && this.noUsers) {
        this.participants.push({
          id: id,
          username: username
        })
      }
      this.keyUserSearch="";
      this.foundUsers=""
      t
    },
    removeParticipant(index) {
      this.participants.splice(index, 1);
    }
  }
}
</script>
<style scoped>
.vremeSirina {
  width: 30%;
}

.visinaUcesnika {
  position: relative;
}

.promena input {
  position: absolute;
  opacity: 0;
}

#participants {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
}

.promena label {
  display: inline-block;
  width: 48%;
  background-color: #fff;
  color: #000;
  font-size: 14px;
  text-align: center;
  padding: 6px 14px;
  -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  -ms-transition: all 0.1s ease-in-out;
  -o-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  border-radius: 5%;
}

.promena label:hover {
  cursor: pointer;
  background-color: rgb(230, 230, 230);
}

.promena input:checked+label:hover {
  background-color: #6ab4d1;
}

.ucesnici li {
  list-style-position: inside;
}

.ucesnici {
  height: 30vh;
  overflow: auto;
  width: 100%;


}

.promena input:checked+label {
  background-color: #6ab4d1;
  -webkit-box-shadow: none;
  text-shadow: 1px 1px 5px #000;
  box-shadow: none;
  color: #fff;
}

.omot {
  margin-top: 5vh;
}

.sirina {
  width: 80%;
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
}

.lista {
  list-style-type: none;
  margin-top: 10px;
  text-align: justify;
  padding: 0;
  overflow: auto;
  height: 20vh;
}

.lista li {
  padding-left: 15px;
  line-height: 30px;
  font-size: 20px;
  height: 30px;
}

.lista li:hover {
  cursor: pointer;
  background: lightgrey;
  border-radius: 20px;
  vertical-align: middle;

}

.lista2 {
  width: 100%;
  margin-top: 10px;
  text-align: justify;
  padding: 0;
  position: relative;
}

.lista2 i {
  position: absolute;
  right: 0;
}

.lista2 li {
  padding-left: 15px;
  line-height: 30px;
  font-size: 20px;
  height: 30px;
}
</style>
