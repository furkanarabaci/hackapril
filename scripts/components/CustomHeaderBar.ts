import ImageView from '@smartface/native/ui/imageview';
import { ImageViewFillTypeIOS } from '@smartface/native/ui/imageview/imageview';
import CustomHeaderBarDesign from 'generated/my-components/CustomHeaderBar';

export default class CustomHeaderBar extends CustomHeaderBarDesign {
  pageName?: string | undefined;
  constructor(props?: any, pageName?: string) {
    // Initalizes super class for this scope
    super(props);
    this.pageName = pageName;
  }
}
