import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ui5ThemingModule } from '@ui5/theming-ngx';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { I18nService, Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';
import '@ui5/webcomponents-icons/dist/AllIcons.js';
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js';

import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { LegendItemComponent } from './legend-item/legend-item.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { SeatsChartComponent } from './seats-chart/seats-chart.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { TripCalendarComponent } from './trip-calendar/trip-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessageComponent,
    LegendItemComponent,
    PassengerListComponent,
    SeatsChartComponent,
    PaymentDetailsComponent,
    TripCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ui5ThemingModule.forRoot({
      defaultTheme: "sap_horizon"
    }),
    Ui5WebcomponentsModule,
    FundamentalNgxCoreModule,
    HttpClientModule,
    Ui5I18nModule.forRoot({
      language: 'cn',
      fetchDefaultLanguage: true,
      bundle: {
        name: 'i18n_bundle',
        translations: {
          useFactory: () => {
            const http = inject(HttpClient);
            return {
              en: http.get('assets/i18n/messages_en', { responseType: 'text' }),
              cn: http.get('assets/i18n/messages_cn.json', { responseType: 'json' })
              // en: fetch('assets/i18n/messages_en').then(r => r.text()),
              // ru: fetch('assets/i18n/messages_cn.json').then(r => r.text())
            }
          }
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }