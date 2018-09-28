<template>
<div>
  <nav-bar></nav-bar>
  <div class="row mt-3">
    <div class="col-lg-3">
      <h3 class="text-center  mb-3"> Chat rooms</h3>
      <div class="text-center mb-3">
        <button  class="btn dugme ":class="{'active':isMeetings}" @click="getMeetings">Meetings</button>
        <button  class="ml-2 btn dugme" :class="{'active':!isMeetings}" @click="getFriends">Friends</button>
      </div>
        <!-- ********** Chatrooms *************** -->
      <div class="omotOstaliChatovi ">
        <span  v-for="friendChat in friendsChat" >
          <i class="fas fa-user-tie  pr-2" style="font-size:40px;line-height:50px;"></i>
          <div class="ostaliChatovi  my-auto" @click="listChat(friendChat.fri_id,friendChat.fri_fullname)">{{friendChat.fri_fullname}}</div><div class="kolikoNovihPoruka my-auto">{{friendChat.fri_count}}</div></span>



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
              <div class="datum">datum</div>
              <span class="pr-2 ">Me:</span>
              <div class="ja">
                <div>{{friMsg.msg_text}}</div>
              </div>
            </div>
          </div>
          <div v-else class="row my-4 ">
            <div class="col-lg-6">
              <div class="datum">datum</div>
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
        <input type="text" v-model="friendMsg" class="form-control" placeholder="Your message:" required>
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
      friendMsg: '',
      chatSelected:false,
      isMeetings:true,
      friendsChat:[],
      friMsgs:[],
      friId:0,
      friendName:''
    }
  },
  methods: {
    sendMessage(){
      axios.post("http://800q121.mars-t.mars-hosting.com/postFriendMessages", {

            sid: window.localStorage.getItem("sessionid"),
            fri_id:this.friId, msg_text:this.friMsg

      }).then(response => {

      });

    },
    getMeetings(){
      this.isMeetings=true;
      this.chatSelected=false;
    },
    getFriends(){
      this.isMeetings=false;
      this.chatSelected=false;
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendsChat", {
        params: {
            sid: window.localStorage.getItem("sessionid")
        },
      }).then(response => {
          this.friendsChat=response.data.result;
          console.log(this.friendsChat);
      });
    },
    listChat(fri_id,frName){
      this.chatSelected=true;
      this.friId=fri_id;
      this.friendName=frName;
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendMessages", {
        params: {
            sid: window.localStorage.getItem("sessionid"), fri_id
        },
      }).then(response => {
          this.friMsgs=response.data.messages;
          console.log(this.friMsgs);
      });
    },

    // prikazi() {
    //         this.prikaz = !this.prikaz;
    //         if (this.prikaz) {
    //             this.interval = setInterval(this.provera, 1000);
    //         } else {
    //             clearInterval(this.interval);
    //         }
    //         console.log(this.ime);
    //     },
    // provera() {
    //     console.log("provera");
    //     axios.get("http://712k121.mars-e1.mars-hosting.com/provera", {
    //         params: {
    //             soba: this.soba,
    //             procitanaPoruka: this.procitanaPoruka
    //         }
    //     }).then(response => {
    //         this.msgs = response.data;
    //         /*this.msgs[0].poruka=response.data.data[0].cht_msg;
    //         this.msgs[0].date=response.data.data[0].cht_date;*/
    //         console.log(response.data);
    //     });
    //
    // },
    // posaljiPoruku(){
    //   axios.post("http://712k121.mars-e1.mars-hosting.com/provera", {
    //           poruka: this.poruka,
    //           posiljalac: this.ime,
    //           soba: 2
    //   }).then(response => {
    //       /*this.msgs[0].poruka=response.data.data[0].cht_msg;
    //       this.msgs[0].date=response.data.data[0].cht_date;*/
    //       console.log(response.data);
    //       console.log(this.ime)
    //   });
    //   this.poruka='';
    // },
    funkcija() {
      var objDiv = document.getElementById("divExample");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  },
  mounted() {
    // this.provera();
    // setInterval(this.provera, 1000);
    // setTimeout(this.funkcija, 100);
  }
}
</script>

<style scoped>
.dugme.active{
  background: green;
},

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
