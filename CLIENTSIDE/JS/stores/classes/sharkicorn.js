
import React from 'react';
import { observable, computed, action } from 'mobx';
import request from 'axios';

import hexToRgba from 'hex-to-rgba';

const Attacks = ["Horn Stab", "Bite", "Mutilate", "Spike", "Slice", "Puncture", "Tail Whip", "Charge", "Headbutt", "Smash"];
const Traits = ["Fast", "Brisk", "Slow", "Swift", "Snappy", "Lazy", "Sleepy", "Aggressive", "Speedy", "Phat"];

const randomHexColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

export default class Sharkicorn {

  @observable name = '';
  @observable showing = false;

  sharkId = Math.random();
  color = randomHexColor();
  bgColor = hexToRgba( randomHexColor(), '.2' );
  seed = Math.floor(Math.random() * 5) + 1;
  stats = {
    hp: Math.floor(Math.random() * 100) + 1,
    ap: Math.floor(Math.random() * 100) + 1,
    attack_1: Attacks[Math.floor(Math.random() * 10)],
    attack_2: Attacks[Math.floor(Math.random() * 10)],
    @observable trait: Traits[Math.floor(Math.random() * 10)]
  };

  @action async getName() {
    const response = await fetch('https://randomuser.me/api/');
    const json = await response.json();
    const newName = json.results[0].name.first;
    this.name = newName;
    this.showing = true;
  }

  constructor(){
    if (this.stats.ap >= 80 && this.stats.hp >= 80){
      this.stats.trait = "Shiny";
    };

    this.getName();
  }

}
