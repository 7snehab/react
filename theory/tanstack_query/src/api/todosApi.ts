import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

export const getTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await api.get("/todos");
  return res.data;
};

export const addTodo = async (title: string) => {
  const res = await api.post("/todos", { title, done: false });
  return res.data;
};

export const deleteTodo = async (id: number) => {
  await api.delete(`/todos/${id}`);
  return id;
};
