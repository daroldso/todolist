import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class TodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summary: '',
      location: '',
      date: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let self = this;
    this.$dateInput = $(this.dateInput);
    this.$dateInput.pickadate({
      today: false,
      clear: false,
      close: false,
      closeOnSelect: true,
      onSet: function({ select }) {
        const date = moment(select).format('YYYY-MM-DD');
        self.setState({ date });
      }
    });
  }

  componentWillUnmount() {
    this.$dateInput.stop();
  }

  handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.date === '') {
      return;
    }

    axios
      .post('/todos', this.state)
      .then(res => {
        const newEvent = res.data;
        this.props.handleSubmit(newEvent);
      })
      .catch(error => {
        this.props.handlePostError(error);
      });
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="input-field">
          <input
            id="summary"
            name="summary"
            value={this.state.summary}
            type="text"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="summary">Event Title</label>
        </div>
        <div className="input-field">
          <input
            id="location"
            name="location"
            value={this.state.location}
            type="text"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="location">Event Location</label>
        </div>
        <div className="input-field date">
          <input
            id="date"
            name="date"
            value={this.state.date}
            type="text"
            className="datepicker"
            ref={dateInput => (this.dateInput = dateInput)}
            onChange={this.handleChange}
            required
          />
          <label htmlFor="date">Event Date</label>
        </div>
        <div className="input-field">
          <textarea
            id="description"
            name="description"
            className="materialize-textarea"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Summary</label>
        </div>
        <button className="waves-effect waves-light btn" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default TodoForm;
