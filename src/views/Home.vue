<template>
<div>
  <div class="navChat">
    <div class="text-center pt-2"><img src="../assets/logo.png" height="70" style="line-height:80px;" alt=""></div>
  </div>
  <!-- <div class="container ">


    <div class="loginPozcija">
      <div class="promena mx-auto">
        <input type="radio" id="promena_levo" name="switch_2" checked />
        <label for="promena_levo">Sign in</label>
        <input type="radio" id="promena_desno" name="switch_2" />
        <label for="promena_desno">Sign up</label>
      </div>
      <div class="login">
        <div class="form-group">
          <h3 class="py-3 text-center">Sign in</h3>
          <div class="input-box ">
            <input class=" form-control" type="text" name="" required="" v-model="logUsername">
            <label>Username</label>
          </div>
          <br>
          <div class="input-box ">
            <input class=" form-control" type="password" name="" required="" v-model="logPassword">
            <label>Password</label>
          </div>
          <br>
          <div class="text-center">
            <a data-toggle="modal" data-target="#prijava">
              <button @click="login" class="btn dugme form-control">Sign in</button>
            </a>
            <p class="pt-3 text-center text-danger">{{errorMessage}}</p>
          </div>
        </div>
      </div> -->
      <!-- ************************************SIGNUP*********************************** -->
      <!-- <div class="signup">
        <div class="form-group">
          <h3 class="py-3 text-center">Sign up</h3>
          <div class="input-box ">
            <input class=" form-control" type="text" name="" required="" v-model="regFirstName">
            <label>First Name </label>
          </div>
          <br>
          <div class="input-box ">
            <input class=" form-control" type="text" name="" required="" v-model="regLastName">
            <label>Last name </label>
          </div>
          <br>
          <div class="input-box ">
            <input class=" form-control" type="text" name="" required="" v-model="regUsername">
            <label>Username</label>
          </div>
          <br>
          <div class="input-box ">
            <input class=" form-control" type="text" name="" required="" v-model="regEmail">
            <label>Email</label>
          </div>
          <br>
          <div class="input-box ">
            <input class=" form-control" type="password" name="" required="" v-model="regPass">
            <label>Password</label>
          </div>
          <br>
          <div class="input-box ">
            <input class=" form-control" type="password" name="" required="" v-model="regPass2">
            <label>Confirm password</label>
          </div>
          <br>
          <div class="text-center">
            <a data-toggle="modal" data-target="#registracija">
              <button @click="register" class="btn form-control dugme">Register</button>
            </a>
                <p class="pt-3 text-center text-danger">{{errorMessage}}</p>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="container">
    <div class="loginPozcija">
      <div class="promena mx-auto">
        <input type="radio" id="promena_levo" name="switch_2" checked v-model="radioToggle" value="1" />
        <label for="promena_levo">Sign in</label>
        <input type="radio" id="promena_desno" name="switch_2" v-model="radioToggle" value="2" />
        <label for="promena_desno">Sign up</label>
      </div>
      <div class="login" v-if="radioToggle=='1'">
        <div class="form-group">
          <h3 class="py-3 text-center">Sign in</h3>
          <div class="input-box ">
            <input class=" form-control" type="text" name="" required="" v-model="logUsername">
            <label>Username</label>
          </div>
          <br>
          <div class="input-box ">
            <input class=" form-control" type="password" name="" required="" v-model="logPassword">
            <label>Password</label>
          </div>
          <br>
          <div class="text-center">
            <a data-toggle="modal" data-target="#prijava">
              <button @click="login" class="btn dugme form-control">Sign in</button>
            </a>
            <p class="pt-3 text-center text-danger">{{errorMessage}}</p>
          </div>
        </div>
      </div>
