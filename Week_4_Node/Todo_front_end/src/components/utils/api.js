import axios from "axios";

// get all todos
export const getAllTodos = async ({ signal }) => {
  try {
    const resp = await axios.get("http://localhost:3000/todos", signal);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

// get Single Todo
export const getSingleTodo = async ({ id, signal }) => {
  try {
    const resp = await axios.get(`http://localhost:3000/todo/${id}`, signal);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

// create Todo
export const createTodos = async ({ todos }) => {
  try {
    const resp = await axios.post("http://localhost:3000/todos", todos);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

// update todo
export const updateTodo = async ({ id, todo }) => {
  try {
    const resp = await axios.put(`http://localhost:3000/todos/${id}`, todo);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

// delete todo
export const deleteTodo = async ({ id }) => {
  try {
    const resp = await axios.delete(`http://localhost:3000/todos/${id}`);
    return resp.data;
  } catch (error) {
    throw error;
  }
};
