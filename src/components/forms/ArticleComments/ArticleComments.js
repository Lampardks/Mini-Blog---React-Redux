import React from "react";
import PropTypes from "prop-types";
import { Comment } from "semantic-ui-react";

const ArticleComments = ({ email, name, body }) => (
  <Comment>
    <Comment.Content>
      <Comment.Author as="a">{email}</Comment.Author>
      <Comment.Text>
        <strong>{name}</strong>
      </Comment.Text>
      <Comment.Text>{body}</Comment.Text>
    </Comment.Content>
  </Comment>
);

ArticleComments.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default ArticleComments;
