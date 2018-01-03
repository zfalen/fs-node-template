// ESLINT GLOBALS

import React from 'react';

import { observer } from 'mobx-react';
import TransitionWrapper from 'react-transition-group/Transition';


// TRANSITION SKELETON USING HIGHER ORDER COMPONENT
const Transition = (Component, animationDuration, inTransition, outTransition) =>
  @observer
  class TransitionSkeleton extends React.Component {

    render() {
      return (
        <TransitionWrapper
          in={ this.props.animationTrigger }
          timeout={ animationDuration * 1000 }
          mountOnEnter
          unmountOnExit
          addEndListener={(element, doneCallback) => {
            if (this.props.animationTrigger) {
              inTransition(element, doneCallback);
            } else {
              outTransition(element, doneCallback);
            }
          }}
        >
          <Component {...this.props} />
        </TransitionWrapper>
      );
    }

  };

export default Transition;
