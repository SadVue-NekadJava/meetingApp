<template>
  <div >
    <div class="navChat">
      <div class="row pt-3">
        <div class="col-lg-10 pl-5 text-white" ></div>
        <div class="col-lg-2 pozicijaIkoniceNav " style="display: flex;">
          <form id="demo-2" class="my-auto">

          <input @keyup="searchUsers"    v-model="keyUserSearch" type="search" class="form-control" placeholder="Search">
              <ul class="lista" >
                  <li v-for="user in foundUsers"id="padajuciUseri" class="dropdown-item  "  >{{user.usr_email}}  <hr> </li>

            </ul>

          </form>
          <div class="dropdown ">
          <i  v-if="!hasNotif"  class="fas fa-envelope px-3 my-auto" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <i  v-else  class="fas fa-envelope-open px-3 " style="color:red; my-auto" id="dropdownMenuButton" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false" ></i>
            <div class="dropdown-menu pozadinaPadajuci " aria-labelledby="dropdownMenuButton">
                <ul>
                  <div v-for="notification in notifications">
                      <li @click="statusRead(notification.not_id)"  class="dropdown-item "
                         v-bind:class="[notification.not_confirm ? 'text-white' :'text-danger'] ">
                         {{notification.usr_firstname}} {{notification.usr_lastname}}
                         {{notification.nst_text}}
                         <div  v-if="notification.nst_id==1" class="friend-req">
                           <i id="da" @click="confirmReq(notification.usr_id_send)" class="fas fa-check"></i>
                           <i id="ne" @click="denyReq(notification.usr_id_send)" class="pl-5 fas fa-times"></i>
                         </div>

                        </li>
                        <hr>
                  </div>
              </ul>
            </div>
          </div>
          <div class="dropdown ">
            <i class="fas fa-user"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
              <div class="dropdown-menu pozadinaPadajuci" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item text-white" href="#">Profile</a>
                <hr>
                <a class="dropdown-item text-white" href="#">Settings</a>
                <hr>
            <label  @click="logout">  <router-link to="/"  class="dropdown-item text-white" >Logout</router-link></label>

              </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>



export default {
  name: 'home',
  data(){
    return{
      back:true,
      hasNotif:false,
      keyUserSearch:'',
      foundUsers:[],
      notifications:[],
      notifSound: new Audio(require('../assets/notification.mp3'))

     }
  },
  mounted(){

         //this.  newNotif();
         setInterval(this.notif,1000);
  },
  methods:{

    denyReq(id){
      axios.post("http://800q121.mars-t.mars-hosting.com/friendDenied", {
                sid:  window.localStorage.getItem("sessionid"),
                id
                }).then(response => {

                   console.log('bravo');
                               });


    },
      confirmReq(id){
        axios.post("http://800q121.mars-t.mars-hosting.com/friendConfirm", {
                  sid:  window.localStorage.getItem("sessionid"),
                  id
                  }).then(response => {

                     console.log('bravo');
                                 });


      },

      statusRead(not_id){

        axios.post("http://800q121.mars-t.mars-hosting.com/postNotification", {
                  not_id
                  }).then(response => {

                     console.log('bravo');
                                 });



      },

    searchUsers(){
      if(this.keyUserSearch!=''){
    axios.get("http://800q121.mars-t.mars-hosting.com/search", {
            params:{ search:this.keyUserSearch},
              }).then(response => {
                this.foundUsers=response.data.result;
                 console.log(this.foundUsers);
                             });
                }
                else
                     {
                       this.foundUsers=[];
                     }
    },
    logout(){

          window.localStorage.removeItem("sessionid");
          },

    // newNotif(){
    //   // axios.get("http://760b121.mars-e1.mars-hosting.com/checkNotifications", {
    //   //         params:{sid:localStorage.getItem("sessionid")},
    //   //           }).then(response => {});
    //
    //
    //       },


    notif(){

      axios.get("http://800q121.mars-t.mars-hosting.com/getNotifications", {
              params:{      sid:localStorage.getItem("sessionid")},
                }).then(response => {

                this.notifications=response.data.result;
                 var tempNotification=false;
                for(var i=0;i<this.notifications.length;i++){
                  if(this.notifications[i].not_confirm==0){
                        tempNotification=true;
                          console.log(response.data.result);
                        }
                      }
                      if(tempNotification){
                        if(!this.hasNotif){
                          this.notifSound.play();
                        }
                        this.hasNotif=true;

                      }
                      else{
                          this.hasNotif=false;
                      }

                               });
          }
        }
}



</script>

<style scoped>
#da:hover{
  color:lightgreen;
}
#ne:hover{
  color:red;
}
#demo-2{
  position: relative;
}
.lista{
  position: absolute;
  right: 0;
}


.navChat {
  background: #6ab4d1;
  width: 100%;
  height: 7vh;


}
.navChat i {
  cursor: pointer;
  font-size: 28px;
}
a {
	color: #69C;
	text-decoration: none;
}
.pozadinaPadajuci {
  background: #6ab4d1;
  margin-right: 530px;
  margin-top:1vh;
  padding: 10px 20px;
  text-align: center;
  border-radius: 0 0 20px 20px;
  border: 0;
}
.dropdown-item:hover {
  background: #49a7cc;
  display: inherit;
  border-radius: 30px;


}

.pozicijaIkoniceNav{
  line-height: 30px;
}
a:hover {
	color: #F1f1f1;
}

input {
	outline: none;
}
input[type=search] {
	-webkit-appearance: textfield;
	-webkit-box-sizing: content-box;
	font-family: inherit;
	font-size: 100%;
}
input::-webkit-search-decoration,
input::-webkit-search-cancel-button {
	display: none;
}


input[type=search] {
	background: #6ab4d1 url(https://static.tumblr.com/ftv85bp/MIXmud4tx/search-icon.png) no-repeat 9px center;
	border: solid 1px #6ab4d1  ;
	width: 55px;
  padding-right: 10px;
	-webkit-border-radius: 10em;
	-moz-border-radius: 10em;
	border-radius: 10em;
	-webkit-transition: all .5s;
	-moz-transition: all .5s;
	transition: all .5s;
}
input[type=search]:focus {
	width: 130px;
	background-color: #6ab4d1;
	border-color: #6ab4d1;
  padding: 3px 0 3px 0;
  margin-left: -197px;
	-webkit-box-shadow: 0 0 5px rgba(109,207,246,.5);
	-moz-box-shadow: 0 0 5px rgba(109,207,246,.5);
	box-shadow: 0 0 5px rgba(109,207,246,.5);

}

input:-moz-placeholder {
	color: #999;
}
input::-webkit-input-placeholder {
	color: #999;
}

/* SEARCH BAR */
#demo-2 input[type=search] {
	width: 15px;
	padding-left: 10px;
	color: transparent;
	cursor: pointer;
}
#demo-2 input[type=search]:hover {
	background-color: #fff;
}
#demo-2 input[type=search]:focus {
	width: 200px;
	padding-left: 32px;
	color: #000;
	background-color: #fff;
	cursor: auto;
}
#demo-2 input:-moz-placeholder {
	color: transparent;
}
#demo-2 input::-webkit-input-placeholder {
	color: transparent;
}

</style>
