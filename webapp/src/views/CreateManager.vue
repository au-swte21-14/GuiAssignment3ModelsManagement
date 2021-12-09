<template>
  <div class="CreateManager">
    <h1> Create Manager</h1>
    On this site, a manager can create another manager
    <form v-on:submit="CreateManager">
      <br /><br />
      <label for="firstName">Firstname* </label>
      <br />
      <input type="text" id="firstName" name="firstName" value="" required v-model="manager.firstname" maxlength="64" />

      <br /><br />
      <label for="lastName">Lastname* </label>
      <br />
      <input type="text" id="lastName" name="lastName" value="" required v-model="manager.lastname" maxlength="32" />

      <br /><br />
      <label for="email">Email* </label>
      <br />
      <input type="email" id="email" name="email" value="" required v-model="manager.email" placeholder="Email@m.dk" maxlength="64" />

      <br /><br />
      <label for="password">Password* </label>
      <br />
      <input type="password" id="password" name="password" value="" required v-model="manager.password" maxlength="64" />

      <br /><br />
      <input class="button" type="submit" name="CreateManager" value="Opret" />
      <input class="button" type="reset" name="reset" value="Reset" />
    </form>

    <input class="button" type="submit" name="goBack" value="Go Back" v-on:click="goBack" />
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: "CreateManager",
  data() {
    return {
      manager: {}
    }
  },

  methods: {
    CreateManager: function (event) {
      event.preventDefault();
      var url = "/api/Managers";
      axios.post(url, this.manager, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      }).then(responseJson => {
        this.response = responseJson; this.goBack();
      }).catch(error => {
        if (error?.response?.data) {
          for (const [, value] of Object.entries(error?.response?.data)) {
            this.$bvToast.toast(value, {
              title: "Login failed",
              toaster: "b-toaster-top-right",
              solid: true,
              appendToast: true
            });
          }
        }
      });
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
  background-color: deepskyblue;
  border-radius: 10px;
  color: purple;
  margin: 10px;

}
.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
  background-color: cornflowerblue;
  color: black;
}
</style>