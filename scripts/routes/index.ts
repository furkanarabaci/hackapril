import { NativeRouter, NativeStackRouter, Route } from '@smartface/router';
import Application from '@smartface/native/application';

import PgMain from 'pages/pgMain';
import PgInstructions from 'pages/pgInstuctions';

Application.on('backButtonPressed', () => {
  NativeRouter.getActiveRouter()?.goBack();
});

const router = NativeRouter.of({
  path: '/',
  isRoot: true,
  routes: [
    NativeStackRouter.of({
      path: '/pages',
      routes: [
        Route.of<PgMain>({
          path: '/pages/main',
          build(router, route) {
            return new PgInstructions(router, route);
          }
        }),
        NativeStackRouter.of({
          path: '/pages/instructions',
          to: '/pages/instructions/main',
          bottomSheetOptions: {
            cornerRadius: 15,
            detents: ['large', 'medium'],
            isGrabberVisible: true
          },
          modalType: 'bottom-sheet',
          routes: [
            Route.of<PgInstructions>({
              path: '/pages/instructions/main',
              build(router, route) {
                return new PgInstructions(router, route);
              }
            })
          ]
        })
      ]
    })
  ]
});

export default router;
