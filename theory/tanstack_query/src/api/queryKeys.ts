//keys are arrays , react query uses them as the cache address
export const todoKeys = {
  all: ["todos"],
  detail: (id: number) => ["todos", id],
};
// invalidateQueries({ queryKey: ["todos"] }) matches BOTH of the above (prefix match).
