import { types } from '../types/types';

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventsClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventsUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventsDelete = (id) => ({
  type: types.eventDelete,
  payload: id,
});
