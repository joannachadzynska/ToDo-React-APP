import React from "react";
import Timer from "./Timer";
class Task extends React.Component {
  render() {
    const { id, title, description, status } = this.props.task;
    // "#007bff"
    return (
      <section className='task'>
        <ul className='list-group todo'>
          <h2>Task {id}</h2>
          <li
            className='list-group-item active task-description'
            style={
              status === "closed"
                ? { backgroundColor: "#2cc185", textDecoration: "line-through" }
                : null
            }>
            <h2>{title}</h2>
            <p>{description}</p>
            <button
              className='btn btn-secondary float-right'
              id={id}
              onClick={() => this.props.change(id)}>
              Finish
            </button>
            <button
              className='btn btn-secondary float-right'
              onClick={() => this.props.deleteTask(id)}>
              Delete Task
            </button>
          </li>
          <Timer
            tasks={this.props.task}
            openTask={this.props.openTask}
            finishTask={this.props.finishTask}
          />
          <hr />
        </ul>
      </section>
    );
  }
}

export default Task;
