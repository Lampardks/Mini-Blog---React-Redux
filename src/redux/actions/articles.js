import {
  REQUESTED,
  REQUESTED_FAILED,
  REQUESTED_ARTICLES_SUCCEEDED,
  FETCHED_ARTICLES,
  REQUESTED_ARTICLE_SUCCEEDED,
  FETCHED_ARTICLE,
  REQUESTED_USER_SUCCEEDED,
  REQUESTED_ARTICLE_COMMENTS_SUCCEEDED,
  FETCHED_ARTICLES_SEARCH,
  RESET_ARTICLES_SEARCH,
  SET_SEARCH,
  REQUESTED_ARTICLES_SEARCH_SUCCEEDED,
} from "../actionTypes";

export const requestArticles = () => ({
  type: REQUESTED,
});

export const requestArticlesSuccess = articles => ({
  type: REQUESTED_ARTICLES_SUCCEEDED,
  payload: articles,
});

export const requestArticlesError = () => ({
  type: REQUESTED_FAILED,
});

export const fetchArticles = () => ({
  type: FETCHED_ARTICLES,
});

export const requestArticleSuccess = article => ({
  type: REQUESTED_ARTICLE_SUCCEEDED,
  payload: article,
});

export const fetchArticle = id => ({
  type: FETCHED_ARTICLE,
  id,
});

export const requestUserSuccess = user => ({
  type: REQUESTED_USER_SUCCEEDED,
  payload: user,
});

export const requestCommentsSuccess = comments => ({
  type: REQUESTED_ARTICLE_COMMENTS_SUCCEEDED,
  payload: comments,
});

export const fetchArticlesSearch = () => ({
  type: FETCHED_ARTICLES_SEARCH,
});

export const resetArticlesSearch = () => ({
  type: RESET_ARTICLES_SEARCH,
});

export const setArticlesSearch = data => ({
  type: SET_SEARCH,
  payload: data,
});

export const requestArticlesSearchSuccess = data => ({
  type: REQUESTED_ARTICLES_SEARCH_SUCCEEDED,
  payload: data,
});
