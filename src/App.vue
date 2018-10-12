<template>
<div>

  <router-view />
  <footer-meeting></footer-meeting>
</div>
</template>

<script>


import FooterMeeting from './components/footerMeeting.vue'

export default {
  components: {
    "footer-meeting": FooterMeeting
  }
}
</script>

<style >
body {
    overflow-x: hidden;
    background: linear-gradient(to right,#eaf2d2, #f7faee, #eaf2d2);
    font: 90%/180% Arial, Helvetica, sans-serif;
    max-width: 100%;

}
</style>
