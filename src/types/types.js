const uiActions = {
  uiOpenModal: '[UI] Open Modal',
  uiCloseModal: '[UI] Close Modal',
};

const eventActions = {
  eventAddNew: '[Event] Add New',
  eventClearActiveEvent: '[Event] Clear Active Event',
  eventSetActive: '[Event] Set Active',
  eventUpdate: '[Event] Update',
  eventDelete: '[Event] Delete',
};

export const types = {
  // UI
  ...uiActions,
  // Event
  ...eventActions,
};
