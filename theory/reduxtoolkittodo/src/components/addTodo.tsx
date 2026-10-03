import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
export default function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  //dispatch uses reducer to add value in store
  const addTodoHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <form onSubmit={addTodoHandler}>
      <input
        type="text"
        placeholder="enter a todo.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">add todo</button>
    </form>
  );
}
