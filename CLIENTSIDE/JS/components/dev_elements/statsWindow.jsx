import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';

import { TweenLite } from 'gsap';

import JSONTree from 'react-json-tree';

@inject('store') @observer
export default class StatsWindow extends Component {

  @observable showStats = true;
  @observable transitioning = false;

  componentDidUpdate() {

    if (this.transitioning) {
      TweenLite
        .fromTo(ReactDOM.findDOMNode(this), '.25',
          { y: 25 },
          { y: 0, onComplete: () => { this.transitioning = false; } }
        );
    }
  }

  toggleStats() {
    this.transitioning = true;
    this.showStats = !this.showStats;
  }

  render() {
    const { store } = this.props;

    const statsWindow =
      <div id='statsWindow'>
        <p onClick={() => this.toggleStats()}>X</p>
        <h5>CURRENT STATE TREE:</h5>
        <JSONTree data={toJS(store)} />
      </div>;

    const statsButton =
      <button id='statsBtn' className='ghostBtn' onClick={() => this.toggleStats()}>TOGGLE STATS WINDOW</button>;

    if (store.devMode) {
      return this.showStats ? statsWindow : statsButton;
    }

    return null;
  }

}
