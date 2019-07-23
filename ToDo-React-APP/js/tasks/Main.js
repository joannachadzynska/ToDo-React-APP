import React from "react";
import Tasks from "./Tasks";
import Form from "./Form";

export default class Main extends React.Component {
  // counter = 6;
  state = {
    tasks: []
  };
  url = "http://localhost:3000/tasks";
  componentDidMount() {
    fetch("http://localhost:3000/tasks")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          tasks: [...data]
        });
      });
    this.intervalHandler;
    this.intervalActive = false;
  }

  updateTaskServer = (id, updateState = false) => {
    const { timeLocal, ...task } = this.state.tasks.find(function(item) {
      return item.id === id;
    });

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...task, status: "open" }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (updateState)
          this.setState({
            tasks: this.state.tasks.map(function(i) {
              return i.id === id ? data : i;
            })
          });
      });
  };

  jsonAdd = task => {
    fetch(`http://localhost:3000/tasks`, {
      method: "POST",
      body: JSON.stringify({ ...task, status: "open" }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  };

  jsonDelete = id => {
    const { ...task } = this.state.tasks.find(function(item) {
      return item.id === id;
    });
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ ...task, status: "closed" }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  };

  componentWillUnmount() {
    if (this.intervalActive) {
      clearInterval(this.intervalHandler);
      this.intervalActive = false;
    }
  }

  countTime = () => {
    this.setState(() => ({
      tasks: this.state.tasks.map(item => {
        if (item.status === "run") {
          if (item.timeLocal >= 5) {
            //aktualizacja serwera
            this.updateTaskServer(item.id);
            // console.log("AKUTALIZUJE")
          }

          return {
            ...item,
            timeSpent: item.timeSpent + 1,
            timeLocal: item.timeLocal > 5 ? 0 : item.timeLocal + 1
          };
        } else {
          return item;
        }
      })
    }));
  };

  openTask = id => {
    this.setState({
      tasks: this.state.tasks.map(item =>
        item.id === id
          ? {
              ...item,
              status: "run",
              timeLocal: 0
            }
          : item
      )
    });

    if (!this.intervalActive) {
      this.intervalHandler = setInterval(() => this.countTime(), 1000);
      this.intervalActive = true;
    }
  };

  changeTaskStatus = id => {
    const tasks = [...this.state.tasks];
    tasks.map(task => {
      if (task.id === id) {
        task.status = "closed";
      }
    });
    this.setState({
      tasks
    });
  };

  deleteTask = id => {
    let tasks = [...this.state.tasks];
    const task = [...this.state.tasks].filter(task => task.status !== "open");
    console.log(task.status);
    if (task.status !== "open") {
      tasks = tasks.filter(task => task.id !== id);

      this.setState(() => ({
        tasks: tasks
      }));
    }

    this.jsonDelete(id);
  };

  finishTask = id => {
    this.updateTaskServer(id, true);

    const isElemWithRun = this.state.tasks.find(function(item) {
      return item.status === "run";
    });

    if (isElemWithRun) {
      if (this.intervalActive) {
        this.intervalActive = false;
        clearInterval(this.intervalHandler);
      }
    }
  };
  addTask = (title, description, status) => {
    const task = {
      id: "",
      title,
      description,
      status,
      timeSpent: 0
    };

    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }));
    this.jsonAdd(task);
  };
  render() {
    return (
      <div className='jumbotron container todo-app'>
        <Form addTask={this.addTask} />
        <hr />
        <Tasks
          tasks={this.state.tasks}
          change={this.changeTaskStatus}
          deleteTask={this.deleteTask}
          openTask={this.openTask}
          finishTask={this.finishTask}
        />
      </div>
    );
  }
}
