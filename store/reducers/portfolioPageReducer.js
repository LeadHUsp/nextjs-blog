import produce from 'immer';

const SET_BLOG_DATA = 'portfolio/SET_BLOG_DATA';
const SET_SEARCH_URL = 'portfolio/SET_SEARCH_URL';
const ADD_CHECKED_PARAM = 'portfolio/ADD_CHECKED_PARAM';
const REMOVE_CHECKED_PARAM = 'portfolio/REMOVE_CHECKED_PARAM';
const SET_FILTER_ITEMS = 'portfolio/SET_FILTER_ITEMS';
const SET_CATEGORIES_DATA = 'portfolio/SET_CATEGORIES_DATA';
const SET_TAGS_DATA = 'portfolio/SET_TAGS_DATA';

let initialState = {
  posts: [],
  filter_items: {
    tags: [],
    categories: [],
  },
  url: {},
};
export const portfolioPageReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    if (action.type === SET_BLOG_DATA) {
      draft.posts = action.payload;
    }
    if (action.type === SET_FILTER_ITEMS) {
      draft.filter_items = action.payload;
    }
    if (action.type === SET_SEARCH_URL) {
      draft.url = action.payload;
    }
    if (action.type === ADD_CHECKED_PARAM) {
      draft.url = action.payload;
    }
    if (action.type === REMOVE_CHECKED_PARAM) {
      draft.url = action.payload;
    }
    if (action.type === SET_CATEGORIES_DATA) {
      draft.filter_items.categories = action.payload;
    }
    if (action.type === SET_TAGS_DATA) {
      draft.filter_items.tags = action.payload;
    }
  });
};
export const setFilterItems = (payload) => {
  return {
    type: SET_FILTER_ITEMS,
    payload,
  };
};
export const addCheckedParam = (payload) => {
  return {
    type: ADD_CHECKED_PARAM,
    payload,
  };
};
export const removeCheckedParam = (payload) => {
  return {
    type: REMOVE_CHECKED_PARAM,
    payload,
  };
};
export const setPostData = (payload) => {
  return {
    type: SET_BLOG_DATA,
    payload,
  };
};

export const setSearchUrl = (payload) => {
  return {
    type: SET_SEARCH_URL,
    payload,
  };
};
export const setCategoriesData = (payload) => {
  return {
    type: SET_CATEGORIES_DATA,
    payload,
  };
};
export const setTagsData = (payload) => {
  return {
    type: SET_TAGS_DATA,
    payload,
  };
};
