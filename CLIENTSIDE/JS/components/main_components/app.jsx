
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import SharkiCard from './sharkicard';
import UserProfile from './userProfile';

@inject('store') @observer
export default class App extends Component {

  render() {
    const { store } = this.props;
    const sharks = store.user.sharkicorns.map(sharkicorn => <SharkiCard key={`shark${Math.random()}`} sharkStore={sharkicorn} animationTrigger={sharkicorn.showing} />);

    return (
      <div>
        <UserProfile />
        <div className='sharkicard-deck'>
          <div id='sharkHeader'>
            <h1>MY SHARKICORNS</h1>
            <button hidden={!store.editing} className='ghostBtn' onClick={() => store.addShark()}>Add A Sharkicorn</button>
          </div>
          {sharks}
        </div>
      </div>
    );
  }

}
