import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { setContext } from 'apollo-link-context';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from "apollo-link-batch-http";
import { InMemoryCache } from 'apollo-cache-inmemory';

import store, { history } from './store';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './theme/index.css';

const link = new BatchHttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client} key='apolloProvider'>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ApolloProvider>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
