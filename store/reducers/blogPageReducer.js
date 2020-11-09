const SET_BLOG_DATA = 'blog/SET_BLOG_DATA';
const SET_SEARCH_URL = 'blog/SET_SEARCH_URL';
const SET_FILTER_ITEMS = 'blog/SET_FILTER_ITEMS';

let initialState = {
  posts: [],
  filter_items: [],
  url: {},
};
export const blogPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOG_DATA:
      return {
        ...state,
        posts: action.payload,
      };
    case SET_FILTER_ITEMS:
      return {
        ...state,
        filter_items: action.payload,
      };
    case SET_SEARCH_URL:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};

export const setPostData = (payload) => {
  return {
    type: SET_BLOG_DATA,
    payload,
  };
};
export const setFilterItems = (payload) => {
  return {
    type: SET_FILTER_ITEMS,
    payload,
  };
};
export const setSearchUrl = (payload) => {
  return {
    type: SET_SEARCH_URL,
    payload,
  };
};
export const getPostData = (searchParams) => {
  return async (dispatch) => {
    try {
      let res = await fetch(
        `${process.env.api_key}/posts?per_page=4&${searchParams}`
      );
      let posts = await res.json();
      dispatch(setPostData(posts));
    } catch (error) {
      console.log(error);
    }
  };
};
