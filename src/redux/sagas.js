import { call, put, takeEvery, all } from "redux-saga/effects";
import {
  articlesUrl,
  articleUrl,
  articleUserUrl,
  articleCommentsUrl,
} from "../urls";
import {
  requestArticles,
  requestArticlesSuccess,
  requestArticlesError,
  requestArticleSuccess,
  requestUserSuccess,
  requestCommentsSuccess,
  requestArticlesSearchSuccess,
} from "./actions/articles";
import {
  FETCHED_ARTICLES,
  FETCHED_ARTICLE,
  FETCHED_ARTICLES_SEARCH,
} from "./actionTypes";

export default function* watchAll() {
  yield all([
    yield takeEvery(FETCHED_ARTICLES, fetchArticlesAsync),
    yield takeEvery(FETCHED_ARTICLE, fetchArticleAsync),
    yield takeEvery(FETCHED_ARTICLES_SEARCH, fetchArticleSearchAsync),
  ]);
}

function* fetchArticlesAsync() {
  try {
    yield put(requestArticles());
    const data = yield call(() => {
      return fetch(articlesUrl()).then(res => res.json());
    });
    yield put(requestArticlesSuccess(data));
  } catch (error) {
    yield put(requestArticlesError());
  }
}

function* fetchArticleAsync(action) {
  try {
    yield put(requestArticles());
    const data = yield call(() => {
      return fetch(articleUrl(action.id)).then(res => res.json());
    });
    const user = yield call(() => {
      return fetch(articleUserUrl(data.userId)).then(res => res.json());
    });
    const comments = yield call(() => {
      return fetch(articleCommentsUrl(data.id)).then(res => res.json());
    });
    yield put(requestArticleSuccess(data));
    yield put(requestUserSuccess(user));
    yield put(requestCommentsSuccess(comments));
  } catch (error) {
    yield put(requestArticlesError());
  }
}

function* fetchArticleSearchAsync() {
  try {
    yield put(requestArticles());
    const data = yield call(() => {
      return fetch(articlesUrl()).then(res => res.json());
    });
    yield put(requestArticlesSearchSuccess(data));
  } catch (error) {
    yield put(requestArticlesError());
  }
}
