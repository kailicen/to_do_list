import React from "react";
import './styles.css';
import { Todo } from "../models/models";
import SingleTodo from "./SingleTodo";
import { Droppable } from 'react-beautiful-dnd';

interface props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  // CompletedTodos: Todo[];
  // setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  inputFieldFocused: boolean;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  // CompletedTodos,
  // setCompletedTodos,
  inputFieldFocused,
}) => {
  
  return (
    <Droppable droppableId="todoList">
    {(provided) => (


          <div
            className="todos" 
            {...provided.droppableProps}
            ref={provided.innerRef}
          >

            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              inputFieldFocused={inputFieldFocused}

              />
            ))}
            {provided.placeholder}
       
       {provided.placeholder}
    </div>
     )}
    </Droppable>

  );
};

export default TodoList;