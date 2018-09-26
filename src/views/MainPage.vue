<template>
  <div >
    <nav-bar></nav-bar>
    <!-- <div  class="pt-5 container" >
      <div class="text-center mb-3">
        <button @click="weekButtons=false" class="btn  dugme mr-3">Daily</button>
        <button @click="weekButtons=true" class="btn dugme mr-3">Weekly</button>
        <button @click="weekButtons=false" class="btn  dugme">All meetings</button>
      </div>
      <div  v-show="weekButtons" class="text-center mb-3 dani">
        <button class="btn  dugme mr-3">Monday</button>
        <button class="btn  dugme mr-3">Tuesday</button>
        <button class="btn  dugme mr-3">Wednesday</button>
        <button class="btn  dugme mr-3">Thursday</button>
        <button class="btn  dugme mr-3">Friday</button>
        <button class="btn  dugme mr-3">Saturday</button>
        <button class="btn  dugme">Sunday</button>
      </div>
      <div class="skrol" >
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10">
            <p class="pl-2">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-dice" data-toggle="tooltip" data-placement="top" title="Entertainment" ></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10">
            <p class="pl-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, culpa.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10">
            <p class="pl-2">Lorem ipsum dolor sit amet.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-dice" data-toggle="tooltip" data-placement="top" title="Entertainment"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10">
            <p class="pl-2">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-dice" data-toggle="tooltip" data-placement="top" title="Entertainment" ></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10">
            <p class="pl-2">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-dice" data-toggle="tooltip" data-placement="top" title="Entertainment" ></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10">
            <p class="pl-2">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-dice" data-toggle="tooltip" data-placement="top" title="Entertainment" ></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
        <div class="row sastanak2 mb-3">
          <div class="col-md-10 ">
            <p class="pl-2">Lorem ipsum dolor.</p>
          </div>
          <div class=" text-right">
             <p > 12:00 AM</p>
           </div>
         <div class="col-md-1">
              <p class="text-right pr-3"><i class="fas fa-briefcase" data-toggle="tooltip" data-placement="top" title="Business"></i></p>
         </div>
        </div>
      </div>
    </div> -->
<!-- *************************** PRVI PUT NA STRANI ***************-->
      <div class="container">
        <div class="prviPutOmot">
          <h3 class="lead display-4">Welcome to meeting app! <br> Connect with your friends...</h3>
          <div class="text-center">
              <!-- <div class="dropdown ">
            <input @keyup="searchUsers"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-model="keyUserSearch" type="text" class="form-control" placeholder="Type e-mail you want to search">
            <div class="dropdown-menu sakriveno  " id="padajuciUseri" aria-labelledby="dropdownMenuButton">
                <ul>
                  <div v-for="user in foundUsers">  <li  class="dropdown-item " >{{user.usr_email}} </li>
                        <hr>
                  </div>
              </ul>
            </div>
          </div> <-->
           <input @keyup="searchUsers" v-model="keyUserSearch" type="search" class="form-control prviPutLista" placeholder="Search">
           <ul class="lista">
              <a data-toggle="modal" title="User" data-target="#userSearched" class="mx-auto" v-for="user in foundUsers" @click="ispis($event)">
                <li  class="pb-2"  id="padajuciUseri" :ime="user.usr_firstname" :prezime="user.usr_lastname" :mail="user.usr_email" :username="user.usr_username"><span class="ime">{{user.usr_firstname}} {{user.usr_lastname}}</span> {{user.usr_email}}</li>
              </a>
          </ul>
          </div>
        </div>
      </div>


    <!-- ************ MODALI *************-->
    <div class="modal fade text-center text-center" id="userSearched" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  	  <div class="modal-dialog" role="document">
    		<div class="modal-content">
    		  <div class="modal-header">
      			<h5 class="modal-title" id="exampleModalLabel"><div class="velikaSlova">
              <i class="fas fa-user"></i><h5>{{firstname}} {{lastname}}</h5>
            </div></h5>
      			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
      			  <span aria-hidden="true">&times;</span>
      			</button>
    		  </div>
    		  <div class="modal-body form-group ">

            <p class="mt-2">E-mail: {{mail}}</p>
            <p class="mt-2">Username: {{username}}</p>

    		  </div>
    		  <div class="modal-footer">
    			    <button class="btn dugme">Add user</button>
    		  </div>
    		</div>
  	  </div>
	  </div>

  <!-- ************ KRAJ MODALI *************-->
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue'
  export default {
    name: 'mainPage',
    components:{
      'nav-bar':Navbar
    },
    data(){
      return{
        weekButtons:false,
        keyUserSearch:'',
        foundUsers:[],
        firstname: '',
        lastname:'',
        mail:'',
        username:''
      }
    },
    mounted(){

      if(window.localStorage.getItem("sessionid")==null)
        this.$router.push('/');
    },
    methods:{
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
      ispis(n){
        this.firstname=n.srcElement.attributes.ime.value;
          this.lastname=n.srcElement.attributes.prezime.value;
          this.mail=n.srcElement.attributes.mail.value;
          this.username=n.srcElement.attributes.username.value;

      }
    }
  }

</script>

<style scoped>
.sakriveno{
  visibility: hidden;
}

.velikaSlova{
  text-transform: capitalize;
  display: flex;
  justify-content: center;
}
.velikaSlova i{
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

.lista {
  position: absolute;
  width: 100%;
  padding: 0;
  border-radius:0 0 10px 10px ;
  border: 2px solid #aec6cf;
  overflow: hidden;
}

.lista li{
    list-style: none;
    width: 100%;
    background: #f1f1f1;
    margin: 0;
    padding: 0;
    font-size: 20px;
    letter-spacing: 1px;
}
.lista li:hover{
    background: #aec6cf;
    cursor: pointer;
}


.sastanak{
  border-radius: 20px;
  width: 100%;
  color:black;
  font-weight: 500;
  letter-spacing: 1px;
  border:1px solid rgba(37,168,46,1);
  outline: 0;
  -webkit-box-shadow: -2px 2px 14px -1px rgba(37,168,46,1);
  -moz-box-shadow: -2px 2px 14px -1px rgba(37,168,46,1);
  box-shadow: -2px 2px 14px -1px rgba(37,168,46,1);
  height: 40px;
  font-size: 18px;
  font-family: 'Lato', sans-serif;
  line-height: 38px;
}

.sastanak2{
  border-radius: 20px;
  width: 100%;
  color:black;
  font-weight: 500;
  letter-spacing: 1px;
  border:2px solid #aec6cf;
  outline: 0;
  -webkit-box-shadow: -2px 2px 14px -1px #6ab4d1;
  -moz-box-shadow: -2px 2px 14px -1px #6ab4d1;
  box-shadow: -2px 2px 14px -1px #6ab4d1;
height: 40px;
font-size: 18px;
font-family: 'Lato', sans-serif;
line-height: 38px;
}


.sastanak i {
  font-size: 30px;
  line-height: 38px;
}

.sastanak2 i {
  font-size: 30px;
  line-height: 38px;
  color:#6ab4d1;
}

.dugme  {
  width: 120px;
  background: #6ab4d1;
  color:#fff;
  outline: 0;
}

.dugme:hover {
  border: 1px solid #aec6cf;
}

.skrol {
  padding-top: 2px;
  padding-left: 25px;
  height:63vh;
   overflow:auto;
   overflow-x:hidden;
   width: 100%;
}

::-webkit-scrollbar {
    width: 10px;
}



/* Track */
::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.5);
    border-radius:4px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #aec6cf;
    border-radius:4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.5);

}

.dani {
  visibility: visible;
}

</style>
