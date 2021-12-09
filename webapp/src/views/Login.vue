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
import jwtDecode from "jwt-decode";

export default {
  name: "Login",
  data() {
    return {
      form: {}
    }
  },

  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.post("/api/account/login", this.form).then(response => {
        const decoded = jwtDecode(response.data.jwt);
        console.log(decoded);
        localStorage.setItem("modelId", decoded.ModelId);
        localStorage.setItem("token", response.data.jwt);
        this.$router.push('/');
      }).catch(error => {
        if (error?.response?.data) {
          for (const [, value] of Object.entries(error.response.data)) {
            this.$bvToast.toast(value, {
              title: "Login failed",
              toaster: "b-toaster-top-right",
              solid: true,
              appendToast: true
            });
          }
        }
      });
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
