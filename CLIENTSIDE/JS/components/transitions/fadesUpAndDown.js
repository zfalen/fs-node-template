
// ESLINT GLOBALS
/* global TweenLite, Power4 */

import TransitionWrapper from './transition';

export default function fadesUpAndDown(ChildComponent) {

  const animationDuration = .5;

  const inTransition = (element, doneCallback) =>
    TweenLite.fromTo(element, animationDuration,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 10, ease: Power4.easeOut, onComplete: doneCallback }
    );

  const outTransition = (element, doneCallback) =>
    TweenLite.to(element, animationDuration,
      { opacity: 0, y: 100, ease: Power4.easeOut, onComplete: doneCallback }
    );

  // COMPONENT IS PASSED IN USING A DECORATOR TAG
  return TransitionWrapper(ChildComponent, animationDuration, inTransition, outTransition);
}
