// src/server.js
const express = require('express');
const bodyParser = require("body-parser")
const Controller = require("./controllers/controllers")
const app = express();
const port = 5000;


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const appController = new Controller()

const loadData = () => {
  const data = require("./db/db.json")
  data.reduce((a, v) => {
    v.id = a + 1
    appController.insert(v)
    return a + 1
  }, 0)
}

loadData()

// Get all todos
app.get("/todos", (req, res) => {
  try {
    res.json(appController.fetchAll())
  }
  catch (e) {
    res.status(500).send(e)
  }
})

// Find an todo by ID
app.get("/todos/:id", (req, res) => {
  const response = appController.getById(req.params.id)
  if (response) {
    res.end(JSON.stringify(response))
  } else {
    res.writeHead(404)
    res.end()
  }
})

// Register a new todo for the service
app.post("/todos", (req, res) => {
  const todo = req.body

  // Really basic validation
  if (!todo || !todo.title) {
    res.writeHead(400)
    res.end()

    return
  }

  todo.id = appController.getNextId()
  appController.insert(todo)

  res.json(todo)
})
// Update an existing todo
app.put("/todos/:id", (req, res) => {
  const todo = req.body

  // Really basic validation
  if (!todo || !todo.title) {
    res.writeHead(400)
    res.end()

    return
  }

  todo.id = req.params.id
  appController.update(todo)

  res.json(todo)
})

// Delete an existing todo
app.delete("/todos/:id", (req, res) => {
  appController.clear(req.params.id)
  res.end()
})

module.exports = {
  app,
  appController,
  loadData
}


const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
