import produce from 'immer';

const OPEN_FORM = 'contact/OPEN_FORM';
const CLOSE_FORM = 'contact/CLOSE_FORM';
const SET_RESPONSE = 'contact/SET_RESPONSE';

let initialState = {
  is_open: false,
  response: '',
};

export const contactReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    if (action.type === OPEN_FORM) {
      draft.is_open = true;
    }
    if (action.type === CLOSE_FORM) {
      draft.is_open = false;
    }
    if (action.type === SET_RESPONSE) {
      draft.response = action.payload;
    }
  });
};
export const setOpenForm = () => {
  return {
    type: OPEN_FORM,
  };
};
export const setCloseForm = () => {
  return {
    type: CLOSE_FORM,
  };
};
export const setResponse = (payload) => {
  return {
    type: SET_RESPONSE,
    payload,
  };
};
