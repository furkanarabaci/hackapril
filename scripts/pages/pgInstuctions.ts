import PgInstuctionsDesign from 'generated/pages/pgInstuctions';
import { Route, Router } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import { LetterState } from 'components/FlLetter';
import { withDismissAndBackButton } from '@smartface/mixins';

export default class PgInstuctions extends withDismissAndBackButton(PgInstuctionsDesign) {
  private disposeables: (() => void)[] = [];
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    this.initDismissButton(this.router);
    this.initCorrectLetter();
    this.initWrongSpot();
    this.initWrongLetter();
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();
    this.flCorrectLetter.word = 'WEARY';
    this.flWrongSpot.word = 'PILLS';
    this.flWrongLetter.word = 'VAGUE';
  }

  onHide(): void {
    this.dispose();
  }

  dispose(): void {
    this.disposeables.forEach((item) => item());
  }

  initCorrectLetter() {
    this.flCorrectLetter.setLetterState(LetterState.SUCCESS, 0);
  }
  initWrongSpot() {
    this.flWrongSpot.setLetterState(LetterState.HINT, 1);
  }
  initWrongLetter() {
    this.flWrongLetter.setLetterState(LetterState.FAIL, 3);
  }
}
