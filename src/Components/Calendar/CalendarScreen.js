import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import moment from 'moment';

import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { uiOpenModal } from '../../actions/ui';
import { eventsClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setlastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onSelectSlot = (e) => {
    dispatch(eventsClearActiveEvent());
  };

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView', e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    };
    return {
      style,
    };
  };

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />

      <CalendarModal />
      <AddNewFab />
      {!!activeEvent && <DeleteEventFab />}
    </>
  );
};
