import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Get the current file's URL
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = path.join(__dirname, "todo.json");

app.use(cors());
app.use(express.json());

const readTodos = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

// Create Todos
app.post("/todos", (req, res) => {
  const todos = readTodos();
  const newTodo = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
  };

  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// Get all Todos
app.get("/todos", (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// Get a single todo
app.get("/todo/:id", (req, res) => {
  const todos = readTodos();
  const todo = todos.find((item) => item.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ message: "Todos not found!!" }); // Explicitly return here
  }

  res.json(todo);
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const todos = readTodos();
  const todo = todos.find((item) => item.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found!!" });
  }

  if (req.body.title !== null) {
    todo.title = req.body.title;
  }
  if (req.body.description !== null) {
    todo.description = req.body.description;
  }

  writeTodos(todos);
  res.json(todo);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const todos = readTodos();

  const todoIndex = todos.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found!!" });
  }

  todos.splice(todoIndex, 1);
  writeTodos(todos);
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
