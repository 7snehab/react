import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoKeys } from "./queryKeys";
import { deleteTodo } from "./todosApi";

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
