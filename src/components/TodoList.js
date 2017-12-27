import React from 'react';
import style from './TodoList.css';

const TodoList = props => 

    <ul className={style.TodoList}>
        {props.data.map((todo) => <li key={todo.id} onClick={(key) => props.remove(todo.id)}>{todo.text}</li>)}
    </ul> // czemu nie moge uzyc "remove(key)" tylko musze "remove(todo.id)" ??
    // czemu musze uzyc "onClick={(key)..." a nie moge "onClick={(todo.id)..." ?

export default TodoList;
