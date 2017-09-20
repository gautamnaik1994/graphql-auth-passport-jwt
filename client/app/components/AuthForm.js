import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { email: '', password: '' };
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
    return (
      <div className="row">
        <form className="col s4" onSubmit={this.onSubmit}>
          <div className="input-field">

            <input
              placeholder="Email"
              type="text"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">

            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
            {this.props.errors.map(error => <div key={error}> {error}</div>)}
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
