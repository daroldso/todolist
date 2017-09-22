import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      isAuthed: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePostError = this.handlePostError.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    axios
      .get('/todos')
      .then(res => {
        const todos = res.data;
        this.setState({ todos, isAuthed: true });
      })
      .catch(err => {
        this.setState({ isAuthed: false });
      });
  }

  handleSubmit(newEvent) {
    const newState = [newEvent, ...this.state.todos];
    this.setState({
      todos: newState
    });
    Materialize.toast(
      `Event Added: ${newEvent.summary}`,
      2000,
      'teal darken-1'
    );
  }

  handlePostError(error) {
    this.setState({
      isAuthed: false
    });
  }

  handleClick(eventId) {
    axios
      .delete(`/todos/${eventId}`)
      .then(res => {
        this.setState({
          todos: this.state.todos.filter(todo => todo.id !== eventId)
        });
        Materialize.toast('Event deleted', 2000, 'light-blue darken-1');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let errorMsg = !this.state.isAuthed ? (
      <div className="alert red darken-3">
        Please auth with Google to create/view/remove todo items
      </div>
    ) : (
      ''
    );
    return (
      <div>
        {errorMsg}
        <TodoForm
          handleSubmit={this.handleSubmit}
          handlePostError={this.handlePostError}
        />
        <p>You can only see events start after today</p>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              <TodoItem todo={todo} handleClick={this.handleClick} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
