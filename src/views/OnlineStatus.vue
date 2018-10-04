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
  methods:{

    getFriendsLoop() {
      axios.get("http://800q121.mars-t.mars-hosting.com/getFriendsChat", {
        params: {
          sid: window.localStorage.getItem("sessionid")
        },
      }).then(response => {
        this.friendsChat = response.data.result;
        console.log(this.friendsChat);
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
