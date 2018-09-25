<template>
  <div >

    <div class="navChat">
        <div class="row pt-3">
          <div class="col-lg-11 pl-5 text-white" style="line-height:50px;" >

          </div>
          <div class="col-lg-1 pt-3" style="display: flex;font-size:30px;line-height:50px">
            <i  v-if="!hasNotif"class="fas fa-envelope px-3  pt-1"  ></i>
            <i  v-else class="fas fa-envelope-open px-3  pt-1" style="color:red;"  ></i>
            <i class="fas fa-user"></i>
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
      hasNotif:false

     }
  },

  mounted(){

        setInterval(this.notif,1000);
},
  methods:{
    notif(){

      axios.get("http://760b121.mars-e1.mars-hosting.com/checkNotifications", {
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
.navChat {
  background: #6ab4d1;
  width: 100vw;
  height: 80px;
  box-shadow: 1px 1px 5px #6ab4d1;

}
input {
  font-size: 20px;
}
input:focus{
  outline-color: #6ab4d1;
}



</style>
