import { combineReducers } from 'redux';

import { blogPageReducer } from './blogPageReducer';

export default combineReducers({ blog: blogPageReducer });
