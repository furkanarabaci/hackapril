import Animator from '@smartface/native/ui/animator';
import Font from '@smartface/native/ui/font';
import EllipsizeMode from '@smartface/native/ui/shared/ellipsizemode';
import FlLetterDesign from 'generated/my-components/FlLetter';
import { themeService } from 'theme';

const ANIMATION_DURATION = 350;

export enum WordState {
  SUCCESS = 'success',
  FAIL = 'fail',
  HINT = 'hint',
  DEFAULT = 'default'
}

export default class FlLetter extends FlLetterDesign {
  pageName?: string | undefined;
  private state = WordState.DEFAULT;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
  private setWordState(state: WordState) {
    this.flWrapper.dispatch({
      type: 'pushClassNames',
      classNames: `.flLetter-wrapper.${state}`
    });
  }

  private animateStateChange(state: WordState) {
    let defaultHeight = themeService.getNativeStyle('.flLetter').height;
    Animator.animate(this, ANIMATION_DURATION, () => {
      this.flWrapper.rotationX = 90;
    }).then(ANIMATION_DURATION, () => {
      this.flWrapper.rotationX = 180;
      this.setWordState(state);
    });
  }

  changeState(state: WordState) {
    this.state = state;
    this.animateStateChange(state);
  }
}
