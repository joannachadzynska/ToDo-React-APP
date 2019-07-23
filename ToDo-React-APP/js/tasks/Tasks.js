import React from "react";

import Task from "./Task";

const Tasks = props => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tasks: []
  //     // loading: false
  //   };
  // }

  return (
    <>
      {props.tasks.map(task => (
        <Task
          task={task}
          key={task.id}
          change={props.change}
          deleteTask={props.deleteTask}
          openTask={props.openTask}
          finishTask={props.finishTask}
        />
      ))}
    </>
  );
};

export default Tasks;
