import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';


@inject('store') @observer
export default class UserProfile extends Component {

  updateField(field, e) {
    const { store } = this.props;
    const { user } = store;
    if (store.editing) {
      user[field] = e.target.value;
    }
  }

  render() {
    const { store } = this.props;
    const { user } = store;

    return (
      <div id='userProfile'>
        <div id='userBG' style={{ backgroundImage: `url('${user.bgUrl}')` }} />
        <input type='text' id='userBgChanger' className='secretInput' value={user.bgUrl} hidden={!store.editing} onChange={e => this.updateField('bgUrl', e)} />

        <button id='userEdit' className='ghostBtn' onClick={() => store.toggleEditing()}>{store.editing ? 'SAVE' : 'EDIT'}</button>

        <h4 id='userEditMessage' hidden={!store.editing}>EDITING PROFILE</h4>
        <div id='userImg' style={{ backgroundImage: `url(${user.imgUrl}), linear-gradient(60deg, rgba(255,255,255,.75) 0%, rgba(0,0,0,.5) 100%)` }} />
        <input type='text' id='userImgChanger' className='secretInput' value={user.imgUrl} hidden={!store.editing} onChange={e => this.updateField('imgUrl', e)} />

        <input type='text' id='userName' className='secretInput' value={user.name} readOnly={!store.editing} onChange={e => this.updateField('name', e)} />
        <input type='text' id='userTagline' className='secretInput' value={user.tagline} readOnly={!store.editing} onChange={e => this.updateField('tagline', e)} />

        <div id='userStats'>
          <h3 id='userRank'><i className='fa fa-trophy' /> <input type='text' className='secretInput' value={user.rank} readOnly={!store.editing} onChange={e => this.updateField('rank', e)} /></h3>
          <h3><i className='fa fa-tint' /> {store.totalSharks} Sharkicorns</h3>
        </div>
      </div>
    );
  }

}
