import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import '@ui5/webcomponents-fiori/dist/Assets.js';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

// import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
