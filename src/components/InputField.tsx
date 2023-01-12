import React, { useRef } from 'react';
import './styles.css';

interface props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>; // go to App and hover on setTodo
    handleAdd: (e: React.FormEvent) => void;
    setInputFieldFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputField: React.FC<props> = ({todo, setTodo, handleAdd, setInputFieldFocused}) => {
    // to get input element
    const inputRef = useRef<HTMLInputElement>(null); 

    const handleFocus = () => setInputFieldFocused(true);
    const handleBlur = () => setInputFieldFocused(false);

  return (
    <form 
        className='input' 
        onSubmit={(e) => {
            handleAdd(e);
            inputRef.current?.blur(); // shift the focus of the input box
        }}
    >
        <input onFocus={handleFocus} onBlur={handleBlur}
            ref={inputRef} // useRef change this element
            type='input' 
            placeholder='Enter a task' 
            className='input_box' 
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
        />
        <button className='input_submit' type='submit'>GO</button>
    </form>
  )
}

export default InputField;

