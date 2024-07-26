import { useState } from "react";

const TodoNew = (props) => {
    const [valueInput, setValueInput] = useState("");
    const { addNewToDo } = props;

    const handleClick = () => {
        addNewToDo(valueInput);
        setValueInput("");
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <>
            <div className='todo-new'>
                <input type="text"
                    id="todo-input"
                    placeholder="Add new todo"
                    onChange={() => { handleOnChange(event.target.value) }}
                    value={valueInput}
                />
                <button
                    id="todo-button"
                    onClick={handleClick}
                >Add</button>
            </div>
        </>
    )
}

export default TodoNew;