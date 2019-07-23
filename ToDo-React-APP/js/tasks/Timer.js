import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { id, title, description, status, timeSpent } = this.props.tasks;
    return (
      <>
        <li className='list-group-item task-operation'>
          <button
            className='btn btn-primary float-right'
            onClick={() => this.props.openTask(id)}>
            Start timer
          </button>
          <button
            className='btn btn-primary float-right'
            onClick={() => this.props.finishTask(id)}>
            Stop timer
          </button>
          <span className='btn btn-warning float-right'>Czas: {timeSpent}</span>
        </li>
      </>
    );
  }
}

export default Timer;
