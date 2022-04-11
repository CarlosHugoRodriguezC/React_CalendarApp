import React from 'react';

export const Navbar = () => {
  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
      <span className='navbar-brand'>Pedro</span>
      <button className='d-flex align-items-center rounded-xl btn btn-light'>
        <span className='material-icons'>logout</span> <span>Salir</span>{' '}
      </button>
    </div>
  );
};
