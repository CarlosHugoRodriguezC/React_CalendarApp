import { types } from '../types/types';

export const initialUiState = {
  modalOpen: false,
};

export const uiReducer = (state = initialUiState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };

    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };

    default:
      return state;
  }
};
