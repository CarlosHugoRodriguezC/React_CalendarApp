import moment from 'moment';
import { types } from '../types/types';

const initialCalendarState = {
  events: [
    {
      id: moment().toDate().getTime(),
      title: 'Cumpleaños de Pedro',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#fafafa',
      notes: 'Comprar Pastel',
      user: {
        _id: '5c9b7f9b9f9d3a2e0c8b2b8c',
        name: 'Carlos',
      },
    },
  ],
  activeEvent: null,
};

export const calendarReducer = (state = initialCalendarState, action) => {
  switch (action.type) {
    case types.eventAddNew: {
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    }
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };

    case types.eventDelete:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload),
        activeEvent: null,
      };

    default:
      return state;
  }
};
