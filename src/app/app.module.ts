import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ui5ThemingModule } from '@ui5/theming-ngx';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { Ui5AngularModule } from '@ui5/webcomponents-ngx';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

// import Avatar from '@ui5/webcomponents/dist/Avatar';

// const oldUpdateAttribute = Avatar.prototype._updateAttribute;

// Avatar.prototype._updateAttribute = function (name, value) {
//   console.log({ name, value })
//   if (name === 'icon') {
//     debugger;
//   }
//   oldUpdateAttribute.call(this, name, value);
// };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ui5ThemingModule.forRoot({ defaultTheme: 'sap_horizon' }),
    Ui5AngularModule,
    FundamentalNgxCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
