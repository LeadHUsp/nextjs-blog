import produce from 'immer';

const OPEN_FORM = 'contact/OPEN_FORM';
const CLOSE_FORM = 'contact/CLOSE_FORM';
const SUBMIT_SUCCESS = 'contact/SUBMIT_SUCCESS';
const SUBMIT_FAil = 'contact/SUBMIT_FAil';

let initialState = {
  is_open: false,
  submit_success: false,
  submit_fail: false,
};

export const contactReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    if (action.type === OPEN_FORM) {
      draft.is_open = true;
    }
    if (action.type === CLOSE_FORM) {
      draft.is_open = false;
      draft.submit_success = false;
      draft.submit_fail = false;
    }
    if (action.type === SUBMIT_SUCCESS) {
      draft.submit_success = true;
    }
    if (action.type === SUBMIT_FAil) {
      draft.submit_fail = true;
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
export const setSubmitSuccess = () => {
  return {
    type: SUBMIT_SUCCESS,
  };
};
export const setSubmitFail = () => {
  return {
    type: SUBMIT_FAil,
  };
};
