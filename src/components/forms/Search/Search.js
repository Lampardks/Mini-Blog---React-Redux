import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { Grid } from "semantic-ui-react";

import {
  fetchArticlesSearch,
  setArticlesSearch,
  resetArticlesSearch,
} from "../../../redux/actions/articles";

class Search extends Component {
  state = {
    focus: false,
    hover: false,
  };

  handleSearchChange = ({ target: { value: searchInputValue } }) => {
    this.props.dispatch(setArticlesSearch(searchInputValue));
    this.props.dispatch(fetchArticlesSearch());
  };

  onFocus = () => {
    this.setState({ focus: true });
  };

  onBlur = () => {
    this.setState({ focus: false });
  };

  handleMouseEnter = () => {
    this.setState({ hover: true });
  };

  handleMouseLeave = () => {
    this.setState({ hover: false });
  };

  getClassSearch = () => {
    if (this.state.focus === true) return "ui active visible focus search";
    else if (this.state.focus === false && this.state.hover === true)
      return "ui active visible search";
    else return "ui search";
  };

  getClass = () => {
    if (this.state.hover === true) return "results transition visible";
    else if (this.state.hover === false && this.state.focus === true)
      return "results transition visible";
    else return "results transition";
  };

  onClick = event => {
    this.setState({ focus: false, hover: false });
    let { id } = event.target;
    if (id === "") id = event.target.parentNode.id;
    this.props.dispatch(resetArticlesSearch());

    this.context.router.history.push(`/article/${id}`);
  };

  render() {
    const { loading, search, searchData } = this.props;

    return (
      <Grid>
        <Grid.Column width={6}>
          <div className={this.getClassSearch()}>
            <div className="ui icon input">
              <input
                className="prompt"
                type="text"
                value={searchData}
                onChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true,
                })}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
              <i aria-hidden="true" className="search icon" />
            </div>
            {loading ? (
              <div className={this.getClass()}>Loading...</div>
            ) : !search.length && searchData ? (
              <div className={this.getClass()}>No article found</div>
            ) : !searchData ? null : (
              <div
                className={this.getClass()}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                {search.map(item => (
                  <div
                    onClick={this.onClick}
                    className="result"
                    key={item.id}
                    id={item.id}
                  >
                    <p>{item.title}</p>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

Search.contextTypes = {
  router: PropTypes.object.isRequired,
};

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  search: state.articles.search,
  searchData: state.articles.searchData,
  loading: state.articles.loading,
  error: state.articles.error,
});

export default connect(mapStateToProps)(Search);
