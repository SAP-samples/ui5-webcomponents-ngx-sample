import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ui5ThemingModule } from '@ui5/theming-ngx';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
// import { Ui5AngularModule } from '@ui5/webcomponents-ngx';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

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
    Ui5ThemingModule.forRoot({ defaultTheme: 'sap_horizon' }),
    Ui5WebcomponentsModule,
    // Ui5AngularModule,
    FundamentalNgxCoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }