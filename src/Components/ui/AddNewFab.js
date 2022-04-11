import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(uiOpenModal());
  };

  return (
    <button className='btn btn-primary fab' onClick={handleClick}>
      <span className='material-icons'>add</span>
      <span className='text'>Add New Event</span>
    </button>
  );
};
