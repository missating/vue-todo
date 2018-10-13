<template>
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">TODO APP</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav ml-auto">
      <a class="nav-item nav-link active" href="#">Hello, {{ user.name }}<span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="#" @click="logout()">LOG OUT</a>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: localStorage.getItem("user")
      }
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bootstrap/scss/bootstrap";
</style>

