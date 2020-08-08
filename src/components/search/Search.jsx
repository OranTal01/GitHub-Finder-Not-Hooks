import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    text: '',
  };

  handleChangeText = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const trimText = this.state.text.trim();
    if (!trimText) {
      this.props.setAlert('Please enter text', 'danger');
    } else {
      this.props.searchUser(this.state.text);
      this.setState({ text: '' });
    }
  };

  handleClearBtn = () => {
    this.props.clearUser();
  };

  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    toggleClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  render() {
    const { toggleClearBtn } = this.props;
    const { text } = this.state;
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='text'
            value={text}
            placeholder='Search User...'
            onChange={this.handleChangeText}
          />
          <button className='btn btn-dark btn-block'>Search</button>
        </form>
        {toggleClearBtn && (
          <button
            className='btn btn-light btn-block'
            onClick={this.handleClearBtn}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
