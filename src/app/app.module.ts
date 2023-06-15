import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ui5ThemingModule } from '@ui5/theming-ngx';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';
import '@ui5/webcomponents-icons/dist/AllIcons.js';
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js';
import '@ui5/webcomponents/dist/Popover';

import { HeaderComponent } from './header/header.component';
import { MessageComponent } from './message/message.component';
import { LegendItemComponent } from './legend-item/legend-item.component';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import { SeatsChartComponent } from './seats-chart/seats-chart.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { TripCalendarComponent } from './trip-calendar/trip-calendar.component';
import { DailyFlightSectionComponent } from './daily-flight-section/daily-flight-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessageComponent,
    LegendItemComponent,
    PassengerListComponent,
    SeatsChartComponent,
    PaymentDetailsComponent,
    TripCalendarComponent,
    DailyFlightSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ui5ThemingModule.forRoot({
      defaultTheme: "sap_horizon"
    }),
    Ui5WebcomponentsModule,
    LayoutGridModule,
    HttpClientModule,
    Ui5I18nModule.forRoot({
      language: 'en',
      fetchDefaultLanguage: true,
      bundle: {
        name: 'i18n_bundle',
        translations: {
          useFactory: () => {
            const http = inject(HttpClient);
            return {
              en: http.get('assets/i18n/messages_en.json', { responseType: 'json' }),
              zh_TW: http.get('assets/i18n/messages_zh_TW.json', { responseType: 'json' }),
              bg: http.get('assets/i18n/messages_bg.json', { responseType: 'json' })
            }
          }
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
