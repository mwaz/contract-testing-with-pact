const axios = require("axios");

function TodoManager(api_server_url) {
  this.AXIOS = axios.create({ baseURL: api_server_url });

  this.getAllTodos = function () {
    return this.AXIOS.get("/todos").then((res) => res.data);
  };

  this.getTodoById = function (id) {
    return this.AXIOS.get(`/todos/${id}`).then((res) => res.data);
  };

  this.createTodo = function (todo) {
    return this.AXIOS.post("/todos", todo).then((res) => res.data);
  };

  this.updateTodo = function (todo) {
    return this.AXIOS.put(`/todos/${todo.id}`, todo).then((res) => res.data);
  };

  this.deleteTodo = function (id) {
    return this.AXIOS.delete(`/todos/${id}`).then((res) => res.data);
  };
}
module.exports = TodoManager;
