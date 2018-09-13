const apiUrl = "https://jsonplaceholder.typicode.com";

export const articlesUrl = () => `${apiUrl}/posts`;
export const articleUrl = id => `${apiUrl}/posts/${id}`;
export const articleUserUrl = id => `${apiUrl}/users/${id}`;
export const articleCommentsUrl = id => `${apiUrl}/posts/${id}/comments`;
