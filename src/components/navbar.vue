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
          <i  v-else @click="newNotif" class="fas fa-envelope-open px-3 " style="color:red; my-auto" id="dropdownMenuButton" data-toggle="dropdown"aria-haspopup="true" aria-expanded="false" ></i>
            <div class="dropdown-menu pozadinaPadajuci " aria-labelledby="dropdownMenuButton">
                <ul>
                  <div v-for="notification in notifications">  <li  class="dropdown-item text-white" >{{notification}} </li>
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
      notifications:
       ['pera ti je poslao zahtev za prijateljstvo',
        'zile ti je poslao zahtev za prijateljstvo',
        'imate novi sastanak',
        'zika je prihvatio tvoj zahtev']

     }
  },
  mounted(){

         //this.  newNotif();
         setInterval(this.notif,1000);
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

      axios.get("http://800q121.mars-t.mars-hosting.com/checkNotifications", {
              params:{      sid:localStorage.getItem("sessionid")},
                }).then(response => {
                        if(response.data.result.length>0){
                          this.hasNotif=true;
                          console.log(response.data.result);
                        }
                               });
          }
        }
}



</script>

<style scoped>

#demo-2{
  position: relative;
}
.lista{
  position: absolute;
}
.sakriveno{
  visibility: hidden;
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
  margin-right: 130px;
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
