import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { Router, hashHistory, IndexRoute, Route } from 'react-router';

import App from "./components/App";
import SongList from "./components/Songlist";
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});
const Root = () => {

  return(
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}></IndexRoute>
          <Route path="songs/new" component={SongCreate}></Route>
          <Route path="songs/:id" component={SongDetail}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  ) 
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
