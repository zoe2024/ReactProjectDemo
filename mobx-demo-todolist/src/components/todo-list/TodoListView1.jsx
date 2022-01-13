import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import "./todo-list.css"

class TodoList extends Component{
    constructor(props) {
        super(props)
        const { todos } = props
        console.log({todos});
    }
    render() {
        return (
            <ul>
                
            </ul>
        )
    }
}

@inject("TodoListStore")
class TodoListView extends Component {
    constructor(props) {
        super(props)
        this.store = this.props.TodoListStore
    }
    state = {
        inputValue: ""
    }
    addTodo = (ev) => {
        ev.preventDefault()
        this.store.addTodo(this.state.inputValue)
        this.setState({inputValue: ""})
    }
    changeInputValue = (ev) => {
        this.setState({inputValue: ev.target.value})
    }
    render() {
        console.log("todo-list-view-render");
        return (
            <div className="container">
                <header>
                    <input type="text" placeholder="what's you need to do?" autoFocus value={this.state.inputValue} onChange={this.changeInputValue}/>
                    <button onClick={this.addTodo}>提交</button>
                </header>
                <main>
                    <TodoList {...this.store} />
                </main>
                <footer>
                    还有{this.store.left}条待办
                </footer>
            </div>
        )
    }
}

export default TodoListView