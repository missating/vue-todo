<template>
<div class="main-form-container">
  <div class="form-container"> 
    <form @submit.prevent>
      <div class="form-group">
        <label for="exampleInputText1">Name</label>
        <input type="text" class="form-control" placeholder="Enter name" v-model="name">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" placeholder="Enter email" v-model="email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-dark" @click="submit()">Submit</button>
    </form>
  </div>
    <h4 class="signin-link">Already have an account ? <router-link to="/login">Login</router-link></h4>
</div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      let url = "http://localhost:4000/api/v1/users/signup";
      let param = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      axios
        .post(url, param)
        .then(response => {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user", response.data.data.user.name);
          this.$router.push("/todo");
          this.clearForm();
        })
        .catch(error => {
          this.$swal({
            position: "top-end",
            type: "error",
            title: error.response.data.errors.detail,
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    clearForm() {
      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bootstrap/scss/bootstrap";
.main-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 250px;
  flex-direction: column;
}

.form-container {
  background-color: #ffffff;
  color: #000000;
  width: 450px;
  height: 350px;
  padding: 15px;
  border-radius: 2%;
}

.signin-link {
  margin-top: 20px;
}
</style>
