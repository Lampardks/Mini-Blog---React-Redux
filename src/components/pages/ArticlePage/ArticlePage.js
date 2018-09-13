import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, Container, Header, Loader, Comment } from "semantic-ui-react";

import { fetchArticle } from "../../../redux/actions/articles";

import ArticleComments from "../../forms/ArticleComments/ArticleComments";

class Article extends Component {
  componentDidMount() {
    this.props.dispatch(fetchArticle(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.dispatch(fetchArticle(this.props.match.params.id));
    }
  }

  render() {
    const { article, loading, error, user, comments } = this.props;

    return (
      <Segment padded="very">
        {loading && <Loader active />}
        {error ? (
          <p>Error, try again</p>
        ) : (
          <Container text>
            <Header as="h1">{article.title}</Header>
            <p>{article.body}</p>
            <Container textAlign="right">
              Author: <strong>{user.name}</strong>
            </Container>
            <Comment.Group>
              <Header as="h2" dividing>
                Comments
              </Header>
              {comments.map(comment => (
                <ArticleComments key={comment.id} {...comment} />
              ))}
            </Comment.Group>
          </Container>
        )}
      </Segment>
    );
  }
}

Article.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  article: state.articles.article,
  user: state.articles.user,
  comments: state.articles.comments,
  loading: state.articles.loading,
  error: state.articles.error,
});

export default connect(mapStateToProps)(Article);
