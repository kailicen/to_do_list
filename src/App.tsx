import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models/models';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  //const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [inputFieldFocused, setInputFieldFocused] = useState<boolean>(false)

  // submit button trigger: a function to add todo to todos
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = todos;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

    <div className="App">
      <span className="heading">to do list</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} 
                  setInputFieldFocused={setInputFieldFocused} />
      <TodoList
          todos={todos}
          setTodos={setTodos}
          // CompletedTodos={CompletedTodos}
          // setCompletedTodos={setCompletedTodos}
          inputFieldFocused={inputFieldFocused}
        />
    </div>
</DragDropContext>   

  );

}

export default App;
