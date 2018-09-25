<template>
  <div >

    <div class="navChat">
      <div class="row pt-3">
        <div class="col-lg-6">
          <div class="pl-5" style="height:50px;width:50px;background:grey;"></div>
        </div>
        <div class="col-lg-6">
            <p class="text-right text-white display-4 pr-5" style="line-height:50px;">MeetingApp</p>
          </div>

      </div>
    </div>

</div>
</template>

<script>
export default {
  name: 'navBar'
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
