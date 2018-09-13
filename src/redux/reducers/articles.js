import _ from "lodash";

import {
  REQUESTED,
  REQUESTED_FAILED,
  REQUESTED_ARTICLES_SUCCEEDED,
  REQUESTED_ARTICLE_SUCCEEDED,
  REQUESTED_USER_SUCCEEDED,
  REQUESTED_ARTICLE_COMMENTS_SUCCEEDED,
  RESET_ARTICLES_SEARCH,
  SET_SEARCH,
  REQUESTED_ARTICLES_SEARCH_SUCCEEDED,
} from "../actionTypes";

const initialState = {
  articles: [],
  article: [],
  user: [],
  comments: [],
  search: [],
  searchData: "",
  loading: false,
  error: false,
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED:
      return { ...state, loading: true };
    case REQUESTED_ARTICLES_SUCCEEDED:
      return {
        ...state,
        articles: action.payload,
        loading: false,
        error: false,
      };
    case REQUESTED_FAILED:
      return { ...state, loading: false, error: true };
    case REQUESTED_ARTICLE_SUCCEEDED:
      return {
        ...state,
        article: action.payload,
        loading: false,
        error: false,
      };
    case REQUESTED_USER_SUCCEEDED:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: false,
      };
    case REQUESTED_ARTICLE_COMMENTS_SUCCEEDED:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        error: false,
      };
    case RESET_ARTICLES_SEARCH:
      return {
        ...state,
        search: [],
        searchData: "",
        loading: false,
        error: false,
      };
    case SET_SEARCH: {
      return { ...state, searchData: action.payload, loading: true };
    }
    case REQUESTED_ARTICLES_SEARCH_SUCCEEDED: {
      const { payload } = action;
      const { searchData } = state;
      const re = new RegExp(_.escapeRegExp(searchData), "i");
      const isMatchTitle = result => re.test(result.title);
      const isMatchBody = result => re.test(result.body);
      let search = _.sortBy(
        _.union(
          _.filter(payload, isMatchTitle),
          _.filter(payload, isMatchBody)
        ),
        ["id"]
      );

      return {
        ...state,
        search,
        loading: false,
        error: false,
      };
    }
    default:
      return state;
  }
};

export default articles;
