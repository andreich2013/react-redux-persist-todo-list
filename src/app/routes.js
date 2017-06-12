import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { withRouter } from 'react-router-dom'
import App from './containers/App.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import OfferList from './containers/OfferList.jsx'
import OfferItem from './containers/OfferItem.jsx'

const AppWithRouter = withRouter(App);
const OfferListWithRouter = withRouter(OfferList);
const OfferItemWithRouter = withRouter(OfferItem);
const PageNotFoundWithRouter = withRouter(PageNotFound);

export default (
  <AppWithRouter>
    <Switch>
      <Route path="/offer/create" component={OfferItemWithRouter} />
      <Route path="/offer/list" component={OfferListWithRouter} />
      <Route path="/offer/:id" component={OfferItemWithRouter} />
      <Redirect from="/" to="/offer/list" />
      <Route path="*" component={PageNotFoundWithRouter} />
    </Switch>
  </AppWithRouter>
);