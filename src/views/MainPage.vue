<template>
<div>
  <nav-bar></nav-bar>
  <div v-if="1==1" class="pt-5 container">
    <h3 class="text-center mb-3">All meetings</h3>
    <div class="skrol">
      <div v-for="meeting in meetings" :data-target="'#met_id'+meeting.met_id" data-toggle="modal" class="row sastanak2 mb-3" style="cursor:pointer">
        <div class="col-md-9 ">
          <p class="pl-2">{{ meeting.met_title }}</p>
        </div>
        <div class=" text-right col-md-2">
          <p> {{ meeting.met_time_start | dateFormater}}</p>
        </div>
        <div class="col-md-1">
          <p class="text-right pr-3"><i v-if="meeting.met_priority<3"class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i>
          <i v-else class="fas fa-dice text-warning" data-toggle="tooltip" data-placement="top" title="Entertainment"></i></p>
        </div>
      </div>
    </div>
    <!-- -->
  </div>

  <!-- *************************** PRVI PUT NA STRANI ***************-->

  <!-- <div class="prviPutOmot">
      <div v-if="!hasFriends" class="">




      <h3   class="lead display-4">Welcome to meeting app! <br> Connect with your friends...</h3>
      <input @keyup="searchUsers" v-model="keyUserSearch" type="search" class=" prviPutLista" placeholder="Search users by mail">
      <div class="text-center">
        <ul class="lista">

            <li data-target="#userSearched" data-toggle="modal" class="pb-2" v-for="user in foundUsers" @click="getUserInfo(user.usr_id)" id="padajuciUseri" ><span class="ime">{{user.usr_firstname}} {{user.usr_lastname}}</span>
              {{user.usr_email}}</li>

        </ul>
      </div>
</div>
<div v-else class="text-center form-group">
  <h3  class="lead display-4">Welcome to meeting app! <br> You have no meetings !</h3>
<button  class="btn btn-outline-primary form-control"  type="button" name="button">Create new Meeting</button>
</div>
 -->

  <!-- </div> -->



  <!-- ************ MODALI *************-->
  <div class="modal fade text-center text-center" id="userSearched" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <div class="velikaSlova">
              <i class="fas fa-user"></i>
              <h5>{{usrInfo.usr_firstname}}{{usrInfo.usr_lastname}} </h5>
            </div>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body form-group ">

          <p class="mt-2">E-mail: {{usrInfo.usr_email}}</p>
          <p class="mt-2">Username: {{usrInfo.usr_username}}</p>

        </div>
        <div class="modal-footer">
          <button class="btn dugme" @click="addUser(usrInfo.usr_id)" data-dismiss="modal">Add user</button>
        </div>
      </div>
    </div>
  </div>



<div v-for="meeting in meetings">
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
              <p ><b>Organiser: </b> {{meeting.organisator.fullname}} </p>
              <p ><b>Meeting start: </b>{{ meeting.met_time_start|dateFormater }}</p>
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



  <!-- ************ KRAJ MODALI *************-->

    <div class="row" >
      <div class="col-lg-10"></div>
      <div class="col-lg-2 text-right pr-5" >
      <router-link to="/probavam">  <img @click="listaKalendar=2" class="slika" src="../assets/calendar.png" alt="" width="100" height="100"></router-link>
      </div>

  </div>


</div>
</template>

<script>
import moment from 'moment'
import Navbar from '../components/navbar.vue'
export default {
  name: 'mainPage',
  components: {
    'nav-bar': Navbar
  },
  data() {
    return {
      weekButtons: false,
      keyUserSearch: '',
      foundUsers: [],
      firstname: '',
      lastname: '',
      mail: '',
      username: '',
      userId: '',
      hasFriends: false,
      ukj: 0,
      usrInfo: [],
      meetings:[],
      listaKalendar:1
    }
  },
  filters: {
    dateFormater: function(value) {
      value = moment.utc(value).toDate();
      return moment(value).local().format(" Do MMM HH:mm");
    },
    backslashRemover: function(value) {
      return value = value.replace(/\\/g, "");
    }
  },
  mounted() {
    this.friends();
    this.chatActive = this.$store.state.activeChat = 0;
    setInterval(this.friends, 10000);
    if (window.localStorage.getItem("sessionid") == null)
      this.$router.push('/');

        axios.get("http://800q121.mars-t.mars-hosting.com/getMeetings", {
          params: {
            sid: window.localStorage.getItem("sessionid")
          },
        }).then(response => {
          //console.log(response.data.result[0].met_longitude);
          this.meetings = response.data.result;
          console.log(response.data);
        });


  },

  methods: {
    getUserInfo(id) {
      axios.get("http://800q121.mars-t.mars-hosting.com/getUserProfile", {
        params: {
          id
        },
      }).then(response => {
        this.usrInfo = response.data.result[0];
      });
    },

    friends() {
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriends", {
        params: {
          sid: window.localStorage.getItem("sessionid")
        },
      }).then(response => {
        if (response.data.result > 0) {
          this.hasFriends = true;
        } else {
          this.hasFriends = false;
        }

      });
    },
    searchUsers() {
      if (this.keyUserSearch != '') {
        axios.get("http://800q121.mars-t.mars-hosting.com/search", {
          params: {
            search: this.keyUserSearch
          },
        }).then(response => {
          this.foundUsers = response.data.result;

        });
      } else {
        this.foundUsers = [];
      }
    },

    addUser(id) {

      axios.post("http://800q121.mars-t.mars-hosting.com/friendRequest", {
        sid: window.localStorage.getItem("sessionid"),
        id
      }).then(response => {

      });
    }

  }
}
</script>

