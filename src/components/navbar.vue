<template>
<div>
  <div class="navChat">
    <div class="row ">
      <div class="col-lg-2 pl-5 my-auto">
        <form class="search-box">

          <input type="search" autocomplete="off" id="pretragaNav" required="" placeholder="Search" @keyup="searchUsers" v-model="keyUserSearch" class=" prviPutLista">
          <ul class="lista">

            <li data-target="#userSearchedNav" data-toggle="modal" class="pb-2" v-for="user in foundUsers" @click="getUserInfo(user.usr_id)" id="padajuciUseri"><span class="ime">{{user.usr_firstname}} {{user.usr_lastname}}</span>
              {{user.usr_email}}</li>
          </ul>
        </form>
      </div>
      <div class="col-lg-8 pl-5  text-white">
        <router-link to="/mainPage">
          <h3 class="text-center pt-2"><img src="../assets/logo.png" height="50" alt=""></h3>
        </router-link>
      </div>
      <div class="col-lg-2 my-auto pozicijaIkoniceNav " style="display: flex;">

        <!-- Nav bar lupa -->
        <!-- ************ MODALI *************-->
        <!-- ************ MODAL search *************-->
        <div class="modal fade text-center text-center" id="userSearchedNav" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  <div class="velikaSlova">
                    <i class="fas fa-user"></i>
                    <h5>{{usrInfo.usr_firstname}} {{usrInfo.usr_lastname}} </h5>
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
        <!-- ************ MODAL MyProfile *************-->
        <div class="modal fade text-center text-center" id="myProfile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  <div class="velikaSlova">
                    <i class="fas fa-user"></i>
                    <h5>{{myProfileInfo.usr_firstname}} {{myProfileInfo.usr_lastname}} </h5>
                  </div>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body form-group ">

                <p class="mt-2">E-mail: {{myProfileInfo.usr_email}}</p>
                <p class="mt-2">Username: {{myProfileInfo.usr_username}}</p>

              </div>
              <div class="modal-footer">

              </div>
            </div>
          </div>
        </div>



        <!-- ************ KRAJ MODALI *************-->
        <router-link :to="{ name: 'chat' }">
          <i v-if="!colorMsgNotification" :class="{ 'fas fa-comments': activeChat, 'far fa-comments': !activeChat }" style="color:black"></i>
          <i v-else :class="{ 'fas fa-comments': activeChat, 'far fa-comments': !activeChat }" style="color:red"></i></router-link>
        <div class="dropdown visinaNotifikacije">
          <i v-if="!hasNotif" class="far fa-bell px-3 my-auto" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <i v-else class="fas fa-bell px-3 " style="color:red; my-auto" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <div class="dropdown-menu pozadinaPadajuciNotif " aria-labelledby="dropdownMenuButton">
            <ul>
              <div v-for="(notification,index) in notifications">
                <li @click="statusRead(notification.not_id,index)" class="dropdown-item " v-bind:class="[notification.not_confirm ? 'text-white' :'text-danger'] ">
                  {{notification.usr_firstname}} {{notification.usr_lastname}}
                  {{notification.nst_text}}
                  <div v-if="notification.nst_id==1" class="friend-req">
                    <i id="da" @click="confirmReq(notification.usr_id_send,index)" class="fas fa-check"></i>
                    <i id="ne" @click="denyReq(notification.usr_id_send,index)" class="pl-5 fas fa-times"></i>
                  </div>

                </li>
                <hr>
              </div>
            </ul>
          </div>
        </div>
        <div class="dropdown ">
          <i class="far fa-user" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <div class="dropdown-menu pozadinaPadajuci" aria-labelledby="dropdownMenuButton">
            <a data-target="#myProfile" data-toggle="modal" @click="myProfile" class="dropdown-item text-white" href="#">Profile</a>
            <hr>
            <!-- <a class="dropdown-item text-white" href="#">Settings</a>
            <hr> -->
            <label @click="logout">
              <router-link to="/" class="dropdown-item text-white">Logout</router-link>
            </label>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'home',
  data() {
    return {
      back: true,
      hasNotif: false,
      keyUserSearch: '',
      firstname: '',
      lastname: '',
      mail: '',
      username: '',
      userId: '',
      foundUsers: [],
      notifications: [],
      usrInfo: [],
      myProfileInfo: [],
      chatActive: 0,
      friendsChatNotification: [],
      hasChatNotifications: this.$store.state.msgNotificationNavbar,
      currentTime:''
    }
  },
  mounted() {
    this.notif();
    setInterval(this.notif, 20000);
  },
  computed: {
    activeChat() {
      return this.chatActive = this.$store.state.activeChat;
    },
    colorMsgNotification(){
      return this.hasChatNotifications= this.$store.state.msgNotificationNavbar;
    }
  },

  methods: {
    myProfile() {
      axios.get("http://800q121.mars-t.mars-hosting.com/getUserProfile", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
        },
      }).then(response => {
        this.myProfileInfo = response.data.result[0];
      });
    },
    getUserInfo(id) {
      axios.get("http://800q121.mars-t.mars-hosting.com/getUserProfile", {
        params: {
          id
        },
      }).then(response => {
        this.usrInfo = response.data.result[0];
      });
    },
    denyReq(id,index) {
      this.notifications[index].nst_id=2;
      console.log(this.notifications[index]);
      axios.post("http://800q121.mars-t.mars-hosting.com/friendDenied", {
        sid: window.localStorage.getItem("sessionid"),
        id
      }).then(response => {});
    },
    confirmReq(id,index) {
      this.notifications[index].nst_id=2;
      console.log(this.notifications[index]);
      axios.post("http://800q121.mars-t.mars-hosting.com/friendConfirm", {
        sid: window.localStorage.getItem("sessionid"),
        id
      }).then(response => {});
    },
    statusRead(not_id,index) {
      this.notifications[index].not_confirm=true;
      if(  this.notifications[index].nst_text=="has invited you to a meeting."||this.notifications[index].nst_text=="has accepted your meeting invitation."){
        this.$router.push('/probavam');
      }
      axios.post("http://800q121.mars-t.mars-hosting.com/postNotification", {
        not_id
      }).then(response => {});
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
      }).then(response => {});
    },
    logout() {

      window.localStorage.removeItem("sessionid");
    },
    // ********** Checking notifications and sid ********************
    notif() {
      axios.get("http://800q121.mars-t.mars-hosting.com/getNotifications", {
        params: {
          sid: localStorage.getItem("sessionid")
        },
      }).then(response => {
        if (response.data.status) {
          if (response.data.statusResult) {
            this.notifications = response.data.result;
            var tempNotification = false;
            for (var i = 0; i < this.notifications.length; i++) {
              if (this.notifications[i].not_confirm == 0) {
                tempNotification = true;
              }
            }
            if (tempNotification) {
              this.hasNotif = true;
            } else {
              this.hasNotif = false;

            }
          } else {
            this.notifications = [];
            this.hasNotif = false;
          }
        } else {
          window.localStorage.removeItem("sessionid");
          this.$router.push('/');
        }

      });
      setTimeout(this.getChatNotification,100);

    },
    // ****************Chat Notifications*************************
    getChatNotification() {
      this.currentTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    this.$store.state.msgNotificationNavbar = false;
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendsChat", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
          usr_last_online:this.currentTime
        },
      }).then(response => {
        this.friendsChatNotification = response.data.result;
        for (var i in this.friendsChatNotification ) {
          if (this.friendsChatNotification[i].fri_count > 0) {
            this.$store.state.msgNotificationNavbar = true;
          }
        }

      });
    }
  }
}
</script>

