<template>
  <div>

    <router-view/>
    <footer-meeting></footer-meeting>
  </div>
</template>

<script>
  import FooterMeeting from './components/footer.vue'

  export default {
    components:{
      "footer-meeting": FooterMeeting
    }
  }
</script>

<style lang="scss">
body {
  overflow-x: hidden;
  background: linear-gradient(to right,#eaf2d2, #f7faee, #eaf2d2 );
color: #666;
font: 90%/180% Arial, Helvetica, sans-serif;
max-width: 100%;
}


</style>
