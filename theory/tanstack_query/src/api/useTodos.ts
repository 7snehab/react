import { useQuery } from "@tanstack/react-query";
import { todoKeys } from "./queryKeys";
import { getTodos } from "./todosApi";

export function useTodos() {
  return useQuery({
    queryKey: todoKeys.all, // cache address , same key - same cached data everywhere
    queryFn: getTodos,
  });
}
