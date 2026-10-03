import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  text: string;
};

export type TodoState = {
  todos: Todo[];
};

const initialState: TodoState = {
  todos: [],
};
// in context we only used to declare but in redux we write definition to
// there params contains two property as say like useState
//state gives the initial values access
//action access values which comes like id in removeTodo
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo); //normally push would mutate but  redux toolkit uses Immer
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo,
      );
    },
  },
});
//we export reducers in two parts
//export all the functionality
//then store needs the info to maintain  the val
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
//action is an obj like this {
//   type: "todo/addTodo",
//   payload: "Learn Redux"
// }
