<template>
<div>
  <nav-bar></nav-bar>
  <div class="row mt-3">
    <div class="col-lg-3">
      <h3 class="text-center  mb-3"> Chat rooms</h3>
      <div class="text-center mb-3">
        <button class="btn dugme " :class="{'active':isMeetings}" @click="getMeetings">Meetings</button>
        <button class="ml-2 btn dugme" :class="{'active':!isMeetings}" @click="getFriends">Friends</button>
      </div>
      <!-- ************ Chatroom List *************** -->
      <!-- ****************Chatroom Friends List****************** -->
      <div v-if="!isMeetings" class="omotOstaliChatovi ">
        <span v-for="(friendChat,index) in friendsChat " :key='index'>
          <template v-if="friendChat.fri_request==1">
            <i class="fas fa-user-tie  pr-2" :class="{'text-success':friendChat.isOnline}" style="font-size:40px;line-height:50px;"></i>
            <div class="ostaliChatovi  my-auto" @click="listFriendChat(friendChat.fri_id,friendChat.fri_fullname,index)">{{friendChat.fri_fullname}}</div>
            <div v-show.visible="friendChat.fri_count!=0" class="kolikoNovihPoruka my-auto">{{friendChat.fri_count}}</div>
          </template>
        </span>
      </div>
      <!-- ****************Chatroom Meetings List****************** -->
      <div v-else class="omotOstaliChatovi ">
        <span v-for="(meetingChat,index) in meetingsChat " :key='index'>
          <i class="fas fa-users  pr-2" style="font-size:40px;line-height:50px;"></i>
          <div class="ostaliChatovi  my-auto" @click="listMeetingChat(meetingChat.met_id,index)">{{meetingChat.met_title}}</div>
          <div v-show.visible="meetingChat.meeting_count!=0" class="kolikoNovihPoruka my-auto">{{meetingChat.meeting_count}}</div>
        </span>
      </div>
    </div>
    <!-- ************No chat room selected  ************ -->
    <div v-if="chatSelected==0" class="col-lg-6 ">

      <h1 class="text-center pt-5">Pick chat room</h1>
    </div>
    <!-- ************Chat room Friend selected  ************ -->
    <div v-else-if="chatSelected==1" class="col-lg-6 ">
      <h3 class="text-center  mb-3"> Chat window</h3>
      <div class="omotChat " id="divExample">
        <button v-if="!hideLazyLoadButton" @click="loadMoreMsgs" type="button" class="btn btn-primary" name="button">Load more messages</button>
        <div v-for="friMsg in friMsgs">
          <div class="row " v-if="friMsg.usr_id_from==0">
            <div class="col-lg-6"> </div>
            <div class="col-lg-6 text-right pr-4">
              <div class="datum">{{friMsg.msg_time|dateFormater}}</div>
              <span class="pr-2 ">Me:</span>
              <div class="ja">
                <div>{{friMsg.msg_text| backslashRemover}}</div>
              </div>
            </div>
          </div>
          <div v-else class="row my-4 ">
            <div class="col-lg-6">
              <div class="datum">{{friMsg.msg_time|dateFormater}}</div>
              <span class="pr-2">{{friendName}}: </span>
              <div class="on">
                <div>{{friMsg.msg_text| backslashRemover}}</div>
              </div>
            </div>
            <div class="col-lg-6"> </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="friendMsg1" class="form-control" placeholder="Your message:" required>
      </form>
    </div>
    <!-- ************Chat room Meeting selected  ************ -->
    <div v-else-if="chatSelected==2" class="col-lg-6 ">
      <h3 class="text-center  mb-3"> Chat window</h3>
      <div class="omotChat " id="divExample">
        <button v-if="!hideLazyLoadButton"   @click="loadMoreMsgsMeeting" type="button" class="btn btn-primary" name="button">Load more messages</button>
        <div v-for="metMsg in meetMsgs">
          <div class="row " v-if="metMsg.msg_from==0">
            <div class="col-lg-6"> </div>
            <div class="col-lg-6 text-right pr-4">
              <div class="datum">{{metMsg.msg_time|dateFormater}}</div>
              <span class="pr-2 ">Me:</span>
              <div class="ja">
                <div>{{metMsg.msg_text| backslashRemover}}</div>
              </div>
            </div>
          </div>
          <div v-else class="row my-4 ">
            <div class="col-lg-6">
              <div class="datum">{{metMsg.msg_time|dateFormater}}</div>
              <span class="pr-2">{{metMsg.msg_from}}: </span>
              <div class="on">
                <div>{{metMsg.msg_text| backslashRemover}}</div>
              </div>
            </div>
            <div class="col-lg-6"> </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="sendMessageMeet">
        <input type="text" v-model="meetMessageOne" class="form-control" placeholder="Your message:" required>
      </form>
    </div>
    <!-- *******************Meeting options********************* -->
    <div v-if="chatSelected ==2" class="col-lg-3">
      <h3 class="text-center  mb-3"> Chat members</h3>
      <div class="omotOstaliChatovi members">
        <h4 class="text-center">{{meetingsChat[this.indexMeeting].met_title}}</h4>
        <p class="lead">Members: </p>
        <a data-toggle="modal" title="Nazad" data-target="#add" class="mx-auto">
          <!-- <p style="font-size:20px;cursor:pointer"><i class="fas fa-plus" style="color:#6ab4d1"></i> Add member</p> -->
        </a>
        <div v-for="participant in meetingsChat[this.indexMeeting].participants" class="member">
          <span><i v-if="!participant.isOnline" class="fas fa-circle pt-2 pr-2" style="font-size:10px;color:red"></i>
            <i v-else class="fas fa-circle pt-2 pr-2" style="font-size:10px;color:green"></i>
            <p>{{participant.usr_fullname}}</p>
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- **************************** MODALI ******************************-->
  <!-- **************************** ADD MEMBER ******************************-->
  <div class="modal fade text-center text-center" id="add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add member</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body form-group">
          <input type="text" class="form-control" placeholder="Enter username or mail">
          <button class="btn dugme form-control mt-3">Add</button>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
  <!-- **************************** MEMBER INFO ******************************-->
  <div class="modal fade text-center text-center" id="member" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Member info</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body form-group">
          <i class="fas fa-user"></i>
          <h4>Lazar Markovic</h4>
          <hr>
          <p style="cursor:pointer">E-mail: nkjnkjn@gmail.com</p>
          <p class="">Bio: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa labore consectetur cumque alias impedit, fugit facere atque cupiditate, deserunt nisi aliquam accusantium ut quo expedita est provident excepturi nulla nam.</p>
          <button class="btn dugme">Visit profile</button>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Navbar from '../components/navbar.vue';
