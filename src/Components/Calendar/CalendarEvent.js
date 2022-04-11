import React from 'react';

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div style={{ textWrap: 'wrap' }}>
      <strong> {title} </strong>
      <span>- {user.name} </span>
    </div>
  );
};
