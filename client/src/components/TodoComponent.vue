<template>
    <div class="todo-container">
      <div>
        <h2>Create a Todo List</h2>
        <form @submit.prevent>
          <div class="form-group">
            <input type="text" class="form-control" @keypress="typing=true" placeholder="What do you want to do?" v-model="title" @keyup.enter="addTodo()">
            <span class="help-block small text-center" v-show="typing">Hit enter to save</span>
          </div>
        </form>
      </div>
      <div class="col-md-12" v-show="todos.length>0">
          <h3>Todo Items</h3>
          <div class="row mrb-10" v-for="todo in todos" :key="todo._id">
              <div class="input-group m-b-5">
                  <span class="input-group-addon addon-right">
                    <input type="checkbox" v-model="todo.done" :checked="todo.done" :value="todo.done" v-on:change="updateTodo(todo)" title="Mark as done?"/>
                  </span>
                  <input type="text" class="form-control" :class="todo.done?'todo__done':''" v-model="todo.title" @keypress="todo.editing=true" @keyup.enter="updateTodo(todo)">
                  <span class="input-group-addon addon-left" title="Delete todo?" @click="deleteTodo(todo._id)">X</span>
              </div>
              <span class="help-block small" v-show="todo.editing">Hit enter to update</span>
          </div>
      </div>
      <div class="row alert alert-info text-center" v-show="todos.length==0">
          <p class="alert alert-info">
            <strong>All Caught Up</strong>
          <br/>
          You do not have any todo items</p>
      </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      typing: false,
      todos: []
    };
  },
  created() {
    this.fetchTodo();
  },
  methods: {
    addTodo() {
      let url = "http://localhost:4000/api/v1/todo/create";
      const token = localStorage.getItem("token");
      let param = {
        title: this.title
      };
      axios({
        method: "POST",
        url,
        headers: {
          token
        },
        data: param
      })
        .then(response => {
          console.log("=======", response.data.data.Todo);
          this.clearTodo();
          this.fetchTodo();
          this.typing = false;
        })
        .catch(error => {
          console.log("[[[[]]]]]]]]", error);
        });
    },
    fetchTodo() {
      let url = "http://localhost:4000/api/v1/todo";
      const token = localStorage.getItem("token");
      axios({
        method: "GET",
        url,
        headers: {
          token
        }
      })
        .then(response => {
          console.log("=======", response.data.data.Todos);
          this.todos = response.data.data.Todos;
        })
        .catch(error => {
          console.log("[[[[]]]]]]]]", error);
        });
    },
    updateTodo(todo) {
      let id = todo._id;
      let url = `http://localhost:4000/api/v1/todo/edit/${id}`;
      const { title, done } = todo;
      const token = localStorage.getItem("token");
      axios({
        method: "PUT",
        url,
        headers: {
          token
        },
        data: { title, done }
      })
        .then(response => {
          console.log("=======", response.data.data.Todo);
          this.fetchTodo();
          todo.editing = false;
        })
        .catch(error => {
          console.log("[[[[]]]]]]]]", error);
        });
    },
    deleteTodo(id) {
      let url = `http://localhost:4000/api/v1/todo/delete/${id}`;
      const token = localStorage.getItem("token");
      axios({
        method: "DELETE",
        url,
        headers: {
          token
        }
      })
        .then(response => {
          console.log("=======", response.data);
          this.fetchTodo();
        })
        .catch(error => {
          console.log("[[[[]]]]]]]]", error);
        });
    },
    clearTodo() {
      this.title = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-container {
  color: #000;
}
</style>
