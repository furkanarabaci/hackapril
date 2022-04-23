import Animator from '@smartface/native/ui/animator';
import FlLetterDesign from 'generated/my-components/FlLetter';

export const ANIMATION_DURATION = 350;

export enum LetterState {
  SUCCESS = 'success',
  FAIL = 'fail',
  HINT = 'hint',
  DEFAULT = 'default'
}

export default class FlLetter extends FlLetterDesign {
  pageName?: string | undefined;
  state = LetterState.DEFAULT;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
    this.onTouch = () => {
      this.changeState(LetterState.SUCCESS);
      return true;
    };
  }
  private setWordState(state: LetterState) {
    this.flWrapper.dispatch({
      type: 'pushClassNames',
      classNames: `.flLetter-wrapper.${state}`
    });
    this.flWrapper.applyLayout();
  }

  private animateStateChange(state: LetterState) {
    try {
      Animator.animate(this.flWrapper, ANIMATION_DURATION, () => {
        this.flWrapper.rotationX = 90;
      }).then(ANIMATION_DURATION, () => {
        this.flWrapper.rotationX = 0;
        this.setWordState(state);
      });
    } catch (e) {
      console.error(e.message, { Stack: e.stack });
    }
  }

  changeState(state: LetterState) {
    this.state = state;
    if (state !== LetterState.DEFAULT) {
      this.animateStateChange(state); // Only animate on guesses
    } else {
      this.setWordState(state);
    }
  }

  set letter(value: string) {
    this.lblLetter.text = value?.toUpperCase() || '';
  }
  get letter() {
    return this.lblLetter.text;
  }

  resetState() {
    this.state = LetterState.DEFAULT;
    this.changeState(this.state);
  }
}
