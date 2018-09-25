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
          <h3 class="lead display-4">Welcome to meeting app, <br> connect with your friends</h3>
          <div class="text-center">
            <input @keyup="searchUsers" v-model="keyUserSearch" type="text" class="form-control" placeholder="Type e-mail you want to search">
          </div>
        </div>
      </div>
    </div>
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
        keyUserSearch:''
      }
    },
    mounted(){

      if(window.localStorage.getItem("sessionid")==null)
        this.$router.push('/');
    },
    methods:{
        searchUsers(){


          axios.get("http://800q121.mars-t.mars-hosting.com/search", {
                  params:{ slovo:this.keyUserSearch},
                    }).then(response => {
                          
                                   });


        }
    }
  }

</script>

<style scoped>

.prviPutOmot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
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
