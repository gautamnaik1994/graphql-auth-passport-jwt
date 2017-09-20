import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{
        query,
      }],
    });
  }
  renderButtons() {
    const { loading, user } = this.props.data;
    const { match } = this.props;
    console.log('Propsss', this.props);
    if (this.props.data.loading) {
      return <div />;
    }
    if (user) {
      return (
        <li>
          <Link
            onClick={this.onLogoutClick}
            to="/"
            className="waves-effect waves-light btn"
          >
            Sign Out
          </Link>
        </li>
      );
    }
    return [
      <li key="1">
        <Link to="/signin" className="waves-effect waves-light btn">
          Sign In
        </Link>
      </li>,
      <li key="2">
        <Link to="/signup" className="waves-effect waves-light btn">
          Sign Up
        </Link>
      </li>,
    ];
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper row clearfix">
          <div className="container ">
            <a href="#" className="brand-logo">
              Logo
            </a>
            <ul className="right">
              {this.renderButtons()}
              {/* <li>
                <button className="waves-effect waves-light btn">Button</button>
              </li>
              <li>
                <button className="waves-effect waves-light btn">Button</button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
// export default
//   graphql(mutation)(
//     graphql(query)(Header),
//   );

export default compose(
  graphql(query, {}),
  graphql(mutation, {}),
)(Header);