import moment from 'moment'
export default {
  props: ['ime'],
  components: {
    'nav-bar': Navbar
  },
  data() {
    return {
      prikaz: false,
      soba: 2,
      procitanaPoruka: 1,
      msgs: [],
      interval: null,
      friendMsg1: '',
      chatSelected: 0,
      isMeetings: true,
      friendsChat: [],
      friMsgs: [],
      friId: 0,
      friendName: '',
      trenutnoVreme: null,
      currentTime: '',
      friOnline: true,
      loadedMsgs: 1,
      meetingsChat: [],
      indexMeeting: 0,
      meetMsgs: [],
      meetMessageOne: '',
      meetId: 0,
      hideLazyLoadButton: false
    }
  },
  mounted() {
    this.$store.state.activeChat = 1;
    setInterval(this.getFriendsLoop, 1000);
    this.getFriendsLoop();
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
  methods: {
    sendMessageMeet() {
      this.trenutnoVreme = moment.utc().format("YYYY-MM-DD HH:mm:ss");
      axios.post("http://800q121.mars-t.mars-hosting.com/postMeetingMessages", {
        sid: window.localStorage.getItem("sessionid"),
        met_id: this.meetId,
        msg_text: this.meetMessageOne,
        time: this.trenutnoVreme
      }).then(response => {
        if (response.data.status) {
          for (var i = 0; i < response.data.messages.length; i++) {
            this.meetMsgs.push(response.data.messages[i]);
          }
        }
      });
      this.meetMessageOne = '';
      setTimeout(this.goToBottomChat, 100);
    },
    loadMoreMsgsMeeting(){
        this.loadedMsgs++;
      this.hideLazyLoadButton = false;

      axios.get("http://800q121.mars-t.mars-hosting.com/getMeetingMessagesLazy", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
          met_id: this.meetId,
          brojac: this.loadedMsgs
        },
      }).then(response => {
        this.meetMsgs = response.data.messages;
            console.log(response.data);
      });
      if (this.meetMsgs.length < (this.loadedMsgs - 1) * 10) {
        this.hideLazyLoadButton = true;
      }

    },
    loadMoreMsgs() {
      this.loadedMsgs++;
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendMessagesLazy", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
          fri_id: this.friId,
          brojac: this.loadedMsgs
        },
      }).then(response => {
        this.friMsgs = response.data.messages;
        console.log(response.data);
      });
      if (this.friMsgs.length%10!=0) {
        this.hideLazyLoadButton = true;
      }
    },
    getFriendsLoop() {
      this.currentTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendsChat", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
          usr_last_online: this.currentTime
        }
      }).then(response => {
        this.friendsChat = response.data.result;
        this.meetingsChat = response.data.meetings;
        var now = moment(new Date());
        now = moment.utc(now).format("YYYY-MM-DD HH:mm:ss");
        now = moment(now);
        for (var i = 0; i < this.friendsChat.length; i++) {
          var end = moment(this.friendsChat[i].time);
          var duration = moment.duration(now.diff(end));
          var seconds = duration.asSeconds();
          if (seconds < 3) {
            this.friendsChat[i].isOnline = true;
          } else {
            this.friendsChat[i].isOnline = false;
          }
        }
        for (var i = 0; i < this.meetingsChat.length; i++) {
          for (var j = 0; j < this.meetingsChat[i].participants.length; j++) {
            var end = moment(this.meetingsChat[i].participants[j].usr_last_online);
            var duration = moment.duration(now.diff(end));
            var seconds = duration.asSeconds();
            if (seconds < 3) {
              this.meetingsChat[i].participants[j].isOnline = true;
            } else {
              this.meetingsChat[i].participants[j].isOnline = false;
            }
          }
        }
      });
    },
    getFriends() {
      this.currentTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
      if (this.isMeetings)
        this.chatSelected = 0;
      this.isMeetings = false;

    },
    sendMessage() {
      this.trenutnoVreme = moment.utc().format("YYYY-MM-DD HH:mm:ss");
      axios.post("http://800q121.mars-t.mars-hosting.com/postFriendMessages", {
        sid: window.localStorage.getItem("sessionid"),
        fri_id: this.friId,
        msg_text: this.friendMsg1,
        time: this.trenutnoVreme
      }).then(response => {
        if (response.data.status) {
          for (var i = 0; i < response.data.messages.length; i++) {
            this.friMsgs.push(response.data.messages[i]);
          }
        }
      });
      this.friendMsg1 = '';
      setTimeout(this.goToBottomChat, 100);
    },
    getMeetings() {
      if (!this.isMeetings)
        this.chatSelected = 0;
      this.isMeetings = true;
    },
    listMeetingChat(met_id, index) {
      if (this.meetId != met_id) {
        this.loadedMsgs = 1;
      }
        this.hideLazyLoadButton = false;
      this.indexMeeting = index;
      this.chatSelected = 2;
      this.meetId = met_id;
      this.meetingsChat[index].meeting_count = 0;
      axios.get("http://800q121.mars-t.mars-hosting.com/getMeetingMessages", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
          met_id
        },
      }).then(response => {
        this.meetMsgs = response.data.messages;
        console.log(response.data);
        if (this.meetMsgs.length < 10) {
          this.hideLazyLoadButton = true;
        }
      });
      setTimeout(this.goToBottomChat, 100);
    },
    listFriendChat(fri_id, frName, index) {
      this.hideLazyLoadButton = false;
      if (this.fri_id != fri_id) {
        this.loadedMsgs = 1;
      }
      this.chatSelected = 1;
      this.friId = fri_id;
      this.friendName = frName;
      this.friendsChat[index].fri_count = 0;
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendMessages", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
          fri_id
        },
      }).then(response => {
        this.friMsgs = response.data.messages;
        if (this.friMsgs.length < 10) {
          this.hideLazyLoadButton = true;
        }
      });


      setTimeout(this.goToBottomChat, 100);
    },
    goToBottomChat() {
      var objDiv = document.getElementById("divExample");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  },
}
</script>
<style scoped>
.dugme.active {
  background: green;
}

