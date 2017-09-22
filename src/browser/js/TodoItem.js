import React, { PropTypes } from 'react';
import moment from 'moment';

export default function TodoItem(props) {
  let todo = props.todo;
  let location = todo.location ? <p>Location: {todo.location}</p> : '';
  let startDate = todo.start.date ? (
    <p className="activator">{todo.start.date}</p>
  ) : (
    ''
  );
  let startDateTime = todo.start.dateTime ? (
    <p className="activator">{moment(todo.start.dateTime).format('LLL')}</p>
  ) : (
    ''
  );
  let description = todo.description || '';
  return (
    <div className="card">
      <div className="card-content">
        <span className="card-title grey-text text-darken-4">
          <span className="activator">{todo.summary}</span>
          <i
            className="material-icons right"
            onClick={props.handleClick.bind(null, todo.id)}>
            delete_forever
          </i>
          <i className="material-icons right activator">more_vert</i>
        </span>
        {startDate}
        {startDateTime}
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          <i className="material-icons right">close</i>
        </span>
        {location}
        <p>{description}</p>
        <p>created at: {moment(todo.created).format('LLL')}</p>
      </div>
    </div>
  );
}
