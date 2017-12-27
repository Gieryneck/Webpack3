import React from 'react';
import style from './App.css';
import Title from '../Title.js';
import TodoList from '../TodoList.js';


// to bedzie jeden z naszych react containerow, nie renderuje sam w sobie żadnej struktury (tylko div okalajacy calosc aplikacji)
// jego zadaniem jest gromadzenie informacji w stanach, oraz zmiana i przekazywanie tych danych innym elementom reactowym  

class App extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            data: [{
                id: 1,
                    text: 'clean room'
                }, {
                id: 2,
                    text: 'wash the dishes'
                }, {
                id: 3,
                    text: 'feed my cat'
                }]
        };

    }

    addTodo(val) {

        const todo = {

            text: val,
            id: uuid.v4(), // generator losowych wartosci, npm install --save uuid
        };

        const data = [...this.state.data, todo] // spread operator, w tym wypadku dziala jak push. data jest tablica obiektow
        this.setState({data}); // Zamiast pisać { data:data }, zastosowaliśmy samo { data }. ES6 bez problemu zrozumie taką składnię
    }

    removeTodo = (id) => {

        const remainder = this.state.data.filter( todo => todo.id !== id); // zwraca tylko te todo ktore maja id rozne od id usuwanego todo
        this.setState({data: remainder});
    }

    render() {
        
        // style.TodoApp - uzywamy loadera CSS
        return (
            <div className={style.TodoApp}>
                <Title todosCount = {this.state.data.length}/>
                <TodoList data = {this.state.data} remove={this.removeTodo}/>
            </div>
        );
    }
}

export default App;