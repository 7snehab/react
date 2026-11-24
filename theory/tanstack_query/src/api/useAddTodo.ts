import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "./todosApi";
import { todoKeys } from "./queryKeys";

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo, //receives whatever we pass to mutate()
    onSuccess: () => {
      //the link btwn mutation and query
      //the todos cache is outdated - useTodos refetches automatically
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
      //runs only when u call mutate().
    },
  });
}
