import { NativeRouter, NativeStackRouter, Route } from '@smartface/router';
import Application from '@smartface/native/application';

import PgMain from 'pages/pgMain';
import PgInstructions from 'pages/pgMain';

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
          path: '/pages/page1',
          build(router, route) {
            return new PgMain(router, route);
          }
        })
      ]
    })
  ]
});

export default router;
