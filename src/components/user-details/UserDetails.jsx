import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import UserRepos from '../user-repos/UserRepos';

class UserDetails extends Component {
  componentDidMount() {
    this.props.searchUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    searchUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      login,
      avatar_url,
      html_url,
      name,
      company,
      email,
      bio,
      public_repos,
      public_gists,
      followers,
      following,
      hireable,
      location,
      blog,
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <li className='fas fa-check text-success'></li>
        ) : (
          <li className='fas fa-times-circle text-danger'></li>
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt='avatar'
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location:{location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a
              href={html_url}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-dark my-1'
            >
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username:</strong>
                    {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company:</strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website:</strong>
                    <a href={blog} target='_blank' rel='noopener noreferrer'>
                      {blog}
                    </a>
                  </Fragment>
                )}
              </li>
              <li>
                {email && (
                  <Fragment>
                    <strong>Email:</strong>
                    {email}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers} </div>
          <div className='badge badge-success'>Following: {following} </div>
          <div className='badge badge-light'>Public Repos: {public_repos} </div>
          <div className='badge badge-dark'>Public Gists: {public_gists} </div>
        </div>
        <UserRepos repos={repos} />
      </Fragment>
    );
  }
}

export default UserDetails;
