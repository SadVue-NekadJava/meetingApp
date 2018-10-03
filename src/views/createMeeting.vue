<template>
<div>
  <nav-bar></nav-bar>
  <div class="row mt-3">
    <div class="col-lg-3">
      <form class="">
        <label for="MeetingTitle">Title</label>
        <input type="text"><br>
        <label class="MeetingPriority">Priority</label>
        <select class="">
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select><br>
        <label>Participants</label>
        <input type="text" id="pretragaNav" placeholder="Search" @keyup="searchUsers" v-model="keyUserSearch" class=" prviPutLista">
        <ul class="lista">

          <li class="pb-2" v-for="user in foundUsers" @click="AddParticipant(user.usr_id,user.usr_username)"><span class="ime">{{user.usr_firstname}} {{user.usr_lastname}}</span>
            {{user.usr_email}}</li>
        </ul>
        <label>
          AutoComplete</label>
        <GmapAutocomplete @place_changed="setPlace">
        </GmapAutocomplete>
        <button @click="usePlace">Close Map</button>
        <br />
        <GmapMap v-if="this.place" style="width: 600px; height: 300px;" :zoom="16" :center="{lat: this.place.geometry.location.lat(),lng: this.place.geometry.location.lng()}">
          <GmapMarker v-for="(marker, index) in markers" :key="index" :position="marker.position" />
          <GmapMarker v-if="this.place" label="★" :position="{
                    lat: this.place.geometry.location.lat(),
                    lng: this.place.geometry.location.lng(),
                  }" />
        </GmapMap>
        <button type="button">Add New Meeting</button>
      </form>
      <div class="participants">
        <ul>
          <li v-for="(participant,index) in participants" @click="removeParticipant(index)">{{participant.username}}</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</template>
<script>
import Navbar from '../components/navbar.vue';
export default {
  components: {
    'nav-bar': Navbar
  },
  data() {
    return {
      markers: [],
      place: null,
      keyUserSearch: '',
      foundUsers: [],
      participants: [],
      noMach: false,
      noUsers: false
    }
  },
  description: 'Autocomplete Example (#164)',
  methods: {
    setDescription(description) {
      this.description = description;
    },
    setPlace(place) {
      this.place = place
    },
    usePlace(place) {
      if (this.place) {
        this.markers.push({
          position: {
            lat: this.place.geometry.location.lat(),
            lng: this.place.geometry.location.lng(),
          }
        })
        this.place = null;
        console.log(this.markers[0].position);
      }
    },
    searchUsers() {
      if (this.keyUserSearch != '') {
        axios.get("http://800q121.mars-t.mars-hosting.com/search", {
          params: {
            search: this.keyUserSearch
          },
        }).then(response => {
          this.foundUsers = response.data.result;
        });
      } else {
        this.foundUsers = [];
      }
    },
    AddParticipant(id, username) {
      this.noUsers = false;
      this.noMach = true;
      if (this.participants.length > 0) {
        for (var i = 0; i < this.participants.length; i++) {
          if (this.participants[i].id == id) {
            this.noMach = false;
          } else {
            this.noUsers = true;
          }
        }
      } else {
        this.noUsers = true;
      }
      if (this.noMach && this.noUsers) {
        this.participants.push({
          id: id,
          username: username
        })
      }
    },
    removeParticipant(index) {
      this.participants.splice(index, 1);
    }
  }
}
</script>
<style>

</style>
