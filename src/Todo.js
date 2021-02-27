import React, { Component } from "react";
import "./Todo.css";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }
  handleRemove() {
    this.props.removeTodo(this.props.id);
  }
  toggleForm() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleUpdate(e) {
    e.preventDefault();
    // take new task data and update it to the parent
    this.props.updateTodo(this.props.id, this.state.task);
    // this.state.isEditing = false;
    this.toggleForm();
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  toggleCompleted(id) {
    this.props.toggleTodo(this.props.id);
  }
  render() {
    let result;
    if (this.state.isEditing) {
      result = (
        <div className="Todo">
          <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
            <input
              type="text"
              value={this.state.task}
              name="task"
              onChange={this.handleChange}
            />
            <button>Save</button>
          </form>
        </div>
      );
    } else {
      result = (
        <div className="Todo">
          <li
            className={
              this.props.completed ? "Todo-task completed" : "Todo-task"
            }
            onClick={this.toggleCompleted}
          >
            {this.props.task}
          </li>
          <div className="Todo-buttons">
            <button onClick={this.toggleForm}>
              <i class="fas fa-pen" />
            </button>
            <button onClick={this.handleRemove}>
              <i class="fas fa-trash" />
            </button>
          </div>
        </div>
      );
    }
    return result;
  }
}
