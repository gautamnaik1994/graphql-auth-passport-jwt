import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
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
    console.log(email, password);
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
        <h3>Signup</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

// export default graphql(mutation)(SignupForm);
export default compose(
  graphql(query, {}),
  graphql(mutation, {}),
)(SignupForm);
