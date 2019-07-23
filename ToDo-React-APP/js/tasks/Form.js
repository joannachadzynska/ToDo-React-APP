import React from "react";

export default class Form extends React.Component {
  state = {
    title: "",
    description: "",
    status: "open"
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    // console.log(title, description);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, description, status } = this.state;
    if (title.length > 2) {
      const add = this.props.addTask(title, description, status);
      if (add) {
        this.setState({
          title: "",
          description: "",
          status: "open"
        });
      }
    } else {
      alert("Za krótka nazwa");
    }
  };
  render() {
    return (
      <form
        className='form-group'
        className='new-task'
        onSubmit={e => this.handleSubmit(e)}>
        <h2>Add new task</h2>
        <input
          type='text'
          className='form-control'
          name='title'
          placeholder='Title'
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          type='text'
          className='form-control'
          name='description'
          placeholder='Description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input type='submit' value='Add' className='btn btn-primary' />
      </form>
    );
  }
}
