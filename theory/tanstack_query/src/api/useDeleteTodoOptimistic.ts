import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "./todosApi";
import { todoKeys } from "./queryKeys";

export function useDeleteTodoOptimistic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.all });
      const prev = queryClient.getQueryData(todoKeys.all);
      queryClient.setQueryData(todoKeys.all, (old: any = []) =>
        old.filter((t: any) => t.id !== id),
      );
      return { prev };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(todoKeys.all, context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
