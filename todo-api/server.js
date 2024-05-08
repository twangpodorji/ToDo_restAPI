const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json()); // for parsing application/json
const port = 3000;
// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const { todo } = require("node:test");

const prisma = new PrismaClient();

// CREATE A TASK
app.post("/task/create", async (req, res) => { 
  const { todo_id, todo } = req.body;
  const result = await prisma.todo.create({
    data: {
      todo_id: todo_id,
      todo: todo,
    },
  });
  res.json(result);
});

// READ GET ALL TASK(S)
app.get("/tasks", async (req, res) => {
  const result = await prisma.todo.findMany();
  res.json(result);
});

// UPDATE TASK TO BE COMPLETED OR NOT COMPLETED
app.patch("/task/update", async (req, res) => {
  const { todo_id, completed } = req.body;
  console.log(todo_id, completed);
  const result = await prisma.todo.update({
    where: { todo_id: todo_id },
    data: {
      completed: completed,
    },
  });
  res.json(result);
});
// DELETE A SPECIFIC TASK BY ID
app.delete("/task/delete", async (req, res) => {
  const { todo_id } = req.body;
  const result = await prisma.todo.delete({
    where: {
      todo_id: todo_id,
    },
  });
  res.json({ result });
});

app.listen(port, () => {
  console.log(`ToDo App listening on port ${port}`);
});

// list to store the todos that the server receives
const List_of_toDos = [];

app.post("/data", (req, res) => {
  const toDo = req.body;
  console.log(toDo);
  List_of_toDos.push(toDo);
  res.send("ToDo is added la !");
});