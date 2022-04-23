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
    this.initHeaderBarItems();
  }

  /**
   * @event onLoad
   * This event is called once when the page is created.
   */
  onLoad() {
    super.onLoad();
  }

  initHeaderBarItems() {
    const questionHeaderBarItem = new HeaderBarItem({
      image: Image.createFromFile('images://questionmark.png', 60, 60),
      color: Color.WHITE,
      onPress: () => this.router.push('instructions')
    });
    this.headerBar.setItems([questionHeaderBarItem]);
  }
}