<style scoped>
.buttonWidth {
  width: 50%;
  margin:auto;
  transition: 0.2s all;
}
.buttonWidth:hover {
  width: 100%;

}
.slika {
  transition: 0.3s all;
}
.slika:hover {
  cursor: pointer;
  transform: scale(1.2);
}
.klasaModal {
  position: absolute;
  text-align: center;
  font-size: 50px;
  width: 400px;
  background: gray;
}

#okreni {
  visibility: hidden;
  font-size: 18px;

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
  color:#fff;
}

.noviSastanak button {
  transition: all 0.5s;
  font-size: 16px;
  transition: all 0.5s;
}

.noviSastanak button:hover {
  padding: 7px 20%;
  color: #fff;

}

.sakriveno {
  visibility: hidden;
}

.velikaSlova {
  text-transform: capitalize;
  display: flex;
  justify-content: center;
}

.velikaSlova i {
  font-size: 30px;
  padding-right: 0.5em;
}

.prviPutOmot {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%) translateY(-30%);
}

.ime {
  font-style: italic;
  text-transform: capitalize;
  font-size: 0.9rem;
}

.prviPutLista::placeholder {
  font-weight: 600;
  line-height: 30px;
  font-size: 18px;
}

.prviPutLista {
  border-top: 2px solid #aec6cf;
  border-left: 2px solid #aec6cf;
  border-right: 2px solid #aec6cf;
  background: #fff;
  outline: none;
  width: 100%;
  padding: 5px 0;
  padding-left: 5px;
  font-size: 18px;

}

.prviPutLista:valid {
  border-bottom: 0;
  outline: none;
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.lista {
  position: absolute;
  width: 100%;
  padding: 0;
  border-radius: 0 0 10px 10px;
  border: 2px solid #aec6cf;
  border-top: 0;
  overflow: hidden;
}

.lista li {
  list-style: none;
  width: 100%;
  background: #fff;
  margin: 0;
  padding: 0;
  font-size: 20px;
  letter-spacing: 1px;
}

.lista li:hover {
  background: #6ab4d1;
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px 5px black;
}


.sastanak2 {
  border-radius: 20px;
  width: 100%;
  color: black;
  font-weight: 500;
  letter-spacing: 1px;
  border: 2px solid #aec6cf;
  outline: 0;
  -webkit-box-shadow: -2px 2px 14px -1px #6ab4d1;
  -moz-box-shadow: -2px 2px 14px -1px #6ab4d1;
  box-shadow: -2px 2px 14px -1px #6ab4d1;
  height: 40px;
  font-size: 18px;
  font-family: 'Lato', sans-serif;
  line-height: 38px;
  transition: 0.2s background ease;
}

.sastanak2:hover {
  cursor: pointer;
  border: 0;
  background-color: #6ab4d1;
  color: #fff;
}

.sastanak2:hover i {
  color: #fff;
}

.sastanak2 i {
  font-size: 30px;
  line-height: 38px;
  color: #6ab4d1;
}

.dugme {
  width: 120px;
  background: #6ab4d1;
  color: #fff;
  outline: 0;
}

.dugme:hover {
  border: 1px solid #aec6cf;
}

.skrol {
  padding-top: 2px;
  padding-left: 25px;
  height: 63vh;
  overflow: auto;
  overflow-x: hidden;
  width: 100%;
}

::-webkit-scrollbar {
  width: 10px;
}



/* Track */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #aec6cf;
  border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);

}

.dani {
  visibility: visible;
}
</style>
