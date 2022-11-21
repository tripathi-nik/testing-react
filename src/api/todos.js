import axios from "axios";

import { API_URL } from "../constants";

const url = `${API_URL}/todos`;
const getAllTodos = async () => {
  return axios.get(url);
};
const addTodo = (payload) => {
  return axios.post(url, payload);
};
const deleteTodo = (id) => {
  return axios.delete(`${url}/${id}`);
};
const toggleTodo = (payload) => {
  return axios.put(`${API_URL}/todos/${payload.id}`, payload);
};

export { getAllTodos, addTodo, deleteTodo, toggleTodo };