.member span:hover {
  cursor: pointer;
}

.naslov {
  font-size: 40px;
  text-transform: uppercase;
}

.navChat {
  background: #6ab4d1;
  width: 100vw;
  height: 80px;
  box-shadow: 1px 1px 5px #6ab4d1;
}

input {
  font-size: 20px;
}

input:focus {
  outline-color: #6ab4d1;
}

.datum {
  font-size: 14px;
  font-style: italic;
  font-weight: 100;
  opacity: 0.8;
  color: blue;
}

.omotChat {
  margin-top: 7vh;
  height: 60vh;
  overflow: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 50px;
  border-top: 1px solid #f1f1f1;
}

.ja {
  /* border: 1px solid #6ab4d1;; */
  background-color: #6ab4d1;
  ;
  color: white;
  text-shadow: 0px 0px 5px black;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 20px;
  max-width: 100%;
  word-wrap: break-word;
}

.on {
  /* border: 1px solid #f1f1f1; */
  background-color: #cccccc;
  color: black;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 20px;
  word-wrap: break-word;
  max-width: 100%;
}

.omotOstaliChatovi {
  padding-top: 10vh;
  height: 60vh;
  overflow: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 50px;
  /* border: 1px solid #f1f1f1; */
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

/* .dugme:focus{
  background: green;
} */
.ostaliChatovi {
  height: 50px;
  width: 90%;
  font-size: 20px;
  line-height: 50px;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  border-radius: 20px;
}

.ostaliChatovi:hover {
  background-color: #cccccc;
  cursor: pointer;
}

.kolikoNovihPoruka {
  height: 30px;
  width: 30px;
  background-color: #6ab4d1;
  border-radius: 50%;
  font-size: 20px;
  color: white;
  text-align: center;
}

::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.5);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: darkgrey;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.omotOstaliChatovi span {
  display: flex;
}

pozadinaNav {
  background: #6ab4d1;
  width: 100%;
  height: 60px;
  -webkit-box-shadow: 0px 12px 50px -9px rgba(106, 180, 209, 1);
  -moz-box-shadow: 0px 12px 50px -9px rgba(106, 180, 209, 1);
  box-shadow: 0px 12px 50px -9px rgba(106, 180, 209, 1);
}

.pozadinaNav i {
  cursor: pointer;
  font-size: 28px;
}
</style>
