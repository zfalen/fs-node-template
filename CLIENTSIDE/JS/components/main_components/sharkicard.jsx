
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import hexToRgba from 'hex-to-rgba';
import { TimelineMax, TweenMax } from 'gsap';

import fadesUpAndDown from '../transitions/fadesUpAndDown';

import Sharkicorn_1 from './sharkicorn_svgs/sharkicorn_1';
import Sharkicorn_2 from './sharkicorn_svgs/sharkicorn_2';
import Sharkicorn_3 from './sharkicorn_svgs/sharkicorn_3';
import Sharkicorn_4 from './sharkicorn_svgs/sharkicorn_4';
import Sharkicorn_5 from './sharkicorn_svgs/sharkicorn_5';

const Sharkicorns = { Sharkicorn_1, Sharkicorn_2, Sharkicorn_3, Sharkicorn_4, Sharkicorn_5 };

const randomHexColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

@inject('store') @fadesUpAndDown @observer
export default class SharkiCard extends Component {

  @observable errorMsg = '';

  componentDidMount() {
    const { sharkStore } = this.props;
    if (sharkStore.stats.trait === 'Shiny') {
      const shiny = () => {
        if (this.sharkImg) {
          TweenMax.to(this.sharkImg, 0.5, { background: hexToRgba(randomHexColor(), '0.75'), onComplete: shiny });
        }
      };
      shiny();
    }
  }

  changeName = (e) => {
    const { sharkStore } = this.props;
    if (e.target.value.length <= 18) {
      this.errorMsg = '';
      sharkStore.name = e.target.value;
    } else {
      const thisShark = ReactDOM.findDOMNode(this);
      new TimelineMax({ yoyo: true, repeat: 4 })
        .to(thisShark, 0.05, { x: -15 })
        .to(thisShark, 0.05, { x: 0 })
        .to(thisShark, 0.05, { x: 15 })
        .to(thisShark, 0.05, { x: 0 });

      this.errorMsg = 'Name Is Too LONG!';
    }
  }

  render() {
    const { store, sharkStore } = this.props;
    const Shark = Sharkicorns[`Sharkicorn_${sharkStore.seed}`];

    return (
      <div className='sharkicard' >
        <div className='primaryStats'>
          <input type='text' className='name' name='name' value={sharkStore.name} onChange={this.changeName} readOnly={!store.editing} />
          <div className='hp'>{sharkStore.stats.hp} HP</div>
          <button style={{ visibility: store.editing ? 'visible' : 'hidden' }} className='remove' onClick={() => store.removeShark(sharkStore.sharkId)}>X</button>
        </div>
        <div className='sharkImg' style={{ background: sharkStore.bgColor }} ref={(el) => { this.sharkImg = el }}>
          <Shark mainColor={sharkStore.color} />
        </div>
        <div className='secondaryStats'>
          <div className='ap'><strong>Attack Power:</strong> {sharkStore.stats.ap}</div>
          <div className='pa'><strong>Primary Attack:</strong> {sharkStore.stats.attack_1}</div>
          <div className='sa'><strong>Secondary Attack:</strong> {sharkStore.stats.attack_2}</div>
          <div className='trait'><strong>{sharkStore.stats.trait}</strong></div>
        </div>
        <div className='errorMsg'>{this.errorMsg}</div>
      </div>
    );
  }

}