<!--****************************** REFISTRACIJA************************************ -->
<div class="signup" v-else >
  <div class="form-group">
    <h3 class="py-3 text-center">Sign up</h3>
    <div class="input-box ">
      <input class=" form-control" type="text" name="" required="" v-model="regFirstName">
      <label>First Name </label>
    </div>
    <br>
    <div class="input-box ">
      <input class=" form-control" type="text" name="" required="" v-model="regLastName">
      <label>Last name </label>
    </div>
    <br>
    <div class="input-box ">
      <input class=" form-control" type="text" name="" required="" v-model="regUsername">
      <label>Username</label>
    </div>
    <br>
    <div class="input-box ">
      <input class=" form-control" type="text" name="" required="" v-model="regEmail">
      <label>Email</label>
    </div>
    <br>
    <div class="input-box ">
      <input class=" form-control" type="password" name="" required="" v-model="regPass">
      <label>Password</label>
    </div>
    <br>
    <div class="input-box ">
      <input class=" form-control" type="password" name="" required="" v-model="regPass2">
      <label>Confirm password</label>
    </div>
    <br>
    <div class="text-center">
      <a data-toggle="modal" data-target="#registracija">
        <button @click="register" class="btn form-control dugme">Register</button>
      </a>
          <p class="pt-3 text-center text-danger">{{errorMessage}}</p>
    </div>
  </div>
</div>



    </div>
  </div>








  <footer class="fixed-bottom lead text-center">Copyright 2018 meetingApp</footer>
</div>
</template>

<script>

export default {
  name: 'home',

  data() {
    return {
      logUsername: '',
      logPassword: '',
      regFirstName: '',
      regLastName: '',
      regUsername: '',
      regEmail: '',
      regPass: '',
      regPass2: '',
      errorMessage:null,
      radioToggle:'1'

    }
  },
   mounted() {

      if (window.localStorage.getItem("sessionid") != null)
        this.$router.push('/mainPage');
    },
  methods: {
    login() {
      axios.post("http://800q121.mars-t.mars-hosting.com/login", {
        username: this.logUsername,
        password: this.logPassword
      }).then(response => {

        //console.log(response.data[0].usr_access);
        if (response.data.status) {
          var sid = response.data.sid;
          window.localStorage.setItem("sessionid", sid);
          this.$router.push('mainPage');
        }
        else{
          this.errorMessage=response.data.msg;
            setTimeout(()=>{this.errorMessage=null},2000);
        }
      });

    },
    register() {
      axios.post("http://800q121.mars-t.mars-hosting.com/register", {
        username: this.regUsername,
        firstname: this.regFirstName,
        lastname: this.regLastName,
        email: this.regEmail,
        password: this.regPass,
        passwordCheck: this.regPass2

      }).then(response => {
      console.log(response.data.msg);
        if (response.data.status) {

          alert("Uspesna registracija");
          location.reload();
        }
        else{
          this.errorMessage=response.data.msg;
          // setTimeout(()=>{this.errorMessage=null},2000);
        }
      });

    }
  }

}
</script>

<style scoped>
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

.signup{

  animation-fill-mode: forwards;
  animation-name: signup;
  animation-duration: 1s;

}
.promena{

  animation-fill-mode: forwards;
  animation-name: login;
  animation-duration: 1s;

}


.login{

  animation-fill-mode: forwards;
  animation-name: login;
  animation-duration: 1s;

}
@keyframes signup {
  0%{
    transform: scale(0.3);
  } 100% {
    transform: scale(1);
  }
}

@keyframes login {
  0%{
    transform: scale(0.3);
  } 100% {
    transform: scale(1);
  }
}



.loginPozcija {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  -webkit-box-shadow: -3px 2px 25px 3px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -3px 2px 25px 3px rgba(0, 0, 0, 0.75);
  box-shadow: -3px 2px 25px 3px rgba(0, 0, 0, 0.75);
  padding: 50px 60px;
  border-radius: 20px;

}


.input-box {
  position: relative;
}

.input-box label {
  position: absolute;
  top: 5px;
  left: 5px;
  display: block;
  transition: 0.2s;
  font-size: 16px;
}

.input-box input:focus~label,
.input-box input:valid~label {
  top: -22px;
  left: 0;
  font-size: 12px;
  color: #fff;
  text-shadow: 1px 1px 5px #000;
}

.promena input {
  position: absolute;
  opacity: 0;
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

.promena input:checked+label {
  background-color: #6ab4d1;
  -webkit-box-shadow: none;
  text-shadow: 1px 1px 5px #000;
  box-shadow: none;
  color: #fff;
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
</style>
