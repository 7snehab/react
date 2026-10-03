import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo, type Todo } from "../features/todo/todoSlice";
import type { RootState } from "../app/store";
import { useState } from "react";

//useSelector does two things - reads data from the store and subscribe to the data , now when the data changes react re-renders
export default function Todos() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [todoMsg, setTodoMsg] = useState("");
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const editTodo = (id: string) => {
    dispatch(updateTodo({ id, text: todoMsg }));
    setEditingId(null);
    setTodoMsg("");
  };
  return (
    <>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
              />
              <button onClick={() => editTodo(todo.id)}>s</button>
            </>
          ) : (
            <p>{todo.text}</p>
          )}
          <button onClick={() => dispatch(removeTodo(todo.id))}>x</button>
          <button
            onClick={() => {
              setEditingId(todo.id);
              setTodoMsg(todo.text);
            }}
          >
            e
          </button>
        </li>
      ))}
    </>
  );
}
