<template>
  <div class="CreateModel">
    <h1> Create Model</h1>
    On this site a manager can create a model
    <form v-on:submit="CreateModel">

      <br />
      <label for="fname">Firstname* </label>
      <br />
      <input
          type="text" id="fname" name="firstname" value="" required v-model="model.firstName" maxlength="64" />

      <br /><br />
      <label for="lname">Lastname* </label>
      <br />
      <input type="text" id="lname" name="lastname" value="" required v-model="model.lastName" maxlength="32" />

      <br /> <br />
      <label for="email">Email* </label>
      <br />
      <input type="email" id="email" name="email" value="" required placeholder="mail@m.dk" v-model="model.email" maxlength="254" />

      <br /><br />
      <label for="PhoneNo">Phone number* </label>
      <br />
      <input type="number" id="PhoneNo" name="PhoneNumber" value="" required placeholder="88 88 88 88" v-model="model.phoneNo" maxlength="12" />

      <br /> <br />
      <label for="adr1">Address line 1* </label>
      <br />
      <input type="text" id="adr1" name="address1" value="" required placeholder="Universitetsvej 1" v-model="model.addressLine1" maxlength="64" />

      <br /> <br />
      <label for="adr2">Address line 2 </label>
      <br />
      <input type="text" id="adr2" name="addresse2" value="" placeholder="3.tv" v-model="model.addressLine2" maxlength="64" />

      <br /> <br />
      <label for="country">Country* </label>
      <br />
      <input type="text" id="country" name="country" value="" required placeholder="Denmark" v-model="model.country" maxlength="64" />

      <br /> <br />
      <label for="zip">Zip* </label>
      <br />
      <input type="text" id="zip" name="zip" value="" required placeholder="8000" v-model="model.zip" />

      <br /> <br />
      <label for="city">City* </label>
      <br />
      <input type="text" id="city" name="city" value="" required placeholder="Aarhus" v-model="model.city" />


      <br /><br />
      <label for="password">Password* </label>
      <br />
      <input type="password" id="password" name="password" value="" required v-model="model.password" maxlength="64" />

      <h2>Details:</h2>
      <label for="birthDate">BirthDate* </label>
      <br />
      <input type="date" id="birthDate" name="birthDate" value="" required v-model="model.birthDate" />

      <br /> <br />
      <label for="nationality">Nationality* </label>
      <br />
      <input type="text" id="nationality" name="nationality" value="" required v-model="model.nationality" />

      <br /> <br />
      <label for="height">Height </label>
      <br />
      <input type="number" id="height" name="height" value="" min="1" max="300" v-model="model.height" />

      <br /> <br />
      <label for="shoeSize">ShoeSize </label>
      <br />
      <input type="number" id="shoeSize" name="shoeSize" value="" min="1" max="60" v-model="model.shoeSize" />

      <br /> <br />
      <label for="hairColor">Hair Color</label>
      <br />
      <select id="hairColor" name="Hair Color" v-model="model.hairColor">
        <option label="Green" value="Green"></option>
        <option label="Blue" value="Blue"></option>
        <option label="Brown" value="Brown"></option>
        <option label="Grey" value="Grey"></option>
        <option label="Other" value="Other"></option>
      </select>

      <br /> <br />
      <label for="eyeColor">Eye Color</label>
      <br />
      <select id="eyeColor" name="eyeColor" v-model="model.eyeColor">
        <option label="Green" value="Green"></option>
        <option label="Blue" value="Blue"></option>
        <option label="Brown" value="Brown"></option>
        <option label="Grey" value="Grey"></option>
        <option label="Other" value="Other"></option>
      </select>

      <br /> <br />
      <label for="comments">Comments </label>
      <br />
      <textarea id="comments" v-model="model.comments" maxlength="1000"></textarea>

      <br /> <br />
      <input class="button" type="submit" name="opretModel" value="Create Model" />
      <input class="button" type="reset" name="resetModel" value="Reset" />
    </form>

    <input class="button" type="submit" name="goBack" value="Go Back" v-on:click="goBack" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "CreateModel",
  data() {
    return {
      model: {}
    }
  },

  methods: {
    CreateModel: function () {
      var url = `https://localhost:44368/api/Models`;
      this.model.height = parseFloat(this.model.height);
      this.model.shoeSize = parseInt(this.model.shoeSize);
      axios.post(url, this.model, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(responseJson => {
        this.job = responseJson; this.goBack();
      }).catch(error => { alert('Something bad happened: ' + error);});
    },
    goBack() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
input {
  width: 65%;
  padding: 10px 20px;
  margin: 8px 0;
  border: 1px solid #000;
  box-sizing: border-box;
}

select {
  width: 65%;
  padding: 10px 20px;
  margin: 8px 0;
  border: 1px solid #000;
  box-sizing: border-box;
}

textarea {
  width: 65%;
  padding: 10px 20px;
  margin: 8px 0;
  border: 1px solid #000;
  box-sizing: border-box;
  height: 100px;
}


.button {
  width: 65%;
  border: 1px solid pink;
  background-color: cornflowerblue;
  border-radius: 10px;
  color: purple;
  margin: 10px;

}
.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
  background-color: purple;
  color: black;
}
</style>