<style scoped>
#pretragaNav {
  border-radius: 20px;
  outline: 0;
  border: 0;
  padding: 2%;
  width: 60%;
  opacity: 0.5;
  transition: 0.5s;
}

#pretragaNav:hover,
#pretragaNav:focus,
#pretragaNav:valid {
  border-radius: 20px;
  outline: 0;
  border: 0;
  padding: 2%;
  width: 100%;
  opacity: 1;
}


.lista li {
  padding: 3px;
  list-style: none;
  width: 100%;
  color: #fff;
  text-shadow: 0 0 5px black;
  margin: 0;
  font-size: 20px;
  letter-spacing: 1px;

}

.lista li:hover {
  background: #3aa1c9;
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px 5px black;
  border-radius: 20px;
}


.navChat i:hover {
  transform: scale(1.2);
}

#da:hover {
  color: lightgreen;
}

#ne:hover {
  color: red;
}

.lista {
  position: absolute;
  right: 0;
  z-index: 100;
  margin-top: 20px;
  background: #6ab4d1;
  padding: 0;
  border-radius: 20px;
  margin-left: 2vw;
  padding: 0;
  text-align: center;
  z-index: 300;
}


.navChat {
  background: #6ab4d1;
  width: 100%;
  height: 7vh;


}

.navChat i {
  cursor: pointer;
  font-size: 30px;
  transition: all 0.1s;
}

a {
  color: #69C;
  text-decoration: none;
}
ul {
  padding: 0;
}
.pozadinaPadajuci {
  background: #6ab4d1;
  margin-right: 120px;
  margin-top: 1vh;
  padding: 10px 20px;
  text-align: center;
  border-radius: 0 0 20px 20px;
  border: 0;

}
.pozadinaPadajuciNotif {
  background: #6ab4d1;
  margin-right: 270px;
  margin-top: 1vh;
  padding: 10px 20px;
  text-align: center;
  border-radius: 0 0 20px 20px;
  border: 0;
  max-height: 30vh;
  overflow: auto;
  cursor: pointer;
}
.dropdown-item:hover {
  background: #49a7cc;
  display: inherit;
  border-radius: 30px;


}

.pozicijaIkoniceNav {
  line-height: 30px;
}

a:hover {
  color: #F1f1f1;
}
</style>
