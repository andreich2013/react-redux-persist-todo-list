import 'babel-polyfill'
import Guid from 'guid'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { getStoredState, persistStore } from 'redux-persist'
import { createBrowserHistory } from 'history'
import localForage from 'localforage'
import configureStore from './configureStore'
import parentData from '../assets/fixture/parent.json'
import childData from '../assets/fixture/child.json'
import routes from './routes'
import App from './containers/App.jsx'

const persistConfig = {
  storage: localForage,
  whitelist: ['offer']
};

getStoredState(persistConfig).then((restoredState) => {

  if(!restoredState.offer) {
    restoredState = {
      offer: {
        list: [
          {
            ...parentData.offers[1],
            id: Guid.create().value
          },
          {
            ...childData.offer[0],
            id: Guid.create().value
          }
        ],
        item: {}
      }
    };
  }

  const history = createBrowserHistory();
  const store = configureStore(restoredState, history);

  persistStore(store, persistConfig);

  render(
    <Provider store={store}>
  	  <ConnectedRouter history={history} children={routes} />
    </Provider>,
    document.getElementById('root')
  )
});
