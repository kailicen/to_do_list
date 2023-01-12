import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete } from "react-icons/ai";
import { IoMdCheckmark } from "react-icons/io";
import { Todo } from "../models/models";

interface props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    inputFieldFocused: boolean;
}

const SingleTodo: React.FC<props> = ({ index, todo, todos, setTodos, inputFieldFocused }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  useEffect(() => {
    const completeEdit = (e: any) => {
      if (e.path[0].className !== 'todos_single--text'){
        setEdit(false);
      }
    };

    document.body.addEventListener('click', completeEdit);
    return () => document.body.removeEventListener('click', completeEdit);
  }, [])

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  useEffect(() => {
    const forms = Array.from(document.getElementsByClassName('todos_single'));
    if (inputFieldFocused === true) {
      forms.forEach(form => form.classList.remove('hover'));
    } else {
      forms.forEach(form => form.classList.add('hover'));
    }
  }, [inputFieldFocused])

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index} >
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="todos_single hover"
          onSubmit={(e) => handleEdit(e, todo.id)}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos_single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos_single--text">{editTodo}</s>
          ) : (
            <span 
                className="todos_single--text"
                onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}>{editTodo}</span>
          )}
          <div>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <IoMdCheckmark />
            </span>
          </div>
        </form>
      )}
        
        </Draggable>

      )}

export default SingleTodo;