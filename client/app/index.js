import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import Router from './routes';


// const Root = () => {
//   return <div>Lyrical</div>
// };
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4000/graphql',
    opts: {
      credentials: 'include',
    },
  }),
  dataIdFromObject: o => o.id,
});


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <ApolloProvider client={client}>
        <Component />
      </ApolloProvider>
    </AppContainer>,
    document.querySelector('#root'),
  );
};
render(Router);
// Hot Module Replacement API
if (module.hot) {
  // module.hot.accept('./reducers', () => {
  //   const nextRootReducer = require('./reducers/index');
  //   store.replaceReducer(nextRootReducer);
  // });
  module.hot.accept('./routes.js', () => {
    const NextRouter = require('./routes.js').default;
    render(NextRouter);
  });
}
