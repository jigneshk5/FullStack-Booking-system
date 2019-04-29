<template>
  <div>
    <li role="presentation" data-toggle="modal" data-target=".bd-example-modal-lg">
      <a href="#">Book a room</a>
    </li>
    <!-- Large modal -->
    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h1 class="modal-title">Book a Room</h1>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label class="form-control-label" for="formGroupExampleInput">Full Name</label>
                
                <input
                  type="text"
                  class="form-control"
                  placeholder="e.g. John Smith"
                  v-model="Room.full_name"
                >
              </div>
              <div class="form-group">
                <label class="form-control-label" for="formGroupExampleInput">Checkout</label>
                <datetime
                  type="datetime"
                  :min-datetime="new Date().toLocaleString()"
                  v-model="Room.checkout"
                ></datetime>
              </div>
              <div class="form-group">
                <label class="form-control-label" for="formGroupExampleInput">How Many People</label>
                
                <select class="form-control" id="exampleFormControlSelect1" v-model="Room.people">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-control-label" for="formGroupExampleInput">How many kids</label>
                
                <select class="form-control" id="exampleFormControlSelect1" v-model="Room.kids">
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-control-label" for="formGroupExampleInput">Room Type</label>
                <input type="text" class="form-control" placeholder="Suit" v-model="Room.room_type">
              </div>
              <div class="form-group">
                <label class="form-control-label" for="formGroupExampleInput">Address</label>
                <vue-google-autocomplete
                  id="map"
                  class="form-control"
                  placeholder="Tpe your address"
                  v-on:placechanged="getAddressData"
                  country="in"
                  v-model="Room.address"
                ></vue-google-autocomplete>
              </div>
              <div class="form-group">
                <label class="form-control-label" for="formGroupExampleInput">Room Number</label>
                
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="Room.room_number"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary" @click="addToAPI">Book</button>
            </form>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  data() {
    return {
      Room: {
        full_name: "",
        checkout: "",
        people: "",
        kids: "",
        room_type: "",
        room_number: "",
        address: ""
      }
    };
  },
  methods: {
    getAddressData: function(addressData, placeResultData, id) {
      this.Room.address = addressData;
    },
    addToAPI() {
      let newRoom = {
        full_name: this.Room.full_name,
        checkout: this.Room.checkout,
        people: this.Room.people,
        kids: this.Room.kids,
        room_type: this.Room.room_type,
        room_number: this.Room.room_number,
        address: this.Room.address
      };
      console.log(newRoom);

      axios
        .post("/api/rooms", newRoom)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    VueGoogleAutocomplete,
    datetime: Datetime
  }
};
</script>

<style>
</style>
