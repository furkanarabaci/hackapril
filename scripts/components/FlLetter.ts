import Animator from '@smartface/native/ui/animator';
import FlLetterDesign from 'generated/my-components/FlLetter';

const ANIMATION_DURATION = 500;

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
    this.dispatch({
      type: 'pushClassNames',
      classNames: `.flLetter.${state}`
    });
  }

  private animateStateChange(state: WordState) {
    let defaultHeight = this.height;
    Animator.animate(this, ANIMATION_DURATION, () => {
      this.paddingTop = this.height / 2;
      this.paddingBottom = this.height / 2;
      this.setWordState(state);
    }).then(ANIMATION_DURATION, () => {
      this.height = defaultHeight;
      this.paddingTop = 0;
      this.paddingBottom = 0;
    });
  }

  changeState(state: WordState) {
    this.animateStateChange(state);
  }
}
