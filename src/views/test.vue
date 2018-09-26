<template>
  <div>

      <h1>{{msg}}</h1>
    <!-- <footer-meeting></footer-meeting> -->
  </div>
</template>

<script>


  export default {
    data(){
      return{
          hash:'',
          msg:''

       }
    },
    mounted(){
      this.hash = decodeURIComponent(location.href);
      this.hash = this.hash.split('=');
      this.hash = this.hash[1];
      axios.get("http://800q121.mars-t.mars-hosting.com/validateEmail", {
              params:{  hash: this.hash},
                }).then(response => {
                  console.log(response);
                  this.msg = response.data.msg;

      });
    }
  }
</script>

<style lang="scss">



</style>
