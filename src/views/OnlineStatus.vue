<template>
<div>


  <footer-meeting></footer-meeting>
</div>
</template>

<script>


import FooterMeeting from '../components/footerMeeting.vue'
import moment from 'moment'

export default {
  components: {
    "footer-meeting": FooterMeeting
  },
  data(){
    return{
      currentTime:""
    }
  },
  methods:{

    getFriendsLoop() {
      this.currentTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendsChat", {
        params: {
          sid: window.localStorage.getItem("sessionid"),
          usr_last_online:this.currentTime
        },
      }).then(response => {
        this.friendsChat = response.data.result;
        console.log(response);
      });

  }
},
mounted() {
setInterval(this.getFriendsLoop,2000);
}}
</script>

<style lang="scss">
body {
    overflow-x: hidden;
    background: linear-gradient(to right,#eaf2d2, #f7faee, #eaf2d2);
    color: #666;
    font: 90%/180% Arial, Helvetica, sans-serif;
    max-width: 100%;
}
</style>
