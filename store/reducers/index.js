import { combineReducers } from 'redux';
import { contactReducer } from './contactReducer';

import { portfolioPageReducer } from './portfolioPageReducer';

export default combineReducers({
  portfolio: portfolioPageReducer,
  contact: contactReducer,
});
