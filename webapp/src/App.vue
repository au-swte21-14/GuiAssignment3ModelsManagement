<template>
  <div id="app">
    <div id="nav">
      <div v-show="loggedIn()">
        <router-link to="/">Home</router-link>
        |
        <router-link to="/jobs">Jobs</router-link>
        |
        <router-link to="/create_model">Create Model</router-link>
        |
        <router-link to="/create_manager">Create Manager</router-link>

        <a class="align-right" v-on:click="logOut()">Log out</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    loggedIn() {
      return localStorage.getItem("token")
    },
    logOut() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.align-right {
  position: absolute;
  right: 20px;
  float: right;
}
</style>
