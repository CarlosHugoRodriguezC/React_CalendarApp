import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventsDelete } from '../../actions/events';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.calendar);
  const handleClick = () => {
    if (!!activeEvent) {
      dispatch(eventsDelete(activeEvent.id));
    }
  };

  return (
    <button
      className='btn btn-danger fab-danger slide-in-from-right'
      onClick={handleClick}>
      <span className='material-icons'>delete</span>
      <span className='text'>Delete Event</span>
    </button>
  );
};
