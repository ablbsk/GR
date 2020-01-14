import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { searchByPage, searchBooksSuccess, searchBooksFailure } from "../../actions/books";

import PaginationComp from "../../components/navigation/pagination/pagination";
import PageError from "../../components/errors/page-error/page-error";
import SearchAllResultsList from "../../components/lists/search-all-results-list/search-all-results-list";
import SearchAllResultsContent from "../../components/contents/search-all-results-content/search-all-results-content";

import "../../components/navigation/pagination/pagination.css";

class SearchAllResultPage extends Component {
  state = {
    query: queryString.parse(this.props.location.search),
    inputValue: null
  };

  componentDidMount() {
    if (this.state.query.q !== '') {
      this.fetchBooksByPage();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (query !== prevState.query) {
      this.fetchBooksByPage();
      this.props.history.replace(`/search?q=${query.q}&page=${query.page}`);
    }
  }

  fetchBooksByPage = () => {
    const { query } = this.state;
    const { searchByPage, searchBooksSuccess, searchBooksFailure } = this.props;

    if (this.state.query.q === '') {
      toastr.error('Error', "Invalid value");
      return
    }

    searchByPage(query.q, query.page)
      .then(books => searchBooksSuccess(books))
      .catch(error => searchBooksFailure(error));
  };

  handlePageChange = (e, data) => {
    this.setState({
      query: { q: this.state.query.q, page: data.activePage }
    });

    const input = document.getElementById("inputValue");
    input.scrollIntoView({block: "center", behavior: "smooth"});
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ query: { q: this.state.inputValue, page: 1 } });
  };

  render() {
    const { books, loading, query_time_seconds, total_results, error } = this.props;
    const { query } = this.state;
    const isBookString = typeof(books) === 'string';
    const length = typeof(books) === "object" && books.length === 20;

    const result = isBookString ? (
      <p>{books}</p>
    ) : (
      <SearchAllResultsList books={books} />
    );

    const resultMsg = query.q && (
      <span>
        Page {query.page} of about {total_results} results ({query_time_seconds}{" "}
        seconds)
      </span>
    );

    const pagination = loading || isBookString || !length
      ? null
      : <PaginationComp
          activePage={this.state.query.page}
          submit={this.handlePageChange}
        />;

    if (error) {
      return <PageError title={error} />;
    }

    return <SearchAllResultsContent
      loading={loading}
      result={result}
      resultMsg={resultMsg}
      query={query.q}
      pagination={pagination}
      onChange={this.onChange}
      onSubmit={this.onSubmit}
    />
  }
}

function mapStateToProps(state) {
  const { content } = state;
  return {
    books: content.books.data.books,
    query_time_seconds: content.books.data.query_time_seconds,
    total_results: content.books.data.total_results,
    loading: content.books.loading,
    error: content.books.error
  };
}

SearchAllResultPage.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
      average_rating: PropTypes.number,
      image_url: PropTypes.string.isRequired,
      goodreadsId: PropTypes.string.isRequired
    }).isRequired
  ),
  query_time_seconds: PropTypes.string,
  total_results: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default connect(
  mapStateToProps,
  { searchByPage, searchBooksSuccess, searchBooksFailure }
)(SearchAllResultPage);
