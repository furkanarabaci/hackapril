import Animator from '@smartface/native/ui/animator';
import FlLetterDesign from 'generated/my-components/FlLetter';

const ANIMATION_DURATION = 350;

export enum LetterState {
  SUCCESS = 'success',
  FAIL = 'fail',
  HINT = 'hint',
  DEFAULT = 'default'
}

export default class FlLetter extends FlLetterDesign {
  pageName?: string | undefined;
  private state = LetterState.DEFAULT;
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
    Animator.animate(this.flWrapper, ANIMATION_DURATION, () => {
      this.flWrapper.rotationX = 90;
    }).then(ANIMATION_DURATION, () => {
      this.flWrapper.rotationX = 0;
      this.setWordState(state);
    });
  }

  changeState(state: LetterState) {
    // if (this.state === state) {
    //   return;
    // }
    this.state = state;
    this.animateStateChange(state);
  }

  set letter(value: string) {
    this.lblLetter.text = value;
  }
  get letter() {
    return this.lblLetter.text;
  }
}
