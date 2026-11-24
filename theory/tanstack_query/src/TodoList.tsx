import { useState } from "react";
import { useTodos } from "./api/useTodos";
import { useAddTodo } from "./api/useAddTodo";
import { useDeleteTodo } from "./api/useDeleteTodo";
import type { Todo } from "./types";
// import { useDeleteTodoOptimistic } from "./api/useDeleteTodoOptimistic";

export default function TodoList() {
  const [title, setTitle] = useState("");

  const { data: todos, isLoading, isError, error, isFetching } = useTodos();
  const addMutation = useAddTodo();
  const deleteMutation = useDeleteTodo();

  const handleAdd = () => {
    if (!title.trim()) return;
    addMutation.mutate(title, {
      onSuccess: () => setTitle(""),
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAdd} disabled={addMutation.isPending}>
        {" "}
        {addMutation.isPending ? "Adding..." : "Add"}
      </button>
      {addMutation.isError && <p>Add failed:{addMutation.error.message}</p>}
      {isFetching && <small>(syncing...)</small>}
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>
            {todo.title}
            {""}
            <button
              onClick={() => deleteMutation.mutate(todo.id)}
              disabled={deleteMutation.isPending}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
