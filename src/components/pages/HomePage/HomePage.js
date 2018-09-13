import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, List, Loader, Pagination } from "semantic-ui-react";

import { fetchArticles } from "../../../redux/actions/articles";

import "./HomePage.scss";

class Home extends Component {
  state = {
    currentPage: 1,
    articlesPerPage: 10,
  };

  componentDidMount() {
    this.props.dispatch(fetchArticles());
  }

  linkArticle = event => {
    const { id } = event.target;

    this.context.router.history.push(`/article/${id}`);
  };

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.getAttribute("value")),
    });
  };

  render() {
    const { articles, loading, error } = this.props;
    const { currentPage, articlesPerPage } = this.state;

    // Logic for displaying articles
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );

    const renderArticles = currentArticles.map(article => (
      <List.Item
        className="list-item__hover"
        key={article.id}
        id={article.id}
        onClick={this.linkArticle}
      >
        {article.title}
      </List.Item>
    ));

    return (
      <Segment padded="very">
        {loading && <Loader active />}
        {error ? (
          <p>Error, try again</p>
        ) : (
          <List divided relaxed>
            {renderArticles}
          </List>
        )}
        <Pagination
          defaultActivePage={currentPage}
          totalPages={articlesPerPage}
          onClick={this.handleClick}
        />
      </Segment>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired,
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  loading: state.articles.loading,
  error: state.articles.error,
});

export default connect(mapStateToProps)(Home);
