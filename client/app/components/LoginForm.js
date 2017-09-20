import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { errors: [] };
  }
  componentWillUpdate(nextProps) {
    console.log(this.props, nextProps);
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push('/dashboard');
    }
  }
  onSubmit({ email, password }) {
    console.log('Sibmit', email, password);
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }],
    }).catch((res) => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }
  render() {
    return (
      <div>
        <h3>Login Form</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// export default graphql(mutation)(LoginForm);
export default compose(
  graphql(query, {}),
  graphql(mutation, {}),
)(LoginForm);
