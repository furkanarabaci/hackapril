import PgMainDesign from 'generated/pages/pgMain';
import { withDismissAndBackButton } from '@smartface/mixins';
import { Router, Route } from '@smartface/router';
import Font from '@smartface/native/ui/font';
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import Image from '@smartface/native/ui/image';
import Color from '@smartface/native/ui/color';

export default class PgMain extends PgMainDesign {
  constructor(private router?: Router, private route?: Route) {
    super({});
  }

  /**
   * @event onShow
   * This event is called when the page appears on the screen (everytime).
   */
  onShow() {
    super.onShow();
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
    this.initCustomHeaderBar();
  }

  initCustomHeaderBar() {
    const customHeaderBar = this.children.customHeaderBar;
    customHeaderBar.imgInstruction.on('touchEnded', () => this.router.push('instructions'));
    customHeaderBar.imgStatistics.on('touchEnded', () => this.router.push('statistics'));
  }
}
