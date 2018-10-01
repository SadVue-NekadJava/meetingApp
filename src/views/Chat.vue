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
      <!-- ********** Chatrooms *************** -->
      <div class="omotOstaliChatovi ">
        <span v-for="(friendChat,index) in friendsChat " :key='index'>
          <template v-if="friendChat.fri_request==1">
          <i  class="fas fa-user-tie  pr-2" style="font-size:40px;line-height:50px;"></i>
          <div  class="ostaliChatovi  my-auto" @click="listChat(friendChat.fri_id,friendChat.fri_fullname,index)">{{friendChat.fri_fullname}}</div>
          <div v-show.visible="friendChat.fri_count!=0" class="kolikoNovihPoruka my-auto">{{friendChat.fri_count}}</div>
</template>
        </span>
      </div>
    </div>
    <!-- ************No chat room selected  ************ -->
    <div v-if="!chatSelected" class="col-lg-6 ">

      <h1 class="text-center pt-5">Pick chat room</h1>
    </div>
    <!-- ************Chat room selected  ************ -->
    <div v-else class="col-lg-6 ">
      <h3 class="text-center  mb-3"> Chat window</h3>
      <div class="omotChat " id="divExample">

        <div v-for="friMsg in friMsgs">
          <div class="row " v-if="friMsg.usr_id_from==0">
            <div class="col-lg-6"> </div>
            <div class="col-lg-6 text-right pr-4">
              <div class="datum">{{friMsg.msg_time|dateFormater}}</div>
              <span class="pr-2 ">Me:</span>
              <div class="ja">
                <div>{{friMsg.msg_text}}</div>
              </div>
            </div>
          </div>
          <div v-else class="row my-4 ">
            <div class="col-lg-6">
              <div class="datum">{{friMsg.msg_time|dateFormater}}</div>
              <span class="pr-2">{{friendName}}: </span>
              <div class="on">
                <div>{{friMsg.msg_text}}</div>
              </div>
            </div>
            <div class="col-lg-6"> </div>
          </div>
        </div>

        <!-- <button @click="prikazi" v-if="!prikaz" type="button" class="btn btn-danger" name="button">Pokreni</button> -->
      </div>
      <form @submit.prevent="sendMessage">
        <input type="text" v-model="friendMsg1" class="form-control" placeholder="Your message:" required>
      </form>
    </div>
    <div v-if="isMeetings" class="col-lg-3">
      <h3 class="text-center  mb-3"> Chat members</h3>
      <div class="omotOstaliChatovi members">
        <h4 class="text-center">Pivo sa osnovcima</h4>
        <p class="lead">Members: </p>
        <a data-toggle="modal" title="Nazad" data-target="#add" class="mx-auto">
          <p style="font-size:20px;cursor:pointer"><i class="fas fa-plus" style="color:#6ab4d1"></i> Add member</p>
        </a>
        <div class="member">
          <a data-toggle="modal" title="Info" data-target="#member" class="mx-auto"><span><i class="fas fa-circle pt-2 pr-2" style="font-size:10px;color:red"></i>
              <p>Lazar</p>
            </span></a>
          <span><i class="fas fa-circle pt-2 pr-2" style="font-size:10px;color:green"></i>
            <p>Marko</p>
          </span>
          <span><i class="fas fa-circle pt-2 pr-2" style="font-size:10px;color:red"></i>
            <p>Filip</p>
          </span>
          <span><i class="fas fa-circle pt-2 pr-2" style="font-size:10px;color:green"></i>
            <p>Nemanja</p>
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
      chatSelected: false,
      isMeetings: true,
      friendsChat: [],
      friMsgs: [],
      friId: 0,
      friendName: '',
      trenutnoVreme:null

    }
  },
  mounted() {
    setInterval(this.getFriendsLoop, 2000);

  },
  filters: {
  dateFormater: function (value) {
    value=moment.utc(value).toDate();
      return moment(value).local().format(" Do MMM HH:mm");
  }
},

  methods: {
    getFriendsLoop() {
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendsChat", {
        params: {
          sid: window.localStorage.getItem("sessionid")
        },
      }).then(response => {
        this.friendsChat = response.data.result;

      });
    },
    sendMessage() {
      // console.log(this.friId, this.friendMsg1);
       this.trenutnoVreme= moment.utc().format("YYYY-MM-DD HH:mm:ss.S");
      console.log(this.friMsgs);
      axios.post("http://800q121.mars-t.mars-hosting.com/postFriendMessages", {
        sid: window.localStorage.getItem("sessionid"),
        fri_id: this.friId,
        msg_text: this.friendMsg1,
        time:this.trenutnoVreme
      }).then(response => {
          console.log(response.data);
        if (response.data.status) {
          for (var i = 0; i < response.data.messages.length; i++) {
            this.friMsgs.push(response.data.messages[i]);
          }

        }

      });
this.friendMsg1='';
    },
    getMeetings() {
      this.isMeetings = true;
      this.chatSelected = false;
    },
    getFriends() {
        console.log(  moment.utc().format("YYYY-MM-DD HH:mm:ss.S") );
      this.isMeetings = false;
      this.chatSelected = false;
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendsChat", {
        params: {
          sid: window.localStorage.getItem("sessionid")
        },
      }).then(response => {
        this.friendsChat = response.data.result;
        console.log(  this.friendsChat);
      });
    },
    listChat(fri_id, frName, index) {
      this.chatSelected = true;
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

      });
        setTimeout(this.funkcija,100);
    },


    funkcija() {
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

,

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
