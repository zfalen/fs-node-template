
import 'babel-polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { intercept } from 'mobx';
import { observer, Provider, inject } from 'mobx-react';

// STYLESHEET
import '../../public/stylesheets/app-styles/appStyles.scss';

// DEV MODE TOOLS
import StatsWindow from './dev_elements/statsWindow';

// STATE MANAGEMENT STORE
import APP_STORE from '../stores/app_store';
const appStore = new APP_STORE();


// MAIN COMPONENTS
import App from './main_components/app';

// THIS IS AN INDEX / CONTAINER
@inject('store') @observer
class AppContainer extends Component {

  render() {
    const { store } = this.props;
    return (
      <div>
        <App />
        <StatsWindow />
      </div>
    )
  }

}

ReactDOM.render(
  <Provider store={appStore}>
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(
      <Provider store={appStore}>
        <AppContainer />
      </Provider>,
      document.getElementById('app')
    );
  });
}
