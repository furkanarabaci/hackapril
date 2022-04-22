import PgMainDesign from 'generated/pages/pgMain';
import { Route, Router } from '@smartface/router';
import Color from '@smartface/native/ui/color';
import { WordState } from 'components/FlLetter';

export default class PgMain extends PgMainDesign {
  private disposeables: (() => void)[] = [];
  constructor(private router?: Router, private route?: Route) {
    super({});
    this.layout.backgroundColor = Color.BLACK;
  }

  /**
   * @event onShow
   * This event is called when a page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
    setTimeout(() => {
      this.flLetter.changeState(WordState.SUCCESS);
    }, 200);
  }

  /**
   * @event onLoad
   * This event is called once when page is created.
   */
  onLoad() {
    super.onLoad();

    this.flLetter.onTouch = () => {
      this.flLetter.changeState(WordState.SUCCESS);
      return true;
    };
  }

  onHide(): void {
    this.dispose();
  }

  dispose(): void {
    this.disposeables.forEach((item) => item());
  }
}
