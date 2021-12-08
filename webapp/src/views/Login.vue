<template>
  <div class="login">
    <h1>Login</h1>
    <b-form @submit="onSubmit">
      <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
      >
        <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
        ></b-form-input>
      </b-form-group>
      <b-form-group
          id="input-group-2"
          label="Password:"
          label-for="input-2"
      >
        <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      form: {}
    }
  },

  methods: {
    onSubmit() {
      console.log(this.form);
      axios.post("/api/account/login", this.form).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
        this.$bvToast.toast("Login failed", {
          title: "Login failed",
          toaster: "b-toaster-top-right",
          solid: true,
          appendToast: true
        })
      });
    },

    async sendLogin() {
      let url = "https://localhost:44368/api/account/login";
      try {
        localStorage.setItem("loginEmail", this.email);
        let response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(this.dataObject),
          headers: new Headers({"Content-Type": "application/json"})
        });
        if (response.ok) {
          let token = await response.json();
          localStorage.setItem("token", token.jwt);
          localStorage.setItem("logInStatus", "true");
          this.$router.push('About')
        } else {
          alert("Server returned: " + response.statusText);
        }

      } catch (err) {
        alert("Error: " + err);
      }
    }
  },
  mounted() {
    if (localStorage.getItem("logInStatus") === "true") {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: auto;
}
</style>
